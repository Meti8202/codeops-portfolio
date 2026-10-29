# Performance

## How measured

- `npm run build` then `npm run start`
- Chrome Lighthouse 13, mobile, Slow 4G throttling
- Pages: `/`, `/menu` (and a check on `/signin`)
- Note: first runs included browser extensions; ideal re-run is Incognito

## Before

| Page    | LCP | CLS | INP / TBT |
|---------|-----|-----|-----------|
| `/`     | not recorded | not recorded | not recorded |
| `/menu` | not recorded | not recorded | not recorded |

Baseline was not captured before the font/image changes.

## After (home `/`)

| Metric | Value |
|--------|--------|
| Performance score | 82 |
| Accessibility | 91 |
| Best Practices | 96 |
| SEO | 82 |
| FCP | 1.2 s |
| LCP | 1.4 s |
| CLS | 0 |
| TBT | 720 ms |
| Speed Index | 1.8 s |

## After (other pages)

| Page | Notes |
|------|--------|
| `/menu` | (paste LCP / CLS / TBT from your menu report) |
| `/signin` | (paste if you kept them; sign-in is light and not the main LCP target) |

## What changed (Day 43 work)

1. **next/font (local)** — self-hosted font, `display: "swap"` → supports **CLS = 0**.
2. **next/image + `sizes`** — cards request appropriate widths via `/_next/image?...&w=...`.
3. **`priority` once per view** — first home special + dish detail hero; menu grid stays lazy.
4. **No third-party scripts** in the app → nothing to move to `next/script`.
5. **`.env.example`** committed; `.env*.local` gitignored.

## Biggest win

CLS is **0** on home after self-hosting the font and sizing images. LCP is **1.4 s**, which is in a healthy range for a image-heavy home on throttled mobile. Remaining image-byte suggestions and missing `<title>` are follow-ups (compression / Day 44 metadata), not blockers for this exercise.