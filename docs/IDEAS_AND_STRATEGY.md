# 저관여 웹앱(Low-Involvement Web Apps) 아이디어 및 글로벌/SEO/배포 전략

## 1. 저관여 앱 핵심 메커니즘
- **정의**: 계산기, 타이머, 변환기, 초경량 보드게임 등 1회성 목적 방문이 잦은 단일 기능 유틸리티 웹앱.
- **수익화**:
  - Google AdSense / Header Bidding (페이지 체류 중 광고 노출).
  - Affiliate (제휴 링크: 예 - 계산 결과 하단 대출/송금/호스팅/제품 추천).
  - Micro-SaaS / Buy-me-a-coffee / 프리미엄 기능 해금 (광고 제거, 결과 대량 내보내기).

---

## 2. 국가별 갭(Gap) 분석 및 유망 아이디어

### (1) 해외(미국/유럽) 대박 ↔ 한국 부재/열악 (한국 타깃)
1. **브라우저 로컬 완결형(Zero-Upload) 미디어/파일 유틸리티**
   - **글로벌 현황**: vHelios, TinyWow, Squoosh 등.
   - **한국 갭**: 한국의 많은 PDF/이미지 변환 툴이 구형 ActiveX/플러그인이거나, 서버 업로드 방식으로 보안 불안 및 파일 용량 제한(결제 유도).
   - **솔루션**: WebAssembly(WASM) 기반 클라이언트 100% 처리 (서버 업로드 0KB).
   - **아이디어**: 관공서/채용 제출용 서류 최적화기 (PDF 용량 줄이기, 3x4 증명사진 규격 자동 크롭/용량 맞춤).

2. **실시간 회의 비용 카운터 (Meeting Cost Calculator)**
   - **글로벌 현황**: 미국 테크씬에서 회의 낭비 방지용으로 널리 사용.
   - **한국 갭**: 단순 블로그 글만 있고 실시간 모바일/웹 타이머 전용 앱 부족.
   - **솔루션**: 참석자 수와 평균 연봉(또는 직급별 인원) 입력 시 1초마다 실시간으로 버려지는 회의 비용(원 단위)을 시각화. "회의 종료" 시 보고서 링크 생성.

---

### (2) 한국/글로벌 성공 ↔ 베트남/동남아 부재/열악 (신흥국 타깃)
1. **Cờ Caro (오목) & Cờ Tướng (장기) 초경량 P2P 웹 대국기**
   - **베트남 시장 현황**: Cờ Caro(오목), Cờ Tướng(샹치/장기)는 베트남 국민 게임으로 월간 수백만 검색량 발생. 그러나 기존 웹사이트는 2000년대 Flash 감성의 구형 사이트(PlayOK 등)이거나 무거운 모바일 앱 다운로드 강제.
   - **솔루션**: 설치 없이 링크 클릭 즉시 1:1 대국(WebRTC P2P) + AI 연습 모드. Svelte 기반 번들 50KB 미만 초경량 모바일 최적화 웹앱.

2. **크로스보더 직구 의류/신발 치수 자동 변환기 (Shopee/TikTok Shop Size Converter)**
   - **베트남 시장 현황**: Shopee, TikTok Shop을 통한 한국/중국/미국/일본 직구 패션 시장 폭발적 성장. 반면 사이즈 체계(US/EU/KR mm/VN/UK) 불일치로 인한 오배송 및 환불 스트레스 극심.
   - **솔루션**: 성별/브랜드/카테고리(신발, 아우터, 바지) 선택 시 내 신체 치수(cm) 기준 각국 및 플랫폼별 최적 사이즈 즉시 추천.

3. **글로벌 프리랜서 실수령액 계산기 (Vietnam Remote Worker Net Calculator)**
   - **베트남 시장 현황**: Upwork, Fiverr, 해외 원격 개발자 10만 명 이상. 플랫폼 수수료(10%), 달러 환전 스프레드(Payoneer/PayPal/Wise), 현지 세무(TNCN 7% 또는 누진세) 계산이 매달 번거로움.
   - **솔루션**: 입금액(USD/EUR) 입력 시 플랫폼별 수수료 공제 및 현지 은행 입금액(VND), 예상 세금까지 1초 만에 비교 산출.

4. **베트남어 성조 보존 소셜 텍스트/폰트 스타일러 (Font Chữ Đẹp for FB/TikTok)**
   - **베트남 시장 현황**: 인스타그램/틱톡 바이오, 페이스북 판매글에 특수 폰트 수요 높음. 그러나 영문 기반 YayText 등은 베트남어 성조(ă, â, đ, ê, ô, ơ, ư 등) 적용 시 글자가 깨짐.
   - **솔루션**: 베트남어 성조가 온전히 보존되는 유니코드 스타일 폰트/장식 기호 원클릭 복사기.

---

## 3. 구글 검색 상위 노출(SEO) 핵심 전략

### A. Programmatic SEO (pSEO) 아키텍처
- 단일 계산기 메인 페이지 1개만 두면 트래픽 한계.
- **수백~수천 개의 롱테일 URL 자동 생성**:
  - 예: `/size-converter/nike-shoes-kr-to-vn`
  - 예: `/size-converter/zara-pants-us-to-eu`
  - 예: `/salary/gross-to-net-region-1-2026`
- **Unique Content 결합**: 단순 템플릿 복제가 아닌, 각 페이지마다 공식 규격표, 환율/세율 근거, 자주 묻는 질문(FAQ) 데이터를 렌더링하여 Google Spam Penalty 회피.

### B. Core Web Vitals 극대화 (SvelteKit SSG)
- Google 순위의 핵심 요소: **INP(Interaction to Next Paint) < 200ms**, **LCP < 1.2s**, **CLS = 0**.
- SvelteKit `adapter-static`으로 완전한 HTML/JS 정적 빌드.
- 구글봇 크롤링 시 즉시 렌더링 완료 상태 제공 (SSR 부하 및 클라이언트 번들 최소화).

### C. 리치 스니펫(Rich Snippets) Schema.org 마크업
- JSON-LD 적용 필수:
  - `WebApplication` / `SoftwareApplication`: 평점, 소프트웨어 카테고리 표시.
  - `FAQPage`: 검색 결과 화면(SERP)에서 접이식 아코디언으로 노출되어 클릭률(CTR) 2~3배 상승.
  - `HowTo`: 사용법 단계별 스니펫 노출.

### D. 체류 시간(Dwell Time) 및 바이럴 루프
- **결과 공유 URL**: 사용자가 입력한 파라미터를 URL Query/Hash에 즉시 인코딩 (`?val=1000&from=usd&to=vnd`). 친구/커뮤니티 공유 유도.
- **클립보드 원클릭 복사 / 이미지 저장**: 결과 카드를 PNG로 캡처하여 소셜 공유 지원.

### E. 다국어 Hreflang 구조
- 도메인 하나로 글로벌 공략:
  - `domain.com/ko/` (한국어)
  - `domain.com/vi/` (베트남어)
  - `domain.com/en/` (글로벌 영문)
- `hreflang` 태그 명시하여 국가별 구글 검색 엔진에 자동 색인.

---

## 4. 인프라 및 배포 전략 (무료 티어 중심)

| 단계 | 구성 | 월 비용 | 특성 |
| :--- | :--- | :--- | :--- |
| **Tier 0 (권장)** | **Cloudflare Pages / Vercel** + SvelteKit Static | **$0** (완전 무료) | 정적 사이트 + WASM/JS 클라이언트 로직. 월 1,000만 PV도 트래픽 비용 0원. 글로벌 에지 CDN. |
| **Tier 1 (API 백엔드 필요 시)** | **GCP Cloud Run** + Rust/Go 컨테이너 | **$0** (프리 티어) | 월 2백만 회 호출, 360,000 vCPU-초, 180,000 GiB-초 메모리 무료. 트래픽 없으면 0개 인스턴스로 축소($0). |
| **Tier 2 (데이터베이스/인증)** | **Supabase Free Tier** | **$0** | 500MB DB, 50,000 MAU 무료. 계산 기록, 랭킹, 사용자 설정 저장. |
| **Tier 3 (로컬/자체 서버)** | **Podman-Compose** + Nginx / Traefik | 인프라 종속 | 사내/개인 서버 운영 시 `start.sh`, `stop.sh`, `.env.{type}`로 일관된 구동. |

### GCP Cloud Run 배포 최적화
- **Rust (Axum) or Go**: 단일 바이너리 경량 컨테이너 (도커 이미지 크기 < 20MB).
- **Cold Start 극소화**: 100~300ms 이내 기동하여 구글 크롤러 및 사용자 지연 차단.
- **Cloudflare 연동**: Cloudflare 무료 프록시를 Cloud Run 앞단에 두어 정적 에셋 및 API 응답 캐싱 (Cloud Run 호출 수 절감).
