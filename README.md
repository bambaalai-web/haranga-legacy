# merchmongolia.art — Haranga Legacy

Cloudflare Pages project (Output directory: `public`).

KV Binding (Pages → Settings → Functions → Bindings):
- Type: KV Namespace
- Variable name: `OWNERS`
- Namespace: `haranga_owners`

## Generate
```bash
python3 scripts/generate_editions.py
pip3 install "qrcode[pil]"
python3 scripts/generate_qr_codes.py
```
Edition URL example:
https://www.merchmongolia.art/haranga-legacy/editions/0001/index.html
