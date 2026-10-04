<script lang="ts">
  import { currentLang } from '$lib/langStore';
  import { setFaviconByRoute } from '$lib/faviconStore';
  import { onMount } from 'svelte';

  onMount(() => {
    setFaviconByRoute('/privacy');
  });
</script>

<svelte:head>
  <title>{$currentLang === 'en' ? 'Privacy Policy - MiniToolbox' : '개인정보처리방침 - MiniToolbox'}</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
  <div class="rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/90 shadow-sm">
    <div class="flex items-center space-x-3 mb-6">
      <img src="/favicons/privacy.svg" alt="Privacy" class="h-10 w-10 rounded-xl" />
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">
          {$currentLang === 'en' ? 'Privacy Policy' : '개인정보처리방침'}
        </h1>
        <p class="text-xs text-slate-500 mt-1">Zero-Storage & Client-Side Execution Guarantee</p>
      </div>
    </div>

    <div class="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">1. 개인정보 및 파일 처리 원칙 (0KB 원격 전송)</h2>
        <p>MiniToolbox.dev는 사용자의 개인정보와 파일(사진, PDF 문서, 신분증 스캔본 등)을 회사의 중앙 서버로 전송하지 않습니다. 모든 연산과 파일 변환은 사용자의 디바이스 메모리 및 브라우저 엔진에서 로컬로 종결됩니다.</p>
      </section>

      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">2. 자동 수집 장치(쿠키) 및 웹 통계</h2>
        <p>서비스 품질 개선 및 오작동 분석을 위해 구글 애널리틱스(GA4) 및 광고 파트너사(Google AdSense)의 비식별 익명 트래픽 통계 쿠키가 사용될 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 허용 여부를 제어할 수 있습니다.</p>
      </section>

      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">3. 개인정보 보호 책임자 및 문의</h2>
        <p>성명: 차민규 | 직책: 대표 | 전자우편: privacy@chadata.kr</p>
        <p>사업자명: 차데이터리서치 | 사업자등록번호: 219-03-78291 | 통신판매업 신고번호: 제 2021-평택안출-0261호</p>
      </section>
    </div>
  </div>
</div>
