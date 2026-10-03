<script lang="ts">
  import { onMount } from 'svelte';
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';
  import type { City, ResidenceType, CivilStatus, ChecklistItem } from '$lib/types';
  import { generateAnmeldungChecklist } from '$lib/checklistData';
  import MaskCanvas from '$lib/MaskCanvas.svelte';

  let selectedCity: City = 'berlin';
  let selectedResidence: ResidenceType = 'wg_sublet';
  let selectedStatus: CivilStatus = 'employed';

  let checklist: ChecklistItem[] = [];
  let checkedItems: Record<string, boolean> = {};

  const STORAGE_KEY = 'anmeldung_checked_items_v1';

  onMount(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        checkedItems = JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    updateChecklist();
  });

  function updateChecklist() {
    checklist = generateAnmeldungChecklist(selectedCity, selectedResidence, selectedStatus, $currentLang);
  }

  $: $currentLang, selectedCity, selectedResidence, selectedStatus, updateChecklist();

  function toggleCheck(id: string) {
    checkedItems[id] = !checkedItems[id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch (e) {
      console.error(e);
    }
  }

  function getCompletedCount(): number {
    return checklist.filter((item) => checkedItems[item.id]).length;
  }

  const jsonLd = buildWebAppJsonLd({
    name: 'German Anmeldung Prep & Safe Document Masker',
    url: 'https://zero-effort-anmeldung.vercel.app',
    description: 'Personalized German Bürgeramt registration checklist and 100% in-browser private document redactor. Zero server uploads.',
    applicationCategory: 'ProductivityApplication'
  });

  const jsonLdFaq = buildFaqJsonLd([
    {
      question: 'Is a rental contract (Mietvertrag) enough for registration?',
      answer: 'No! Since November 2015 (§ 19 Bundesmeldegesetz), a signed Wohnungsgeberbestätigung from the landlord is strictly mandatory. Rental contracts alone are universally rejected.'
    },
    {
      question: 'What is the 14-day legal deadline?',
      answer: 'German law specifies you must register within 14 days of moving in. However, due to severe appointment shortages in cities like Berlin or Munich, booking the appointment itself within 14 days or keeping your booking proof is accepted.'
    },
    {
      question: 'Is my uploaded scan safe from leaks?',
      answer: '100% safe. This web application runs entirely inside your browser memory using HTML5 Canvas. Zero bytes are uploaded to the internet.'
    }
  ]);
</script>

<svelte:head>
  <title>독일 안멜둥 서류 마스커 - Anmeldung Prep & Safe Redaction (Bürgeramt)</title>
  <meta
    name="description"
    content="독일 관공서(Bürgeramt) 전입신고 필수 서류 맞춤 체크리스트 및 계약서/여권 민감정보 100% 브라우저 로컬 안심 마스킹 도구."
  />
  <meta
    name="keywords"
    content="독일 전입신고, 안멜둥 서류, anmeldung checklist, bürgeramt termin, wohnungsgeberbestätigung, 독일 집주인 확인서, 여권 마스킹, 계약서 개인정보 가리기"
  />
  <link rel="canonical" href="https://zero-effort-anmeldung.vercel.app/" />
  <meta property="og:title" content="독일 안멜둥 서류 마스커 - Anmeldung Prep & Safe Masker" />
  <meta property="og:description" content="독일 전입신고 서류 체크리스트 및 브라우저 로컬 안심 서류 마스킹." />
  <meta property="og:url" content="https://zero-effort-anmeldung.vercel.app/" />
  <meta property="og:image" content="https://zero-effort-anmeldung.vercel.app/icon-512.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Hero Section -->
  <div class="mb-8 text-center">
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      {translations[$currentLang].heroTitle}
    </h1>
    <p class="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
      {translations[$currentLang].heroSub}
    </p>
    <div class="mt-3 inline-flex items-center text-xs font-semibold text-amber-900 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
      <span>{translations[$currentLang].privacyBadge}</span>
    </div>
  </div>

  <!-- Interactive 3-Question Filter -->
  <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- 1. City -->
      <div>
        <label for="city-select" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          {translations[$currentLang].selectCity}
        </label>
        <select
          id="city-select"
          bind:value={selectedCity}
          class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
        >
          <option value="berlin">Berlin (베를린)</option>
          <option value="munich">München (뮌헨)</option>
          <option value="hamburg">Hamburg (함부르크)</option>
          <option value="frankfurt">Frankfurt am Main (프랑크푸르트)</option>
          <option value="cologne">Köln (쾰른)</option>
          <option value="other">Other City in Germany (기타 도시)</option>
        </select>
      </div>

      <!-- 2. Housing -->
      <div>
        <label for="residence-select" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          {translations[$currentLang].selectResidence}
        </label>
        <select
          id="residence-select"
          bind:value={selectedResidence}
          class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
        >
          <option value="wg_sublet">WG / Sublet (셰어하우스, 쯔비셴)</option>
          <option value="own_apartment">Direct Lease (단독 임대 계약)</option>
          <option value="dormitory">Student Dorm (대학 기숙사)</option>
          <option value="host_family">Host Family / Guest (홈스테이)</option>
        </select>
      </div>

      <!-- 3. Status -->
      <div>
        <label for="status-select" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          {translations[$currentLang].selectStatus}
        </label>
        <select
          id="status-select"
          bind:value={selectedStatus}
          class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden"
        >
          <option value="employed">Employed / Work Visa (직장인/취업비자)</option>
          <option value="student">Student / Language Learner (학생/어학연수)</option>
          <option value="single">Single (미혼 단독 전입)</option>
          <option value="married">Married with Family (기혼 가족 동반)</option>
        </select>
      </div>
    </div>
  </div>

  <!-- Checklist Result Section -->
  <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
    <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
      <div>
        <h2 class="text-base font-bold text-slate-900">{translations[$currentLang].checklistTitle}</h2>
        <p class="text-xs text-slate-500">{translations[$currentLang].checklistSub}</p>
      </div>
      <div class="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
        준비 완료: {getCompletedCount()} / {checklist.length}
      </div>
    </div>

    <div class="space-y-3">
      {#each checklist as item}
        <div
          class="rounded-xl border p-4 transition {checkedItems[item.id] ? 'bg-slate-50/80 border-slate-200 opacity-75' : 'bg-white border-slate-200 hover:border-blue-300 shadow-2xs'}"
        >
          <div class="flex items-start gap-3">
            <input
              type="checkbox"
              id={item.id}
              checked={checkedItems[item.id] || false}
              on:change={() => toggleCheck(item.id)}
              class="mt-1 h-4 w-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <label for={item.id} class="text-sm font-bold {checkedItems[item.id] ? 'line-through text-slate-400' : 'text-slate-900'} cursor-pointer">
                  {item.title}
                </label>
                <span class="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-600">
                  {item.germanTerm}
                </span>
                {#if item.required}
                  <span class="rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                    {translations[$currentLang].requiredBadge}
                  </span>
                {:else}
                  <span class="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                    {translations[$currentLang].optionalBadge}
                  </span>
                {/if}
              </div>
              <p class="mt-1 text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
              <div class="mt-2 rounded-lg bg-amber-50/70 p-2.5 text-[11px] text-amber-900 border border-amber-200/60">
                <strong>💡 Tip:</strong> {item.criticalTips}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Landlord Confirmation 6-Point Audit Card -->
  <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xl">🏛️</span>
      <h3 class="text-sm font-bold text-slate-900">{translations[$currentLang].landlordCheckTitle}</h3>
    </div>
    <p class="text-xs text-slate-600 mb-4">{translations[$currentLang].landlordCheckSub}</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200">
        <span class="text-emerald-600 font-bold">✓</span>
        <span>{translations[$currentLang].item1}</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200">
        <span class="text-emerald-600 font-bold">✓</span>
        <span>{translations[$currentLang].item2}</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200">
        <span class="text-emerald-600 font-bold">✓</span>
        <span>{translations[$currentLang].item3}</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200">
        <span class="text-emerald-600 font-bold">✓</span>
        <span>{translations[$currentLang].item4}</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200">
        <span class="text-emerald-600 font-bold">✓</span>
        <span>{translations[$currentLang].item5}</span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-slate-50 p-2.5 border border-slate-200">
        <span class="text-emerald-600 font-bold">✓</span>
        <span>{translations[$currentLang].item6}</span>
      </div>
    </div>
  </div>

  <!-- Safe Document Masking Canvas Tool -->
  <MaskCanvas lang={$currentLang} />

  <AdBanner />

  <!-- FAQ Section -->
  <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-base font-bold text-slate-900 mb-3">{translations[$currentLang].faqTitle}</h2>
    <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">Q. {translations[$currentLang].q1}</strong>
        <p class="mt-1 text-slate-500">{translations[$currentLang].a1}</p>
      </div>

      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">Q. {translations[$currentLang].q2}</strong>
        <p class="mt-1 text-slate-500">{translations[$currentLang].a2}</p>
      </div>

      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">Q. {translations[$currentLang].q3}</strong>
        <p class="mt-1 text-slate-500">{translations[$currentLang].a3}</p>
      </div>
    </div>
  </section>
</div>
