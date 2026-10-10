# MiniToolbox Handoff

## Seven-day organic growth execution — 2026-10-10

- Search-intent audit completed:
  - Anmeldung, Schengen 90/180, and Visa Run FAQ/schema already contain core localized query terms; no duplicate sections added.
  - English Invoice FAQ now targets “free invoice generator”, “no signup”, “A4 PDF”, and print-only invoice output.
  - English EXIF FAQ now targets GPS/EXIF removal and local processing.
  - English PureQR FAQ now targets free static QR, no expiration, and no redirect.
- Changed-app builds passed:
  - `@zero-effort/invoice-maker`
  - `@zero-effort/exif-scrubber`
  - `@zero-effort/qr-studio`
- SEO runtime fix:
  - Removed `ssr=false` from PDF, Media, Size Converter, and Caro layouts.
  - Local static builds now emit title, canonical, JSON-LD, and no `noindex` in raw HTML.
- Existing exploratory `scripts/*.js` remain untracked and must not be staged.
- Organic distribution status:
  - Reddit `r/SideProject` post is live: https://www.reddit.com/r/SideProject/comments/1wx7ptt/i_built_minitoolbox_8_free_privacyfirst_web/
  - Product Hunt launch remains a draft; publishing requires selecting launch timing.
  - Hacker News submission was blocked by account/site anti-spam eligibility.
  - No CAPTCHA or moderation control was bypassed.

### Measurement status

- GA4 property: `G-0PT14QDEK4`.
- Existing completion calls verified in QR, Invoice, and EXIF source.
- Non-blocked browser loaded real `gtag.js`; diagnostic completion calls entered `dataLayer`.
- GA4 Admin currently lists only automatic events (`first_visit`, `page_view`, `scroll`, `session_start`, `user_engagement`). No completion event has appeared yet, so key-event marking is still pending; uBlock blocked the Brave test context.
- Observed baseline: last 7 days 226 active users, 229 sessions, 251 views, 825 events; all sessions reported as Direct. Recent Search Console data was delayed and showed 1 impression / 0 clicks / average position 7.

### Indexing feedback

- Google URL Inspection previously confirmed QR, Invoice, and EXIF homepages as indexed.
- Individual sitemap submissions succeeded for those three apps.
- Naver ownership, sitemap submission, and homepage crawl request are complete for all 11 registered app domains; public exposure reports still require processing time.
- IndexNow returned HTTP 200 from both endpoints; this is submission receipt, not indexing proof.
- Commit `291f9c4` was pushed to `origin/main`. Vercel deployment records currently show success for `zero-effort-media`, `zero-effort-caro`, `zero-effort-visarun`, `zero-effort-rirekisho`, and `zero-effort-anmeldung`; remaining project hooks have not yet produced a deployment record and need Vercel dashboard/API follow-up.

## Current state

- Repository: `/mnt/data/projects/zero-effort`
- Branch: `main`
- Latest project commit: `624f894 feat(seo): add Naver verification files for all apps`
- Latest commit pushed to `origin/main`
- Existing exploratory `scripts/*.js` files remain untracked. Do not stage them.

## Completed

### Vercel

- Fixed duplicate legacy project settings:
  - `zero-effort-qr` → root `apps/qr-studio`, output `build`
  - `pdf-tools` → root `apps/pdf-tools`, output `build`
- Actual custom-domain projects were already correctly configured:
  - QR → `zero-effort-qr-studio`
  - PDF → `zero-effort-pdf`
- Do not blindly redeploy legacy `build` project; its purpose is unknown.

### Google Search

- Main sitemap submitted and processed successfully.
- Individual sitemaps submitted:
  - `https://qr.minitoolbox.dev/sitemap.xml`
  - `https://invoice.minitoolbox.dev/sitemap.xml`
  - `https://exif.minitoolbox.dev/sitemap.xml`
- Latest observed status: all three individual sitemaps successful, one page discovered each.
- URL Inspection reported all three new app URLs as:
  - `URL이 Google에 등록되어 있음`
  - `페이지 색인이 생성됨`
- Search Console page report may lag and previously showed 0 indexed pages. Trust fresh URL Inspection over stale aggregate report.
- Earlier 24-hour Search Console report showed 1 impression, 0 clicks, average position 7; report had a data delay.

### Naver

- Main property `https://minitoolbox.dev/` is registered.
- Main property sitemap is registered.
- Naver had required unique ownership verification per subdomain.
- Added unique verification files for all 11 individual apps. Commit `624f894`.
- Live check confirmed `11/11` verification files return HTTP 200 with expected contents.
- Individual app domains:
  - `pdf`, `media`, `size`, `schengen`, `anmeldung`, `rirekisho`
  - `visarun`, `qr`, `invoice`, `exif`, `caro`
- Naver public search previously showed hub only; individual app indexing was not yet visible.
- Naver Search Advisor ownership verification is complete for all 11 individual apps.
- Individual sitemap submission and homepage crawl request are complete for all 11 apps.

### Bing / IndexNow

- `scripts/submit_indexnow.py` submitted URLs to both IndexNow endpoints.
- Both returned HTTP 200. This confirms submission receipt, not indexing completion.
- Bing public search was blocked by CAPTCHA during one check.

### Shared skill

Added shared harness skill and routing:

- `/mnt/data/projects/lges-harness-collection/.cursor/skills/web-service-seo-launch/SKILL.md`
- `/mnt/data/projects/lges-harness-collection/.opencode/skills/web-service-seo-launch/SKILL.md`
- Registered in shared `AGENTS.md`.

Skill covers GA4, Google Search Console, Naver Search Advisor, Bing/IndexNow, public search checks, and indexing interpretation. Shared harness changes were not committed.

## Next actions

1. Recheck Naver sitemap and crawl-request status after processing.
2. Recheck Google URL Inspection and Search Console pages after 24–48 hours.
3. Check Naver exposure/click report after data becomes available.
4. Check Bing Webmaster after CAPTCHA/login access is available.
5. If shared harness policy requires, commit the new shared skill in its own repository. Do not commit it from this repository.

## Useful checks

```bash
git status --short
git log -3 --oneline
python3 scripts/submit_indexnow.py
```

Use authenticated Brave/Chrome CDP at `127.0.0.1:9222` for GA4, GSC, and Naver. Never save credentials, cookies, verification tokens, or API keys in logs or source.

## Suggested skills

- `web-service-seo-launch`
- `agents-md-updater`
- `ci-deploy-only` for future Git-push deployments
- `lessons-learned` when a new indexing or deployment failure is resolved
