<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, translations, initLang, setLang, type HubLang } from '$lib/langStore';
  import { currentFavicon, setFaviconByRoute } from '$lib/faviconStore';

  onMount(() => {
    initLang();
  });

  $: t = translations[$currentLang] || translations.en;
  $: if ($page.url.pathname !== '/') {
    setFaviconByRoute($page.url.pathname);
  }

  const langs: { id: HubLang; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { id: 'ja', label: '日本語', flag: '🇯🇵' },
    { id: 'ko', label: '한국어', flag: '🇰🇷' }
  ];
</script>

<div class="flex min-h-screen flex-col bg-slate-50/60 text-slate-800">
  <!-- Thin sticky header -->
  <header class="border-b border-slate-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="/" class="flex items-center space-x-2.5 group">
        <img src={$currentFavicon.png} alt="MiniToolbox Logo" class="h-8 w-8 rounded-lg object-contain shadow-2xs group-hover:scale-105 transition" />
        <div class="flex flex-col">
          <span class="text-base font-black tracking-tight text-slate-900 leading-tight">
            MiniToolbox<span class="text-indigo-600">.dev</span>
          </span>
          <span class="text-[10px] font-medium text-slate-500 -mt-0.5">{t.portalBadge}</span>
        </div>
      </a>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- 5-Language Dropdown / Switcher -->
        <div class="relative inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <select
            value={$currentLang}
            on:change={(e) => setLang(e.currentTarget.value as HubLang)}
            class="bg-transparent pl-2 pr-6 py-1 text-slate-800 font-semibold cursor-pointer focus:outline-hidden appearance-none"
            aria-label="Language"
          >
            {#each langs as item}
              <option value={item.id}>
                {item.flag} {item.label}
              </option>
            {/each}
          </select>
          <span class="pointer-events-none absolute right-2 text-slate-400 text-[10px]">▼</span>
        </div>

        <span class="hidden sm:inline-flex items-center text-xs font-bold text-slate-800 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
          <span>{t.zeroUploadBadge}</span>
        </span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang={$currentLang} />
</div>
