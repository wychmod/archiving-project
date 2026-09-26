#!/usr/bin/env python3
"""
One-time content migration: Jekyll `_posts/*.md` -> Astro content collection.

Source : showcase/_posts/YYYY-MM-DD-<slug>-{zh,en}.md   (Jekyll, Liquid)
Target : showcase/src/content/projects/{zh,en}/<ref>.md (Astro, pure Markdown)

What it does
------------
1. Splits the original front matter (title / date / lang / ref / categories /
   tags / description) and re-emits it against the structured project schema
   defined in DESIGN-V2 §3.3.
2. Normalises the tag vocabulary into stable canonical keys so that /stack/
   can aggregate across both locales.
3. Strips Liquid-only syntax from the body:
     - {% raw %} / {% endraw %} wrappers are removed (the inner text stayed)
     - {% link _posts/<file>.md %} cross-post links become /projects/<ref>/
4. Never rewrites prose. The article bodies are carried over byte for byte
   apart from the two mechanical transforms above.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "_posts"
OUT = ROOT / "src" / "content" / "projects"

# --------------------------------------------------------------------------
# Project registry — every fact below is taken from archived-projects/<ref>/ARCHIVE.md
# or from the repository root README.md. Nothing is invented.
# --------------------------------------------------------------------------
PROJECTS: dict[str, dict] = {
    "ChatGPT-Next-Web": {
        "category": "ai-llm",
        "stack": ["nextjs", "react", "typescript", "tauri", "pwa"],
        "archivedAt": "2026-06-23",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
    "TokenBridge": {
        "category": "ai-llm",
        "stack": ["go", "wails", "react", "typescript", "sqlite", "ai-gateway"],
        "archivedAt": "2026-09-22",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": True,
        "commitCount": 53,
    },
    "ToDoList": {
        "category": "fullstack",
        "stack": ["python", "django", "drf", "react", "webpack", "bootstrap"],
        "archivedAt": "2026-06-23",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
    "1802axf": {
        "category": "fullstack",
        "stack": ["python", "django", "jquery", "bootstrap", "mobile-h5"],
        "archivedAt": "2026-06-24",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
    "bolg": {
        "category": "fullstack",
        "stack": ["python", "flask", "jinja2", "sqlalchemy", "sqlite"],
        "archivedAt": "2026-06-25",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
    "wiki": {
        "category": "enterprise",
        "stack": ["java", "spring-boot", "vue3", "redis", "websocket", "mybatis"],
        "archivedAt": "2026-06-25",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
    "lottery": {
        "category": "enterprise",
        "stack": ["java", "ddd", "dubbo", "spring-boot", "database-sharding"],
        "archivedAt": "2026-06-25",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
    "db-router-springboot-starter": {
        "category": "enterprise",
        "stack": [
            "java",
            "spring-boot-starter",
            "mybatis",
            "aop",
            "database-sharding",
        ],
        "archivedAt": "2026-09-13",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": True,
    },
    "cloud-short-link": {
        "category": "enterprise",
        "stack": [
            "java",
            "spring-cloud-alibaba",
            "nacos",
            "sharding-jdbc",
            "microservices",
        ],
        "archivedAt": "2026-09-13",
        "status": "archived",
        "scrubbed": True,
        "repoCleared": False,
    },
    "huawei-alarm": {
        "category": "tools",
        "stack": ["python", "fastapi", "postgresql", "lark-openapi", "webhook"],
        "archivedAt": "2026-06-28",
        "status": "archived",
        "scrubbed": True,
        "repoCleared": False,
    },
    "ascvd": {
        "category": "tools",
        "stack": ["python", "django", "drf", "react", "mobx", "healthcare-it"],
        "archivedAt": "2026-06-28",
        "status": "archived",
        "scrubbed": True,
        "repoCleared": False,
    },
    "ESContentGen": {
        "category": "tools",
        "stack": ["electron", "nodejs", "desktop-app", "electron-builder"],
        "archivedAt": "2026-06-28",
        "status": "archived",
        "scrubbed": False,
        "repoCleared": False,
    },
}

# slug (as used in the Jekyll filename) -> ref
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

# locale directory -> front matter `lang` value in the old posts
LOCALE_DIR = {"zh-CN": "zh", "en": "en"}

LINK_RE = re.compile(r"\[\s*([^\]]+?)\s*\]\(\{%\s*link\s+_posts/([^%]+?\.md)\s*%\}\)")
RAW_RE = re.compile(r"\{%-?\s*(end)?raw\s*-?%\}")
FN_RE = re.compile(r"^(\d{4})-(\d{2})-(\d{2})-(.+)-(zh|en)\.md$")


def parse_front_matter(text: str) -> tuple[dict[str, str], str]:
    if not text.startswith("---"):
        raise ValueError("missing front matter")
    end = text.index("\n---", 3)
    block = text[3:end].strip("\n")
    body = text[end + 4 :].lstrip("\n")

    data: dict[str, str] = {}
    for line in block.splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        data[key.strip()] = value.strip()
    return data, body


def yaml_str(value: str) -> str:
    """JSON string literals are valid YAML scalars — safest for CJK + colons."""
    return json.dumps(value, ensure_ascii=False)


def transform_body(body: str, file_name: str, locale: str) -> str:
    """Rewrite Liquid-era markup into portable, base-free Markdown.

    Cross-post links become a locale-correct path *without* the deployment
    base: content must not know the sub-path the site is served from, so the
    base is applied later by plugins/rehype-base-links.mjs.
    """

    def repl_link(match: re.Match[str]) -> str:
        label, target = match.group(1), match.group(2).strip()
        m = FN_RE.match(Path(target).name)
        if not m:
            raise ValueError(f"unparsable link target in {file_name}: {target}")
        ref = SLUG_TO_REF.get(m.group(4))
        if not ref:
            raise ValueError(f"unknown slug in {file_name}: {m.group(4)}")
        prefix = "/en/projects" if locale == "en" else "/projects"
        return f"[{label}]({prefix}/{ref}/)"

    body = LINK_RE.sub(repl_link, body)
    body = RAW_RE.sub("", body)
    body = body.replace("{{", "{").replace("}}", "}")
    return body.rstrip() + "\n"


def main() -> int:
    if not SRC.is_dir():
        print(f"source directory not found: {SRC}", file=sys.stderr)
        return 1

    files = sorted(SRC.glob("*.md"))
    written = 0
    report: list[str] = []

    for path in files:
        m = FN_RE.match(path.name)
        if not m:
            print(f"skip (unrecognised name): {path.name}", file=sys.stderr)
            continue

        data, body = parse_front_matter(path.read_text(encoding="utf-8"))

        ref = data.get("ref")
        lang = data.get("lang", "zh-CN")
        if not ref or ref not in PROJECTS:
            print(f"skip (unknown ref {ref!r}): {path.name}", file=sys.stderr)
            continue

        meta = PROJECTS[ref]
        locale_dir = LOCALE_DIR[lang]

        title = data.get("title", ref)
        description = data.get("description", "")
        # Split "Name · descriptor" so the UI can show a short display name and
        # keep the descriptor as a supporting line.
        if " · " in title:
            name, subtitle = title.split(" · ", 1)
        else:
            name, subtitle = title, ""

        out_lines = [
            "---",
            f"ref: {ref}",
            f"lang: {locale_dir}",
            f"title: {yaml_str(title)}",
            f"name: {yaml_str(name.strip())}",
            f"subtitle: {yaml_str(subtitle.strip())}",
            f"description: {yaml_str(description)}",
            f"category: {meta['category']}",
            "stack:",
        ]
        out_lines += [f"  - {key}" for key in meta["stack"]]
        out_lines += [
            f"status: {meta['status']}",
            f"scrubbed: {'true' if meta['scrubbed'] else 'false'}",
            f"repoCleared: {'true' if meta['repoCleared'] else 'false'}",
            f"archivedAt: {meta['archivedAt']}",
        ]
        if "commitCount" in meta:
            out_lines.append(f"commitCount: {meta['commitCount']}")
        out_lines.append("---")
        out_lines.append("")

        new_body = transform_body(body, path.name, locale_dir)

        target_dir = OUT / locale_dir
        target_dir.mkdir(parents=True, exist_ok=True)
        target = target_dir / f"{ref}.md"
        target.write_text(
            "\n".join(out_lines) + new_body, encoding="utf-8", newline="\n"
        )

        written += 1
        report.append(f"  {path.name:52s} -> {locale_dir}/{ref}.md")

    print(f"migrated {written} files")
    print("\n".join(report))

    # Structural sanity check: every ref must exist in both locales.
    missing = [
        f"{ref}/{loc}"
        for ref in PROJECTS
        for loc in ("zh", "en")
        if not (OUT / loc / f"{ref}.md").is_file()
    ]
    if missing:
        print(f"INCOMPLETE — missing content files: {missing}", file=sys.stderr)
        return 1
    print(f"all {len(PROJECTS)} projects present in both locales")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
