# LESSON AND LEARN

## 2026-10-04: 글로벌 검색엔진(Bing/ChatGPT Search, 네이버 서치어드바이저) 등록 및 전 사이트 SEO 표준화

- **현상 & 작업**:
  - Google 외 Bing(ChatGPT 검색 연동) 및 네이버 서치어드바이저 등록, 허브 및 8개 서브앱 전역 SEO 규격 일괄 적용.
- **핵심 원리 & 주의점**:
  1. **Bing Webmaster Tools 1-Click 연동**:
     - Google OAuth로 로그인하면 GSC에 등록된 도메인 속성(`minitoolbox.dev`)과 권한을 읽어와 추가 DNS/파일 인증 없이 1-Click으로 등록 완료. `sitemap.xml` 제출 완료.
  2. **네이버 서치어드바이저 소유확인 & Vercel 주의사항**:
     - 네이버는 HTML 파일 방식(`naver[hash].html`)과 HTML 메타태그(`naver-site-verification`) 두 가지를 제공.
     - Vercel의 `cleanUrls: true` 옵션이 켜져 있으면 `naver[hash].html` 요청이 308 리다이렉트되어 파일 검증이 실패할 수 있으므로, HTML 메타태그 방식을 반드시 병행 적용해야 안전함.
  3. **Vercel Hobby 계정 24시간 배포 제한(100회/일)**:
     - 단시간에 다수의 서브앱 푸시/배포가 몰리면 `api-deployments-young-hobby-team-24h` 한도에 걸림. 코드는 GitHub `main`에 안전하게 병합되어 있으므로 쿼터 롤오버 시 자동 반영됨.
  4. **전 서브앱 표준 SEO 스펙**:
     - 모든 앱 `app.html`에 Google & Naver 인증 태그 일괄 삽입.
     - `canonical`, OpenGraph(`og:*`), Twitter Card, JSON-LD Schema(`WebSite`, `WebApplication`, `FAQPage`, `Organization`) 구조화 데이터 완비.
     - User Rule #11 필수 사업자 정보/약관/환불정책 푸터 공유 컴포넌트(`packages/shared-ui/Footer.svelte`) 연동 확인.

## 2026-10-04: Vercel SvelteKit 배포 404 및 Google Search Console 사이트맵 실패 캐시 해결

- **현상**:
  - `https://minitoolbox.dev/sitemap.xml` 접속 시 `404 DEPLOYMENT_NOT_FOUND` 반환.
  - Google Search Console(GSC)에서 `sitemap.xml` 상태가 `가져올 수 없음`으로 고착.
- **근본 원인**:
  1. Vercel의 `minitoolbox-hub` 프로젝트 설정에 SvelteKit 빌드 출력 디렉터리(`outputDirectory: "build"`)가 누락되어 기본값(`public`)을 찾아 빌드가 전부 실패(`STATIC_BUILD_NO_OUT_DIR`).
  2. GSC는 이전에 404로 실패한 사이트맵을 자체 캐시에 보관하고 있어, 배포를 복구한 후에도 계속 '가져올 수 없음' 상태를 유지함.
- **해결 절차**:
  1. Vercel 프로젝트 설정 패치 (`outputDirectory: "build"`, `installCommand: "pnpm install --no-frozen-lockfile"`).
  2. 신규 배포 트리거 및 프로덕션 별칭(`minitoolbox.dev`, `www.minitoolbox.dev`) 바인딩 완료.
  3. GSC 사이트맵 드릴다운에서 우측 3점 메뉴() > `사이트맵 삭제`로 실패 캐시 제거 후 깨끗하게 재제출.
  4. GSC 상단 URL 검사기에서 `https://minitoolbox.dev/` 실시간 테스트 (`실제 URL 테스트`) 통과 확인 후 `색인 생성 요청` 제출.
- **재발 방지 스킬**:
  - Obsidian Vault: `/mnt/data/obsidian-llm-wiki/10_skills/growth-marketing/web-service-seo-launch/SKILL.md`
