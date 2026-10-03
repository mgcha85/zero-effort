# Zero-Effort Apps 아키텍처 명세서 (독립 웹사이트 분리)

## 1. 개요
Zero-Effort Apps는 **3개의 완전히 독립적인 저관여 웹사이트**를 단일 `pnpm workspace` 모노레포에서 병렬 개발, 관리, 배포하는 프로젝트입니다.  
공통 법적 고지(사업자등록번호, 통신판매업 신고번호 등), 약관 모달, SEO 헬퍼는 `packages/`로 공유하며, 각 웹사이트는 독자적인 포트, 도메인, 타깃 국가(베트남, 글로벌 직구, 한국), 에지 리전을 가집니다.

---

## 2. 소스 트리 구조
```text
zero-effort/
├── apps/
│   ├── caro-game/              # [독립 사이트 1] 베트남 오목 Cờ Caro (Port: 3001 | Vercel sin1)
│   │   ├── Containerfile
│   │   ├── vercel.json
│   │   └── src/
│   ├── size-converter/         # [독립 사이트 2] 글로벌 직구 신발/의류 치수 변환기 (Port: 3002 | Vercel Global)
│   │   ├── Containerfile
│   │   ├── vercel.json
│   │   └── src/
│   └── wasm-media-tools/       # [독립 사이트 3] 한국 이력서/정부24 안전 사진 압축기 (Port: 3003 | Vercel icn1)
│       ├── Containerfile
│       ├── vercel.json
│       └── src/
├── packages/
│   ├── shared-ui/              # 공통 법정 고지 푸터(차데이터리서치, 사업자/통신판매 번호), 약관 모달, AdSense 슬롯
│   ├── seo-config/             # Schema.org JSON-LD(WebApplication, FAQPage, HowTo) 생성기
│   └── i18n/                   # 다국어(ko, vi, en) 사전 및 헬퍼
├── docs/
│   ├── ARCHITECTURE.md         # 전체 아키텍처 및 소스 트리
│   ├── VERCEL_DEPLOYMENT.md    # Vercel 3개 독립 프로젝트 연결 및 도메인 바인딩 가이드
│   ├── COUNTRY_SEO_STRATEGY.md # 베트남 Cốc Cốc, 동남아 Shopee 직구, 한국 네이버 로컬 SEO 전략
│   ├── API_SPEC.md             # P2P 시그널링 및 데이터 규격
│   ├── TODO.md                 # 단계별 구현 로드맵
│   └── SUPABASE_SETUP.md       # Supabase 테이블 및 설정 가이드
├── podman-compose.yml          # 3개 독립 컨테이너 오케스트레이션 (3001, 3002, 3003)
├── start.sh / stop.sh          # APP_ENV=dev|prod 분기 구동/정지 스크립트
├── .env.example / .env.dev / .env.prod
└── .github/workflows/deploy.yml # GitHub Actions CI/CD (DEPLOY_* 환경변수 매핑)
```

---

## 3. 포트 및 배포 매핑

| 웹사이트 | 포트 | 대상 국가 | Vercel 리전 | Vercel Root Directory |
| :--- | :--- | :--- | :--- | :--- |
| **Cờ Caro Online** | `3001` | 베트남 🇻🇳 | `sin1` (Singapore) | `apps/caro-game` |
| **Global Size Converter** | `3002` | 동남아/글로벌 🌏 | Global Edge | `apps/size-converter` |
| **Zero-Upload Safe Media**| `3003` | 대한민국 🇰🇷 | `icn1` (Seoul) | `apps/wasm-media-tools` |

---

## 4. 운영 및 배포 규칙
1. **로컬 개발**:
   - 개별 구동: `pnpm dev:caro`, `pnpm dev:size`, `pnpm dev:wasm`
   - 전체 Podman 구동: `APP_ENV=dev ./start.sh` (3개 포트 동시 오픈)
2. **프로덕션 배포**:
   - Vercel에 단일 Git 레포를 3개의 별도 Project로 임포트하여 독립 도메인 연결.
   - 사내/자체 서버 배포 시 `./start.sh`로 3개 서비스 분리 호스팅.
