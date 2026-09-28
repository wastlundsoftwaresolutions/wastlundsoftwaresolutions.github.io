#!/usr/bin/env python3
"""Fail when a required page is missing or a local link points at nothing."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]

REQUIRED = (
    "index.html",
    "styles.css",
    "script.js",
    "privacy-policy/operation-vitality.html",
    "privacy-policy/starfish-trivia.html",
    "support/operation-vitality.html",
    "support/starfish-trivia.html",
    "images/operation-vitality-icon.png",
    "images/starfish-trivia-icon.png",
    "googlef400cb02eede5b06.html",
)

ATTR = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.IGNORECASE)
SKIP_PREFIXES = ("#", "mailto:", "http://", "https://", "data:", "tel:")


def local_target(page: Path, url: str) -> Path | None:
    if url.startswith(SKIP_PREFIXES):
        return None
    path = url.split("#", 1)[0].split("?", 1)[0]
    if not path:
        return None
    return (page.parent / path).resolve()


def main() -> int:
    errors: list[str] = []
    for relative in REQUIRED:
        if not (ROOT / relative).is_file():
            errors.append(f"missing {relative}")

    verification = ROOT / "googlef400cb02eede5b06.html"
    if verification.is_file() and "google-site-verification" not in verification.read_text(encoding="utf-8"):
        errors.append("googlef400cb02eede5b06.html lost its verification token")

    for page in ROOT.rglob("*.html"):
        if ".git" in page.parts or ".github" in page.parts:
            continue
        text = page.read_text(encoding="utf-8")
        relative = page.relative_to(ROOT)
        if page.name != "googlef400cb02eede5b06.html":
            lowered = text.lower()
            if "<html" not in lowered or "</html>" not in lowered:
                errors.append(f"{relative} is not a complete html document")
        for match in ATTR.finditer(text):
            target = local_target(page, match.group(1).strip())
            if target is None:
                continue
            try:
                target.relative_to(ROOT)
            except ValueError:
                errors.append(f"{relative} links outside the site: {match.group(1)}")
                continue
            if not target.is_file():
                errors.append(f"{relative} missing local target: {match.group(1)}")

    if errors:
        print("\n".join(errors))
        return 1
    print("site check passed")
    return 0


if __name__ == "__main__":
    sys.exit(main())
