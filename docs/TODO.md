# Zero-Effort Apps 개발 TODO 및 로드맵

## Phase 1: 8대 초소형 제로에포트 웹앱 구축 (완료)
- [x] pnpm workspace 모노레포 구축
- [x] 공통 패키지 3종 생성 (`packages/shared-ui`, `packages/seo-config`, `packages/i18n`)
- [x] 필수 법적 정보(사업자등록번호, 통신판매업)가 포함된 공통 Footer 및 약관 모달
- [x] 앱 8종 구현 및 배포 구성:
  - [x] `apps/caro-game` (:3001) - 베트남 15x15 오목 + WebRTC P2P 실시간 1:1 대국
  - [x] `apps/size-converter` (:3002) - 동남아/글로벌 신발·의류 치수 실시간 변환기
  - [x] `apps/wasm-media-tools` (:3003) - 브라우저 로컬 안전 이미지 압축기
  - [x] `apps/pdf-tools` (:3004) - PDF 합치기 나누기 (pdf-lib)
  - [x] `apps/schengen-calculator` (:3005) - 솅겐 90/180 체류일수 역산기 & ics
  - [x] `apps/anmeldung-prep` (:3006) - 독일 안멜둥 서류 체크 & 민감정보 마스킹 캔버스
  - [x] `apps/rirekisho-builder` (:3007) - 일본 이력서 와레키 자동완성 & JIS A4 PDF
  - [x] `apps/visarun-planner` (:3008) - 동남아 비자런 & 90일 체류신고 D-Day 플래너
- [x] Podman-compose 8개 서비스 완전 통합
- [x] 투명 알파 파비콘 자동 추출 파이프라인 (`scripts/process_transparent_favicons.py`)
- [x] KST 00시 텔레그램 일일 방문자수 브리핑 크론봇 (`scripts/telegram_daily_briefing.py`)

## Phase 2: SEO 및 수익화 세팅
- [ ] Google Search Console 사이트맵 일괄 등록
- [ ] Google AdSense 승인 신청 및 `PUBLIC_ADSENSE_CLIENT_ID` 환경변수 세팅
- [ ] 다국어 번역 사전(i18n) 완성도 100% 점검
