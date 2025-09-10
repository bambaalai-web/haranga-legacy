#!/usr/bin/env python3
import pathlib
try:
    import qrcode
except ImportError:
    raise SystemExit("Run:  pip install 'qrcode[pil]'")
ROOT=pathlib.Path(__file__).resolve().parents[1]
QRS=ROOT/'public'/'haranga-legacy'/'assets'/'img'/'qrs'
QRS.mkdir(parents=True,exist_ok=True)
BASE="https://www.merchmongolia.art/haranga-legacy/editions/"  # trailing slash
TOTAL=1000
for i in range(1,TOTAL+1):
    num=f"{i:04d}"
    url=f"{BASE}{num}/index.html"
    img=qrcode.make(url)
    img.save(QRS/f"edition_{num}.png")
print("QRs saved to", QRS)