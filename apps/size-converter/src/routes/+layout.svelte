<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
  import { currentLang } from '$lib/langStore';
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <header class="border-b border-slate-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <img src="/favicon.png" alt="Logo" class="h-8 w-8 rounded-lg object-contain" />
        <span class="text-lg font-black tracking-tight text-blue-600">Global Size Converter</span>
      </div>
      <div class="flex items-center space-x-3">
        <!-- Language Switcher -->
        <div class="relative inline-flex items-center rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-semibold">
          <select
            value={$currentLang}
            on:change={(e) => currentLang.set(e.currentTarget.value as any)}
            class="bg-transparent pl-2 pr-6 py-1 text-slate-800 font-semibold cursor-pointer focus:outline-hidden appearance-none"
            aria-label="Language"
          >
            <option value="en">🇺🇸 English</option>
            <option value="vi">🇻🇳 Tiếng Việt</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="es">🇪🇸 Español</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="ko">🇰🇷 한국어</option>
          </select>
          <span class="pointer-events-none absolute right-2 text-slate-400 text-[10px]">▼</span>
        </div>
        <div class="hidden sm:inline-block text-xs font-semibold text-slate-500">
          <span>Shopee • Lazada • TikTok</span>
        </div>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang={$currentLang} />
</div>
