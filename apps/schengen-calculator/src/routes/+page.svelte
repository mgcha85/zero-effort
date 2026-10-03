<script lang="ts">
  import { onMount } from 'svelte';
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';
  import type { TripEntry, SchengenStatus } from '$lib/types';
  import {
    calculateSchengen,
    getTodayDateStr,
    parseDateToDayIndex,
    dayIndexToDateStr
  } from '$lib/schengenCalculator';
  import { downloadIcsFile } from '$lib/icsExport';

  const STORAGE_KEY = 'zeroeffort_schengen_trips_v1';

  let trips: TripEntry[] = [];
  let referenceDate = getTodayDateStr();

  // Form inputs
  let inputEntryDate = '';
  let inputExitDate = '';
  let inputCountry = '';
  let inputNote = '';
  let formError = '';

  let status: SchengenStatus = {
    referenceDate,
    usedDays: 0,
    remainingDays: 90,
    isOverstay: false,
    overstayDays: 0,
    maxStayDays: 90,
    latestExitDate: referenceDate,
    completeResetDate: null,
    dayTimeline: []
  };

  onMount(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        trips = JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load trips from localStorage:', e);
    }
    recalculate();
  });

  function saveTrips() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
    } catch (e) {
      console.error('Failed to save trips to localStorage:', e);
    }
  }

  function recalculate() {
    if (!referenceDate) referenceDate = getTodayDateStr();
    status = calculateSchengen(trips, referenceDate);
  }

  function handleAddTrip() {
    formError = '';
    if (!inputEntryDate || !inputExitDate) {
      formError = 'Please select both entry and exit dates.';
      return;
    }

    const startIdx = parseDateToDayIndex(inputEntryDate);
    const endIdx = parseDateToDayIndex(inputExitDate);

    if (startIdx > endIdx) {
      formError = 'Exit date cannot be before entry date.';
      return;
    }

    const newTrip: TripEntry = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      entryDate: inputEntryDate,
      exitDate: inputExitDate,
      country: inputCountry.trim() || undefined,
      note: inputNote.trim() || undefined
    };

    trips = [...trips, newTrip].sort((a, b) => a.entryDate.localeCompare(b.entryDate));
    saveTrips();
    recalculate();

    // Reset inputs
    inputEntryDate = '';
    inputExitDate = '';
    inputCountry = '';
    inputNote = '';
  }

  function deleteTrip(id: string) {
    trips = trips.filter((t) => t.id !== id);
    saveTrips();
    recalculate();
  }

  function clearAllTrips() {
    if (confirm('Are you sure you want to clear all trips?')) {
      trips = [];
      saveTrips();
      recalculate();
    }
  }

  function loadSampleTrips() {
    const today = parseDateToDayIndex(getTodayDateStr());
    // Create 2 realistic sample past trips
    const trip1Start = dayIndexToDateStr(today - 120);
    const trip1End = dayIndexToDateStr(today - 95); // 26 days

    const trip2Start = dayIndexToDateStr(today - 60);
    const trip2End = dayIndexToDateStr(today - 45); // 16 days

    trips = [
      {
        id: 'sample_1',
        entryDate: trip1Start,
        exitDate: trip1End,
        country: 'France / Italy',
        note: 'Summer vacation'
      },
      {
        id: 'sample_2',
        entryDate: trip2Start,
        exitDate: trip2End,
        country: 'Spain / Portugal',
        note: 'Remote work trip'
      }
    ];
    saveTrips();
    recalculate();
  }

  function getTripDuration(entry: string, exit: string): number {
    return parseDateToDayIndex(exit) - parseDateToDayIndex(entry) + 1;
  }

  const jsonLd = buildWebAppJsonLd({
    name: 'Schengen 90/180 Day Rollover Tracker',
    url: 'https://schengen.minitoolbox.dev',
    description: 'Accurate EU 90/180-day rolling window calculator for non-EU travelers and digital nomads. Calculate remaining days, rollover simulations, and departure deadlines with zero server tracking.',
    applicationCategory: 'TravelApplication'
  });

  const jsonLdFaq = buildFaqJsonLd([
    {
      question: 'What is the Schengen 90/180-day rolling rule?',
      answer: 'Non-EU travelers can stay up to 90 days within any rolling 180-day window across the Schengen area. The 180-day period looks backward from each single day of stay.'
    },
    {
      question: 'Which countries belong to the Schengen Area?',
      answer: '29 countries: Austria, Belgium, Bulgaria, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, Switzerland.'
    },
    {
      question: 'How is continuous stay simulated?',
      answer: 'The simulator calculates if you enter on a given date and stay day-by-day, on which exact date your rolling 180-day window count reaches 90 days. The previous day is your latest legal exit date.'
    }
  ]);
</script>

<svelte:head>
  <title>Schengen 90/180 Day Rollover Tracker - Free Visa Calculator</title>
  <meta
    name="description"
    content="Accurate Schengen 90/180 day rolling window calculator. Check remaining days, rollover timeline simulations, and calendar deadline export. 100% private, no signup."
  />
  <meta
    name="keywords"
    content="schengen calculator, schengen 90 180 rule, rolling window calculator, schengen visa tracker, digital nomad visa calculator, europe stay calculator, schengen overstay check"
  />
  <link rel="canonical" href="https://schengen.minitoolbox.dev/" />
  <meta property="og:title" content="Schengen 90/180 Day Rollover Tracker" />
  <meta property="og:description" content="Accurate rolling window calculator for European Schengen travel. Free, private, and zero server uploads." />
  <meta property="og:url" content="https://schengen.minitoolbox.dev/" />
  <meta property="og:image" content="https://schengen.minitoolbox.dev/icon-512.png" />
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
    <div class="mt-3 inline-flex items-center text-xs font-semibold text-blue-800 bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-200">
      <span>{translations[$currentLang].privacyBadge}</span>
    </div>
  </div>

  <!-- Key Metrics & Simulation Box -->
  <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
      <div>
        <h2 class="text-base font-bold text-slate-900">{translations[$currentLang].simTitle}</h2>
        <p class="text-xs text-slate-500">{translations[$currentLang].simSub}</p>
      </div>

      <div class="flex items-center gap-2">
        <label for="ref-date" class="text-xs font-semibold text-slate-700 whitespace-nowrap">
          {translations[$currentLang].refDateLabel}:
        </label>
        <input
          id="ref-date"
          type="date"
          bind:value={referenceDate}
          on:change={recalculate}
          class="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>

    <!-- Overstay Alert Banner -->
    {#if status.isOverstay}
      <div class="mt-4 rounded-xl bg-rose-50 border border-rose-300 p-4 text-xs text-rose-800 flex items-center gap-3">
        <span class="text-2xl">🚨</span>
        <div>
          <strong class="font-bold">{translations[$currentLang].overstayAlert}</strong>
          <p class="mt-0.5 text-rose-700">
            You have used {status.usedDays} days in the 180-day window ending on {status.referenceDate} (+{status.overstayDays} days over the legal 90-day limit).
          </p>
        </div>
      </div>
    {/if}

    <!-- Status Cards Grid -->
    <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <!-- Days Used Card -->
      <div class="rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-center">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {translations[$currentLang].usedDays}
        </div>
        <div class="mt-2 text-3xl font-black {status.usedDays > 90 ? 'text-rose-600' : 'text-slate-800'}">
          {status.usedDays} <span class="text-sm font-semibold text-slate-400">/ 90</span>
        </div>
        <div class="mt-2 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 rounded-full transition-all duration-300 {status.usedDays > 90 ? 'bg-rose-500' : status.usedDays > 75 ? 'bg-amber-500' : 'bg-blue-600'}"
            style="width: {Math.min(100, (status.usedDays / 90) * 100)}%"
          ></div>
        </div>
      </div>

      <!-- Days Remaining Card -->
      <div class="rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-center">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          {translations[$currentLang].remainingDays}
        </div>
        <div class="mt-2 text-3xl font-black {status.remainingDays <= 15 ? 'text-amber-600' : 'text-emerald-700'}">
          {status.remainingDays} <span class="text-sm font-semibold text-slate-400">{translations[$currentLang].days}</span>
        </div>
        <div class="mt-2 text-xs text-slate-500 font-medium">
          {#if status.remainingDays > 0}
            Safe to stay or travel
          {:else}
            Must leave Schengen area
          {/if}
        </div>
      </div>

      <!-- Max Continuous Stay Simulation Card -->
      <div class="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-center">
        <div class="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
          {translations[$currentLang].maxContinuousStay}
        </div>
        <div class="mt-2 text-3xl font-black text-blue-950">
          {status.maxStayDays} <span class="text-sm font-semibold text-blue-700">{translations[$currentLang].days}</span>
        </div>
        <div class="mt-2 text-xs font-semibold text-blue-800">
          {translations[$currentLang].latestExit}: <span class="underline">{status.latestExitDate}</span>
        </div>
      </div>
    </div>

    <!-- Action Bar: ics download & reset date -->
    <div class="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
      <div class="text-xs text-slate-600">
        {#if status.completeResetDate}
          <span>🔄 {translations[$currentLang].completeReset}: <strong>{status.completeResetDate}</strong></span>
        {:else}
          <span>No recorded past stays. Full 90 days available anytime.</span>
        {/if}
      </div>

      {#if status.maxStayDays > 0}
        <button
          type="button"
          on:click={() => downloadIcsFile(status.latestExitDate, status.maxStayDays)}
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-blue-800 transition active:scale-95"
        >
          <span>{translations[$currentLang].downloadIcs}</span>
        </button>
      {/if}
    </div>
  </div>

  <!-- 180-Day Rolling Timeline Bar -->
  {#if status.dayTimeline.length > 0}
    <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <div>
          <h3 class="text-sm font-bold text-slate-900">{translations[$currentLang].timelineTitle}</h3>
          <p class="text-xs text-slate-500">{translations[$currentLang].timelineSub} ({status.dayTimeline[0].dateStr} ~ {status.dayTimeline[status.dayTimeline.length - 1].dateStr})</p>
        </div>

        <div class="flex items-center gap-3 text-xs font-medium text-slate-600">
          <span class="inline-flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-xs bg-blue-600"></span>
            <span>{translations[$currentLang].inSchengen}</span>
          </span>
          <span class="inline-flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-xs bg-slate-200"></span>
            <span>{translations[$currentLang].outSchengen}</span>
          </span>
        </div>
      </div>

      <!-- Mini Heatmap Bar (180 segments) -->
      <div class="flex w-full h-5 rounded-md overflow-hidden bg-slate-100 border border-slate-200">
        {#each status.dayTimeline as day}
          <div
            class="flex-1 h-full transition-colors {day.isOverstay ? 'bg-rose-500' : day.isStay ? 'bg-blue-600' : 'bg-slate-200 hover:bg-slate-300'}"
            title="{day.dateStr}: {day.isStay ? 'In Schengen' : 'Out'} (180d window used: {day.count180}d)"
          ></div>
        {/each}
      </div>
      <div class="mt-2 flex justify-between text-[10px] text-slate-400 font-mono">
        <span>{status.dayTimeline[0].dateStr}</span>
        <span>{status.dayTimeline[Math.floor(status.dayTimeline.length / 2)].dateStr}</span>
        <span>{status.dayTimeline[status.dayTimeline.length - 1].dateStr}</span>
      </div>
    </div>
  {/if}

  <!-- Trip Management Section -->
  <div class="mb-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
      <div>
        <h2 class="text-base font-bold text-slate-900">{translations[$currentLang].addTrip}</h2>
        <p class="text-xs text-slate-500">Record past trips and upcoming planned trips</p>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          on:click={loadSampleTrips}
          class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
        >
          {translations[$currentLang].loadSample}
        </button>
        {#if trips.length > 0}
          <button
            type="button"
            on:click={clearAllTrips}
            class="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
          >
            {translations[$currentLang].clearAll}
          </button>
        {/if}
      </div>
    </div>

    <!-- Add Trip Form -->
    <form on:submit|preventDefault={handleAddTrip} class="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-3">
      <div class="sm:col-span-1">
        <label for="trip-entry" class="block text-[11px] font-bold text-slate-600 uppercase mb-1">
          {translations[$currentLang].entryDate} *
        </label>
        <input
          id="trip-entry"
          type="date"
          bind:value={inputEntryDate}
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div class="sm:col-span-1">
        <label for="trip-exit" class="block text-[11px] font-bold text-slate-600 uppercase mb-1">
          {translations[$currentLang].exitDate} *
        </label>
        <input
          id="trip-exit"
          type="date"
          bind:value={inputExitDate}
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>

      <div class="sm:col-span-1">
        <label for="trip-country" class="block text-[11px] font-bold text-slate-600 uppercase mb-1">
          {translations[$currentLang].country}
        </label>
        <input
          id="trip-country"
          type="text"
          bind:value={inputCountry}
          placeholder="e.g. France, Germany"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div class="sm:col-span-1">
        <label for="trip-note" class="block text-[11px] font-bold text-slate-600 uppercase mb-1">
          {translations[$currentLang].note}
        </label>
        <input
          id="trip-note"
          type="text"
          bind:value={inputNote}
          placeholder="e.g. Vacation, Conference"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div class="sm:col-span-1 flex items-end">
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition"
        >
          {translations[$currentLang].addBtn}
        </button>
      </div>
    </form>

    {#if formError}
      <div class="mt-2 text-xs font-semibold text-rose-600">
        ⚠️ {formError}
      </div>
    {/if}

    <!-- Trip List Table -->
    <div class="mt-6">
      <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
        {translations[$currentLang].myTrips} ({trips.length})
      </h3>

      {#if trips.length === 0}
        <div class="rounded-xl border border-dashed border-slate-200 p-6 text-center text-xs text-slate-400">
          {translations[$currentLang].noTrips}
        </div>
      {:else}
        <div class="overflow-x-auto rounded-xl border border-slate-200">
          <table class="w-full text-left text-xs text-slate-700">
            <thead class="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th class="px-4 py-2.5">Dates (Entry → Exit)</th>
                <th class="px-4 py-2.5">{translations[$currentLang].duration}</th>
                <th class="px-4 py-2.5">{translations[$currentLang].country}</th>
                <th class="px-4 py-2.5">{translations[$currentLang].note}</th>
                <th class="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each trips as trip}
                {@const duration = getTripDuration(trip.entryDate, trip.exitDate)}
                <tr class="hover:bg-slate-50/50 transition">
                  <td class="px-4 py-2.5 font-medium text-slate-900 whitespace-nowrap">
                    {trip.entryDate} → {trip.exitDate}
                  </td>
                  <td class="px-4 py-2.5 font-bold text-blue-700 whitespace-nowrap">
                    {duration} {translations[$currentLang].days}
                  </td>
                  <td class="px-4 py-2.5 text-slate-600">
                    {trip.country || '-'}
                  </td>
                  <td class="px-4 py-2.5 text-slate-500">
                    {trip.note || '-'}
                  </td>
                  <td class="px-4 py-2.5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      on:click={() => deleteTrip(trip.id)}
                      class="text-xs font-semibold text-rose-600 hover:text-rose-800 transition"
                    >
                      {translations[$currentLang].delete}
                    </button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>

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
