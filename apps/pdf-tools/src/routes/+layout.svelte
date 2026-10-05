<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, type PdfLang, translations } from '$lib/langStore';

  onMount(() => {
    try {
      const saved = localStorage.getItem('pdf_lang') as PdfLang;
      if (saved && ['en', 'ko'].includes(saved)) {
        currentLang.set(saved);
        return;
      }
      const nav = (navigator.language || '').toLowerCase();
      if (nav.startsWith('ko')) currentLang.set('ko');
      else currentLang.set('en');
    } catch (e) {}
  });

  function setLang(l: PdfLang) {
    currentLang.set(l);
    try {
      localStorage.setItem('pdf_lang', l);
    } catch (e) {}
  }

  $: t = translations[$currentLang];
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <header class="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <img src="/favicon.png" alt="Logo" class="h-8 w-8 rounded-lg object-contain" />
        <div class="flex flex-col">
          <span class="text-base font-black tracking-tight text-rose-800 leading-tight">{t.headerTitle}</span>
          <span class="text-[10px] font-medium text-rose-600/80 -mt-0.5">{t.headerSub}</span>
        </div>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Language Switcher -->
        <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('en')}
          >
            🇬🇧 EN
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ko' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('ko')}
          >
            🇰🇷 KO
          </button>
        </div>

        <div class="hidden sm:flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t.headerBadge}</span>
        </div>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang={$currentLang} />
</div>
