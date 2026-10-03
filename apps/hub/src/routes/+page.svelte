<script lang="ts">
  import { TOOLS, type ToolItem } from '$lib/tools';
  import { currentLang, translations } from '$lib/langStore';
  import { AdBanner } from '@zero-effort/shared-ui';

  let selectedCategory: string = 'all';
  let searchQuery: string = '';

  $: t = translations[$currentLang];

  $: filteredTools = TOOLS.filter(tool => {
    const matchCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const nameMatch = $currentLang === 'en' ? tool.nameEn : tool.name;
    const descMatch = $currentLang === 'en' ? tool.descriptionEn : tool.description;
    const taglineMatch = $currentLang === 'en' ? tool.taglineEn : tool.tagline;

    const matchQuery = !searchQuery || 
      nameMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      taglineMatch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.subdomain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  $: categories = [
    { id: 'all', label: t.categories.all },
    { id: 'privacy', label: t.categories.privacy },
    { id: 'travel', label: t.categories.travel },
    { id: 'career', label: t.categories.career },
    { id: 'utility', label: t.categories.utility },
    { id: 'entertainment', label: t.categories.entertainment }
  ];
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
  <!-- Hero Section -->
  <div class="relative overflow-hidden rounded-3xl bg-linear-to-b from-indigo-500/10 via-white to-white p-8 sm:p-12 border border-indigo-100/80 text-center shadow-xs mb-10">
    <div class="inline-flex items-center space-x-2 rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-700 mb-4">
      <span>{t.heroBadge}</span>
    </div>

    <h1 class="text-3xl font-black text-slate-900 sm:text-5xl tracking-tight leading-tight">
      {t.heroTitlePrefix}<span class="bg-linear-to-r from-indigo-600 to-rose-600 bg-clip-text text-transparent">{t.heroTitleHighlight}</span>{t.heroTitleSuffix}
    </h1>
    <p class="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
      {t.heroDesc}
    </p>

    <!-- Search bar -->
    <div class="mt-8 max-w-md mx-auto relative">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder={t.searchPlaceholder}
        class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 pl-11 text-xs sm:text-sm shadow-sm focus:border-indigo-500 focus:outline-hidden"
      />
      <svg class="h-4 w-4 text-slate-400 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
  </div>

  <!-- Category filter chips -->
  <div class="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
    {#each categories as cat}
      <button
        type="button"
        class="shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-2xs {selectedCategory === cat.id ? 'bg-slate-900 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}"
        on:click={() => (selectedCategory = cat.id)}
      >
        {cat.label}
      </button>
    {/each}
  </div>

  <!-- Tools Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredTools as tool (tool.id)}
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex flex-col justify-between rounded-3xl bg-white p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
      >
        <div>
          <!-- Header: Icon & Badges -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs group-hover:scale-105 transition">
              <img src={tool.faviconPath} alt={$currentLang === 'en' ? tool.nameEn : tool.name} class="h-8 w-8 object-contain" />
            </div>
            <div class="flex flex-col items-end space-y-1">
              <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {$currentLang === 'en' ? tool.targetRegionEn : tool.targetRegion}
              </span>
              <span class="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
                {$currentLang === 'en' ? tool.badgeEn : tool.badge}
              </span>
            </div>
          </div>

          <!-- Tool Title & Subdomain -->
          <h2 class="text-base font-black text-slate-900 group-hover:text-indigo-600 transition flex items-center space-x-1.5">
            <span>{$currentLang === 'en' ? tool.nameEn : tool.name}</span>
            <svg class="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </h2>
          <span class="text-[11px] font-mono font-medium text-slate-600 block mt-0.5">
            {tool.subdomain}.minitoolbox.dev
          </span>

          <p class="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
            {$currentLang === 'en' ? tool.descriptionEn : tool.description}
          </p>

          <!-- Feature Bullets -->
          <ul class="mt-4 space-y-1 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
            {#each ($currentLang === 'en' ? tool.featuresEn : tool.features) as feat}
              <li class="flex items-center space-x-1.5">
                <span class="text-indigo-500">✓</span>
                <span>{feat}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Launch Button -->
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-indigo-600 group-hover:underline">
            {t.launchBtn}
          </span>
          <span class="text-[10px] text-slate-400">{t.freeBadge}</span>
        </div>
      </a>
    {/each}
  </div>

  <!-- Ad Banner -->
  <div class="mt-12">
    <AdBanner />
  </div>

  <!-- Mission & Privacy Guarantee Banner -->
  <section class="mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs">
    <h2 class="text-base font-black text-slate-900 mb-3">{t.charterTitle}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
      {#each t.charterItems as item}
        <div class="space-y-1.5">
          <h4 class="font-bold text-slate-900 text-sm">{item.title}</h4>
          <p>{item.desc}</p>
        </div>
      {/each}
    </div>
  </section>
</div>
