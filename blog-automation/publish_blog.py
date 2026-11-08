
import os
import re
import json
import html
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo

ROOT = Path.cwd()
PUBLIC = ROOT / "frontend" / "public"
BLOG = PUBLIC / "blog"
BASE_URL = "https://www.twosistersbeautysalon.co.nz"
MODEL = os.getenv("GEMINI_MODEL", "gemini-3.8-flash")
NZ = ZoneInfo("Pacific/Auckland")

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
]

SERVICES = [
    "facials", "eyebrow threading", "brow tinting", "waxing",
    "manicures", "pedicures"
]

def slugify(value):
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")[:75]

def ask_gemini(topic):
    key = os.environ["GEMINI_API_KEY"]
    url = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        + MODEL + ":generateContent?key=" + key
    )

    prompt = f"""
Write an original, useful beauty blog article for Two Sisters Beauty Salon,
a beauty salon in Christchurch, New Zealand.

Topic: {topic}

Return ONLY valid JSON with these fields:
title, description, excerpt, body_html.

Requirements:
- 800 to 1100 words.
- Friendly, clear New Zealand English.
- Helpful, natural and genuinely informative.
- Use headings, paragraphs and lists in body_html.
- Do not invent salon prices, opening hours, staff names,
  qualifications, product brands, offers or policies.
- Do not claim to diagnose or treat medical conditions.
- Do not promise treatment results or make unsupported scientific claims.
- Do not invent statistics, research findings or professional quotations.
- Avoid keyword stuffing and repetitive content.
- Mention Christchurch naturally where relevant.
- You may link to these existing service pages when relevant:
  /treatments/facials
  /treatments/threading
  /treatments/brows
  /treatments/waxing
  /treatments/manicures
  /treatments/pedicures
- Do not include scripts, forms, images or embedded content.
- Do not include a made-up customer testimonial.
"""

    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.65
        }
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    try:
        with urllib.request.urlopen(request, timeout=120) as response:
            result = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        raise RuntimeError(
            "Gemini API error: " + error.read().decode("utf-8")[:1000]
        )

    text = result["candidates"][0]["content"]["parts"][0]["text"]
    article = json.loads(text)

    for field in ("title", "description", "excerpt", "body_html"):
        if not isinstance(article.get(field), str) or not article[field].strip():
            raise ValueError("Article is missing " + field)

    return article

ALLOWED_TAGS = {
    "h2", "h3", "p", "ul", "ol", "li", "strong", "em", "blockquote", "a"
}

def clean_html(source):
    # Remove dangerous elements and attributes. Keep only simple article markup.
    source = re.sub(
        r"<(script|style|iframe|form|svg|object|embed)\b[^>]*>.*?</\1>",
        "", source, flags=re.I | re.S
    )
    source = re.sub(
        r"<(script|style|iframe|form|svg|object|embed)\b[^>]*/?>",
        "", source, flags=re.I
    )

    def replace_tag(match):
        closing, tag, attrs = match.groups()
        tag = tag.lower()
        if tag not in ALLOWED_TAGS:
            return ""
        if closing:
            return f"</{tag}>"
        if tag == "a":
            href = re.search(r"""href=["']([^"']+)["']""", attrs, re.I)
            if href:
                link = html.unescape(href.group(1)).strip()
                if link.startswith("/") or link.startswith(BASE_URL + "/"):
                    return '<a href="' + html.escape(link, quote=True) + '">'
            return "<a>"
        return "<" + tag + ">"

    source = re.sub(
        r"<(/?)([a-zA-Z0-9]+)([^>]*)>",
        lambda m: replace_tag((lambda x: x)(m)),
        source
    )
    return source

def page(title, description, content, canonical):
    return f"""<!doctype html>
<html lang="en-NZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(description, quote=True)}">
<link rel="canonical" href="{html.escape(canonical, quote=True)}">
<meta property="og:title" content="{html.escape(title, quote=True)}">
<meta property="og:description" content="{html.escape(description, quote=True)}">
<meta property="og:type" content="article">
<meta property="og:url" content="{html.escape(canonical, quote=True)}">
<style>
body{{font-family:Arial,sans-serif;line-height:1.7;color:#292929;
margin:0;background:#fff}}
header,main,footer{{max-width:820px;margin:auto;padding:22px}}
header,footer{{background:#faf7f5}}
a{{color:#754b56}}
h1,h2,h3{{line-height:1.25}}
article{{font-size:18px}}
small{{color:#666}}
</style>
</head>
<body>
<header>
<a href="/">Two Sisters Beauty Salon</a> |
<a href="/blog/">Beauty Blog</a>
</header>
<main>{content}</main>
<footer>
<p>Two Sisters Beauty Salon · Christchurch, New Zealand</p>
<p><a href="/treatments">Explore our treatments</a> |
<a href="https://bookings.gettimely.com/twosistersbeautysalon/bb/book">Book online</a></p>
</footer>
</body>
</html>"""

def main():
    if not PUBLIC.exists():
        raise RuntimeError("Could not find frontend/public. Stopping safely.")

    BLOG.mkdir(parents=True, exist_ok=True)
    index_file = BLOG / "index.html"

    existing = set()
    if index_file.exists():
        for slug in re.findall(r'href="/blog/([^"/]+)/"', index_file.read_text()):
            existing.add(slug)

    # Choose a topic based on the current NZ weekday.
    now = datetime.now(NZ)
    topic = TOPICS[now.weekday() % len(TOPICS)]

    article = ask_gemini(topic)
    title = article["title"].strip()
    description = article["description"].strip()
    excerpt = article["excerpt"].strip()
    body = clean_html(article["body_html"])

    if len(title) < 15 or len(description) < 40 or len(body) < 500:
        raise ValueError("Article did not pass basic quality checks.")

    slug = slugify(title)
    if not slug or slug in existing or (BLOG / slug).exists():
        print("Article already exists or has a duplicate slug. Skipping.")
        return

    # Require useful structure and a reasonable amount of readable text.
    text_only = re.sub(r"<[^>]+>", " ", body)
    words = re.findall(r"\b[\w'-]+\b", text_only)
    if len(words) < 500:
        raise ValueError("Article is too short after HTML checks.")

    canonical = f"{BASE_URL}/blog/{slug}/"
    article_content = f"""
<article>
<p><small>Beauty advice · {now.strftime('%d %B %Y')}</small></p>
<h1>{html.escape(title)}</h1>
<p>{html.escape(description)}</p>
{body}
<p><small>For personalised advice about a beauty treatment, speak with a suitably qualified professional.</small></p>
</article>
"""
    folder = BLOG / slug
    folder.mkdir(parents=True)
    (folder / "index.html").write_text(
        page(title, description, article_content, canonical),
        encoding="utf-8"
    )

    entries = []
    if index_file.exists():
        old = index_file.read_text(encoding="utf-8")
        matches = re.findall(
            r'<article class="post">.*?</article>', old, flags=re.S
        )
        entries.extend(matches)

    entries.insert(0, f"""
<article class="post">
<h2><a href="/blog/{slug}/">{html.escape(title)}</a></h2>
<p>{html.escape(excerpt)}</p>
<p><small>{now.strftime('%d %B %Y')}</small></p>
</article>
""")

    listing = "<h1>Beauty Blog</h1><p>Beauty tips and helpful advice from Two Sisters Beauty Salon in Christchurch.</p>" + "\n".join(entries)
    (BLOG / "index.html").write_text(
        page(
            "Beauty Blog | Two Sisters Beauty Salon Christchurch",
            "Beauty tips, skincare advice and treatment guides from Two Sisters Beauty Salon in Christchurch.",
            listing,
            BASE_URL + "/blog/"
        ),
        encoding="utf-8"
    )

    # Update the existing sitemap if it is found.
    sitemap = PUBLIC / "sitemap.xml"
    if sitemap.exists():
        tree = ET.parse(sitemap)
        root = tree.getroot()
        ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        locs = {
            node.text for node in root.findall(f".//{ns}loc")
        }
        if canonical not in locs:
            url_node = ET.SubElement(root, ns + "url")
            ET.SubElement(url_node, ns + "loc").text = canonical
            ET.SubElement(url_node, ns + "lastmod").text = now.date().isoformat()
            tree.write(sitemap, encoding="utf-8", xml_declaration=True)

    print("Published article:", canonical)

if __name__ == "__main__":
    main()
