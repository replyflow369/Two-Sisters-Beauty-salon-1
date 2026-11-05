import { useEffect } from 'react';

/**
 * SEO component for dynamically setting title, meta tags, and canonical links.
 * Works seamlessly in client-side React SPA environments to provide Google
 * crawlers and users with exact, per-page metadata.
 */
export default function SEO({
  title,
  description,
  canonical,
  ogType = 'website',
}) {
  useEffect(() => {
    // 1. Update Title
    const originalTitle = document.title;
    if (title) {
      document.title = title;
    }

    // Helper to set/create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Update Standard Meta Description
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
      setMetaTag('name', 'twitter:description', description);
    }

    // 3. Update OG & Twitter Titles
    if (title) {
      setMetaTag('property', 'og:title', title);
      setMetaTag('name', 'twitter:title', title);
    }

    // 4. Update OG Type
    setMetaTag('property', 'og:type', ogType);

    // 5. Update Canonical Link
    const targetCanonical = canonical || window.location.href.split('?')[0];
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', targetCanonical);
    setMetaTag('property', 'og:url', targetCanonical);

    // Cleanup when component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [title, description, canonical, ogType]);

  return null;
}
