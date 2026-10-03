<script lang="ts">
  import { onMount } from 'svelte';

  export let client = '';
  export let slot = '';
  export let format = 'auto';
  export let responsive = 'true';

  let adElement: HTMLElement;

  onMount(() => {
    try {
      if (typeof window !== 'undefined' && client && slot) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error('AdSense banner error:', e);
    }
  });
</script>

{#if client && slot}
  <div class="my-6 flex justify-center overflow-hidden min-h-[90px] w-full items-center bg-gray-50/50 rounded-lg border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
    <ins
      class="adsbygoogle"
      style="display:block; width: 100%;"
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  </div>
{/if}
