<script lang="ts">
  import { currentLang } from '$lib/langStore';
  import { setFaviconByRoute } from '$lib/faviconStore';
  import { onMount } from 'svelte';

  onMount(() => {
    setFaviconByRoute('/refund');
  });
</script>

<svelte:head>
  <title>{$currentLang === 'en' ? 'Refund Policy - MiniToolbox' : '환불 및 취소 정책 - MiniToolbox'}</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
  <div class="rounded-3xl bg-white p-8 sm:p-12 border border-slate-200/90 shadow-sm">
    <div class="flex items-center space-x-3 mb-6">
      <img src="/favicons/refund.svg" alt="Refund" class="h-10 w-10 rounded-xl" />
      <div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">
          {$currentLang === 'en' ? 'Refund & Cancellation Policy' : '환불 및 결제 취소 정책'}
        </h1>
        <p class="text-xs text-slate-500 mt-1">Consumer Protection & Satisfaction Guarantee</p>
      </div>
    </div>

    <div class="space-y-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-6">
      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">1. 무료 서비스 원칙</h2>
        <p>MiniToolbox.dev에서 제공하는 기본 웹 유틸리티는 일체의 가입이나 유료 결제 없이 100% 무료로 개방되어 운영됩니다.</p>
      </section>

      <section>
        <h2 class="text-base font-bold text-slate-900 mb-2">2. 유료 프리미엄 플랜 및 결제 환불 기준</h2>
        <p>향후 유료 라이선스, API 쿼터, 또는 고성능 클라우드 렌더링 부가 기능이 도입될 경우, 전자상거래 등에서의 소비자보호에 관한 법률 및 콘텐츠이용자보호지침에 따라 결제 후 7일 이내 미이용 시 전액 환불을 보장합니다.</p>
      </section>

      <section class="border-t border-slate-100 pt-6 text-xs text-slate-500">
        <h3 class="font-bold text-slate-800 mb-2">통신판매업 및 사업자 정보</h3>
        <p>상호명: 차데이터리서치 | 대표자: 차민규 | 사업자등록번호: 219-03-78291</p>
        <p>통신판매업 신고번호: 제 2021-평택안출-0261호</p>
        <p>주소: 경기도 평택시 도대길 100-13 | 문의/접수: contact@chadata.kr</p>
      </section>
    </div>
  </div>
</div>
