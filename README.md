# Suad Seferi — Portfolio (GitHub Pages)

Single-page personal portfolio for Suad Seferi. Vanilla HTML/CSS/JS — no build step, no dependencies.

## Preview locally

```bash
cd site
python3 -m http.server 8080
# open http://localhost:8080
```

Or any static server (`npx serve`, `caddy file-server`, etc.).

## Deploy to GitHub Pages

### Option A — publish from `/docs` (simplest)

1. Create a new GitHub repo (e.g. `suadseferi/personal`).
2. Copy everything inside `site/` to the repo root.
3. Push to `main`.
4. GitHub → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / folder: `/` (root).
5. Your site will be at `https://suadseferi.github.io/personal/`.

### Option B — custom domain

1. In the repo: **Settings → Pages → Custom domain** — enter e.g. `suadseferi.com`.
2. Add a `CNAME` file in the root containing just the domain.
3. At your DNS provider, add either:
   - A CNAME record pointing `www` → `<user>.github.io`, OR
   - Four A records for the apex: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
4. Tick **Enforce HTTPS**.

### Option C — GitHub Action (optional)

If you prefer action-based deploys, create `.github/workflows/pages.yml`:

```yaml
name: Deploy to Pages
on:
  push: { branches: [main] }
permissions: { pages: write, id-token: write, contents: read }
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./site }
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then **Settings → Pages → Source → GitHub Actions**.

## Structure

```
site/
├── index.html          — full page
├── styles.css          — all styles (self-contained)
├── app.js              — vanilla JS: marquee, services, books, projects, events, media, readiness, nav, toast
├── robots.txt
├── sitemap.xml
├── assets/             — logo, portrait, book covers, favicon
└── fonts/              — Red Hat Display / Text / Mono (TTF)
```

## What to edit

| File | Purpose |
|---|---|
| `app.js` → `SERVICES`, `BOOKS`, `EVENTS`, `MEDIA_GROUPS`, `PROJECTS`, `MARQUEE_ITEMS` | Content arrays — edit text / links here |
| `index.html` → JSON-LD block | Structured data for Google (`sameAs`, ISBN, etc.) |
| `index.html` → `<meta>` OG/Twitter tags | Update the `og:url` / image URL once the domain is final |
| `sitemap.xml` / `robots.txt` | Update the URL when you move off the default `.github.io` domain |

## SEO checklist (shipped)

- [x] Open Graph tags
- [x] Twitter Card meta
- [x] JSON-LD Person + two Book entries
- [x] `robots.txt` + `sitemap.xml`
- [x] Favicon (ICO + SVG)
- [ ] OG image — using portrait at 1200×630 (replace with a custom card if desired)

## Caveats

- **OG URL is placeholder.** Update `og:url` and the `sitemap.xml` URL after you pick the final domain.
- **No analytics yet.** Easy to add Plausible (`<script defer data-domain="..." src="https://plausible.io/js/script.js">`) — tell me which and I'll wire it in.
- **Outlook booking deep-link** is the same as on ainow.mk. If you change calendars, update both the hero CTA and the contact button.
- **Readiness Check** is an interactive enhancement — not on the live ainow.mk bio. Say the word and I'll remove it.
