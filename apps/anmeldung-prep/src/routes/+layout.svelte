<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, type Lang, translations } from '$lib/langStore';

  function setLang(l: Lang) {
    currentLang.set(l);
  }
</script>

<div class="flex min-h-screen flex-col bg-white text-slate-800">
  <!-- Thin sticky header -->
  <header class="border-b border-slate-100 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2.5">
        <img src="/favicon.png" alt="Anmeldung Logo" class="h-8 w-8 rounded-lg object-contain shadow-xs" />
        <div class="flex flex-col">
          <span class="text-base font-black tracking-tight text-slate-900 leading-tight">
            {translations[$currentLang].siteTitle}
          </span>
          <span class="text-[10px] font-medium text-amber-700 -mt-0.5">Bürgeramt Prep & Safe Redaction</span>
        </div>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Language Switcher -->
        <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('en')}
            title="English"
          >
            🇬🇧 EN
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'de' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('de')}
            title="Deutsch"
          >
            🇩🇪 DE
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ko' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('ko')}
            title="한국어"
          >
            🇰🇷 KR
          </button>
        </div>

        <span class="hidden sm:inline-flex items-center text-xs font-bold text-slate-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          <span>{translations[$currentLang].badge}</span>
        </span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang={$currentLang === 'ko' ? 'ko' : 'en'} />
</div>
