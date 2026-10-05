<script lang="ts">
  import { buildFaqJsonLd, buildWebAppJsonLd } from '@zero-effort/seo-config';
  import { currentLang, translations } from '$lib/langStore';
  import JSZip from 'jszip';

  interface ProcessedFile {
    id: string;
    originalName: string;
    originalSize: number;
    cleanedSize: number;
    previewUrl: string;
    cleanedBlob: Blob;
    cleanedUrl: string;
    hasGps: boolean;
    hasExif: boolean;
  }

  let files: ProcessedFile[] = [];
  let isDragging = false;
  let isProcessing = false;
  let fileInputEl: HTMLInputElement;

  $: t = translations[$currentLang] || translations.en;

  function plainQa(s: string) {
    return s.replace(/^[QA]\.\s*/, '');
  }

  $: jsonLd = buildWebAppJsonLd({
    name: t.siteTitle,
    url: 'https://exif.minitoolbox.dev',
    description: t.heroSub,
    applicationCategory: 'SecurityApplication'
  });

  $: jsonLdFaq = buildFaqJsonLd([
    { question: plainQa(t.faq1Q), answer: plainQa(t.faq1A) },
    { question: plainQa(t.faq2Q), answer: plainQa(t.faq2A) }
  ]);

  function detectExifAndGps(buffer: ArrayBuffer): { hasExif: boolean; hasGps: boolean } {
    const view = new DataView(buffer);
    let hasExif = false;
    let hasGps = false;

    // Check JPEG SOI (0xFFD8)
    if (view.byteLength > 4 && view.getUint16(0) === 0xFFD8) {
      let offset = 2;
      while (offset < view.byteLength - 4) {
        const marker = view.getUint16(offset);
        if (marker === 0xFFE1) {
          // APP1 Marker (Exif / XMP)
          hasExif = true;
          // Look for GPS in the chunk
          const len = view.getUint16(offset + 2);
          const chunkStr = new TextDecoder('latin1').decode(new Uint8Array(buffer, offset, Math.min(len + 2, view.byteLength - offset)));
          if (chunkStr.includes('GPS') || chunkStr.includes('gps')) {
            hasGps = true;
          }
          break;
        } else if ((marker & 0xFF00) !== 0xFF00 || marker === 0xFFDA) {
          break;
        } else {
          offset += 2 + view.getUint16(offset + 2);
        }
      }
    } else {
      // For PNG / WebP, check chunk signatures
      const chunkStr = new TextDecoder('latin1').decode(new Uint8Array(buffer.slice(0, Math.min(buffer.byteLength, 4096))));
      if (chunkStr.includes('eXIf') || chunkStr.includes('EXIF') || chunkStr.includes('XMP')) {
        hasExif = true;
      }
    }

    return { hasExif, hasGps };
  }

  async function processFile(file: File): Promise<ProcessedFile> {
    const buffer = await file.arrayBuffer();
    const { hasExif, hasGps } = detectExifAndGps(buffer);

    return new Promise((resolve) => {
      const img = new Image();
      const tempUrl = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }

        const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(tempUrl);
          const cleanedBlob = blob || new Blob([buffer], { type: outType });
          const cleanedUrl = URL.createObjectURL(cleanedBlob);
          const cleanName = file.name.replace(/(\.[^.]+)$/, '-scrubbed$1');

          resolve({
            id: Math.random().toString(36).substring(2, 9),
            originalName: cleanName,
            originalSize: file.size,
            cleanedSize: cleanedBlob.size,
            previewUrl: cleanedUrl,
            cleanedBlob,
            cleanedUrl,
            hasGps,
            hasExif
          });
        }, outType, 0.95);
      };
      img.src = tempUrl;
    });
  }

  async function handleFiles(uploaded: FileList | File[]) {
    if (!uploaded || uploaded.length === 0) return;
    isProcessing = true;
    const newItems: ProcessedFile[] = [];

    for (let i = 0; i < uploaded.length; i++) {
      const file = uploaded[i];
      if (file.type.startsWith('image/')) {
        const processed = await processFile(file);
        newItems.push(processed);
      }
    }

    files = [...newItems, ...files];
    isProcessing = false;
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    isDragging = false;
    if (e.dataTransfer?.files) {
      handleFiles(e.dataTransfer.files);
    }
  }

  function onFileInputChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      handleFiles(input.files);
      input.value = '';
    }
  }

  async function downloadAllZip() {
    if (files.length === 0) return;
    const zip = new JSZip();
    files.forEach((f) => {
      zip.file(f.originalName, f.cleanedBlob);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scrubbed-photos-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function clearAll() {
    files.forEach((f) => URL.revokeObjectURL(f.cleanedUrl));
    files = [];
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  }
</script>

<svelte:head>
  <title>{t.siteTitle} | {t.subBrand}</title>
  <meta name="description" content={t.heroSub} />
  <link rel="canonical" href="https://exif.minitoolbox.dev/" />
  <meta property="og:title" content={t.siteTitle} />
  <meta property="og:description" content={t.heroSub} />
  <meta property="og:url" content="https://exif.minitoolbox.dev/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
  <!-- Hero Section -->
  <div class="text-center mb-8">
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200/80 mb-3 shadow-2xs">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>{t.badge}</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
      {t.heroTitle}
    </h1>
    <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
      {t.heroSub}
    </p>
  </div>

  <!-- Drag & Drop Zone -->
  <div
    class="relative rounded-3xl border-2 border-dashed transition duration-200 p-8 sm:p-12 text-center cursor-pointer {isDragging ? 'border-purple-600 bg-purple-50/50 scale-101' : 'border-slate-300 hover:border-purple-400 bg-white/90 shadow-2xs'}"
    on:dragover|preventDefault={() => (isDragging = true)}
    on:dragleave={() => (isDragging = false)}
    on:drop={onDrop}
    on:click={() => fileInputEl.click()}
    role="button"
    tabindex="0"
    on:keydown={(e) => e.key === 'Enter' && fileInputEl.click()}
  >
    <input
      type="file"
      multiple
      accept="image/jpeg,image/png,image/webp"
      bind:this={fileInputEl}
      on:change={onFileInputChange}
      class="hidden"
    />

    <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl shadow-2xs border border-purple-100">
      📸
    </div>
    <h2 class="mt-4 text-base font-bold text-slate-900">{t.dropzoneTitle}</h2>
    <p class="mt-1 text-xs text-slate-500">{t.dropzoneSub}</p>

    <div class="mt-5">
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-purple-500 transition"
      >
        <span>{t.dropzoneBtn}</span>
      </button>
    </div>
  </div>

  <!-- Processing State -->
  {#if isProcessing}
    <div class="my-6 p-4 rounded-2xl bg-purple-50 text-center text-xs font-bold text-purple-700 animate-pulse">
      ⚡ Scrubbing GPS and EXIF headers in memory...
    </div>
  {/if}

  <!-- Processed Files List & Actions -->
  {#if files.length > 0}
    <div class="mt-8 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold uppercase tracking-wider text-slate-500">{t.filesCount}:</span>
          <span class="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800 font-mono">
            {files.length}
          </span>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            on:click={downloadAllZip}
            class="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:from-purple-500 hover:to-indigo-500 transition"
          >
            {t.downloadZipBtn}
          </button>
          <button
            type="button"
            on:click={clearAll}
            class="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition"
          >
            {t.clearAllBtn}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each files as f (f.id)}
          <div class="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs flex flex-col justify-between space-y-3">
            <div class="flex items-start gap-3">
              <img
                src={f.previewUrl}
                alt="Cleaned Thumbnail"
                class="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
              />
              <div class="min-w-0 flex-1">
                <span class="block text-xs font-bold text-slate-800 truncate" title={f.originalName}>
                  {f.originalName}
                </span>
                <span class="block text-[11px] text-slate-400 font-mono mt-0.5">
                  {formatBytes(f.originalSize)} → {formatBytes(f.cleanedSize)}
                </span>

                <div class="mt-1.5 flex flex-wrap gap-1">
                  {#if f.hasGps}
                    <span class="inline-flex items-center text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      📍 {t.gpsFound}
                    </span>
                  {:else if f.hasExif}
                    <span class="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      📷 {t.cameraFound}
                    </span>
                  {:else}
                    <span class="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      ✨ {t.statusCleaned}
                    </span>
                  {/if}
                </div>
              </div>
            </div>

            <a
              href={f.cleanedUrl}
              download={f.originalName}
              class="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50/80 px-3 py-2 text-xs font-bold text-purple-700 hover:bg-purple-100 transition"
            >
              {t.downloadBtn}
            </a>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Security Explainer Banner -->
  <div class="mt-12 rounded-3xl border border-purple-200/80 bg-purple-50/50 p-6 shadow-2xs">
    <h3 class="text-sm font-black text-purple-900 mb-2 flex items-center gap-2">
      <span>{t.privacyGuaranteeTitle}</span>
    </h3>
    <p class="text-xs text-purple-800/90 leading-relaxed">
      {t.privacyGuaranteeDesc}
    </p>
  </div>

  <!-- FAQ Accordion -->
  <div class="mt-6 rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-2xs space-y-4">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">{t.faqTitle}</h3>
    <div>
      <h4 class="text-xs font-bold text-slate-800">{t.faq1Q}</h4>
      <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.faq1A}</p>
    </div>
    <div class="pt-2 border-t border-slate-100">
      <h4 class="text-xs font-bold text-slate-800">{t.faq2Q}</h4>
      <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.faq2A}</p>
    </div>
  </div>
</div>
