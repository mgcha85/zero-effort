<script lang="ts">
  export let isOpen = false;
  export let title = '';
  export let content = '';
  export let onClose = () => {};
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
    <div class="relative w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col dark:bg-gray-900 dark:text-gray-100">
      <!-- Header -->
      <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        <button
          type="button"
          class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
          on:click={onClose}
          aria-label="Close"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="overflow-y-auto p-6 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
        {@html content}
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-200 px-6 py-3 flex justify-end dark:border-gray-800">
        <button
          type="button"
          class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
          on:click={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  </div>
{/if}
