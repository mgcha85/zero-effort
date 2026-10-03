<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';

  $: t = translations[$currentLang];
</script>

<div class="flex min-h-screen flex-col bg-white text-slate-800">
  <header class="border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <img src="/favicon.png" alt="Logo" class="h-8 w-8 rounded-lg object-contain" />
        <div class="flex flex-col">
          <span class="text-base font-black tracking-tight text-sky-800 leading-tight">{t.headerTitle}</span>
          <span class="text-[10px] font-medium text-sky-600/80 -mt-0.5">{t.headerSub}</span>
        </div>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Language Switcher -->
        <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => ($currentLang = 'en')}
          >
            🇬🇧 EN
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ko' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => ($currentLang = 'ko')}
          >
            🇰🇷 KO
          </button>
        </div>

        <div class="hidden sm:flex items-center space-x-2 text-xs font-semibold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-full border border-sky-200">
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
