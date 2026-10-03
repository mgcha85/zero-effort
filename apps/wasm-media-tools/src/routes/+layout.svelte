<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <header class="border-b border-slate-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <span class="text-2xl">🛡️</span>
        <span class="text-lg font-black tracking-tight text-emerald-700">ZeroUpload Media Tools</span>
      </div>
      <div class="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
        <span>🔒 100% 브라우저 로컬 처리 (서버 전송 없음)</span>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <Footer lang="ko" />
</div>
