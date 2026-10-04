<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';
  import { currentFavicon, setFaviconByRoute } from '$lib/faviconStore';

  $: t = translations[$currentLang];
  $: if ($page.url.pathname !== '/') {
    setFaviconByRoute($page.url.pathname);
  }
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
        <!-- Language Switcher -->
        <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ko' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => ($currentLang = 'ko')}
          >
            🇰🇷 한국어
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => ($currentLang = 'en')}
          >
            🇬🇧 English
          </button>
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
