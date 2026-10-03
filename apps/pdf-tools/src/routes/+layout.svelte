<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <header class="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-2xs">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2.5">
        <span class="text-2xl drop-shadow-xs">📑</span>
        <span class="text-lg font-black tracking-tight text-rose-700">ZeroPDF Safe Tools</span>
      </div>
      <div class="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
        <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>100% 로컬 브라우저 연산 (서버 전송 없음)</span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang="ko" />
</div>
