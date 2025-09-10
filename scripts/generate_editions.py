#!/usr/bin/env python3
import pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
HL=ROOT/'public'/'haranga-legacy'
TPL=HL/'editions'/'template.html'
ED=HL/'editions'
TOTAL=1000
tpl=TPL.read_text(encoding='utf-8')
for i in range(1,TOTAL+1):
    num=f"{i:04d}"
    d=ED/num; d.mkdir(parents=True, exist_ok=True)
    html=tpl.replace("{{EDITION}}",num)
    (d/'index.html').write_text(html, encoding='utf-8')
print("Generated",TOTAL)