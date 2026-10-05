# Viral Launch & Community Copy Pack: 3 New Apps
## (PureQR Studio · Nomad Invoice Maker · EXIF Privacy Scrubber)

이 문서는 신규 런칭한 3개 고수요 마이크로 웹앱을 글로벌 주요 커뮤니티(Reddit, Hacker News, Product Hunt, Twitter/X)에 즉시 배포할 수 있도록 제작된 맞춤형 바이럴 카피팩입니다.

---

## 🎯 1. Reddit: r/SideProject & r/InternetIsBeautiful
**타겟**: QR 유료 결제 사기에 지친 자영업자, 가입 없는 인보이스를 찾는 프리랜서, 사진 개인정보(GPS) 유출을 꺼리는 사용자

### 📌 게시글 제목 (Title):
```text
I got tired of "free" QR code generators turning into $40/month subscriptions, so I built 3 client-side tools with 0KB server uploads
```

### 📝 게시글 본문 (Post Body - No Links in post!):
```markdown
Hey everyone,

A while ago, a friend printed 500 restaurant menus with a "free QR code" only to find out 14 days later that the dynamic QR company hijacked his menu link behind a $40/month recurring paywall.

This predatory model is rampant across everyday web utilities:
1. QR generators that hostage your printed materials behind dynamic redirect servers.
2. Invoice makers that require Google sign-in and start spamming sales emails just to output a single A4 receipt.
3. Photo scrubbers that upload your intimate family or marketplace photos to unknown cloud servers to strip metadata.

I got fed up and built 3 lightweight, 100% in-browser tools to fix this:

1. **PureQR Studio**:
   - Truly permanent, raw static QR generation.
   - Encodes URLs, WiFi direct-connect, vCard contact cards, WhatsApp, Email, or raw text directly into matrix bitmaps.
   - Zero redirects, zero tracking, zero expiration forever.
   - Exports crisp vector SVG for print shops and ultra-high-res 2048px PNG.

2. **Nomad Invoice Maker**:
   - Zero-login, zero-database freelance A4 invoice & receipt builder.
   - Multi-currency support (USD, EUR, GBP, KRW, JPY, VND).
   - Auto-calculates subtotal, VAT/tax rates, and discounts.
   - Instant 1-click A4 print & PDF export with zero-margin layout.

3. **EXIF Privacy Scrubber**:
   - Strips hidden home address GPS coordinates, device serials, and timestamps before posting photos to Craigslist, eBay, Reddit, or social media.
   - Inspects binary EXIF headers directly in browser RAM.
   - Zero visual degradation (lossless canvas redraw) and 1-click bulk ZIP export.

All tools execute 100% locally in your browser memory via modern Web APIs. Not a single byte of your data leaves your device.

I've dropped the direct links in the comments below for anyone who needs them. Would love to hear your feedback!
```

### 💬 작성자 첫 번째 댓글 (OP Comment - post right after submitting):
```markdown
Here are the direct links to test them out:

👉 PureQR Studio (Permanent Static QR): https://qr.minitoolbox.dev
👉 Nomad Invoice Maker (Zero-Login A4 PDF): https://invoice.minitoolbox.dev
👉 EXIF Privacy Scrubber (GPS Stripper): https://exif.minitoolbox.dev

All 12 privacy tools in the suite:
👉 https://minitoolbox.dev

100% free, no accounts, no server tracking. Hope this saves you from recurring paywalls!
```

---

## 🎯 2. Reddit: r/freelance & r/digitalnomad
**타겟**: 전 세계 프리랜서, 1인 사업자, 원격 근무자

### 📌 게시글 제목 (Title):
```text
[Resource] Free client-side A4 Invoice & Receipt generator with multi-currency (no account required, 0KB server upload)
```

### 📝 게시글 본문 (Post Body):
```markdown
Hi freelancers and nomads,

If you just need to send a clean, professional A4 PDF invoice to a client without:
- Creating a FreshBooks/QuickBooks trial account,
- Handing over your banking info to a third-party CRM,
- Or struggling with broken Google Docs table formatting...

I built **Nomad Invoice Maker**:
- 100% Client-Side: Runs directly in your browser. No server database stores your client names, rates, or totals.
- Multi-Currency: $, €, £, ₩, ¥, ₫ supported out of the box.
- Auto Math: Calculates VAT/GST percentage, line item quantities, and discount rates in real-time.
- Print-Perfect: Engineered with CSS `@media print` rules for clean, margin-free A4 PDF export.
- Draft Persistence: Auto-saves your draft in local browser storage so you don't lose work on page refresh.

Link is in the comments if you want to bookmark it for your next client billing!
```

### 💬 작성자 첫 번째 댓글 (OP Comment):
```markdown
Direct link to the tool:
🧾 https://invoice.minitoolbox.dev

Zero accounts, zero tracking. Hope it helps your workflow!
```

---

## 🎯 3. Hacker News: Show HN
**타겟**: 개발자, 프라이버시 옹호자, 오픈 웹 엔지니어

### 📌 제목 (Title):
```text
Show HN: PureQR – Permanent static QR generator with zero redirects or paywalls
```

### 📝 내용 (Text):
```text
Hi HN,

Many popular "free QR code" tools rely on URL shortener redirects (dynamic QR). After users print menus, flyers, or business cards, the provider puts the redirect behind a subscription paywall, breaking the QR code unless paid.

PureQR (https://qr.minitoolbox.dev) encodes the actual destination data (URL, WiFi WPA2/WPA3 credentials, vCard 3.0, WhatsApp API, or plaintext) directly into the QR matrix. 

Key details:
- Zero redirects: Works offline and will never expire, even 50 years from now.
- 100% in-browser: Generates vector SVG (using scalable path elements) and 2048px PNG canvas bitmaps.
- Privacy guarantee: No analytics beacon, no intermediate landing page.

Built with SvelteKit and adapter-static. Feedback on QR payload formatting and SVG export is appreciated!
```

---

## 🎯 4. Product Hunt 런칭 정보

- **Name**: PureQR & Nomad Suite by MiniToolbox
- **Tagline**: 3 Zero-Upload Privacy Tools: Permanent QR, Invoices & EXIF Scrubber
- **Primary Category**: Productivity, Developer Tools, Privacy
- **URL**: `https://minitoolbox.dev`
- **Short Pitch**:
  "Stop paying monthly fees for simple utilities. PureQR, Nomad Invoice Maker, and EXIF Privacy Scrubber run 100% inside your browser with 0KB uploaded to any remote server."
