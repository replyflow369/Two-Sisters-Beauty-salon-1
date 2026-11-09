import os
import re
import json
import html
import time
import hashlib
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
from html.parser import HTMLParser


# ============================================================
# CONFIGURATION
# ============================================================

ROOT = Path.cwd()
PUBLIC = ROOT / "frontend" / "public"
BLOG = PUBLIC / "blog"
BASE_URL = "https://www.twosistersbeautysalon.co.nz"
MODEL = os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite")
NZ = ZoneInfo("Pacific/Auckland")

MAX_RETRIES = 4
MIN_WORDS = 450
MAX_WORDS = 1300
MAX_ARTICLES = 100

TOPICS = [
    "How to build a simple facial skincare routine",
    "Eyebrow threading versus waxing: understanding the differences",
    "How to prepare for a professional facial",
    "What to know before your first eyebrow tint",
    "Simple habits for healthier-looking nails",
    "How to care for your skin after a facial",
    "How often should you review your brow grooming routine?",
    "A beginner's guide to choosing a manicure",
    "What to expect during a professional pedicure",
    "Everyday beauty habits that are easy to maintain",
    "Simple ways to look after your skin during winter",
    "What to consider when choosing a beauty treatment",
    "Everyday eyebrow grooming tips",
    "How to maintain healthy-looking hands and feet",
    "A beginner's guide to facial treatments",
]

SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"

ALLOWED_TAGS = {
    "h2", "h3", "p", "ul", "ol", "li",
    "strong", "em", "blockquote", "a", "br"
}
VOID_TAGS = {"br"}
BLOCKED_TAGS = {
    "script", "style", "iframe", "form", "svg", "object",
    "embed", "video", "audio", "textarea", "template"
}

# These checks catch common fabricated first-person/customer claims.
# They are safeguards, not a substitute for human fact-checking.
UNSUPPORTED_CLAIM_PATTERNS = [
    r"\bwe (?:often|regularly|frequently|always|typically) (?:see|hear|find|tell|recommend|advise|help)\b",
    r"\b(?:our|the salon's) clients (?:often|regularly|frequently|usually|typically|love|prefer|like)\b",
    r"\bmany clients (?:like|love|choose|prefer|ask|tell)\b",
    r"\bclients often\b",
    r"\bhere at two sisters\b",
    r"\bin our salon\b",
    r"\bwhen you visit us\b",
    r"\bwe look forward to welcoming\b",
]


# ============================================================
# GENERAL HELPERS
# ============================================================

def log(message):
    print("[BLOG]", message, flush=True)


def slugify(value):
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    words = value.split("-")
    slug = ""

    for word in words:
        candidate = f"{slug}-{word}" if slug else word
        if len(candidate) > 65:
            break
        slug = candidate

    return slug.strip("-")


def count_words(value):
    text = re.sub(r"<[^>]*>", " ", value)
    return len(re.findall(r"\b[\w'-]+\b", text))


def atomic_write(path, content):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(content, encoding="utf-8")
    temporary.replace(path)


def existing_slugs():
    if not BLOG.exists():
        return set()

    return {
        item.name for item in BLOG.iterdir()
        if item.is_dir() and not item.name.startswith(".")
    }


def choose_topic(slugs):
    # The number of existing article folders advances the topic rotation.
    # This works when each successful publication is committed to the repo.
    return TOPICS[len(slugs) % len(TOPICS)]


def safe_internal_href(href):
    if not href or not href.startswith("/") or href.startswith("//"):
        return False
    if "\\" in href or any(ord(char) < 32 for char in href):
        return False
    if re.search(r"%(?:2f|5c|2e)", href, flags=re.I):
        return False
    path = href.split("?", 1)[0].split("#", 1)[0]
    if any(part in {".", ".."} for part in path.split("/")):
        return False
    return True


# ============================================================
# GEMINI PROMPT AND API
# ============================================================

def build_prompt(topic):
    return f"""
Create an original, accurate, genuinely useful beauty and self-care article
for Two Sisters Beauty Salon in Christchurch, New Zealand.

TOPIC:
{topic}

Return ONLY valid JSON with exactly these string fields:
title, description, excerpt, body_html

LENGTH AND STRUCTURE:
- Aim for 800–1,000 words in body_html.
- Use natural, professional New Zealand English.
- Start with an engaging introduction.
- Use 5–6 useful H2 headings, with H3 headings only when helpful.
- Include practical, realistic tips and a concise conclusion.
- Write for readers first. Do not keyword-stuff.
- Mention Christchurch only where it is natural and relevant.

STRICT TRUTH RULES:
- Do not invent customer stories, testimonials, reviews, preferences,
  conversations, or customer behaviour.
- Do not claim that the salon regularly sees, hears, recommends, or treats
  particular things unless the information has been explicitly supplied.
- Do not write in the first person as a salon employee or pretend to have
  visited or worked at the salon.
- Do not invent staff, qualifications, endorsements, prices, opening hours,
  products, equipment, policies, or treatment methods.
- Do not invent statistics, research, studies, expert quotations, or citations.
- Do not make claims about salon services or treatment outcomes unless they
  are established by the supplied information.
- Do not claim a beauty treatment cures, prevents, diagnoses, or medically
  treats a health condition.
- Do not promise results or imply that a result is guaranteed.
- If a factual claim is uncertain, omit it or describe it cautiously without
  presenting it as established fact.
- Do not include fake references, source names, URLs, or citations.

HEALTH AND SAFETY:
- Keep general beauty information distinct from medical advice.
- Do not diagnose skin, nail, or foot conditions.
- Do not recommend cutting or forcibly pushing back cuticles.
- Do not recommend aggressive scraping, cutting, or self-treatment of hard
  skin or potentially infected areas.
- Avoid universal claims about products or ingredients.
- Suggest speaking with an appropriately qualified health professional for
  persistent symptoms, pain, infection, unusual changes, or other medical
  concerns.
- Do not imply that a disclaimer makes unsupported medical claims acceptable.

SALON MENTIONS:
- Refer to Two Sisters Beauty Salon in the third person.
- Keep the article primarily educational, not promotional.
- Do not imply the salon offers a service unless it is clearly relevant to the
  supplied topic and the existing service page link below.
- Only use these supplied internal links when genuinely relevant:
  /treatments/facials
  /treatments/threading
  /treatments/brows
  /treatments/waxing
  /treatments/manicures
  /treatments/pedicures
- Do not invent other website URLs.

HTML:
- Use only h2, h3, p, ul, ol, li, strong, em, blockquote, a, and br.
- Use links only to the supplied internal paths above.
- Do not include h1; the website adds the article title separately.
- No scripts, CSS, images, forms, embeds, tracking links, or Markdown fences.

SEO:
- title: clear and natural, ideally 45–70 characters.
- description: accurate and concise, approximately 120–160 characters.
- excerpt: a useful summary of the article, not a sales pitch.
- Do not force keywords or location terms into the text.

Return valid JSON only. No explanation or commentary.
""".strip()


def ask_gemini(topic):
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        raise RuntimeError("GEMINI_API_KEY is missing from GitHub Secrets.")

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        + MODEL + ":generateContent?key=" + key
    )

    payload = {
        "contents": [{"parts": [{"text": build_prompt(topic)}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.35
        }
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    retry_codes = {429, 500, 502, 503, 504}
    result = None

    for attempt in range(MAX_RETRIES):
        try:
            log(f"Requesting article from Gemini (attempt {attempt + 1}/{MAX_RETRIES})")
            with urllib.request.urlopen(request, timeout=120) as response:
                result = json.loads(response.read().decode("utf-8"))
            break

        except urllib.error.HTTPError as error:
            code = error.code
            # Do not log the request URL; it contains the API key.
            error_body = error.read().decode("utf-8", errors="replace")

            if code in retry_codes and attempt < MAX_RETRIES - 1:
                delay = 5 * (2 ** attempt)
                log(f"Gemini returned HTTP {code}; retrying in {delay} seconds.")
                time.sleep(delay)
                continue

            # Avoid exposing request details or secrets in logs.
            raise RuntimeError(
                f"Gemini API returned HTTP {code}: {error_body[:500]}"
            ) from None

        except (urllib.error.URLError, TimeoutError) as error:
            if attempt < MAX_RETRIES - 1:
                delay = 5 * (2 ** attempt)
                log(f"Temporary connection problem; retrying in {delay} seconds.")
                time.sleep(delay)
                continue
            raise RuntimeError(
                "Gemini connection failed after retries: " + str(error)
            ) from None

    if result is None:
        raise RuntimeError("Gemini request failed.")

    candidates = result.get("candidates", [])
    if not candidates:
        raise RuntimeError("Gemini returned no article candidate.")

    candidate = candidates[0]
    if candidate.get("finishReason") == "SAFETY":
        raise RuntimeError("Gemini blocked the generated article.")

    parts = candidate.get("content", {}).get("parts", [])
    response_text = "".join(
        part.get("text", "") for part in parts
    ).strip()

    if not response_text:
        raise RuntimeError("Gemini returned an empty article.")

    try:
        article = json.loads(response_text)
    except json.JSONDecodeError as error:
        raise RuntimeError("Gemini returned invalid JSON: " + str(error)) from None

    required = ("title", "description", "excerpt", "body_html")
    for field in required:
        if not isinstance(article.get(field), str) or not article[field].strip():
            raise ValueError("Missing or invalid article field: " + field)

    return article


# ============================================================
# HTML SANITISATION
# ============================================================

class ArticleSanitizer(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.output = []
        self.open_tags = []
        self.blocked_tags = []

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()

        if self.blocked_tags:
            if tag in BLOCKED_TAGS:
                self.blocked_tags.append(tag)
            return

        if tag in BLOCKED_TAGS:
            self.blocked_tags.append(tag)
            return

        if tag not in ALLOWED_TAGS:
            return

        if tag == "a":
            href = dict(attrs).get("href", "")
            if safe_internal_href(href):
                self.output.append(
                    '<a href="' + html.escape(href, quote=True) + '">'
                )
                self.open_tags.append("a")
            else:
                # Keep readable link text but remove unsafe destinations.
                self.output.append("<span>")
                self.open_tags.append("span")
            return

        if tag == "br":
            self.output.append("<br>")
            return

        self.output.append("<" + tag + ">")
        self.open_tags.append(tag)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag.lower() not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        tag = tag.lower()

        if self.blocked_tags:
            if tag == self.blocked_tags[-1]:
                self.blocked_tags.pop()
            return

        if tag == "br" or tag not in ALLOWED_TAGS:
            return

        # Close the matching open tag and any nested tags above it.
        if tag not in self.open_tags:
            return

        while self.open_tags:
            current = self.open_tags.pop()
            self.output.append("</" + current + ">")
            if current == tag:
                break

    def handle_data(self, data):
        if not self.blocked_tags:
            self.output.append(html.escape(data))

    def get_html(self):
        while self.open_tags:
            self.output.append("</" + self.open_tags.pop() + ">")
        return "".join(self.output)


def clean_html(source):
    parser = ArticleSanitizer()
    parser.feed(source)
    parser.close()
    return parser.get_html()


# ============================================================
# ARTICLE QUALITY CHECKS
# ============================================================

def validate_article(article, body):
    title = article["title"].strip()
    description = article["description"].strip()
    excerpt = article["excerpt"].strip()

    if len(title) < 20 or len(title) > 90:
        raise ValueError("Article title must be between 20 and 90 characters.")

    if len(description) < 60 or len(description) > 170:
        raise ValueError("SEO description must be between 60 and 170 characters.")

    if len(excerpt) < 30 or len(excerpt) > 350:
        raise ValueError("Article excerpt must be between 30 and 350 characters.")

    if re.search(r"<\s*(?:script|style|iframe|form)\b", body, flags=re.I):
        raise ValueError("Article contains a prohibited HTML element.")

    word_count = count_words(body)
    if word_count < MIN_WORDS or word_count > MAX_WORDS:
        raise ValueError(
            f"Article word count must be {MIN_WORDS}–{MAX_WORDS}; got {word_count}."
        )

    if not re.search(r"<h2>", body, flags=re.I):
        raise ValueError("Article is missing H2 section headings.")

    if not re.search(r"<p>", body, flags=re.I):
        raise ValueError("Article is missing paragraphs.")

    if re.search(r"\b(?:lorem ipsum|TODO|insert text here)\b", body, flags=re.I):
        raise ValueError("Article contains placeholder text.")

    plain_text = html.unescape(re.sub(r"<[^>]*>", " ", body))
    for pattern in UNSUPPORTED_CLAIM_PATTERNS:
        if re.search(pattern, plain_text, flags=re.I):
            raise ValueError(
                "Article appears to contain an unsupported salon/customer claim. "
                "Regenerate and review it manually."
            )

    log(f"Structural and wording checks passed: {word_count} words.")
    log("Note: automated checks do not independently fact-check medical or scientific claims.")


# ============================================================
# HTML PAGE GENERATION
# ============================================================

def page(title, description, content, canonical):
    safe_title = html.escape(title)
    safe_description = html.escape(description, quote=True)
    safe_canonical = html.escape(canonical, quote=True)

    return f"""<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{safe_title}</title>
<meta name="description" content="{safe_description}">
<link rel="canonical" href="{safe_canonical}">
<meta property="og:title" content="{safe_title}">
<meta property="og:description" content="{safe_description}">
<meta property="og:type" content="article">
<meta property="og:url" content="{safe_canonical}">
<meta name="robots" content="index,follow">
<style>
body {{
    font-family: Arial, sans-serif;
    line-height: 1.7;
    color: #292929;
    margin: 0;
    background: #ffffff;
}}
header, main, footer {{
    max-width: 820px;
    margin: auto;
    padding: 22px;
}}
header, footer {{
    background: #faf7f5;
}}
a {{ color: #754b56; }}
h1, h2, h3 {{ line-height: 1.25; }}
article {{ font-size: 18px; }}
small {{ color: #666666; }}
</style>
</head>
<body>
<header>
<a href="/">Two Sisters Beauty Salon</a> |
<a href="/blog/">Beauty Blog</a>
</header>
<main>
{content}
</main>
<footer>
<p>Two Sisters Beauty Salon · Christchurch, New Zealand</p>
<p>
<a href="/treatments">Explore our treatments</a> |
<a href="https://bookings.gettimely.com/twosistersbeautysalon/bb/book">Book online</a>
</p>
</footer>
</body>
</html>
"""


# ============================================================
# BLOG INDEX
# ============================================================

def update_blog_index(article, slug, date):
    index_file = BLOG / "index.html"
    entries = []

    if index_file.exists():
        old = index_file.read_text(encoding="utf-8")
        entries = re.findall(
            r'<article class="post">.*?</article>',
            old,
            flags=re.S
        )

    # Do not add the same article link twice.
    entries = [
        entry for entry in entries
        if f'href="/blog/{slug}/"' not in entry
    ]

    title = html.escape(article["title"].strip())
    excerpt = html.escape(article["excerpt"].strip())

    new_entry = f"""
<article class="post">
<h2><a href="/blog/{slug}/">{title}</a></h2>
<p>{excerpt}</p>
<p><small>{date.strftime('%d %B %Y')}</small></p>
</article>
"""
    entries.insert(0, new_entry)
    entries = entries[:MAX_ARTICLES]

    listing = """
<h1>Beauty Blog</h1>
<p>Beauty tips, skincare advice and treatment guides from Two Sisters Beauty Salon in Christchurch.</p>
""" + "\n".join(entries)

    content = page(
        "Beauty Blog | Two Sisters Beauty Salon Christchurch",
        "Beauty tips, skincare advice and treatment guides from Two Sisters Beauty Salon in Christchurch.",
        listing,
        BASE_URL + "/blog/"
    )
    atomic_write(index_file, content)


# ============================================================
# SITEMAP
# ============================================================

def update_sitemap(canonical, date):
    sitemap = PUBLIC / "sitemap.xml"

    if not sitemap.exists():
        log("No sitemap.xml found; sitemap update skipped.")
        return

    tree = ET.parse(sitemap)
    root = tree.getroot()

    # Respect the namespace already used by the sitemap.
    namespace = ""
    if root.tag.startswith("{"):
        namespace = root.tag.split("}", 1)[0] + "}"

    url_tag = namespace + "url"
    loc_tag = namespace + "loc"
    lastmod_tag = namespace + "lastmod"

    existing = {
        (node.text or "").strip()
        for node in root.findall(".//" + loc_tag)
    }

    if canonical in existing:
        return

    url_node = ET.SubElement(root, url_tag)
    ET.SubElement(url_node, loc_tag).text = canonical
    ET.SubElement(url_node, lastmod_tag).text = date.date().isoformat()

    temporary = sitemap.with_name(sitemap.name + ".tmp")
    tree.write(temporary, encoding="utf-8", xml_declaration=True)
    temporary.replace(sitemap)

    log("Sitemap updated.")


# ============================================================
# MAIN GENERATION PROCESS
# ============================================================

def main():
    log("Starting Two Sisters Beauty Salon blog generator.")

    if not PUBLIC.exists():
        raise RuntimeError("frontend/public folder was not found.")

    BLOG.mkdir(parents=True, exist_ok=True)
    now = datetime.now(NZ)
    slugs = existing_slugs()
    topic = choose_topic(slugs)

    log("Selected topic: " + topic)

    article = ask_gemini(topic)

    title = article["title"].strip()
    description = article["description"].strip()
    excerpt = article["excerpt"].strip()
    body = clean_html(article["body_html"])

    validate_article(article, body)

    slug = slugify(title)
    if not slug:
        raise ValueError("Could not create a valid article URL.")

    if slug in slugs:
        raise ValueError("Duplicate article URL detected: " + slug)

    folder = BLOG / slug
    if folder.exists():
        raise ValueError("Article folder already exists: " + slug)

    canonical = BASE_URL + "/blog/" + slug + "/"

    article_content = f"""
<article>
<p><small>Beauty advice · {now.strftime('%d %B %Y')}</small></p>
<h1>{html.escape(title)}</h1>
<p>{html.escape(description)}</p>
{body}
<p><small>For persistent symptoms or medical concerns, seek advice from an appropriately qualified health professional.</small></p>
</article>
"""

    article_page = page(title, description, article_content, canonical)

    # Write the article only after all content checks pass.
    folder.mkdir(parents=True)
    atomic_write(folder / "index.html", article_page)

    update_blog_index(article, slug, now)
    update_sitemap(canonical, now)

    log("Article generation completed successfully.")
    log("Article title: " + title)
    log("Article URL: " + canonical)
    log("Article word count: " + str(count_words(body)))
    log("Article SHA256: " + hashlib.sha256(
        article_page.encode("utf-8")
    ).hexdigest())


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        log("GENERATION FAILED: " + str(error))
        raise
