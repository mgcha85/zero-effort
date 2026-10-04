<script lang="ts">
  import { onMount } from 'svelte';
  import { currentLang, translations } from '$lib/langStore';
  import { DESTINATIONS, type DestinationRule, calculateStay, generateIcsCalendar, type CalculationResult } from '$lib/visarun';
  import { AdBanner } from '@zero-effort/shared-ui';

  let selectedDestId = 'th-90day';
  let entryDate = new Date().toISOString().split('T')[0];

  $: selectedRule = DESTINATIONS.find(d => d.id === selectedDestId) || DESTINATIONS[0];
  $: result = calculateStay(entryDate, selectedRule);
  $: t = translations[$currentLang];

  onMount(() => {
    try {
      const saved = localStorage.getItem('visarun_pref_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedDestId) selectedDestId = parsed.selectedDestId;
        if (parsed.entryDate) entryDate = parsed.entryDate;
      }
    } catch (e) {
      console.warn(e);
    }
  });

  function savePref() {
    try {
      localStorage.setItem('visarun_pref_v1', JSON.stringify({ selectedDestId, entryDate }));
    } catch {}
  }

  $: {
    if (selectedDestId || entryDate) {
      savePref();
    }
  }

  function downloadCalendar() {
    const ruleName = $currentLang === 'en' ? selectedRule.nameEn : $currentLang === 'th' ? selectedRule.nameTh : selectedRule.name;
    const title = $currentLang === 'en'
      ? `${selectedRule.flag} ${ruleName} Deadline Alert`
      : $currentLang === 'th'
      ? `${selectedRule.flag} แจ้งเตือนครบกำหนด ${ruleName}`
      : `${selectedRule.flag} ${ruleName} 마감 알림`;
    const desc = $currentLang === 'en'
      ? `${ruleName} stay expiry/report deadline.\\nDays remaining: ${result.daysRemaining}\\nArrival: ${result.entryDate}\\nDeadline: ${result.deadlineDate}`
      : $currentLang === 'th'
      ? `วันครบกำหนดพำนัก/รายงานตัว ${ruleName}\\nจำนวนวันที่เหลือ: ${result.daysRemaining} วัน\\nวันเดินทางถึง: ${result.entryDate}\\nวันครบกำหนด: ${result.deadlineDate}`
      : `${ruleName} 체류 만료/신고 마감일입니다.\\n남은 일수: ${result.daysRemaining}일\\n입국일: ${result.entryDate}\\n마감일: ${result.deadlineDate}`;
    const icsContent = generateIcsCalendar(title, desc, result.deadlineDate, result.deadlineDate);

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `visa-alert-${selectedDestId}-${result.deadlineDate}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function getStatusBadge(status: CalculationResult['status']) {
    switch (status) {
      case 'safe':
        return { text: t.safeStatus, bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'warning':
        return { text: t.warningStatus, bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'urgent':
        return { text: t.urgentStatus, bg: 'bg-rose-50 text-rose-700 border-rose-300' };
      case 'overdue':
        return { text: t.overdueStatus, bg: 'bg-red-100 text-red-900 border-red-400 font-black' };
    }
  }

  $: metaDesc = $currentLang === 'en'
    ? 'Southeast Asia Visa Run & 90-Day Report D-Day Planner. Thailand TM.47, Bali VoA, Vietnam visa exemptions. Prevent overstay fines with 1-click .ics calendar alerts.'
    : $currentLang === 'th'
    ? 'เครื่องมือวางแผนการเดินทางวีซ่ารันและการรายงานตัว 90 วันในเอเชียตะวันออกเฉียงใต้ คำนวณวันครบกำหนดและส่งออกการแจ้งเตือนปฏิทิน (.ics)'
    : '태국 90일 거주신고(TM.47), 발리 도착비자(VoA), 베트남 무비자 비자런 D-Day 역산기. 오버스테이 방지 및 온라인 접수 가능 기간 알림, 1클릭 캘린더(.ics) 내보내기.';

  $: metaTitle = `${t.siteTitle} | ${t.subBrand}`;

  $: jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.siteTitle,
    alternateName: 'Southeast Asia Visa Run & 90-Day D-Day Tracker',
    url: 'https://visarun.minitoolbox.dev/',
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All',
    description: metaDesc,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  });

  $: jsonLdFaq = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: $currentLang === 'ko' ? '태국 90일 리포트(TM.47)는 언제부터 신고할 수 있나요?' : 'When can I file Thailand 90-Day Report (TM.47)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: $currentLang === 'ko' ? '만료일 기준 15일 전부터 7일 후까지 출입국관리사무소 또는 온라인으로 신청 가능합니다.' : 'You can file 15 days before up to 7 days after the due date at immigration or online.'
        }
      },
      {
        '@type': 'Question',
        name: $currentLang === 'ko' ? '캘린더 내보내기 기능에 비용이 드나요?' : 'Is the .ics calendar alert export free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: $currentLang === 'ko' ? '완전 무료이며 브라우저 로컬에서 .ics 파일을 생성하여 Google 캘린더, Apple 캘린더에 바로 등록할 수 있습니다.' : 'It is 100% free. The .ics calendar file is generated directly in your browser for instant import into Google Calendar or Apple Calendar.'
        }
      }
    ]
  });
</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content={metaDesc} />
  <meta name="keywords" content="비자런 계산기, 태국 90일 신고, 발리 도착비자, 베트남 무비자, visa run planner, thailand 90 day report, bali voa extension, vietnam visa run, overstay tracker" />
  <link rel="canonical" href="https://visarun.minitoolbox.dev/" />

  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDesc} />
  <meta property="og:url" content="https://visarun.minitoolbox.dev/" />
  <meta property="og:image" content="https://visarun.minitoolbox.dev/icon-512.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MiniToolbox" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={metaDesc} />
  <meta name="twitter:image" content="https://visarun.minitoolbox.dev/icon-512.png" />

  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Hero Banner -->
  <div class="mb-8 rounded-3xl bg-linear-to-b from-emerald-50/50 to-white p-6 sm:p-8 border border-emerald-100/80 text-center shadow-xs">
    <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-xs border border-emerald-100">
      <img src="/favicon.png" alt="VisaRun Icon" class="h-10 w-10 object-contain" />
    </div>
    <h1 class="text-2xl font-black text-slate-900 sm:text-3xl tracking-tight">
      {t.siteTitle}
    </h1>
    <p class="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
      {$currentLang === 'en'
        ? `${t.subBrand}. Real-time D-day calculations & calendar reminders without overstay stress.`
        : $currentLang === 'th'
        ? `${t.subBrand} คำนวณวันครบกำหนดแบบเรียลไทม์พร้อมการแจ้งเตือนปฏิทิน`
        : `${t.subBrand}. 오버스테이 벌금 걱정 없이 실시간 D-Day 계산 및 캘린더 알림 등록.`}
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
    <!-- Left Column: Inputs -->
    <div class="md:col-span-5 space-y-6">
      <!-- Destination selector -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{t.step1Title}</h2>
        <div class="space-y-2">
          {#each DESTINATIONS as dest}
            <button
              type="button"
              class="w-full text-left rounded-xl p-3 border transition flex items-center justify-between {selectedDestId === dest.id ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950 font-bold shadow-2xs' : 'border-slate-200 hover:border-slate-300 text-slate-700'}"
              on:click={() => (selectedDestId = dest.id)}
            >
              <div class="flex items-center space-x-2.5">
                <span class="text-lg">{dest.flag}</span>
                <span class="text-xs">{$currentLang === 'en' ? dest.nameEn : $currentLang === 'th' ? dest.nameTh : dest.name}</span>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded-full {selectedDestId === dest.id ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-500'}">
                {dest.periodDays} {t.daysSuffix}
              </span>
            </button>
          {/each}
        </div>
      </div>

      <!-- Entry Date input -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <h2 class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.step2Title}</h2>
        <label class="block text-xs text-slate-600 mb-1.5 font-medium">{t.entryDateLabel}</label>
        <input
          type="date"
          bind:value={entryDate}
          class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-emerald-500 focus:outline-hidden"
        />
        <p class="mt-2 text-[11px] text-slate-400 leading-tight">
          {t.entryDateHint}
        </p>
      </div>
    </div>

    <!-- Right Column: Calculation Result Card -->
    <div class="md:col-span-7 space-y-6">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs relative overflow-hidden">
        <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">{selectedRule.flag}</span>
            <div>
              <h3 class="text-base font-black text-slate-900 leading-tight">
                {$currentLang === 'en' ? selectedRule.nameEn : $currentLang === 'th' ? selectedRule.nameTh : selectedRule.name}
              </h3>
              <p class="text-[11px] text-slate-500 mt-0.5">
                {$currentLang === 'en' ? selectedRule.descriptionEn : $currentLang === 'th' ? selectedRule.descriptionTh : selectedRule.description}
              </p>
            </div>
          </div>
          <span class="px-2.5 py-1 text-xs font-bold rounded-full border {getStatusBadge(result.status).bg}">
            {getStatusBadge(result.status).text}
          </span>
        </div>

        <!-- Big D-Day Metric -->
        <div class="rounded-2xl bg-slate-50 p-5 text-center border border-slate-200/80 mb-5">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.daysRemainingLabel}</span>
          <div class="mt-1 flex items-baseline justify-center space-x-2">
            <span class="text-4xl sm:text-5xl font-black {result.isOverdue ? 'text-red-600' : result.daysRemaining <= 7 ? 'text-rose-600' : 'text-emerald-700'}">
              {result.isOverdue ? `+${Math.abs(result.daysRemaining)} ${t.overdueSuffix}` : `D-${result.daysRemaining}`}
            </span>
            {#if !result.isOverdue}
              <span class="text-xs text-slate-500 font-semibold">({result.daysRemaining} {t.daysRemainingSuffix})</span>
            {/if}
          </div>
        </div>

        <!-- Deadline info details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
          <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
            <span class="text-slate-400 block text-[10px] uppercase font-bold">{t.deadlineLabel}</span>
            <span class="text-sm font-black text-slate-900 mt-0.5 block">{result.deadlineDate}</span>
          </div>

          {#if result.onlineWindowStart && result.onlineWindowEnd}
            <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">{t.onlineWindowLabel}</span>
              <span class="text-xs font-bold text-slate-800 mt-0.5 block">
                {result.onlineWindowStart} ~ {result.onlineWindowEnd}
              </span>
            </div>
          {:else}
            <div class="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <span class="text-slate-400 block text-[10px] uppercase font-bold">{t.maxStayLabel}</span>
              <span class="text-sm font-bold text-slate-800 mt-0.5 block">{selectedRule.periodDays} {t.daysSuffix}</span>
            </div>
          {/if}
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            class="flex-1 inline-flex items-center justify-center space-x-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
            on:click={downloadCalendar}
          >
            <span>{t.downloadIcs}</span>
          </button>

          {#if selectedRule.officialPortalUrl}
            <a
              href={selectedRule.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <span>{t.portalBtn}</span>
              <svg class="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          {/if}
        </div>
      </div>

      <!-- Tips Box -->
      <div class="rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 text-xs text-amber-950 space-y-2">
        <h4 class="font-bold text-amber-900 flex items-center space-x-1.5">
          <span>{t.tipsTitle}</span>
        </h4>
        <ul class="list-disc list-inside space-y-1 text-slate-700 leading-relaxed text-[11px]">
          {#each selectedRule.tips as tip}
            <li>{tip}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <!-- Ad Banner -->
  <div class="mt-8">
    <AdBanner />
  </div>

  <!-- FAQ Section -->
  <section class="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
    <h2 class="text-sm font-bold text-slate-900 mb-3">{t.faqTitle}</h2>
    <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
      <div>
        <p class="font-bold text-slate-800">{t.faq1Q}</p>
        <p class="mt-1 text-slate-600">{t.faq1A}</p>
      </div>
      <div>
        <p class="font-bold text-slate-800">{t.faq2Q}</p>
        <p class="mt-1 text-slate-600">{t.faq2A}</p>
      </div>
    </div>
  </section>
</div>
