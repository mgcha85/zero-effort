<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang, type Lang, translations } from '$lib/langStore';

  function setLang(l: Lang) {
    currentLang.set(l);
  }
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <!-- Nav -->
  <header class="border-b border-slate-200 bg-white shadow-xs sticky top-0 z-30">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <span class="text-2xl">⚔️</span>
        <div class="flex flex-col">
          <span class="text-base font-black tracking-tight text-indigo-700 leading-tight">
            {translations[$currentLang].siteTitle}
          </span>
          <span class="text-[10px] text-slate-400 font-medium">Cờ Caro Online</span>
        </div>
      </div>

      <div class="flex items-center space-x-2 sm:space-x-3">
        <!-- Language Switcher -->
        <div class="flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'vi' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('vi')}
            title="Tiếng Việt"
          >
            🇻🇳 VN
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'ko' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('ko')}
            title="한국어"
          >
            🇰🇷 KR
          </button>
          <button
            type="button"
            class="px-2 py-1 rounded-md transition {$currentLang === 'en' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'}"
            on:click={() => setLang('en')}
            title="English"
          >
            🇺🇸 EN
          </button>
        </div>

        <span class="hidden sm:inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
          {translations[$currentLang].freeBadge}
        </span>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- Legal Footer (Reactive to selected language) -->
  <Footer lang={$currentLang} />
</div>
