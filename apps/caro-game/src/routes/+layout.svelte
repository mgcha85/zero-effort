<script lang="ts">
  import '../app.css';
  import { Footer } from '@zero-effort/shared-ui';
</script>

<div class="flex min-h-screen flex-col bg-slate-50 text-slate-800">
  <!-- Nav -->
  <header class="border-b border-slate-200 bg-white shadow-sm">
    <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
      <div class="flex items-center space-x-2">
        <span class="text-2xl">⚔️</span>
        <span class="text-lg font-black tracking-tight text-indigo-700">Cờ Caro Online</span>
      </div>
      <div class="flex items-center space-x-3 text-xs font-medium text-slate-600">
        <span class="rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-800">⚡ Miễn phí 100%</span>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- Legal Footer (User rule) -->
  <Footer lang="vi" />
</div>
