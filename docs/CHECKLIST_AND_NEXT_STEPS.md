# MiniToolbox.dev SEO · 홍보 · 최적화 종합 체크리스트

## 1. 완료된 작업 (Done)
- [x] **8개 마이크로 웹앱 + 포털 구축 & 배포**:
  - `minitoolbox.dev` (포털 허브)
  - `anmeldung.minitoolbox.dev` (독일 안멜둥 서류 & 마스킹)
  - `pdf.minitoolbox.dev` (안심 PDF 병합 & 분할)
  - `schengen.minitoolbox.dev` (솅겐 90/180 체류일수 계산기)
  - `visarun.minitoolbox.dev` (동남아 비자런 & TM.47 알림 플래너)
  - `rirekisho.minitoolbox.dev` (일본 이력서 와레키 자동완성)
  - `media.minitoolbox.dev` (제로업로드 사진 압축 & 규격 리사이저)
  - `size.minitoolbox.dev` (글로벌 신발/의류 치수 변환기)
  - `caro.minitoolbox.dev` (베트남 15x15 오목 WebRTC P2P)
- [x] **언어 분리 및 다국어 지원 완성**:
  - 전체 앱에 걸쳐 한국어/영어/독어/일어/베트남어/태국어 완전 격리 완료 (하드코딩 제거).
- [x] **마스터 Sitemap & Robots.txt 배포**:
  - `minitoolbox.dev/sitemap.xml` (모든 서브도메인 포함)
  - `minitoolbox.dev/robots.txt`
- [x] **구조화 데이터(JSON-LD) 탑재**:
  - `WebApplication` & `FAQPage` 리치 스니펫 마크업 전 앱 적용 완료.
- [x] **공통 프라이버시 & 사업자 정보 푸터 규정 준수**:
  - 통신판매업 신고번호, 사업자등록번호, 주소, 이용약관, 개인정보처리방침 완비.
- [x] **텔레그램 알림 봇 연동 & 테스트 발송**:
  - 수신 Chat ID `8516370855` 연동 확인.
  - 테스트 메시지 및 8개 앱 일일 운영 리포트 브리핑 정상 수신 확인.
  - 매일 밤 00:00 KST 자동 실행 크론 스케줄 가동 중.

---

## 2. 즉시 진행한 스텝 (Completed Just Now)
1. **텔레그램 수신 연동 완료**: `/start` 수신 확인 후 Chat ID `8516370855`를 `.env.dev`, `.env.prod`에 영구 기록 및 즉시 리포트 발송 테스트 통과.
2. **모니터링 리포터 고도화**: `scripts/telegram_daily_briefing.py`를 `minitoolbox.dev` 8개 서브도메인 도메인 체계로 전면 업데이트.
3. **SEO & 런치 전략서 구축**: [`docs/GROWTH_AND_SEO_STRATEGY.md`](file:///mnt/data/projects/zero-effort/docs/GROWTH_AND_SEO_STRATEGY.md) 작성 완료.

---

## 3. 남은 작업 (Pending & Next Actions)

### A. 사용자 직접 승인/입력이 필요한 외부 서비스 연동
- [ ] **Google Search Console 등록**:
  - `search.google.com/search-console` 접속 -> 속성 추가 -> 도메인 입력: `minitoolbox.dev`
  - 제공되는 `google-site-verification=...` TXT 레코드를 Porkbun DNS에 1줄 추가.
  - `https://minitoolbox.dev/sitemap.xml` 제출.
- [ ] **Bing Webmaster Tools 등록**:
  - `bing.com/webmasters` -> Google Search Console 연동(1클릭 동기화).
- [ ] **Google AdSense 승인 신청**:
  - `adsense.google.com`에 `minitoolbox.dev` 등록 (심사 제출).
  - 승인 후 발급되는 `ca-pub-XXXXXXXX`를 `.env`의 `PUBLIC_ADSENSE_CLIENT_ID`에 입력.

### B. 글로벌 커뮤니티 런칭 (준비 완료 상태)
- [ ] **Hacker News (Show HN)**:
  - 런칭 텍스트 템플릿 준비 (`docs/GROWTH_AND_SEO_STRATEGY.md` 참조).
- [ ] **Product Hunt 런칭**:
  - 메이커 등록 및 썸네일/GIF 업로드.
- [ ] **Reddit 니치 서브레딧 시딩**:
  - `r/berlin` (안멜둥 도구), `r/digitalnomad` (솅겐 계산기), `r/thailand` (TM.47 비자런).
