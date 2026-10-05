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
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { id: 'ja', label: '日本語', flag: '🇯🇵' },
    { id: 'ko', label: '한국어', flag: '🇰🇷' }
  ];
</script>

<div class="relative min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
  <!-- Subtle ambient background dot grid & gradient wash -->
  <div class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35"></div>
  <div class="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-indigo-100/40 via-sky-50/20 to-transparent blur-3xl -z-10"></div>

  <!-- Ultra-clean sticky glassmorphic header -->
  <header class="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <a href="/" class="flex items-center space-x-3 group">
        <div class="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-xs group-hover:scale-105 transition-transform duration-200">
          <img src={$currentFavicon.png} alt="Logo" class="h-6 w-6 object-contain brightness-0 invert" />
        </div>
        <div class="flex flex-col">
          <span class="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
            MiniToolbox<span class="text-indigo-600 font-black">.dev</span>
          </span>
          <span class="text-[10px] font-semibold text-slate-400 tracking-wide uppercase -mt-0.5">{t.portalBadge}</span>
        </div>
      </a>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- 7-Language Dropdown -->
        <div class="relative inline-flex items-center rounded-xl bg-slate-100/80 hover:bg-slate-100 p-0.5 border border-slate-200/90 text-xs font-semibold transition">
          <select
            value={$currentLang}
            on:change={(e) => setLang(e.currentTarget.value as HubLang)}
            class="bg-transparent pl-2.5 pr-7 py-1 text-slate-800 font-semibold cursor-pointer focus:outline-hidden appearance-none"
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

        <span class="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 bg-indigo-50/80 px-3 py-1 rounded-full border border-indigo-200/80 shadow-2xs">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t.zeroUploadBadge}</span>
        </span>
      </div>
    </div>
  </header>

  <main class="relative z-10 flex-1">
    <slot />
  </main>

  <div class="relative z-10">
    <Footer lang={$currentLang} />
  </div>
</div>
