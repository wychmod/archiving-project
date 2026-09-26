#!/usr/bin/env python3
"""
Generate the legacy-URL redirect table for the Astro rebuild.

The old site was Jekyll + jekyll-theme-chirpy. Its published URL surface was:

    /posts/:title/          permalink for every post  (defaults.permalink)
    /categories/:name/      jekyll-archives, name slugified
    /tags/:name/            jekyll-archives, name slugified
    /archives/              _tabs/archives.md, permalink /:title/
    /categories/  /tags/    the two index tabs
    /page2/  /page3/        jekyll-paginate with paginate: 10
    /about/                 unchanged in the rebuild — no redirect needed
    /sitemap.xml  /feed.xml jekyll-sitemap / chirpy atom feed

The authoritative sources are:
  * `_posts/*.md`  — the complete post set (24 files, incl. TokenBridge added
                     2026-09-22 after the last Jekyll build).
  * `_site/`       — the last Jekyll build. Used here only to *verify* that our
                     reimplementation of Jekyll's slugify reproduces every URL
                     the old site actually published.

Output: `redirects.mjs`, next to the Astro config. Run once; the result is
frozen because the retired URLs never change again.

Usage:  python scripts/gen-redirects.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_posts"
BUILT = ROOT / "_site"
OUT = ROOT / "redirects.mjs"

FN_RE = re.compile(r"^(\d{4})-(\d{2})-(\d{2})-(.+)-(zh|en)\.md$")
CAT_RE = re.compile(r"^categories:\s*\[(.*)\]\s*$")
TAG_RE = re.compile(r"^tags:\s*\[(.*)\]\s*$")

SLUG_TO_REF = {
    "chatgpt-next-web": "ChatGPT-Next-Web",
    "tokenbridge": "TokenBridge",
    "todolist": "ToDoList",
    "1802axf": "1802axf",
    "bolg": "bolg",
    "wiki": "wiki",
    "lottery": "lottery",
    "db-router-springboot-starter": "db-router-springboot-starter",
    "cloud-short-link": "cloud-short-link",
    "huawei-alarm": "huawei-alarm",
    "ascvd": "ascvd",
    "escontentgen": "ESContentGen",
}

# Legacy category name -> canonical category key in the new taxonomy.
LEGACY_CATEGORY = {
    "企业级 / 中台架构": "enterprise",
    "Enterprise Architecture": "enterprise",
    "AI / LLM": "ai-llm",
    "AI / LLM 应用": "ai-llm",
    "全栈练手": "fullstack",
    "Full-stack Practice": "fullstack",
    "工具 / 垂直领域系统": "tools",
    "Tools & Verticals": "tools",
}

PAGINATE = 10


def slugify(name: str) -> str:
    """Reproduce Jekyll's default slugify mode.

    Ruby's `[[:alnum:]]` is Unicode-aware, so CJK survives; every run of
    non-alphanumeric characters collapses to a single hyphen.
    """
    return re.sub(r"[^\w]+", "-", name.lower(), flags=re.UNICODE).strip("-")


def split_list(raw: str) -> list[str]:
    return [p.strip() for p in raw.split(",") if p.strip()]


def verify_slugify(built: Path, expected: set[str]) -> list[str]:
    """Every directory the old build published must be reproducible."""
    if not built.is_dir():
        print("note: _site/ absent — skipping slugify verification", flush=True)
        return []
    actual = {p.name for p in built.iterdir() if p.is_dir()}
    # Directories the old build has that we do not model are fine (e.g.
    # categories whose posts no longer exist); the reverse is a real bug.
    missing = expected - actual
    extra = actual - expected
    problems = []
    if extra:
        problems.append(f"  published but not reproduced: {sorted(extra)}")
    if missing:
        # Only informational: _site predates TokenBridge, so new slugs may be
        # legitimately absent from the old build.
        print(
            f"note: {len(missing)} slug(s) not in the old build "
            f"(expected for post-dated content): {sorted(missing)}",
            flush=True,
        )
    return problems


def main() -> int:
    if not SRC.is_dir():
        print(
            f"error: {SRC} not found.\n"
            "  This generator derives the redirect table from the legacy Jekyll\n"
            "  posts, which are removed once the Astro rebuild is cut over. The\n"
            "  table itself is frozen in redirects.mjs and no longer needs\n"
            "  regenerating — the retired URLs never change. This script is kept\n"
            "  as the record of how that table was derived, and only runs while\n"
            "  the legacy tree is still on disk.",
            file=sys.stderr,
        )
        return 1

    redirects: dict[str, str] = {}
    categories: set[str] = set()
    tags: set[str] = set()
    post_count = 0
    unknown: list[str] = []

    for path in sorted(SRC.glob("*.md")):
        m = FN_RE.match(path.name)
        if not m:
            continue
        slug, locale = m.group(4), m.group(5)
        ref = SLUG_TO_REF.get(slug)
        if not ref:
            unknown.append(f"{path.name} (slug {slug!r})")
            continue

        # 1. post permalink -> project detail page
        redirects[f"/posts/{slug}-{locale}/"] = (
            f"/en/projects/{ref}/" if locale == "en" else f"/projects/{ref}/"
        )
        post_count += 1

        # 2. harvest taxonomy for the aggregate redirects
        head = path.read_text(encoding="utf-8").split("\n---", 1)[0]
        for line in head.splitlines():
            line = line.strip()
            cat = CAT_RE.match(line)
            if cat:
                categories.update(split_list(cat.group(1)))
            tag = TAG_RE.match(line)
            if tag:
                tags.update(split_list(tag.group(1)))

    if unknown:
        print("error: unmapped post slug(s):", flush=True)
        for u in unknown:
            print(f"  {u}", flush=True)
        return 1

    # 3. category archives -> filtered project index (default locale)
    for name in sorted(categories):
        key = LEGACY_CATEGORY.get(name)
        target = f"/projects/?category={key}" if key else "/projects/"
        if not key:
            print(f"warn: unmapped category {name!r} -> /projects/", flush=True)
        redirects[f"/categories/{slugify(name)}/"] = target
    redirects["/categories/"] = "/projects/"

    # 4. tag archives -> technology overview
    for name in sorted(tags):
        redirects[f"/tags/{slugify(name)}/"] = "/stack/"
    redirects["/tags/"] = "/stack/"

    # 5. the archives tab became the timeline
    redirects["/archives/"] = "/timeline/"

    # 6. jekyll-paginate /pageN/ (note: no slash, unlike /page/:num/)
    pages = (post_count + PAGINATE - 1) // PAGINATE
    for n in range(2, pages + 1):
        redirects[f"/page{n}/"] = "/projects/"

    # 7. jekyll-sitemap -> @astrojs/sitemap
    redirects["/sitemap.xml"] = "/sitemap-index.xml"

    # --- verification -------------------------------------------------------
    problems: list[str] = []
    for kind, names, prefix in (
        ("categories", categories, "/categories/"),
        ("tags", tags, "/tags/"),
    ):
        expected = {slugify(n) for n in names}
        problems += verify_slugify(BUILT / kind, expected)
        if not problems:
            print(f"verified: {kind} slugify matches the old build", flush=True)
    if problems:
        print("error: slugify mismatch against _site/:", flush=True)
        for p in problems:
            print(p, flush=True)
        return 1

    # --- emit ---------------------------------------------------------------
    lines = [
        "/**",
        " * Legacy URL redirect table — GENERATED, do not edit by hand.",
        " *",
        " * The previous site was Jekyll + jekyll-theme-chirpy. The rebuild moved",
        " * posts to /projects/<ref>/ and collapsed the blog-era index pages into",
        " * the project index. Every URL the old site published is listed here so",
        " * that no inbound link 404s after the cutover.",
        " *",
        f" * {post_count} posts · {len(categories)} category archives · "
        f"{len(tags)} tag archives · {pages} paginated pages",
        " * Regenerate with: python scripts/gen-redirects.py",
        " */",
        "export const REDIRECTS = {",
    ]
    for src, dst in sorted(redirects.items()):
        lines.append(f"  {src!r}: {dst!r},")
    lines += ["};", ""]

    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)} — {len(redirects)} redirects", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
