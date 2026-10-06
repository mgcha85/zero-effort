<script lang="ts">
  import { page } from '$app/stores';
  import { TOOLS, getCampaignUrl } from '$lib/tools';
  import { currentLang, translations } from '$lib/langStore';
  import { setFaviconByRoute } from '$lib/faviconStore';
  import { AdBanner } from '@zero-effort/shared-ui';

  $: categoryId = $page.params.id;
  $: setFaviconByRoute(`/category/${categoryId}`);

  $: t = translations[$currentLang];
  $: currentCategoryTools = TOOLS.filter(tool => tool.category === categoryId);

  const categoryNames: Record<string, { ko: string; en: string }> = {
    privacy: { ko: '개인정보 & 보안 유틸리티', en: 'Privacy & Security Utilities' },
    travel: { ko: '해외 여행 & 체류 비자', en: 'Travel & Visa Utilities' },
    career: { ko: '취업 & 커리어 서식', en: 'Career & Resume Builders' },
    utility: { ko: '생활 & 글로벌 단위 변환', en: 'Daily & Unit Utilities' },
    entertainment: { ko: '게임 & 엔터테인먼트', en: 'Games & Entertainment' }
  };

  $: title = categoryNames[categoryId] 
    ? ($currentLang === 'en' ? categoryNames[categoryId].en : categoryNames[categoryId].ko)
    : ($currentLang === 'en' ? 'Toolbox Category' : '카테고리별 도구');
</script>

<svelte:head>
  <title>{title} - MiniToolbox.dev</title>
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
  <!-- Back Button & Header -->
  <div class="mb-8">
    <a href="/" class="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition mb-3">
      <span>← {$currentLang === 'en' ? 'Back to All Tools' : '전체 도구 목록으로 돌아가기'}</span>
    </a>
    <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
      {title}
    </h1>
    <p class="mt-2 text-sm text-slate-600">
      {$currentLang === 'en' ? '100% Client-Side In-Browser Execution. No remote server uploads.' : '100% 브라우저 로컬 실행. 서버 업로드 없는 안심 도구 모음.'}
    </p>
  </div>

  <!-- Tools Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each currentCategoryTools as tool (tool.id)}
      <a
        href={getCampaignUrl(tool, `category-${categoryId}-${tool.id}`)}
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex flex-col justify-between rounded-3xl bg-white p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-indigo-300 transition-all duration-200"
      >
        <div>
          <div class="flex items-start justify-between mb-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs group-hover:scale-105 transition">
              <img src={tool.faviconPath} alt={$currentLang === 'en' ? tool.nameEn : tool.name} class="h-8 w-8 object-contain" />
            </div>
            <span class="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              {$currentLang === 'en' ? tool.badgeEn : tool.badge}
            </span>
          </div>

          <h2 class="text-base font-black text-slate-900 group-hover:text-indigo-600 transition">
            {$currentLang === 'en' ? tool.nameEn : tool.name}
          </h2>
          <span class="text-[11px] font-mono font-medium text-slate-600 block mt-0.5">
            {tool.subdomain}.minitoolbox.dev
          </span>
          <p class="mt-2 text-xs text-slate-600 leading-relaxed">
            {$currentLang === 'en' ? tool.descriptionEn : tool.description}
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span class="text-xs font-bold text-indigo-600 group-hover:underline">
            {t.launchBtn} →
          </span>
          <span class="text-[10px] text-slate-400">{t.freeBadge}</span>
        </div>
      </a>
    {/each}
  </div>

  <div class="mt-12">
    <AdBanner />
  </div>
</div>
