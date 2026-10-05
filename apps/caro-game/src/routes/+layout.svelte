<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, type Lang, translations } from '$lib/langStore';

  const langs: { id: Lang; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
    { id: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { id: 'es', label: 'Español', flag: '🇪🇸' },
    { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { id: 'ja', label: '日本語', flag: '🇯🇵' },
    { id: 'ko', label: '한국어', flag: '🇰🇷' }
  ];

  onMount(() => {
    try {
      const saved = localStorage.getItem('caro_lang') as Lang;
      if (saved && langs.some(l => l.id === saved)) {
        currentLang.set(saved);
        return;
      }
      const nav = (navigator.language || '').toLowerCase();
      if (nav.startsWith('vi')) currentLang.set('vi');
      else if (nav.startsWith('ko')) currentLang.set('ko');
      else if (nav.startsWith('ja')) currentLang.set('ja');
      else if (nav.startsWith('fr')) currentLang.set('fr');
      else if (nav.startsWith('de')) currentLang.set('de');
      else if (nav.startsWith('es')) currentLang.set('es');
      else currentLang.set('en');
    } catch (e) {}
  });

  function setLang(l: Lang) {
    currentLang.set(l);
    try {
      localStorage.setItem('caro_lang', l);
    } catch (e) {}
  }

  $: t = translations[$currentLang] || translations.vi;
</script>

<div class="relative min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
  <!-- Subtle ambient background dot grid & gradient wash -->
  <div class="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35"></div>
  <div class="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-gradient-to-b from-indigo-100/40 via-violet-50/20 to-transparent blur-3xl -z-10"></div>

  <!-- Ultra-clean sticky glassmorphic header -->
  <header class="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-2xs">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-3">
        <a href="/" class="flex items-center space-x-3 group">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-xs group-hover:scale-105 transition-transform duration-200 text-white font-black text-sm">
            ⭕
          </div>
          <div class="flex flex-col">
            <span class="text-base font-extrabold tracking-tight text-slate-900 leading-tight">
              {t.siteTitle}
            </span>
            <span class="text-[10px] font-semibold text-indigo-600 tracking-wide uppercase -mt-0.5">
              {t.siteSub}
            </span>
          </div>
        </a>

        <!-- MiniToolbox Hub Backlink Badge -->
        <a
          href="https://minitoolbox.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-700 bg-slate-100/80 px-2.5 py-0.5 rounded-full border border-slate-200/60 transition"
        >
          <span>by MiniToolbox</span>
          <span class="text-[10px]">↗</span>
        </a>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- 7-Language Dropdown -->
        <div class="relative inline-flex items-center rounded-xl bg-slate-100/80 hover:bg-slate-100 p-0.5 border border-slate-200/90 text-xs font-semibold transition">
          <select
            value={$currentLang}
            on:change={(e) => setLang(e.currentTarget.value as Lang)}
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

        <!-- Pulsing Zero-Upload Badge -->
        <span class="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 bg-indigo-50/90 px-3 py-1 rounded-full border border-indigo-200/80 shadow-2xs">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t.freeBadge}</span>
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
