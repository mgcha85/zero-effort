<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, type Lang, translations } from '$lib/langStore';

  onMount(() => {
    try {
      const saved = localStorage.getItem('rirekisho_lang') as Lang;
      if (saved && ['ja', 'ko', 'en'].includes(saved)) {
        currentLang.set(saved);
        return;
      }
      const nav = (navigator.language || '').toLowerCase();
      if (nav.startsWith('ja')) currentLang.set('ja');
      else if (nav.startsWith('ko')) currentLang.set('ko');
      else currentLang.set('en');
    } catch (e) {}
  });

  function setLang(l: Lang) {
    currentLang.set(l);
    try {
      localStorage.setItem('rirekisho_lang', l);
    } catch (e) {}
  }
</script>

<div class="flex min-h-screen flex-col bg-white text-slate-800">
  <!-- Thin sticky header (hidden when printing) -->
  <header class="no-print border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2.5">
        <img src="/favicon.png" alt="Rirekisho Logo" class="h-8 w-8 rounded-lg object-contain shadow-xs" />
        <div class="flex flex-col">
          <span class="text-base font-black tracking-tight text-slate-900 leading-tight">
            {translations[$currentLang].siteTitle}
          </span>
          <span class="text-[10px] font-medium text-rose-700 -mt-0.5">{translations[$currentLang].subBrand}</span>
        </div>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Language Switcher -->
        <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ja' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('ja')}
            title="日本語"
          >
            🇯🇵 日本語
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ko' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('ko')}
            title="한국어"
          >
            🇰🇷 한국어
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('en')}
            title="English"
          >
            🇬🇧 EN
          </button>
        </div>

        <span class="hidden sm:inline-flex items-center text-xs font-bold text-slate-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
          <span>{translations[$currentLang].badge}</span>
        </span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <div class="no-print">
    <Footer lang={$currentLang} />
  </div>
</div>
