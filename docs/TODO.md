# Zero-Effort Apps 개발 TODO 및 로드맵

## Phase 1: 기본 인프라 및 스캐폴딩 (완료)
- [x] pnpm workspace 모노레포 구축
- [x] 공통 패키지 3종 생성 (`packages/shared-ui`, `packages/seo-config`, `packages/i18n`)
- [x] 필수 법적 정보(사업자등록번호, 통신판매업)가 포함된 공통 Footer 및 약관 모달
- [x] 타깃 앱 3종 기본 UI 및 로직 구현
  - [x] `apps/caro-game`: 15x15 오목 + AI 봇 + **WebRTC P2P 실시간 1:1 온라인 대국(방 생성/초대 링크)**
  - [x] `apps/size-converter`: 다국가 신발 치수 실시간 변환기 + pSEO 테이블
  - [x] `apps/wasm-media-tools`: 브라우저 로컬 안전 이미지 압축기 (이력서 3x4 / 정부24 프리셋)
- [x] Podman-compose 3개 독립 서비스 (3001, 3002, 3003)
- [x] Vercel 독립 배포 지원 (`vercel.json` 및 가이드 작성)
- [x] GitHub Actions CI/CD 파이프라인 구성

## Phase 2: 기능 고도화
- [x] `caro-game`: WebRTC DataChannel을 이용한 무서버 P2P 초대 링크 대국 기능
- [ ] `caro-game`: Cờ Tướng(샹치/장기) 모드 탭 추가
- [ ] `size-converter`: 의류(상의/바지) 브랜드별(Zara, Uniqlo, Nike) pSEO 상세 페이지 생성 스크립트
- [ ] `wasm-media-tools`: PDF 파일 분할/병합(pdf-lib) 기능 추가

## Phase 3: SEO 및 수익화 세팅
- [ ] Google Search Console 사이트맵 등록
- [ ] Google AdSense 승인 신청 및 `PUBLIC_ADSENSE_CLIENT_ID` 환경변수 세팅
- [ ] 다국어 번역 사전(i18n) 완성도 100% 점검
