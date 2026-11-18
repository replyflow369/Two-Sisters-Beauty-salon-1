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
    "How to choose a gentle cleanser for your skin",
    "What to know about moisturising your skin every day",
    "Simple ways to care for sensitive-feeling skin",
    "How to make your skincare routine easier to follow",
    "What to consider before booking an eyebrow treatment",
    "How to keep brows looking neat between appointments",
    "A simple guide to choosing a nail shape",
    "How to care for your hands during colder weather",
    "What to know about looking after your feet at home",
    "How to prepare for a relaxing beauty appointment",
    "Everyday habits that can help your skin feel comfortable",
    "How to look after your brows after grooming",
    "A beginner's guide to facial aftercare",
    "How to create a simple evening skincare routine",
    "What to consider when choosing a facial treatment",
    "Simple self-care ideas for busy weeks",
    "How to keep your beauty routine practical and consistent",
    "What to know about professional waxing appointments",
    "How to care for your nails between salon visits",
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
