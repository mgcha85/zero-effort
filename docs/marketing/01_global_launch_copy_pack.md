# Global Community Launch Copy Pack (글로벌 런칭 카피팩)

이 문서는 **Product Hunt**, **Hacker News (Show HN)**, **Reddit** 등 글로벌 테크/개발/노마드 커뮤니티에 복사해서 바로 게시할 수 있는 실전 제출용 템플릿입니다.

---

## 1. Product Hunt (프로덕트 헌트)

- **Product Name**: MiniToolbox
- **Tagline (최대 60자)**:
  `8 Free Privacy-First Micro Utilities (100% Client-Side)`
- **Category**: Developer Tools, Productivity, Privacy, Free Tools
- **Website URL**: `https://minitoolbox.dev`
- **Maker Comment (첫 댓글 템플릿)**:
```markdown
Hey Product Hunt! 👋

I'm Mingyu, the maker of MiniToolbox.

Like many of you, I was tired of "free" web utilities that force you to upload sensitive files (contracts, resumes, passport photos) to unknown remote servers, or spam you with 50 ads and paywalls after converting 2 files.

So I built MiniToolbox (https://minitoolbox.dev) — a clean suite of micro-tools running **100% client-side** in your browser using modern WebAssembly, Canvas API, and pdf-lib:

🔒 **Privacy-First Core:**
1. **PDF Merge & Split**: Reorder, extract, and merge confidential PDFs without sending a single byte across the wire.
2. **Zero-Upload Media Tools**: Resize & compress photos (passports, resumes, Gov forms) with EXIF metadata stripped locally.

🌍 **Cross-Border & Nomad Helpers:**
3. **Schengen 90/180-day Calculator**: Keep compliant with rolling visa rules in Europe with instant visual calendar forecasting.
4. **Visa-Run Planner**: Track multi-leg border runs, stay caps, and tax residency countdowns.
5. **German Anmeldung Form Prep**: Generate German city registration documents with bilingual validation in private browser memory.
6. **Japanese Rirekisho (履歴書) Builder**: Create standard JIS format resumes with PDF export and zero data persistence.

⚡ **Clean Experience:**
- 0KB Server Upload for sensitive docs
- No account or signup required
- Dark/Light mode, fast load under 500ms

I’d love to hear your feedback, feature requests, or suggestions for what utility I should build next! 🚀
```

---

## 2. Hacker News (Show HN)

- **Post Title**:
  `Show HN: MiniToolbox – 8 client-side privacy-first web utilities (WASM/Canvas)`
- **URL**: `https://minitoolbox.dev`
- **Text / First Comment**:
```text
Hi HN,

I built MiniToolbox (https://minitoolbox.dev) to replace ad-heavy, server-reliant web utilities with lightweight, client-side alternatives.

Many routine tools (PDF splitters, image compressors, visa calculators) upload user files to remote servers, raising obvious privacy concerns for financial documents, ID photos, and official forms.

Key technical choices:
- 100% client-side execution: Using modern WebAssembly (WASM), Canvas API, and pdf-lib. Network tab inspection verifies 0 bytes of user payload leave the browser.
- SvelteKit + adapter-static: High-performance pre-rendered SPA deployed to edge CDN.
- Multi-region utility coverage: Includes client-side Schengen rolling 90/180-day calculator, German registration (Anmeldung) generator, and Japanese Rirekisho builder.

Everything is completely free and requires no account.

Code & feedback welcome: https://minitoolbox.dev
```

---

## 3. Reddit (서브레딧별 맞춤 포스팅)

### A. r/InternetIsBeautiful & r/privacytoolsIO
- **Title**: `I made a collection of free web tools that process PDFs and photos 100% locally with 0KB uploaded to any server`
- **Post Body**:
```markdown
Hey everyone,

Whenever I needed to quickly merge two bank statement PDFs or resize an ID photo, I hated using popular sites that upload sensitive files to unknown cloud buckets.

So I built **MiniToolbox**: https://minitoolbox.dev

What it does:
- **PDF Merge & Split**: Runs via pdf-lib entirely in the browser DOM. No file leaves your machine.
- **Media Resizer & Converter**: Uses Canvas API to resize and strip EXIF metadata locally.
- **Schengen Visa 90/180-Day Calculator**: Rolling date math for European travel compliance.
- **German Anmeldung & Japanese Resume Builders**: Complex bilingual government forms filled in memory and exported as clean PDFs.

There are no signups, paywalls, or tracking of your files. Check out the network tab if you want to verify zero-upload behavior.

Would love any thoughts or ideas for new tools to add!
```

### B. r/digitalnomad & r/travel
- **Title**: `Free client-side Schengen 90/180 calculator & Visa Run Planner without paywalls`
- **Post Body**:
```markdown
Hey nomads,

I built a free tool to calculate Schengen rolling 90/180-day allowances and plan visa runs without having to deal with sketchy ads or subscription paywalls:

👉 https://schengen.minitoolbox.dev (or via https://minitoolbox.dev)

Features:
- Instant rolling 180-day window visualization
- Highlights remaining allowable days and alert dates
- 100% private: your travel itineraries are saved in localStorage only, not stored on any remote database.

Hope it saves someone a headache at European border control!
```
