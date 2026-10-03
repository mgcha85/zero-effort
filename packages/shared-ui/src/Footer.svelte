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
</script>

<footer class="mt-auto border-t border-gray-200 bg-gray-50 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <!-- Links -->
    <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium text-gray-600 dark:text-gray-300">
      <button type="button" class="hover:underline hover:text-gray-900 dark:hover:text-white" on:click={() => openModal('terms')}>
        이용약관
      </button>
      <span class="text-gray-300 dark:text-gray-700">|</span>
      <button type="button" class="font-bold hover:underline hover:text-gray-900 dark:hover:text-white" on:click={() => openModal('privacy')}>
        개인정보처리방침
      </button>
      <span class="text-gray-300 dark:text-gray-700">|</span>
      <button type="button" class="hover:underline hover:text-gray-900 dark:hover:text-white" on:click={() => openModal('refund')}>
        환불/취소 정책
      </button>
    </div>

    <!-- Company Legal Information (Strict User Rule) -->
    <div class="mt-6 text-center leading-relaxed text-gray-500 dark:text-gray-400 space-y-1">
      <p>
        <span class="font-semibold text-gray-700 dark:text-gray-300">상호명: 차데이터리서치</span>
        <span class="mx-1.5">|</span>
        <span>대표자: 차민규</span>
        <span class="mx-1.5">|</span>
        <span>사업자등록번호: 219-03-78291</span>
      </p>
      <p>
        <span>통신판매업 신고번호: 제 2021-평택안출-0261호</span>
        <span class="mx-1.5">|</span>
        <span>주소: 경기도 평택시 도대길 100-13</span>
      </p>
      <p class="pt-2 text-[11px] text-gray-400 dark:text-gray-500">
        © {new Date().getFullYear()} 차데이터리서치 (Zero-Effort Apps). All rights reserved.
      </p>
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
