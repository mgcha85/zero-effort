<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
</script>

<div class="flex min-h-screen flex-col bg-mint-50/60 text-slate-800 selection:bg-mint-200 selection:text-mint-900">
  <header class="border-b border-mint-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2.5">
        <span class="text-2xl drop-shadow-xs">🛡️</span>
        <span class="text-lg font-black tracking-tight text-mint-800">ZeroUpload Media Tools</span>
      </div>
      <div class="flex items-center space-x-1.5 text-xs font-bold text-mint-800 bg-mint-100/80 px-3 py-1 rounded-full border border-mint-200 shadow-2xs">
        <span class="inline-block w-2 h-2 rounded-full bg-mint-500 animate-pulse"></span>
        <span>100% 브라우저 안심 처리</span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang="ko" />
</div>
