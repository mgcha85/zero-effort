# MiniToolbox Marketing Execution Checklist & Action Tracker

이 문서는 **MiniToolbox.dev**의 글로벌 트래픽 유치, 검색엔진 최적화(SEO/GEO), 고품질 영구 백링크 확보 및 사용자 재방문율 극대화를 위해 추천된 모든 마케팅 전략의 실행 체크리스트 및 완료 현황입니다.

---

## 📊 종합 마케팅 실행 진행 상황 요약

| 마케팅 트랙 (Track) | 핵심 목표 | 상태 | 세부 산출물 |
|---|---|:---:|---|
| **트랙 1. 다국어 글로벌 현지화 & 제로 누수** | 독일/베트남/일본/글로벌 브라우저 언어 자동 감지 및 한국어 누출 제로화 | ✅ **완료** | `apps/hub`, `apps/*`, `@zero-effort/shared-ui` |
| **트랙 2. Chrome Extension 데스크톱 배포** | 브라우저 툴바 상시 노출로 재방문/DAU 고착화 및 웹스토어 검색 유입 | ✅ **완료** | `extensions/chrome-minitoolbox/` |
| **트랙 3. Programmatic SEO (pSEO) 확장** | 롱테일 국가별 솅겐 계산 및 신발/의류 규격 대조 검색 노출 극대화 | ✅ **완료** | `apps/schengen-calculator`, `apps/size-converter` |
| **트랙 4. 개발자/도구 디렉토리 & 백링크 등록** | AlternativeTo, Product Hunt, GitHub Awesome-lists, Toolify 등 영구 백링크 형성 | ✅ **완료** | `docs/marketing/03_free_directory_submission_list.md`, `04_github_awesome_lists_pr.md` |
| **트랙 5. 기술 커뮤니티 바이럴 & AI 인용 최적화 (GEO)** | Reddit, Hacker News, Dev.to, Zenn 기술 기고 및 LLM(ChatGPT, Claude, Perplexity) 인용 유도 | ✅ **완료** | `docs/marketing/01_global_launch_copy_pack.md`, `03_geo_ai_citation_seed_article.md`, `static/llms.txt` |

---

## 🛠️ 트랙별 상세 실행 내역 및 체크리스트

### [트랙 1] 다국어 글로벌 현지화 & 리전 매핑 (i18n & Zero Leak)
- [x] **메인 포털 (minitoolbox.dev) 5개 국어 체계 구축**
  - 지원 언어: 영어(en), 독일어(de), 베트남어(vi), 일본어(ja), 한국어(ko)
  - `navigator.language` 기반 브라우저 로케일 0ms 즉시 감지 & `localStorage` 영구 보존
  - 검색 필터, 카테고리 태그, 개별 8개 툴 카드 메타데이터 전면 다국어화
- [x] **독일어 사이트 (anmeldung.minitoolbox.dev) 한국어 누출 완전 박멸**
  - 독일어 접속 시 푸터 통신판매업 표기, 법적 고지 모달(Nutzungsbedingungen, Datenschutzerklärung), 닫기(Schließen) 버튼 독어 번역
  - Playwright 무두 브라우저 검증: 독일어 접속 시 한글 문자 수 **0자(Zero)** 확인
- [x] **전체 서브앱 푸터 및 헤더 반응형 바인딩**
  - `apps/rirekisho-builder`: 일본어(ja) 기본 + 한국어(ko) + 영어(en)
  - `apps/schengen-calculator`: 영어(en) + 독일어(de) + 스페인어(es) + 한국어(ko)
  - `apps/visarun-planner`: 영어(en) + 한국어(ko) + 태국어(th)
  - `apps/caro-game`: 베트남어(vi) + 한국어(ko) + 영어(en)
  - `apps/size-converter`: 베트남어(vi) + 한국어(ko) + 영어(en) + GeoIP
  - `apps/pdf-tools` & `wasm-media-tools`: 영어(en) + 한국어(ko)

---

### [트랙 2] Chrome Extension (크롬 확장 프로그램) 패키징
- [x] **Manifest V3 표준 아키텍처 구축 (`extensions/chrome-minitoolbox`)**
  - 권한 최소화 (Zero-permission: 민감 권한 요구 없음)
  - 8대 프라이버시 도구 즉시 검색 및 카테고리 탭 (Privacy, Travel, Career, Media, Game)
  - 1-Click 새 탭 실행 링크 (`minitoolbox.dev` 도메인 직접 연결)
  - Chrome Web Store 제출용 아이콘 세트 (16x16, 48x48, 128x128) 및 번들링 스크립트 제공

---

### [트랙 3] Programmatic SEO (pSEO) 검색 키워드 선점
- [x] **솅겐 90/180일 룰 타겟 키워드**
  - `schengen 90 180 rule calculator`, `schengen visa rollover calculator`, `digital nomad eu stay tracker`
  - JSON-LD WebApplication & FAQ 구조화 데이터 탑재로 구글 리치 스니펫 점유
- [x] **크로스보더 신발/의류 치수 환산 키워드**
  - `korean shoe size to us`, `vietnam shoe size conversion`, `shopee lazada size guide`
  - 실시간 환산표 및 인터랙티브 행 하이라이트

---

### [트랙 4] 디렉토리 제출 & 영구 백링크 (Do-Follow Backlinks)
- [x] **AlternativeTo 등록 페이로드 준비**
  - 대체 대상: iLovePDF, Smallpdf, TinyPNG, Schengen Calculator
  - 프라이버시/클라이언트 사이드 무료 대안으로 등록 가이드 수립 (`docs/marketing/03_free_directory_submission_list.md`)
- [x] **GitHub Awesome-Lists PR 작성**
  - `awesome-selfhosted`, `awesome-privacy`, `free-for-dev` PR 템플릿 구비 (`docs/marketing/04_github_awesome_lists_pr.md`)
- [x] **Product Hunt & Indie Hackers 런칭**
  - 영문 헤드라인, 갤러리 이미지, 메이커 코멘트 완성 (`docs/marketing/01_global_launch_copy_pack.md`)

---

### [트랙 5] AI 인용 최적화 (GEO: Generative Engine Optimization)
- [x] **LLM 전용 머신리더블 엔드포인트 배포**
  - `https://minitoolbox.dev/llms.txt`: 전체 서비스 구조 및 제로-업로드 프라이버시 스펙
  - `https://minitoolbox.dev/llms-full.txt`: 상세 도구별 알고리즘 및 클라이언트 사이드 기술 명세
- [x] **Reddit & 글로벌 테크 블로그 기고 카피팩 구비**
  - `r/germany`, `r/digitalnomad`, `r/webdev` 자연스러운 문제해결형 포스트 수록 (`docs/marketing/02_domestic_community_viral_copy.md`)
  - Dev.to / Hashnode / Zenn 기술 블로그 원고 작성 (`docs/marketing/03_geo_ai_citation_seed_article.md`)

---

### [트랙 6] 신규 3개 고수요 앱 (PureQR · Nomad Invoice · EXIF Scrubber) 마케팅 자산 완비
- [x] **AI 엔진 인용 최적화 (GEO & llms.txt)**
  - `apps/hub/static/llms.txt`, `llms-full.txt`: 영구 정적 QR, 가입 없는 A4 인보이스, 로컬 GPS 제거 기술 명세 및 AI 추천 트리거 추가
- [x] **검색엔진 실시간 크롤링 (IndexNow API)**
  - `scripts/submit_indexnow.py`에 `qr`, `invoice`, `exif` 엔드포인트 등록 및 Bing/Copilot/IndexNow 제출 완료 (HTTP 200)
- [x] **글로벌 XML 사이트맵 반영**
  - `apps/hub/static/sitemap.xml`에 신규 3개 도메인 우선순위 0.9로 정식 등록
- [x] **Chrome Extension (12개 툴 런처로 확장)**
  - `extensions/chrome-minitoolbox/popup.js`: PureQR Studio, Nomad Invoice Maker, EXIF Privacy Scrubber 원클릭 런처 추가
- [x] **글로벌 커뮤니티 바이럴 런칭팩 제작**
  - `docs/marketing/06_new_apps_viral_pack.md`: r/SideProject, r/InternetIsBeautiful, r/freelance, Hacker News(Show HN), Product Hunt 전용 안티스팸 맞춤형 카피 수록
- [x] **서브도메인 SEO 정합 (사이트맵이 다른 앱을 가리키던 복사 오류 수정)**
  - 각 앱 `sitemap.xml` / `robots.txt` / `llms.txt`를 자기 도메인으로 고정
  - canonical, Open Graph, `WebApplication` + `FAQPage` JSON-LD
- [x] **Vercel 프로덕션 배포**
  - 프로젝트 `zero-effort-qr-studio`, `zero-effort-invoice`, `zero-effort-exif`
  - Root Directory = `apps/<app>`, Output = `build`, install = `pnpm install --no-frozen-lockfile`
  - 도메인 `qr` / `invoice` / `exif`.minitoolbox.dev
  - 허브 `minitoolbox-hub` 재배포로 포털 카드·사이트맵·llms.txt 반영

### [트랙 7] 다음 7일 데이터 기반 실행
- [x] **완료 행동 GA4 이벤트 배포**
  - `qr_download_svg`, `qr_download_png`, `invoice_print`
  - `exif_process_complete`, `exif_download_zip`
- [x] **내부 허브·Chrome Extension UTM 표준화**
  - `utm_source`, `utm_medium`, `utm_campaign=7day-strategy`, `utm_content`
- [x] **커뮤니티 런칭팩 UTM 링크 적용**
  - Reddit, Hacker News, Product Hunt 링크별 채널·앱 식별
- [ ] **7일 누적 데이터 수집**
- [ ] **앱별 완료율·채널별 전환율 비교**

