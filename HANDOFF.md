# MiniToolbox Handoff

## Latest handoff — 2026-10-17

### Repository

- Path: `/mnt/data/projects/zero-effort`
- Branch: `main`
- Latest pushed commit: `2d294f2 fix(seo): align indexing submissions with deployed apps`
- Working tree contains many pre-existing untracked exploratory `scripts/*.js`; do not stage them.

### Current diagnosis

- Google indexing notices were not only normal duplicate handling.
- Five apps had `fallback: index.html`, which overwrote prerendered SEO HTML with an SPA shell.
- Eight app `robots.txt` files pointed at the hub sitemap instead of their own sitemap.
- `timesync.minitoolbox.dev` has no connected Vercel project and still serves an old SPA shell. It was removed from the hub sitemap and IndexNow list; deploy separately only if TimeSync becomes an intended product.

### Applied fixes

- Added `prerender = true` and changed fallback to `404.html` for Anmeldung, Schengen, Rirekisho, Visa Run, and TimeSync.
- Added TimeSync SEO assets for future deployment.
- Added TimeSync canonical link.
- Corrected per-app `robots.txt` sitemap and `llms.txt` URLs.
- Guarded Rirekisho localStorage writes during SSR.
- Removed undeployed TimeSync from hub sitemap and IndexNow submissions.
- Local builds emit title, canonical, and JSON-LD for repaired apps.
- Public checks after deployment confirmed 11 intended app domains return HTTP 200 with self-canonical, JSON-LD, self-referencing robots, and self-referencing sitemap.
- IndexNow resubmission returned HTTP 200 from both endpoints. This confirms receipt, not indexing completion.

### GA4 and traffic evidence

- Property: `G-0PT14QDEK4`.
- Clean Chromium confirmed `/g/collect` requests for:
  - `qr_download_svg`
  - `qr_download_png`
  - `invoice_print`
  - `exif_process_complete`
  - `exif_download_zip`
- GA4 Admin event catalog had not listed these completion events at last check; key-event star configuration remains subject to GA4 processing delay.
- Last observed GA4 snapshot on 2026-10-12:
  - Today: 0 users, 0 views, 0 events.
  - Last 7 days: 216 users, 222 sessions, 243 views.
  - Sessions: 100% `Direct`.
  - Data-center-like locations were prominent; treat part of traffic as low-quality/test/VPN until independently validated.
- Do not interpret old 7-day totals as current organic growth.

### Marketing decision

- Stop broad promotion across all apps.
- Focus next experiment on Invoice, EXIF, and Schengen.
- Required funnel: tracked landing visit → meaningful tool action → completion event.
- Validate UTM source/medium before judging any channel.
- Organic channels already prepared:
  - Reddit `r/SideProject` post live.
  - Product Hunt draft exists but is not launched.
  - Hacker News submission previously blocked by anti-spam eligibility.
- No spam, fake accounts, CAPTCHA bypass, bought links, or unapproved paid spend.

### Next session order

1. Recheck current GA4 24-hour/7-day numbers; exclude diagnostic traffic.
2. Confirm five completion events appear in GA4 Events and mark them as key events.
3. Re-submit corrected 11-app sitemaps in Google Search Console and inspect representative URLs.
4. Recheck Naver individual properties and Bing after recrawl.
5. Launch one Product Hunt campaign and one tracked Reddit/community experiment, not all apps at once.
6. Build localized intent pages only for Invoice, EXIF, and Schengen after measuring real completion.


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
- Clean Chromium transport test confirmed all five completion events reached GA4 `/g/collect`: `qr_download_svg`, `qr_download_png`, `invoice_print`, `exif_process_complete`, and `exif_download_zip`.
- Sent the same five names with `debug_mode` for GA4 DebugView diagnostics. The Admin event catalog can lag transport receipt; revisit after the next GA4 processing window and star each completion event as a key event if not already configured.
- GA4 Admin currently lists only automatic events (`first_visit`, `page_view`, `scroll`, `session_start`, `user_engagement`). No completion event has appeared yet, so key-event marking is still pending; uBlock blocked the Brave test context.
- Observed baseline: last 7 days 226 active users, 229 sessions, 251 views, 825 events; all sessions reported as Direct. Recent Search Console data was delayed and showed 1 impression / 0 clicks / average position 7.

### Indexing feedback

- Google URL Inspection previously confirmed QR, Invoice, and EXIF homepages as indexed.
- Individual sitemap submissions succeeded for those three apps.
- Naver ownership, sitemap submission, and homepage crawl request are complete for all 11 registered app domains; public exposure reports still require processing time.
- IndexNow returned HTTP 200 from both endpoints; this is submission receipt, not indexing proof.
- Commit `291f9c4` was pushed to `origin/main`. Vercel eventually created deployments for all configured projects. Public checks confirm updated canonical/JSON-LD for Invoice, QR, EXIF, PDF, and Size; the legacy `build` project deployment remains a separate failure and is not attached to a public app domain.

## Current state

- Repository: `/mnt/data/projects/zero-effort`
- Branch: `main`
- Latest project commit: `25ba6a1 docs: record GA4 debug event verification`
- Latest commit pushed to `origin/main`
- Existing exploratory `scripts/*.js` files remain untracked. Do not stage them.

## Google indexing exclusion diagnosis — 2026-10-12

- GSC's new “redirected page” and “alternate page with proper canonical” notices correlate with two real SEO defects:
  - Anmeldung, Schengen, Rirekisho, Visa Run, and TimeSync used `fallback: index.html`, so the adapter overwrote prerendered pages with an SPA shell lacking title/canonical/JSON-LD.
  - Eight app `robots.txt` files pointed to the hub sitemap instead of their own domain sitemap.
- Fix prepared:
  - Added `prerender = true` and changed those five apps to `fallback: 404.html`.
  - Added TimeSync sitemap, robots, and llms files; added its canonical link for future deployment.
  - Corrected per-app robots sitemap/llms URLs.
- Local builds now emit title, canonical, and JSON-LD for all five repaired apps. Rirekisho localStorage save is browser-guarded during SSR.
- TimeSync has no connected Vercel project and still serves an old SPA shell, so it was removed from the hub sitemap until separately deployed.
- Removed TimeSync from IndexNow submissions; corrected 11-app URL list returned HTTP 200 from both IndexNow endpoints.
- Next: request reindex for affected canonical URLs and resubmit each corrected sitemap. Do not treat sitemap submission HTTP 200 as indexing proof.

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
