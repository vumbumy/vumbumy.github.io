#!/usr/bin/env python3
"""Render reviewed, bilingual concept diagrams without external image services.

Edit article-diagrams.json to change labels. Labels summarize published text;
the footer preserves the difference between plans and verified outcomes.
"""
from html import escape
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/images/articles"


def text(x, y, value, size=26, color="#24384a", weight=400):
    return (
        f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" '
        f'font-weight="{weight}">{escape(value)}</text>'
    )


def render(item):
    title = item["title"]
    desc = "; ".join(f"{a}: {b}" for a, b in item["cards"])
    label = "본문 한눈에 보기" if item["lang"] == "ko" else "AT A GLANCE"
    parts = [
        '<svg xmlns="http://www.w3.org/2000/svg" width="760" height="700" '
        'viewBox="0 0 760 700" role="img" aria-labelledby="title description">',
        f'<title id="title">{escape(title)}</title>',
        f'<desc id="description">{escape(desc + ". " + item["foot"])}</desc>',
        '<defs><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">'
        '<circle cx="1" cy="1" r="1" fill="#cfd9de"/></pattern></defs>',
        '<rect width="760" height="700" rx="24" fill="#f4f7f8"/>',
        '<rect width="760" height="700" rx="24" fill="url(#dots)" opacity=".45"/>',
        '<g font-family="Noto Sans CJK KR,Apple SD Gothic Neo,Malgun Gothic,Arial,sans-serif">',
        '<rect x="40" y="40" width="5" height="26" rx="2" fill="#267c82"/>',
        text(58, 60, label, 18, "#426b70", 700),
        text(40, 110, title, 25 if item["lang"] == "en" else 30, weight=700),
    ]
    for index, (heading, detail) in enumerate(item["cards"]):
        y = 148 + 145 * index
        if index and item.get("layout", "flow") == "flow":
            parts += [
                f'<path d="M380 {y-27}v18m-6-6 6 6 6-6" fill="none" '
                'stroke="#93a9b0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
            ]
        parts += [
            f'<rect x="40" y="{y}" width="680" height="118" rx="16" fill="#fff" stroke="#d6e0e4"/>',
            f'<rect x="62" y="{y+27}" width="48" height="48" rx="15" fill="#e5f1f0"/>',
            text(73, y + 59, f"{index+1:02}", 23, "#216f75", 700),
            text(132, y + 46, heading, 29, weight=700),
            text(132, y + 85, detail, 23, "#536874"),
        ]
    # The state note is visible in the image as well as in the HTML caption.
    parts += [
        '<path d="M40 598h680" stroke="#d1dce1"/>',
        text(40, 634, item["foot"], 19 if len(item["foot"]) < 62 else 17, "#536874"),
        text(40, 672, "HANBEOM  /  WORK NOTES", 13, "#6b8089", 600),
        '</g></svg>',
    ]
    return "\n".join(parts) + "\n"


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    items = json.loads((ROOT / "scripts/article-diagrams.json").read_text())
    for item in items:
        (OUTPUT / f'{item["id"]}.{item["lang"]}.svg').write_text(render(item))
    print(f"Generated {len(items)} article diagrams")


if __name__ == "__main__":
    main()
