#!/usr/bin/env python3
import os, pathlib

try:
    import qrcode
except ImportError:
    raise SystemExit("Please install dependencies first: pip install 'qrcode[pil]'")

ROOT = pathlib.Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
QRS_DIR = PUBLIC / "assets" / "img" / "qrs"
QRS_DIR.mkdir(parents=True, exist_ok=True)

# Set your domain base here:
BASE_URL = "https://merchmongolia.art/editions/"  # include trailing slash

TOTAL = 1000  # change if needed

def main():
    for i in range(1, TOTAL+1):
        num = f"{i:04d}"
        url = f"{BASE_URL}{num}"
        img = qrcode.make(url)
        img.save(QRS_DIR / f"edition_{num}.png")
    print(f"Done. QR codes saved to {QRS_DIR}")

if __name__ == "__main__":
    main()
