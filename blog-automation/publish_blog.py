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
