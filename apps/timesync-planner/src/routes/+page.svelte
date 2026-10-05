<script lang="ts">
  import { onMount } from 'svelte';
  import { currentLang, translations } from '$lib/langStore';
  import { POPULAR_CITIES, type CityInfo, getSlotCategory, type SlotCategory } from '$lib/timezoneData';

  $: t = translations[$currentLang];

  // Active comparison cities (Default: Paris, New York, San Francisco, London, Seoul)
  let activeCities: CityInfo[] = [
    POPULAR_CITIES.find(c => c.id === 'paris')!,
    POPULAR_CITIES.find(c => c.id === 'new_york')!,
    POPULAR_CITIES.find(c => c.id === 'london')!,
    POPULAR_CITIES.find(c => c.id === 'san_francisco')!,
    POPULAR_CITIES.find(c => c.id === 'seoul')!
  ].filter(Boolean);

  let selectedHour: number = 14; // default reference hour in 1st city
  let copied: boolean = false;
  let showAddDropdown: boolean = false;

  onMount(() => {
    try {
      const now = new Date();
      // align with 1st city local hour
      if (activeCities.length > 0) {
        const parts = new Intl.DateTimeFormat('en-US', {
          timeZone: activeCities[0].timezone,
          hour: 'numeric',
          hour12: false
        }).formatToParts(now);
        const h = parts.find(p => p.type === 'hour');
        if (h) selectedHour = parseInt(h.value, 10) % 24;
      }
    } catch (e) {}
  });

  // Calculate local hour in target timezone given hour in base city (activeCities[0])
  function getCityHour(baseHour: number, targetTz: string): number {
    if (activeCities.length === 0) return baseHour;
    const baseTz = activeCities[0].timezone;
    const now = new Date();
    // find base city offset
    const baseFormatter = new Intl.DateTimeFormat('en-US', { timeZone: baseTz, hour: 'numeric', hour12: false });
    const targetFormatter = new Intl.DateTimeFormat('en-US', { timeZone: targetTz, hour: 'numeric', hour12: false });
    
    // Create reference date today at baseHour in baseTz
    const d = new Date();
    // approximate offset difference
    const baseHourNow = parseInt(baseFormatter.formatToParts(d).find(p => p.type === 'hour')?.value || '0', 10);
    const targetHourNow = parseInt(targetFormatter.formatToParts(d).find(p => p.type === 'hour')?.value || '0', 10);
    const diff = (targetHourNow - baseHourNow + 24) % 24;
    return (baseHour + diff) % 24;
  }

  function getCityFormattedTime(baseHour: number, targetTz: string): string {
    const h = getCityHour(baseHour, targetTz);
    return `${String(h).padStart(2, '0')}:00`;
  }

  function removeCity(id: string) {
    if (activeCities.length <= 2) return; // Keep at least 2
    activeCities = activeCities.filter(c => c.id !== id);
  }

  function addCity(city: CityInfo) {
    if (!activeCities.some(c => c.id === city.id)) {
      activeCities = [...activeCities, city];
    }
    showAddDropdown = false;
  }

  // Calculate golden overlap hours for all active cities
  $: goldenHours = (() => {
    if (activeCities.length === 0) return [];
    const results: number[] = [];
    for (let h = 0; h < 24; h++) {
      let allAwake = true;
      for (const city of activeCities) {
        const cityH = getCityHour(h, city.timezone);
        // Working or reasonable waking hour: 08:00 to 19:00
        if (cityH < 8 || cityH > 19) {
          allAwake = false;
          break;
        }
      }
      if (allAwake) results.push(h);
    }
    return results;
  })();

  function copyMeetingSchedule() {
    let text = `📅 Nomad TimeSync Meeting Slots (${activeCities[0].name[$currentLang] || activeCities[0].name.en} ${selectedHour}:00)\n\n`;
    activeCities.forEach(c => {
      const hStr = getCityFormattedTime(selectedHour, c.timezone);
      const cName = c.name[$currentLang] || c.name.en;
      text += `${c.flag} ${cName} (${c.country}): ${hStr}\n`;
    });
    text += `\nGenerated via https://timesync.minitoolbox.dev (Zero-Upload Client-Side Planner)`;
    navigator.clipboard.writeText(text);
    copied = true;
    setTimeout(() => (copied = false), 2500);
  }

  function downloadIcs() {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const startStr = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(selectedHour)}0000Z`;
    const endStr = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad((selectedHour + 1) % 24)}0000Z`;

    let desc = 'Nomad TimeSync Coordinated Meeting:\n';
    activeCities.forEach(c => {
      desc += `${c.flag} ${c.name[$currentLang] || c.name.en}: ${getCityFormattedTime(selectedHour, c.timezone)}\n`;
    });

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MiniToolbox//Nomad TimeSync//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:timesync-${Date.now()}@minitoolbox.dev`,
      `DTSTAMP:${startStr}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      'SUMMARY:Remote Cross-Border Team Sync (Nomad TimeSync)',
      `DESCRIPTION:${desc}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-${selectedHour}h00.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  $: availableCities = POPULAR_CITIES.filter(c => !activeCities.some(ac => ac.id === c.id));
</script>

<svelte:head>
  <title>{t.siteTitle} | {t.heroTitle}</title>
  <meta name="description" content={t.heroSub} />
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Nomad TimeSync',
      url: 'https://timesync.minitoolbox.dev',
      description: 'Zero-upload, 100% client-side timezone meeting planner and golden hours overlap finder for digital nomads and remote teams.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any'
    })}
  </script>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
  <!-- Hero Section -->
  <div class="mb-8 text-center sm:mb-10">
    <div class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200/60 mb-3">
      <span>{t.badge}</span>
    </div>
    <h1 class="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
      {t.heroTitle}
    </h1>
    <p class="mx-auto mt-2.5 max-w-2xl text-sm sm:text-base text-slate-600 leading-relaxed">
      {t.heroSub}
    </p>
    <div class="mt-3 text-xs text-slate-500 font-medium">
      {t.privacyBadge}
    </div>
  </div>

  <!-- Golden Hours Overlap Card -->
  <div class="mb-8 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 p-5 sm:p-6 border border-emerald-200/80 shadow-xs">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
          {t.goldenHoursTitle}
        </h2>
        <p class="text-xs sm:text-sm text-slate-600 mt-1">
          {t.goldenHoursDesc}
        </p>
        
        <div class="mt-3 flex flex-wrap items-center gap-2">
          {#if goldenHours.length > 0}
            <span class="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
              {t.goldenSlotFound}
            </span>
            {#each goldenHours as gh}
              <button
                type="button"
                class="px-2.5 py-1 text-xs font-extrabold rounded-md transition {selectedHour === gh ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'}"
                on:click={() => (selectedHour = gh)}
              >
                {activeCities[0].flag} {String(gh).padStart(2, '0')}:00
              </button>
            {/each}
          {:else}
            <span class="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              {t.noGoldenHours}
            </span>
          {/if}
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2 sm:self-center w-full sm:w-auto">
        <button
          type="button"
          class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition active:scale-98"
          on:click={copyMeetingSchedule}
        >
          {copied ? t.copiedText : t.copyScheduleBtn}
        </button>
        <button
          type="button"
          class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-xs transition active:scale-98"
          on:click={downloadIcs}
        >
          {t.downloadIcsBtn}
        </button>
      </div>
    </div>
  </div>

  <!-- Legend & Master Hour Slider -->
  <div class="mb-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div class="w-full sm:w-1/2">
      <div class="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
        <span>{t.referenceCity}</span>
        <span class="text-indigo-600 font-extrabold text-sm">{activeCities[0].flag} {String(selectedHour).padStart(2, '0')}:00</span>
      </div>
      <input
        type="range"
        min="0"
        max="23"
        bind:value={selectedHour}
        class="w-full accent-indigo-600 cursor-pointer"
      />
    </div>

    <!-- Color Legend -->
    <div class="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-xs bg-emerald-500"></span>
        <span>{t.legendWork}</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-xs bg-amber-400"></span>
        <span>{t.legendFlex}</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-3 h-3 rounded-xs bg-slate-200"></span>
        <span>{t.legendSleep}</span>
      </div>
    </div>
  </div>

  <!-- Cities Grid Visualizer -->
  <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden mb-8">
    <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
      <span class="text-xs font-bold uppercase tracking-wider text-slate-500">{t.selectedCities} ({activeCities.length})</span>
      
      <!-- Add City Button -->
      <div class="relative">
        <button
          type="button"
          class="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-200 transition"
          on:click={() => (showAddDropdown = !showAddDropdown)}
        >
          {t.addCityBtn}
        </button>

        {#if showAddDropdown}
          <div class="absolute right-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl border border-slate-200 z-50 max-h-60 overflow-y-auto">
            {#each availableCities as city}
              <button
                type="button"
                class="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-900 rounded-md flex items-center justify-between"
                on:click={() => addCity(city)}
              >
                <span>{city.flag} {city.name[$currentLang] || city.name.en}</span>
                <span class="text-[10px] text-slate-400">{city.country}</span>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>

    <!-- City Rows -->
    <div class="divide-y divide-slate-100 overflow-x-auto">
      {#each activeCities as city, idx}
        {@const cityCurH = getCityHour(selectedHour, city.timezone)}
        <div class="p-4 flex flex-col lg:flex-row lg:items-center gap-3 hover:bg-slate-50/40 transition">
          <!-- City Header Column -->
          <div class="w-full lg:w-48 shrink-0 flex items-center justify-between lg:justify-start lg:gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xl">{city.flag}</span>
              <div>
                <div class="text-sm font-bold text-slate-900">{city.name[$currentLang] || city.name.en}</div>
                <div class="text-[10px] text-slate-400 font-medium">{city.country}</div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <span class="text-xs font-black px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono">
                {String(cityCurH).padStart(2, '0')}:00
              </span>
              {#if activeCities.length > 2}
                <button
                  type="button"
                  class="text-slate-400 hover:text-rose-600 text-xs p-1"
                  on:click={() => removeCity(city.id)}
                  title="Remove city"
                >
                  ✕
                </button>
              {/if}
            </div>
          </div>

          <!-- 24-Hour Timeline Bar -->
          <div class="flex-1 grid grid-cols-24 gap-0.5 min-w-[580px]">
            {#each Array(24) as _, h}
              {@const cellH = getCityHour(h, city.timezone)}
              {@const category = getSlotCategory(cellH)}
              {@const isSelected = selectedHour === h}
              
              <button
                type="button"
                class="h-9 flex flex-col items-center justify-center rounded-xs transition text-[10px] font-mono font-semibold relative {
                  isSelected ? 'ring-2 ring-indigo-600 ring-offset-1 z-10' : ''
                } {
                  category === 'work' ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200' :
                  category === 'flex' ? 'bg-amber-100 text-amber-900 hover:bg-amber-200' :
                  'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }"
                on:click={() => (selectedHour = h)}
                title="{city.name[$currentLang] || city.name.en}: {String(cellH).padStart(2, '0')}:00"
              >
                <span>{cellH}</span>
                {#if isSelected}
                  <span class="absolute -bottom-1 w-1 h-1 rounded-full bg-indigo-600"></span>
                {/if}
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- FAQ Section -->
  <div class="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs mb-8">
    <h3 class="text-base sm:text-lg font-bold text-slate-900 mb-4">{t.faqTitle}</h3>
    <div class="space-y-4 text-xs sm:text-sm text-slate-600">
      <div>
        <p class="font-bold text-slate-800">{t.q1}</p>
        <p class="mt-1 leading-relaxed">{t.a1}</p>
      </div>
      <div>
        <p class="font-bold text-slate-800">{t.q2}</p>
        <p class="mt-1 leading-relaxed">{t.a2}</p>
      </div>
    </div>
  </div>
</div>
