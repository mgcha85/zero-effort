<script lang="ts">
  import { currentLang } from '$lib/langStore';
  import { setFaviconByRoute } from '$lib/faviconStore';
  import { onMount } from 'svelte';

  onMount(() => {
    setFaviconByRoute('/terms');
  });
</script>

<svelte:head>
  <title>{$currentLang === 'en' ? 'Terms of Service - MiniToolbox' : '이용약관 - MiniToolbox'}</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
  <div class="rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/90 shadow-sm">
    <div class="flex items-center space-x-3 mb-6">
      <img src="/favicons/terms.svg" alt="Terms" class="h-10 w-10 rounded-xl" />
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">
          {$currentLang === 'en' ? 'Terms of Service' : '서비스 이용약관'}
        </h1>
        <p class="text-xs text-slate-500 mt-1">MiniToolbox.dev · 차데이터리서치</p>
      </div>
    </div>

    <div class="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">제1조 (목적)</h2>
        <p>본 약관은 차데이터리서치(이하 "회사")가 운영하는 MiniToolbox.dev 및 모든 하위 서브도메인 유틸리티 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
      </section>

      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">제2조 (원칙: 0KB 무저장 로컬 처리)</h2>
        <p>회사가 제공하는 브라우저 유틸리티(PDF 병합/추출, 미디어 리사이저, 체류일수 계산기 등)는 이용자의 파일 및 입력 데이터를 회사의 원격 서버로 업로드하거나 보관하지 않으며, 이용자의 웹 브라우저 내(Client-side WebAssembly/Canvas)에서 즉시 처리됩니다.</p>
      </section>

      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">제3조 (서비스 면책 조항)</h2>
        <p>회사가 제공하는 계산 및 변환 결과(솅겐 체류일수, 비자 일정, 규격 치수 환산 등)는 참고용 편의 도구이며, 각국 정부, 대사관, 공공기관의 공식 규정 및 최종 심사 결과를 보증하지 않습니다. 중요한 법적/행정적 절차는 공식 기관의 최종 안내를 확인하시기 바랍니다.</p>
      </section>

      <section class="border-t border-slate-100 pt-6 text-xs text-slate-500">
        <h3 class="font-bold text-slate-800 mb-2">사업자 정보 고지</h3>
        <p>상호명: 차데이터리서치 | 대표자: 차민규 | 사업자등록번호: 219-03-78291</p>
        <p>통신판매업 신고번호: 제 2021-평택안출-0261호</p>
        <p>주소: 경기도 평택시 도대길 100-13 | 고객지원: contact@chadata.kr</p>
      </section>
    </div>
  </div>
</div>
