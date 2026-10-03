# 국가별/플랫폼별 검색 최적화(SEO) 전략 명세서

저관여 웹앱의 트래픽은 **타깃 국가의 주요 검색 엔진 알고리즘 및 유저 검색 행동 패턴**과 100% 일치해야 작동합니다.

---

## 1. 베트남 (Vietnam 🇻🇳) — `apps/caro-game`

### 주요 검색 엔진 지형
- **Google Vietnam (`google.com.vn`)**: 88% 점유율.
- **Cốc Cốc (콕콕)**: 10% 점유율 (크롬 기반 토종 브라우저 겸 검색 엔진. 대학생/직장인 점유율 높음).
- **Zalo**: 베트남 #1 국민 메신저 (7,500만 명). 바이럴 유입의 핵심.

### 베트남 로컬 SEO 핵심 조치
1. **서버 리전 (Singapore `sin1`)**:
   - 베트남은 직접 호스팅 시 정부 라이선스 이슈가 있으므로, 베트남 통신 3사(Viettel, VNPT, FPT) 해저케이블 직결 지점인 **싱가포르 에지(Vercel `sin1`)**에 배포하여 30ms 미만 TTFB 확보.
2. **베트남어 유니코드 및 성조(Diacritics) 최적화**:
   - `ă, â, đ, ê, ô, ơ, ư` 성조 부호가 깨지지 않도록 시스템 폰트 및 `lang="vi"` 명시.
3. **타깃 롱테일 키워드 (Google VN & Cốc Cốc)**:
   - `chơi cờ caro online` (월 120만 검색)
   - `cờ caro 2 người trên máy tính`
   - `cờ tướng online miễn phí`
   - `game cờ caro cốc cốc`
4. **Zalo 공유 OpenGraph 최적화**:
   - `og:locale`을 `vi_VN`으로 설정하고 친구 대국 초대용 링크 생성.

---

## 2. 동남아/글로벌 직구 (Cross-Border E-commerce 🌏) — `apps/size-converter`

### 주요 유입 경로
- **Google Global / Regional**: `Shopee shoe size chart`, `Korean to US shoe size`.
- **E-Commerce 플랫폼 내부 브라우징 / 검색 연계**:
  - 베트남 Shopee VN / TikTok Shop VN
  - 태국 Shopee TH / Lazada TH
  - 한국 해외직구족 (타오바오, 쇼피, 아마존)

### 글로벌 직구 SEO 핵심 조치
1. **Programmatic SEO (pSEO) 매트릭스**:
   - `[Brand] [Item] [From-Country] to [To-Country] size converter`
   - 예: `Nike Shoes US 8.5 to Vietnam size`, `Zara Pants Korea 28 to US size`.
2. **다국어 hreflang 전략**:
   - 영문(`en-US`), 베트남어(`vi-VN`), 한국어(`ko-KR`) 3개국 언어 즉시 스위칭 및 색인.
3. **Featured Snippet (구글 추천 스니펫 타깃)**:
   - 구글 검색 결과 상단에 테이블 표 형태로 노출되도록 `<table>` 마크업 및 `HowTo` 구조화 데이터 배치.

---

## 3. 대한민국 (Korea 🇰🇷) — `apps/wasm-media-tools`

### 주요 검색 엔진 지형
- **네이버 (Naver)**: 포털 검색 및 블로그/지식iN (점유율 ~50%).
- **구글 코리아 (`google.co.kr`)**: 테크 및 청년층 (점유율 ~40%).

### 한국 로컬 SEO 핵심 조치
1. **서버 리전 (Seoul `icn1`)**:
   - Vercel 서울 리전 서빙으로 TTFB 10ms 초고속 응답.
2. **네이버 서치어드바이저 (Naver Search Advisor) 등록**:
   - `<meta name="naver-site-verification" content="...">` 등록.
   - `robots.txt` 및 `sitemap.xml` 네이버 웹마스터도구 연동.
3. **한국 공공/취업 특화 롱테일 키워드 공략**:
   - `이력서 사진 3x4 용량 줄이기` (상반기/하반기 공채 시즌 폭증)
   - `정부24 첨부서류 용량 초과 해결` (연말정산, 취득세 신고 등)
   - `증명사진 100KB 이하로 줄이기`
   - `개인정보 유출 없는 사진 압축` (공공기관 서류 업로드 불안감 해소)
4. **원클릭 프리셋**:
   - 복잡한 픽셀 입력 대신 [이력서 3x4], [여권 3.5x4.5], [정부24 1MB 이하] 원버튼 제공으로 체류 시간 및 전환율 극대화.
