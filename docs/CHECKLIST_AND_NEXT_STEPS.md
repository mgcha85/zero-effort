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
- [x] **Google Search Console DNS TXT 레코드 배포 & 전파 완료**:
  - `minitoolbox.dev`의 네임서버인 Vercel DNS에 `google-site-verification=J3LgjyH-P1O8Nc5ERB4yc-2H2YrKWvsI7y0T11-9JRQ` 직접 주입 완료.
  - Google Public DNS(`8.8.8.8`)에 전파 확인 완료 (`TTL: 60`).
  - HTML `<head>` 메타태그도 이중 배포 완료.
- [x] **공통 프라이버시 & 사업자 정보 푸터 규정 준수**:
  - 통신판매업 신고번호, 사업자등록번호, 주소, 이용약관, 개인정보처리방침 완비.
- [x] **텔레그램 알림 봇 연동 & 테스트 발송**:
  - 수신 Chat ID `8516370855` 연동 확인.
  - 테스트 메시지 및 8개 앱 일일 운영 리포트 브리핑 정상 수신 확인.
  - 매일 밤 00:00 KST 자동 실행 크론 스케줄 가동 중.

---

## 2. 남은 사용자 클릭 액션 (1~2분 소요)

1. **Google Search Console 화면에서 [확인] (Verify) 버튼 클릭**:
   - 이미 Google Public DNS에 TXT 레코드가 전파되어 있으므로 클릭 즉시 **"소유권이 확인됨"** 녹색 창이 뜹니다.
2. **Sitemap 제출**:
   - 인증 완료 후 좌측 메뉴 **[Sitemaps]** 에 들어가서 `sitemap.xml` 입력 후 제출 클릭.
3. **Bing Webmaster Tools (선택/권장)**:
   - `bing.com/webmasters` 접속 후 [Google 계정으로 로그인] -> [GSC에서 가져오기] 누르면 5초 만에 완료.
4. **Google AdSense 승인 신청**:
   - `adsense.google.com`에 `minitoolbox.dev` 사이트 등록 및 심사 제출.
