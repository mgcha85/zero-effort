<script lang="ts">
  import { TOOLS, getLocalizedTool, type ToolItem, type ToolColor } from '$lib/tools';
  import { currentLang, translations } from '$lib/langStore';
  import { setFaviconByRoute } from '$lib/faviconStore';
  import { AdBanner } from '@zero-effort/shared-ui';

  let selectedCategory: string = 'all';
  let searchQuery: string = '';

  $: setFaviconByRoute('/', selectedCategory);
  $: t = translations[$currentLang] || translations.en;

  $: filteredTools = TOOLS.filter(tool => {
    const matchCat = selectedCategory === 'all' || tool.category === selectedCategory;
    const loc = getLocalizedTool(tool, $currentLang);

    const matchQuery = !searchQuery || 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const COLOR_STYLES: Record<ToolColor, {
    badge: string;
    iconBox: string;
    bar: string;
    hoverBorder: string;
    glow: string;
  }> = {
    rose: {
      badge: 'bg-rose-50 text-rose-700 border-rose-200/80',
      iconBox: 'bg-rose-50/80 text-rose-600 border-rose-100 group-hover:bg-rose-100/90',
      bar: 'from-rose-500 via-pink-500 to-rose-400',
      hoverBorder: 'hover:border-rose-300/80',
      glow: 'hover:shadow-rose-500/10'
    },
    indigo: {
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      iconBox: 'bg-indigo-50/80 text-indigo-600 border-indigo-100 group-hover:bg-indigo-100/90',
      bar: 'from-indigo-500 via-violet-500 to-indigo-400',
      hoverBorder: 'hover:border-indigo-300/80',
      glow: 'hover:shadow-indigo-500/10'
    },
    blue: {
      badge: 'bg-blue-50 text-blue-700 border-blue-200/80',
      iconBox: 'bg-blue-50/80 text-blue-600 border-blue-100 group-hover:bg-blue-100/90',
      bar: 'from-blue-500 via-sky-500 to-blue-400',
      hoverBorder: 'hover:border-blue-300/80',
      glow: 'hover:shadow-blue-500/10'
    },
    amber: {
      badge: 'bg-amber-50 text-amber-700 border-amber-200/80',
      iconBox: 'bg-amber-50/80 text-amber-600 border-amber-100 group-hover:bg-amber-100/90',
      bar: 'from-amber-500 via-orange-500 to-amber-400',
      hoverBorder: 'hover:border-amber-300/80',
      glow: 'hover:shadow-amber-500/10'
    },
    emerald: {
      badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
      iconBox: 'bg-emerald-50/80 text-emerald-600 border-emerald-100 group-hover:bg-emerald-100/90',
      bar: 'from-emerald-500 via-teal-500 to-emerald-400',
      hoverBorder: 'hover:border-emerald-300/80',
      glow: 'hover:shadow-emerald-500/10'
    },
    cyan: {
      badge: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      iconBox: 'bg-cyan-50/80 text-cyan-600 border-cyan-100 group-hover:bg-cyan-100/90',
      bar: 'from-cyan-500 via-sky-500 to-cyan-400',
      hoverBorder: 'hover:border-cyan-300/80',
      glow: 'hover:shadow-cyan-500/10'
    },
    purple: {
      badge: 'bg-purple-50 text-purple-700 border-purple-200/80',
      iconBox: 'bg-purple-50/80 text-purple-600 border-purple-100 group-hover:bg-purple-100/90',
      bar: 'from-purple-500 via-fuchsia-500 to-purple-400',
      hoverBorder: 'hover:border-purple-300/80',
      glow: 'hover:shadow-purple-500/10'
    }
  };

  $: jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MiniToolbox',
    alternateName: 'MiniToolbox.dev',
    url: 'https://minitoolbox.dev/',
    description: t.metaDesc,
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://minitoolbox.dev/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  });

  $: jsonLdOrg = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '차데이터리서치 (Cha Data Research)',
    url: 'https://minitoolbox.dev/',
    logo: 'https://minitoolbox.dev/icon-512.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@chadata.kr',
      contactType: 'customer support'
    }
  });
</script>

<svelte:head>
  <title>{t.metaTitle || 'MiniToolbox.dev | Zero-Upload Client-Side Web Utilities'}</title>
  <meta name="description" content={t.metaDesc} />
  <link rel="canonical" href="https://minitoolbox.dev/" />
  <meta property="og:title" content={t.metaTitle || 'MiniToolbox.dev'} />
  <meta property="og:description" content={t.metaDesc} />
  <meta property="og:url" content="https://minitoolbox.dev/" />
  <meta property="og:image" content="https://minitoolbox.dev/icon-512.png" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MiniToolbox" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={t.metaTitle || 'MiniToolbox.dev'} />
  <meta name="twitter:description" content={t.metaDesc} />
  <meta name="twitter:image" content="https://minitoolbox.dev/icon-512.png" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdOrg}</script>`}
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:py-12 sm:px-6">
  <!-- Hero Section -->
  <div class="relative overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md p-6 sm:p-12 border border-slate-200/90 text-center shadow-xs mb-8 sm:mb-10">
    <div class="inline-flex items-center gap-2 rounded-full bg-indigo-50/90 border border-indigo-200/80 px-3.5 py-1 text-xs font-bold text-indigo-700 mb-4 shadow-2xs">
      <span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
      <span>{t.heroBadge}</span>
    </div>

    <h1 class="text-3xl font-black text-slate-900 sm:text-5xl tracking-tight leading-tight">
      {t.heroTitlePrefix}<span class="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">{t.heroTitleHighlight}</span>{t.heroTitleSuffix}
    </h1>
    <p class="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
      {t.heroDesc}
    </p>

    <!-- Quick Search Pill -->
    <div class="mt-7 max-w-md mx-auto relative group">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg class="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      </div>
      <input
        type="text"
        bind:value={searchQuery}
        placeholder={t.searchPlaceholder}
        class="w-full rounded-2xl border border-slate-300/90 bg-white/95 px-4 py-3 pl-11 pr-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 shadow-xs focus:border-indigo-500 focus:ring-3 focus:ring-indigo-500/15 focus:outline-hidden transition"
      />
      {#if searchQuery}
        <button
          type="button"
          on:click={() => (searchQuery = '')}
          class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 text-xs"
        >
          ✕
        </button>
      {/if}
    </div>
  </div>

  <!-- Category filter chips -->
  <div class="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
    {#each categories as cat}
      <button
        type="button"
        class="shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 {selectedCategory === cat.id ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900/10' : 'bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 border border-slate-200/90 shadow-2xs'}"
        on:click={() => (selectedCategory = cat.id)}
      >
        {cat.label}
      </button>
    {/each}
  </div>

  <!-- Tools Grid (iLoveIMG / Smallpdf inspired vibrant cards) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-14">
    {#each filteredTools as tool (tool.id)}
      {@const loc = getLocalizedTool(tool, $currentLang)}
      {@const style = COLOR_STYLES[tool.color] || COLOR_STYLES.indigo}
      
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex flex-col justify-between rounded-3xl bg-white/95 backdrop-blur-xs p-6 sm:p-7 border border-slate-200/80 {style.hoverBorder} shadow-2xs hover:shadow-xl {style.glow} hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
      >
        <!-- Top color accent stripe on hover -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r {style.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div>
          <!-- Header: Squircle Icon & Badges -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex h-14 w-14 items-center justify-center rounded-2xl {style.iconBox} border shadow-2xs transition-transform duration-300 group-hover:scale-105">
              <span class="text-2xl">{tool.icon}</span>
            </div>
            
            <div class="flex flex-col items-end space-y-1.5">
              <span class="text-[10px] font-bold text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                {loc.targetRegion}
              </span>
              <span class="text-[10px] font-extrabold {style.badge} px-2.5 py-0.5 rounded-full border shadow-2xs">
                {loc.badge}
              </span>
            </div>
          </div>

          <!-- Tool Title & Subdomain Link -->
          <h2 class="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition tracking-tight flex items-center justify-between">
            <span>{loc.name}</span>
            <span class="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-200 text-sm">↗</span>
          </h2>
          
          <span class="inline-block mt-0.5 font-mono text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition">
            {tool.subdomain}.minitoolbox.dev
          </span>

          <p class="mt-2.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
            {loc.description}
          </p>

          <!-- Feature Bullets -->
          <ul class="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5 text-xs text-slate-500">
            {#each loc.features as feat}
              <li class="flex items-center space-x-2">
                <span class="text-emerald-500 font-bold text-xs">✓</span>
                <span class="truncate">{feat}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Launch Footer -->
        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
            <span>{t.launchBtn}</span>
          </span>
          <span class="text-[11px] font-semibold text-slate-400">{t.freeBadge}</span>
        </div>
      </a>
    {/each}
  </div>

  <!-- Trust Architecture Section (iLovePDF Security Blueprint) -->
  <div class="rounded-3xl bg-gradient-to-b from-white to-slate-50/80 p-8 sm:p-12 border border-slate-200 shadow-xs mb-10">
    <div class="text-center max-w-2xl mx-auto mb-10">
      <div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/80 mb-2.5">
        <span>🛡️ Strict Zero-Upload Guarantee</span>
      </div>
      <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        Why Zero-Upload Architecture Matters
      </h3>
      <p class="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
        Unlike traditional online file converters that upload your confidential documents to unknown cloud servers, MiniToolbox executes 100% inside your client device.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-2xs">
        <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-3.5">
          🔒
        </div>
        <h4 class="text-sm font-bold text-slate-900">100% In-Memory RAM</h4>
        <p class="mt-1.5 text-xs text-slate-600 leading-relaxed">
          PDFs, images, and tax files are parsed locally via WebAssembly & HTML5 Canvas. The moment you close the browser tab, all memory is instantly purged.
        </p>
      </div>

      <div class="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-2xs">
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-3.5">
          ⚡
        </div>
        <h4 class="text-sm font-bold text-slate-900">Zero Upload Latency</h4>
        <p class="mt-1.5 text-xs text-slate-600 leading-relaxed">
          No waiting 10 minutes to upload a 100MB video or PDF document. Processing happens instantaneously using your computer's local CPU and GPU.
        </p>
      </div>

      <div class="rounded-2xl bg-white p-6 border border-slate-200/80 shadow-2xs">
        <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl mb-3.5">
          🆓
        </div>
        <h4 class="text-sm font-bold text-slate-900">Zero Accounts & Forever Free</h4>
        <p class="mt-1.5 text-xs text-slate-600 leading-relaxed">
          No forced signups, no email spam, and no sudden paywalls after two conversions. Open access for anyone, everywhere.
        </p>
      </div>
    </div>
  </div>

  <!-- Ad Banner -->
  <div class="mb-10">
    <AdBanner />
  </div>

  <!-- FAQ Section for Search Engine Rich Snippets & Trust -->
  {#if t.faqs && t.faqs.length > 0}
    <section class="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-xs p-6 sm:p-8 shadow-2xs mb-8">
      <h3 class="text-lg font-black text-slate-900 mb-5 flex items-center space-x-2">
        <span>❓</span>
        <span>{t.faqTitle}</span>
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each t.faqs as faq}
          <div class="rounded-2xl bg-slate-50/80 p-5 border border-slate-200/70 hover:bg-white hover:shadow-xs transition">
            <h4 class="text-xs sm:text-[13px] font-bold text-slate-900 mb-2 leading-snug">Q. {faq.q}</h4>
            <p class="text-xs text-slate-600 leading-relaxed">A. {faq.a}</p>
          </div>
        {/each}
      </div>
    </section>
  {/if}
</div>
