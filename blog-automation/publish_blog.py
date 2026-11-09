
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

SERVICE_LINKS = {
    "facials": "/treatments/facials",
    "threading": "/treatments/threading",
    "brows": "/treatments/brows",
    "waxing": "/treatments/waxing",
    "manicures": "/treatments/manicures",
    "pedicures": "/treatments/pedicures",
}

ALLOWED_TAGS = {
    "h2", "h3", "p", "ul", "ol", "li",
    "strong", "em", "blockquote", "a", "br"
}

BLOCKED_TAGS = {
    "script", "style", "iframe", "form",
    "svg", "object", "embed", "video",
    "audio", "textarea"
}

SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"


# ============================================================
# GENERAL HELPERS
# ============================================================

def log(message):
    print("[BLOG]", message, flush=True)



def slugify(value):
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = value.strip("-")

    # Keep complete words and limit URL length.
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

    temporary = path.with_suffix(path.suffix + ".tmp")

    temporary.write_text(content, encoding="utf-8")

    temporary.replace(path)


def existing_slugs():
    if not BLOG.exists():
        return set()

    return {
        item.name
        for item in BLOG.iterdir()
        if item.is_dir()
    }


# ============================================================
# GEMINI API
# ============================================================

def build_prompt(topic):

    return f"""
Write an original, helpful beauty blog article for
Two Sisters Beauty Salon in Christchurch, New Zealand.

ARTICLE TOPIC:
{topic}

Return ONLY valid JSON with these fields:

title
description
excerpt
body_html

ARTICLE REQUIREMENTS:

- Write approximately 800 to 1000 words.
- Use friendly, professional New Zealand English.
- Make the article useful, informative and easy to read.
- Start with an engaging introduction.
- Use descriptive headings.
- Include practical advice readers can follow.
- Mention Christchurch naturally where relevant.
- Avoid keyword stuffing.
- Avoid repetitive paragraphs.
- Write for real people, not search engines.

ACCURACY AND SAFETY:

- Never invent salon experience or customer stories.
- Never invent qualifications or professional endorsements.
- Never invent staff names.
- Never invent salon prices or opening hours.
- Never claim the salon uses or recommends a product
  unless that information has been supplied.
- Do not diagnose or treat medical conditions.
- Do not promise treatment results.
- Do not invent scientific studies or statistics.
- Do not invent celebrity or professional quotations.
- Do not make unsupported medical or skincare claims.
- Use cautious language when discussing skin concerns.
- Do not present general advice as a professional diagnosis.

EXISTING SALON LINKS:

Use relevant links naturally where appropriate:

/treatments/facials
/treatments/threading
/treatments/brows
/treatments/waxing
/treatments/manicures
/treatments/pedicures

WRITING STYLE:

- Use natural, conversational language.
- Avoid exaggerated marketing claims.
- Avoid unnatural keyword repetition.
- Do not write fake testimonials.
- Do not pretend to have personally treated customers.
- Do not claim to speak on behalf of salon staff.

HTML RULES:

Use only:

h2, h3, p, ul, ol, li, strong, em, blockquote, a, br

Do not include:

- JavaScript
- CSS
- Forms
- Images
- Embedded content
- Scripts
- External tracking links

Return valid JSON only.
Do not include Markdown code fences.
"""


def ask_gemini(topic):

    key = os.getenv("GEMINI_API_KEY")

    if not key:
        raise RuntimeError(
            "GEMINI_API_KEY is missing from GitHub Secrets."
        )

    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        + MODEL
        + ":generateContent?key="
        + key
    )

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": build_prompt(topic)
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.55
        }
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json"
        },
        method="POST"
    )

    retry_codes = {429, 500, 502, 503, 504}

    for attempt in range(MAX_RETRIES):

        try:

            log(
                f"Requesting article from Gemini "
                f"(attempt {attempt + 1}/{MAX_RETRIES})"
            )

            with urllib.request.urlopen(
                request,
                timeout=120
            ) as response:

                result = json.loads(
                    response.read().decode("utf-8")
                )

            break

        except urllib.error.HTTPError as error:

            code = error.code

            # Never print the request URL because it contains
            # the API key.

            error_body = error.read().decode(
                "utf-8", errors="replace"
            )

            if code in retry_codes and attempt < MAX_RETRIES - 1:

                delay = 5 * (2 ** attempt)

                log(
                    f"Gemini returned HTTP {code}. "
                    f"Retrying in {delay} seconds."
                )

                time.sleep(delay)
                continue

            raise RuntimeError(
                f"Gemini API returned HTTP {code}: "
                + error_body[:1000]
            )

        except (urllib.error.URLError, TimeoutError) as error:

            if attempt < MAX_RETRIES - 1:

                delay = 5 * (2 ** attempt)

                log(
                    f"Temporary connection problem. "
                    f"Retrying in {delay} seconds."
                )

                time.sleep(delay)
                continue

            raise RuntimeError(
                "Gemini connection failed after retries: "
                + str(error)
            )

    else:
        raise RuntimeError("Gemini request failed.")

    candidates = result.get("candidates", [])

    if not candidates:
        raise RuntimeError(
            "Gemini returned no article candidate."
        )

    candidate = candidates[0]

    if candidate.get("finishReason") == "SAFETY":
        raise RuntimeError(
            "Gemini blocked the generated article."
        )

    parts = candidate.get("content", {}).get("parts", [])

    text = "".join(
        part.get("text", "")
        for part in parts
    ).strip()

    if not text:
        raise RuntimeError(
            "Gemini returned an empty article."
        )

    try:
        article = json.loads(text)

    except json.JSONDecodeError as error:

        raise RuntimeError(
            "Gemini returned invalid JSON: " + str(error)
        )

    required = [
        "title",
        "description",
        "excerpt",
        "body_html"
    ]

    for field in required:

        if not isinstance(article.get(field), str):
            raise ValueError(
                "Missing or invalid article field: " + field
            )

        if not article[field].strip():
            raise ValueError(
                "Empty article field: " + field
            )

    return article


# ============================================================
# HTML SANITISATION
# ============================================================

class ArticleSanitizer(HTMLParser):

    def __init__(self):

        super().__init__(convert_charrefs=True)

        self.output = []
        self.blocked_depth = 0

    def handle_starttag(self, tag, attrs):

        tag = tag.lower()

        if tag in BLOCKED_TAGS:

            self.blocked_depth += 1
            return

        if self.blocked_depth:
            return

        if tag not in ALLOWED_TAGS:
            return

        if tag == "a":

            attributes = dict(attrs)
            href = attributes.get("href", "")

            safe_link = False

            if (
                href.startswith("/")
                and not href.startswith("//")
                and "\\" not in href
                and ".." not in href
            ):
                safe_link = True

            if (
                href.startswith(BASE_URL + "/")
                and "\\" not in href
                and ".." not in href
            ):
                safe_link = True

            if safe_link:

                self.output.append(
                    '<a href="' +
                    html.escape(href, quote=True) +
                    '">'
                )

            else:
                self.output.append("<a>")

            return

        if tag == "br":
            self.output.append("<br>")
        else:
            self.output.append("<" + tag + ">")

    def handle_endtag(self, tag):

        tag = tag.lower()

        if tag in BLOCKED_TAGS:

            if self.blocked_depth:
                self.blocked_depth -= 1

            return

        if self.blocked_depth:
            return

        if tag in ALLOWED_TAGS and tag != "br":

            self.output.append("</" + tag + ">")

    def handle_data(self, data):

        if not self.blocked_depth:
            self.output.append(html.escape(data))

    def get_html(self):

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
        raise ValueError(
            "Article title is outside the allowed length."
        )

    if len(description) < 60 or len(description) > 170:
        raise ValueError(
            "SEO description is outside the allowed length."
        )

    if len(excerpt) < 30 or len(excerpt) > 350:
        raise ValueError(
            "Article excerpt is outside the allowed length."
        )

    word_count = count_words(body)

    if word_count < MIN_WORDS:
        raise ValueError(
            f"Article too short: {word_count} words."
        )

    if word_count > MAX_WORDS:
        raise ValueError(
            f"Article too long: {word_count} words."
        )

    if "<h2>" not in body:
        raise ValueError(
            "Article is missing section headings."
        )

    if "<p>" not in body:
        raise ValueError(
            "Article is missing paragraphs."
        )

    if re.search(
        r"\b(?:lorem ipsum|TODO|insert text here)\b",
        body,
        flags=re.I
    ):
        raise ValueError(
            "Article contains placeholder text."
        )

    log(
        f"Basic article checks passed: {word_count} words."
    )


# ============================================================
# HTML PAGE GENERATION
# ============================================================

def page(title, description, content, canonical):

    safe_title = html.escape(title)
    safe_description = html.escape(
        description,
        quote=True
    )
    safe_canonical = html.escape(
        canonical,
        quote=True
    )

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

a {{
    color: #754b56;
}}

h1, h2, h3 {{
    line-height: 1.25;
}}

article {{
    font-size: 18px;
}}

small {{
    color: #666666;
}}
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
<a href="https://bookings.gettimely.com/twosistersbeautysalon/bb/book">
Book online
</a>
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

    title = html.escape(article["title"])
    excerpt = html.escape(article["excerpt"])

    new_entry = f"""
<article class="post">

<h2>
<a href="/blog/{slug}/">{title}</a>
</h2>

<p>{excerpt}</p>

<p>
<small>{date.strftime('%d %B %Y')}</small>
</p>

</article>
"""

    entries.insert(0, new_entry)

    # Keep the listing manageable.

    entries = entries[:100]

    listing = """
<h1>Beauty Blog</h1>

<p>
Beauty tips, skincare advice and treatment guides
from Two Sisters Beauty Salon in Christchurch.
</p>
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

        log(
            "No sitemap.xml found. Skipping sitemap update."
        )

        return

    tree = ET.parse(sitemap)

    root = tree.getroot()

    url_tag = "{" + SITEMAP_NS + "}url"
    loc_tag = "{" + SITEMAP_NS + "}loc"
    lastmod_tag = "{" + SITEMAP_NS + "}lastmod"

    existing = {
        node.text
        for node in root.findall(".//" + loc_tag)
    }

    if canonical in existing:
        return

    url_node = ET.SubElement(root, url_tag)

    ET.SubElement(
        url_node,
        loc_tag
    ).text = canonical

    ET.SubElement(
        url_node,
        lastmod_tag
    ).text = date.date().isoformat()

    tree.write(
        sitemap,
        encoding="utf-8",
        xml_declaration=True
    )

    log("Sitemap updated.")


# ============================================================
# MAIN GENERATION PROCESS
# ============================================================

def main():

    log("Starting Two Sisters Beauty Salon blog generator.")

    if not PUBLIC.exists():

        raise RuntimeError(
            "frontend/public folder was not found."
        )

    BLOG.mkdir(parents=True, exist_ok=True)

    now = datetime.now(NZ)

    slugs = existing_slugs()

    if len(slugs) >= len(TOPICS):

        topic_index = (
            len(slugs) % len(TOPICS)
        )

    else:

        topic_index = (
            now.timetuple().tm_yday % len(TOPICS)
        )

    topic = TOPICS[topic_index]

    log("Selected topic: " + topic)

    article = ask_gemini(topic)

    title = article["title"].strip()
    description = article["description"].strip()
    excerpt = article["excerpt"].strip()

    body = clean_html(article["body_html"])

    validate_article(article, body)

    slug = slugify(title)

    if not slug:

        raise ValueError(
            "Could not create a valid article URL."
        )

    if slug in slugs:

        raise ValueError(
            "Duplicate article URL detected: " + slug
        )

    folder = BLOG / slug

    if folder.exists():

        raise ValueError(
            "Article folder already exists: " + slug
        )

    canonical = BASE_URL + "/blog/" + slug + "/"

    article_content = f"""
<article>

<p>
<small>
Beauty advice · {now.strftime('%d %B %Y')}
</small>
</p>

<h1>{html.escape(title)}</h1>

<p>{html.escape(description)}</p>

{body}

<p>
<small>
For individual skincare concerns, seek advice from
an appropriately qualified health professional.
</small>
</p>

</article>
"""

    article_page = page(
        title,
        description,
        article_content,
        canonical
    )

    # Write the article only after validation.

    folder.mkdir(parents=True)

    atomic_write(
        folder / "index.html",
        article_page
    )

    update_blog_index(
        article,
        slug,
        now
    )

    update_sitemap(
        canonical,
        now
    )

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
