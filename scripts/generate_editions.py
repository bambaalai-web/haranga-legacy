#!/usr/bin/env python3
import os, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
TEMPLATE = PUBLIC / "editions" / "template.html"
EDITIONS_DIR = PUBLIC / "editions"

TOTAL = 1000  # change if needed

def main():
    tpl = TEMPLATE.read_text(encoding="utf-8")
    for i in range(1, TOTAL+1):
        num = f"{i:04d}"
        d = EDITIONS_DIR / num
        d.mkdir(parents=True, exist_ok=True)
        html = tpl.replace("{{EDITION}}", num)
        (d / "index.html").write_text(html, encoding="utf-8")
    print(f"Done. Generated {TOTAL} editions under {EDITIONS_DIR}/0001..{TOTAL:04d}/index.html")

if __name__ == "__main__":
    main()
