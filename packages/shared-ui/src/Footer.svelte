<script lang="ts">
  import LegalModal from './LegalModal.svelte';

  export let lang: 'ko' | 'en' | 'vi' = 'ko';

  let activeModal: 'terms' | 'privacy' | 'refund' | null = null;

  const legalContent = {
    terms: {
      title: '이용약관',
      body: `
        <h4 class="font-bold text-base mb-2">제1조 (목적)</h4>
        <p class="mb-4">본 약관은 차데이터리서치(이하 "회사")가 제공하는 모든 온라인 유틸리티 서비스의 이용조건 및 절차에 관한 제반 사항을 규정함을 목적으로 합니다.</p>
        <h4 class="font-bold text-base mb-2">제2조 (서비스의 제공 및 면책)</h4>
        <p class="mb-4">회사는 무료 또는 유료로 웹 유틸리티 도구를 제공하며, 도구의 계산 결과는 참고용으로 법적 책임을 지지 않습니다. 사용자는 산출 결과의 정확성을 직접 최종 확인해야 합니다.</p>
        <h4 class="font-bold text-base mb-2">제3조 (지적 재산권)</h4>
        <p>서비스 내 알고리즘, UI 디자인, 소프트웨어 저작권은 회사에 귀속됩니다.</p>
      `
    },
    privacy: {
      title: '개인정보처리방침',
      body: `
        <h4 class="font-bold text-base mb-2">1. 개인정보 수집 및 처리 목적</h4>
        <p class="mb-4">본 서비스의 대다수 유틸리티(계산기, 미디어 변환기)는 사용자의 개인정보나 입력 데이터를 서버로 전송하지 않고 브라우저 로컬(Client-side)에서 즉시 처리합니다.</p>
        <h4 class="font-bold text-base mb-2">2. 제3자 서비스 및 쿠키</h4>
        <p class="mb-4">광고(Google AdSense) 및 접속 통계 분석(Google Analytics)을 위해 익명 쿠키가 사용될 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
        <h4 class="font-bold text-base mb-2">3. 개인정보 보호책임자</h4>
        <p>성명: 차민규 | 연락처: privacy@chadata.kr</p>
      `
    },
    refund: {
      title: '환불 및 취소 정책',
      body: `
        <h4 class="font-bold text-base mb-2">1. 환불 기준</h4>
        <p class="mb-4">무료 제공 서비스는 결제 환불 대상이 아닙니다. 유료 프리미엄 구독 또는 디지털 다운로드 콘텐츠의 경우 결제 후 7일 이내에 디지털 콘텐츠를 사용(열람/다운로드)하지 않은 경우 전액 환불이 가능합니다.</p>
        <h4 class="font-bold text-base mb-2">2. 환불 신청 절차</h4>
        <p>환불을 원하시는 경우 결제 영수증 번호와 함께 고객센터로 접수해주시면 영업일 기준 3일 이내에 처리됩니다.</p>
      `
    }
  };

  function openModal(type: 'terms' | 'privacy' | 'refund') {
    activeModal = type;
  }

  function closeModal() {
    activeModal = null;
  }
  const labels = {
    ko: { contact: '연락처', terms: '이용약관', privacy: '개인정보처리방침', refund: '환불 정책' },
    en: { contact: 'Contact', terms: 'Terms of Service', privacy: 'Privacy Policy', refund: 'Refund Policy' },
    vi: { contact: 'Liên hệ', terms: 'Điều khoản sử dụng', privacy: 'Chính sách bảo mật', refund: 'Chính sách hoàn tiền' }
  };

  $: curLabels = labels[lang] || labels.ko;
</script>

<footer class="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-xs text-xs text-slate-500">
  <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
    <!-- Links -->
    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-medium text-slate-600">
      <a href="mailto:contact@chadata.kr" class="hover:underline hover:text-slate-900 transition">
        {curLabels.contact}
      </a>
      <span class="text-slate-300">|</span>
      <button type="button" class="hover:underline hover:text-slate-900 transition" on:click={() => openModal('terms')}>
        {curLabels.terms}
      </button>
      <span class="text-slate-300">|</span>
      <button type="button" class="hover:underline hover:text-slate-900 transition" on:click={() => openModal('privacy')}>
        {curLabels.privacy}
      </button>
      <span class="text-slate-300">|</span>
      <button type="button" class="hover:underline hover:text-slate-900 transition" on:click={() => openModal('refund')}>
        {curLabels.refund}
      </button>
    </div>

    <!-- Copyright (Clean minimal style) -->
    <div class="mt-3 text-center text-[11px] text-slate-400">
      <p>© {new Date().getFullYear()} ZeroEffort. All rights reserved.</p>
    </div>
  </div>
</footer>

{#if activeModal}
  <LegalModal
    isOpen={true}
    title={legalContent[activeModal].title}
    content={legalContent[activeModal].body}
    onClose={closeModal}
  />
{/if}
