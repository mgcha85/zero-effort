# Vercel 모노레포 독립 배포 가이드 (3개 독립 웹사이트)

단일 Git 레포지토리(`zero-effort`)에서 Vercel의 **Root Directory** 기능을 활용하여 **3개의 독립된 Vercel 프로젝트**로 배포하고, 각 사이트에 고유한 도메인과 최적 에지 리전(싱가포르, 서울 등)을 연결합니다.

---

## 1. 프로젝트별 Vercel 기본 설정 요약

| 웹사이트 | 대상 국가 | Root Directory | Vercel 권장 리전 | 도메인 예시 |
| :--- | :--- | :--- | :--- | :--- |
| **Cờ Caro Online** | 베트남 🇻🇳 | `apps/caro-game` | `sin1` (Singapore) | `zero-effort-caro.vercel.app` |
| **Global Size Converter**| 글로벌 / 동남아 🌏 | `apps/size-converter` | Global Edge | `zero-effort-size.vercel.app` |
| **제로업로드 미디어 툴** | 대한민국 🇰🇷 | `apps/wasm-media-tools` | `icn1` (Seoul, Korea) | `zero-effort-media.vercel.app` |
| **PDF 합치기 나누기** | 글로벌 🌐 | `apps/pdf-tools` | Global Edge | `zero-effort-pdf.vercel.app` |
| **솅겐 90/180 체류일수 계산기** | 유럽 / 글로벌 🇪🇺 | `apps/schengen-calculator` | `fra1` (Frankfurt) | `zero-effort-schengen.vercel.app` |
| **독일 안멜둥 서류 & 마스킹** | 독일 🇩🇪 | `apps/anmeldung-prep` | `fra1` (Frankfurt) | `zero-effort-anmeldung.vercel.app` |
| **일본 이력서 와레키 자동완성** | 일본 🇯🇵 | `apps/rirekisho-builder` | `hnd1` (Tokyo) | `zero-effort-rirekisho.vercel.app` |
| **동남아 비자런 플래너** | 동남아 / 태국 / 발리 🇹🇭🇮🇩 | `apps/visarun-planner` | `sin1` (Singapore) | `zero-effort-visarun.vercel.app` |

---

## 2. Vercel 대시보드 등록 절차 (앱당 1회 수행)

### [Site 1] Cờ Caro Online (베트남) 등록
1. [Vercel Dashboard](https://vercel.com/dashboard)에서 **Add New... -> Project** 클릭.
2. 이 Git 레포지토리(`zero-effort`)를 선택(Import).
3. **Configure Project** 화면에서:
   - **Project Name**: `zero-effort-caro`
   - **Framework Preset**: `SvelteKit` (자동 감지)
   - **Root Directory**: **`Edit` 클릭 후 `apps/caro-game` 선택** (중요!)
4. **Build and Output Settings**:
   - Build Command: `pnpm run build` (또는 기본값 사용)
   - Output Directory: `build` (자동 감지)
5. **Deploy** 버튼 클릭!
6. 배포 완료 후 **Settings -> Domains**에서 베트남 타깃 커스텀 도메인(예: `caro.vn` 또는 Vercel 서브도메인) 연결.

---

### [Site 2] Global Size Converter (동남아/글로벌 직구) 등록
1. 다시 Vercel 대시보드에서 **Add New... -> Project** 클릭.
2. 동일한 레포지토리(`zero-effort`) Import.
3. 설정:
   - **Project Name**: `zero-effort-size-converter`
   - **Root Directory**: **`apps/size-converter`** 선택
4. **Deploy** 클릭 및 글로벌 커스텀 도메인 연결.

---

### [Site 3] Safe Media Tools (한국 서류/사진 압축기) 등록
1. Vercel 대시보드에서 **Add New... -> Project** 클릭.
2. 동일한 레포지토리(`zero-effort`) Import.
3. 설정:
   - **Project Name**: `zero-effort-media-tools`
   - **Root Directory**: **`apps/wasm-media-tools`** 선택
4. **Deploy** 클릭 후 한국 타깃 도메인(예: `fastpic.kr`) 연결.

---

## 3. Vercel CLI를 통한 원클릭 배포 (대안)
로컬 터미널에서 Vercel CLI로 직접 배포할 수도 있습니다:

```bash
# 1. Caro Game 배포
cd apps/caro-game
npx vercel --prod

# 2. Size Converter 배포
cd ../size-converter
npx vercel --prod

# 3. WASM Media Tools 배포
cd ../wasm-media-tools
npx vercel --prod
```

---

## 4. `vercel.json`에 정의된 핵심 최적화
각 앱의 `vercel.json`에 다음이 사전 적용되어 있습니다:
- **에지 리전 격리**: 베트남 앱은 `sin1`(싱가포르), 한국 앱은 `icn1`(서울)로 강제 지정되어 구글 로컬 검색 크롤러에게 최단 레이턴시(TTFB < 30ms)를 제공합니다.
- **정적 에셋 불변 캐싱**: `_app/*` 경로에 `Cache-Control: public, max-age=31536000, immutable` 헤더를 적용하여 재방문 시 0ms 로딩을 보장합니다.
