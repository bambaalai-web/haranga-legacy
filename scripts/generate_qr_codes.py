#!/usr/bin/env python3
import pathlib
try:
    import qrcode
except ImportError:
    raise SystemExit("Run:  pip install 'qrcode[pil]'")

ROOT = pathlib.Path(__file__).resolve().parents[1]
QRS_DIR = ROOT / "public" / "haranga-legacy" / "assets" / "img" / "qrs"
QRS_DIR.mkdir(parents=True, exist_ok=True)

# Хэрвээ 'www' чинь хараахан ажиллаагүй бол ингэж (www-гүй) тавиарай:
BASE_URL = "https://merchmongolia.art/haranga-legacy/editions/"
# Хэрвээ www-гаа идэвхжүүлсэн бол:
# BASE_URL = "https://www.merchmongolia.art/haranga-legacy/editions/"

TOTAL = 1000

def main():
    for i in range(1, TOTAL+1):
        num = f"{i:04d}"
        url = f"{BASE_URL}{num}/index.html"   # ← ЗААВАЛ index.html орно
        img = qrcode.make(url)
        img.save(QRS_DIR / f"edition_{num}.png")
    print(f"QRs saved to {QRS_DIR}")

if __name__ == "__main__":
    main()
