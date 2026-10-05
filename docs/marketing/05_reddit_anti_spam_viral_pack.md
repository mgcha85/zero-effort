# Reddit Anti-Spam Compliant Launch & Viral Copy Pack

이 문서는 레딧(Reddit)의 자동 스팸 필터(AutoModerator 및 Spam Algorithm)를 100% 우회하여 글 삭제 없이 최상단 노출 및 바이럴 트래픽을 유치하기 위한 검증된 포스팅 전략 및 서브레딧별 맞춤 카피팩입니다.

---

## 🛑 왜 지난번 포스트가 삭제되었는가? (원인 분석)

1. **본문 내 직접 링크(`https://minitoolbox.dev`) 포함**:
   - `r/SideProject` 등 대형 서브레딧은 계정 카르마(Karma)가 낮거나 신규 계정이 본문에 `https://` 링크를 포함하면 AutoMod가 스팸/홍보 봇으로 자동 분류하여 즉시 삭제(`Removed by Reddit's filters`)합니다.
2. **도메인 확장자 패턴 감지**:
   - `.dev`, `.io` 등 신규 TLD가 본문에 나열되면 레딧 글로벌 휴리스틱 필터가 작동합니다.
3. **해결책**:
   - **본문에는 URL 링크를 일절 넣지 않는 '순수 텍스트 스토리(Text-Only)' 형식**으로 작성.
   - 링크는 본문이 아닌 **작성자 본인의 첫 번째 댓글(OP First Comment)**로 자연스럽게 안내.

---

## 🎯 서브레딧 1: r/SideProject (타겟: 인디 개발자, 프로덕트 애호가)

### 📌 게시글 제목 (Title):
```text
I got tired of paywalled PDF & nomad tools storing my data, so I built 9 client-side utilities with 0KB server uploads
```

### 📝 게시글 본문 (Post Body - No Links!):
```markdown
Hey everyone,

Like many of you, I frequently need micro utilities: calculating Schengen 90/180 visa days, converting timezones across Paris/New York/Asia, or merging confidential tax/contract PDFs.

Every time I used popular web tools (iLovePDF, Smallpdf, World Time Buddy, etc.), two things bugged me:
1. They force you to upload confidential documents (passports, bank statements, client contracts) to an unknown remote server.
2. They hit you with paywalls or aggressive ads after 2 uses.

So over the past few weeks, I built **MiniToolbox** – a collection of 9 lightweight, single-purpose web utilities engineered to run 100% inside your browser:

- **Secure PDF Suite**: Merge and split pages locally using `pdf-lib`. Your files never leave your computer's RAM.
- **Nomad TimeSync**: 24-hour visual timezone comparison that automatically calculates the "Golden Working Hours" overlap between teams in Europe, the US, and Asia. Export meetings to .ICS without signing up.
- **Schengen 90/180 Tracker**: Visual rolling window calculator with overstay alerts and ICS departure countdowns.
- **German Anmeldung & Japanese Rirekisho**: Document preparation and redacting tools for expats with zero cloud storage.
- **WASM Media Tools**: Photo compression and dimension scaling with EXIF metadata stripped locally.

Everything is completely free, runs without accounts, and is built with SvelteKit and WebAssembly so that literally 0 bytes are transmitted to any server.

I've put the project link in the comments below for anyone who wants to check it out. Would love your feedback on performance, UI, or suggestions for what utility to add next!
```

### 💬 작성자 첫 번째 댓글 (OP Comment - post immediately after submitting):
```markdown
Here is the project link if you want to test it:
👉 https://minitoolbox.dev

Subdomain shortcuts for direct access:
- Timezone & Golden Hours: https://timesync.minitoolbox.dev
- Schengen Visa Tracker: https://schengen.minitoolbox.dev
- Client-Side PDF Tools: https://pdf.minitoolbox.dev

All feedback and feature requests are very welcome!
```

---

## 🎯 서브레딧 2: r/digitalnomad (타겟: 250만 글로벌 원격 근무자 & 여행자)

### 📌 게시글 제목 (Title):
```text
[Resource] Free client-side tool to track Schengen 90/180 rolling days & coordinate team timezones (0KB server upload)
```

### 📝 게시글 본문 (Post Body - No Links!):
```markdown
Hey nomads,

If you hop between Schengen Europe, Southeast Asia, and the Americas, you know the headache of:
1. Calculating rolling 90 days in 180 days (standard spreadsheets always get edge cases wrong).
2. Trying to figure out meeting slots across Paris, London, New York, and Bali without paying for World Time Buddy.

I built a free, privacy-first web utility suite called **MiniToolbox** to solve this:
- **Schengen Tracker**: Lets you input your entry/exit stamps and shows your exact rolling window, maximum continuous stay, and safe exit deadlines.
- **Nomad TimeSync**: A 24h drag-and-drop timezone slider that auto-highlights the "Golden Hours" where everyone is within 08:00 - 19:00.
- **Secure PDF**: Merge confidential lease agreements or passport scans with 0% data uploaded to any server (runs purely in local memory).

Zero signups, no cookies/tracking on your documents, 100% free.

Link is in the comments below for those interested!
```

### 💬 작성자 첫 번째 댓글 (OP Comment):
```markdown
Link to the tools:
https://minitoolbox.dev

Direct tools:
- Schengen Calculator: https://schengen.minitoolbox.dev
- Timezone Sync: https://timesync.minitoolbox.dev

Hope it saves you some visa stress!
```

---

## 🎯 서브레딧 3: r/privacytoolsIO & r/webdev (기술/프라이버시 중심)

### 📌 게시글 제목 (Title):
```text
Showoff Saturday: Zero-upload web utilities powered by SvelteKit, pdf-lib, and browser WebAssembly
```

### 📝 본문 핵심 포인트:
- 아키텍처: 클라이언트 사이드 싱글페이지 정적 사이트(`@sveltejs/adapter-static`).
- 보안: 파일 바이트가 네트워크 요청(`fetch`/`xhr`)을 타지 않고 메모리 버퍼(`Uint8Array`)에서 직접 렌더링.
- 데이터 영속성: 클라우드 DB 대신 브라우저 `localStorage`.

---

## 📋 포스팅 실행 가이드라인
1. 레딧 로그인 후 해당 서브레딧의 **Create Post** 클릭.
2. 탭에서 반드시 **Post (Text)** 선택 (Link 탭 선택 금지!).
3. 위 본문 붙여넣기 후 게시.
4. **게시 10초 이내에 위 OP Comment를 본인 글의 댓글로 작성**.
5. 댓글에 달리는 피드백에 1시간 이내 친절하고 기술적인 답변 제공.
