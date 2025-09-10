# merchmongolia.art — Starter

This repository is a **ready-to-upload** starter for GitHub → Cloudflare Pages.
It gives you a static site structure for **Haranga Legacy 1/1000 editions** and two Python scripts:

- `scripts/generate_editions.py` — generates `/public/editions/0001..1000/index.html`
- `scripts/generate_qr_codes.py` — generates PNG QR codes for each edition pointing to your domain

> Upload the **public/** folder to your GitHub repo root (or connect the whole repo in Cloudflare Pages and set Output directory to `public`).

---

## Quick Start

1) Put your audio file at: `public/assets/audio/track.mp3`
2) (Optional) Put hero image at: `public/assets/img/hero.jpg`
3) Generate 1000 edition pages:

```bash
python3 scripts/generate_editions.py
```

4) Generate 1000 QR codes (edit `BASE_URL` in the script if your domain is different):

```bash
pip3 install qrcode[pil]
python3 scripts/generate_qr_codes.py
```

- QR PNGs will be in `public/assets/img/qrs/`

5) Commit & push to GitHub; connect in **Cloudflare Pages** with:
   - Build command: *(none)*
   - Output directory: `public`

6) Add your custom domain `merchmongolia.art` to the Pages project and you're live.

---

## Structure

```
public/
  index.html
  /assets
    /css/styles.css
    /audio/track.mp3         (place your MP3 here)
    /img/hero.jpg            (optional)
    /img/qrs/*.png           (auto-generated)
  /editions
    template.html            (used by generator)
    sample-0001/index.html   (example page)
scripts/
  generate_editions.py
  generate_qr_codes.py
README.md
```

---

## Notes

- The edition page is static. If you later want **owner claiming** (first-scan capture), add a small serverless backend (e.g., Cloudflare Workers + D1 or Supabase). For now, the page shows the edition number and an audio player.
- If you want **dynamic QR** (redirect layer), encode QR as `https://merchmongolia.art/q/0001` and implement redirect rules in Cloudflare. For maximum longevity, static direct URLs are simplest.
- For archival, submit your site roots to Wayback Machine after going live.

*Generated: 2025-09-10*
