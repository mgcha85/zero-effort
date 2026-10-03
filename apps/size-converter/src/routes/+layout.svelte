<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <header class="border-b border-slate-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <img src="/favicon.png" alt="로고" class="h-8 w-8 rounded-lg object-contain" />
        <span class="text-lg font-black tracking-tight text-blue-600">Global Size Converter</span>
      </div>
      <div class="text-xs font-semibold text-slate-500">
        <span>Shopee • Lazada • TikTok Shop</span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang="vi" />
</div>
