# LESSON AND LEARN

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
