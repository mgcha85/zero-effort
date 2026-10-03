<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
</script>

<div class="flex min-h-screen flex-col bg-sky-50/50 text-slate-800">
  <header class="border-b border-sky-100 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <span class="text-2xl">🛡️</span>
        <span class="text-lg font-black tracking-tight text-sky-700">ZeroUpload Media Tools</span>
      </div>
      <div class="flex items-center space-x-2 text-xs font-semibold text-sky-700 bg-sky-100/70 px-2.5 py-1 rounded-full border border-sky-200">
        <span>🔒 100% 브라우저 로컬 처리 (서버 전송 없음)</span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang="ko" />
</div>
