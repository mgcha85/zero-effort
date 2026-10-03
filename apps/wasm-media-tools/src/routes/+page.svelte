<script lang="ts">
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';
  import JSZip from 'jszip';

  $: t = translations[$currentLang];

  interface ProcessedItem {
    id: string;
    file: File;
    originalSize: number;
    originalWidth: number;
    originalHeight: number;
    previewUrl: string;
    targetWidth: number;
    targetHeight: number;
    compressedBlob: Blob | null;
    compressedSize: number;
    processing: boolean;
  }

  let items: ProcessedItem[] = [];
  let format: 'image/jpeg' | 'image/webp' | 'image/png' = 'image/jpeg';
  let quality = 85;
  let activeTab: 'compress' | 'resize' = 'compress';

  // Resize presets
  type ResizePreset = 'resume' | 'passport' | 'gov_doc' | 'sns_square' | 'custom';
  let selectedResizePreset: ResizePreset = 'resume';
  let customWidth = 800;
  let customHeight = 600;
  let keepAspectRatio = true;

  // Compress presets
  type CompressPreset = 'high' | 'medium' | 'gov_1mb' | 'resume_100kb' | 'custom';
  let selectedCompressPreset: CompressPreset = 'medium';

  $: jsonLd = buildWebAppJsonLd({
    name: $currentLang === 'en' ? 'Zero-Upload Photo Resizer & Compressor - FastPic' : '제로업로드 안심 사진 압축 및 규격 리사이즈 도구',
    url: 'https://media.minitoolbox.dev',
    description: $currentLang === 'en'
      ? 'Resize photos for passports, resumes (3x4cm) & government submissions directly in your browser. Zero bytes uploaded to remote servers. Bulk ZIP export.'
      : '서버로 사진을 전송하지 않고 브라우저에서 100% 안전하게 이미지 용량 압축(Compress) 및 이력서/여권/정부24 규격 리사이즈(Resize)를 즉시 수행합니다.',
    applicationCategory: 'MultimediaApplication'
  });

  $: jsonLdFaq = buildFaqJsonLd([
    {
      question: t.faq1Q,
      answer: t.faq1A
    },
    {
      question: t.faq2Q,
      answer: t.faq2A
    },
    {
      question: t.faq3Q,
      answer: t.faq3A
    }
  ]);

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      loadFiles(Array.from(input.files));
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      loadFiles(Array.from(e.dataTransfer.files));
    }
  }

  function loadFiles(newFiles: File[]) {
    const imageFiles = newFiles.filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    imageFiles.forEach((file) => {
      const item: ProcessedItem = {
        id: Math.random().toString(36).substring(2, 9),
        file,
        originalSize: file.size,
        originalWidth: 0,
        originalHeight: 0,
        previewUrl: URL.createObjectURL(file),
        targetWidth: 0,
        targetHeight: 0,
        compressedBlob: null,
        compressedSize: 0,
        processing: true
      };

      const img = new Image();
      img.onload = () => {
        item.originalWidth = img.width;
        item.originalHeight = img.height;
        item.targetWidth = img.width;
        item.targetHeight = img.height;
        items = [...items, item];
        processItem(item);
      };
      img.src = item.previewUrl;
    });
  }

  function removeFile(id: string) {
    const target = items.find((i) => i.id === id);
    if (target) {
      URL.revokeObjectURL(target.previewUrl);
    }
    items = items.filter((i) => i.id !== id);
  }

  function clearAll() {
    items.forEach((i) => URL.revokeObjectURL(i.previewUrl));
    items = [];
  }

  function setCompressPreset(preset: CompressPreset) {
    selectedCompressPreset = preset;
    if (preset === 'high') {
      quality = 60;
      format = 'image/webp';
    } else if (preset === 'medium') {
      quality = 80;
      format = 'image/jpeg';
    } else if (preset === 'gov_1mb') {
      quality = 75;
      format = 'image/jpeg';
    } else if (preset === 'resume_100kb') {
      quality = 70;
      format = 'image/jpeg';
    }
    reprocessAll();
  }

  function setResizePreset(preset: ResizePreset) {
    selectedResizePreset = preset;
    reprocessAll();
  }

  function reprocessAll() {
    items.forEach((item) => {
      processItem(item);
    });
    items = [...items];
  }

  function processItem(item: ProcessedItem) {
    item.processing = true;

    const img = new Image();
    img.onload = () => {
      let w = img.width;
      let h = img.height;

      if (activeTab === 'resize') {
        if (selectedResizePreset === 'resume') {
          // 3x4cm 표준 (354x472 px)
          w = 354;
          h = 472;
        } else if (selectedResizePreset === 'passport') {
          // 3.5x4.5cm 여권/신분증 표준 (413x531 px)
          w = 413;
          h = 531;
        } else if (selectedResizePreset === 'gov_doc') {
          // 서류 (가로 1600px 제한)
          if (w > 1600) {
            const ratio = 1600 / w;
            w = 1600;
            h = Math.round(h * ratio);
          }
        } else if (selectedResizePreset === 'sns_square') {
          // SNS 1:1 정방형 (1080x1080)
          w = 1080;
          h = 1080;
        } else if (selectedResizePreset === 'custom') {
          if (keepAspectRatio) {
            const ratio = customWidth / img.width;
            w = customWidth;
            h = Math.round(img.height * ratio);
          } else {
            w = customWidth;
            h = customHeight;
          }
        }
      }

      item.targetWidth = w;
      item.targetHeight = h;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              item.compressedBlob = blob;
              item.compressedSize = blob.size;
            }
            item.processing = false;
            items = [...items];
          },
          format,
          quality / 100
        );
      } else {
        item.processing = false;
        items = [...items];
      }
    };
    img.src = item.previewUrl;
  }

  function downloadSingle(item: ProcessedItem) {
    if (!item.compressedBlob) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const baseName = item.file.name.substring(0, item.file.name.lastIndexOf('.')) || item.file.name;
    const suffix = activeTab === 'resize' ? '_resized' : '_compressed';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(item.compressedBlob);
    a.download = `${baseName}${suffix}.${ext}`;
    a.click();
  }

  async function downloadAllAsZip() {
    const readyItems = items.filter((i) => i.compressedBlob && !i.processing);
    if (readyItems.length === 0) return;

    const zip = new JSZip();
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const suffix = activeTab === 'resize' ? '_resized' : '_compressed';

    readyItems.forEach((item, idx) => {
      if (item.compressedBlob) {
        const baseName = item.file.name.substring(0, item.file.name.lastIndexOf('.')) || `photo_${idx + 1}`;
        zip.file(`${baseName}${suffix}.${ext}`, item.compressedBlob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(content);
    a.download = `optimized_photos_${Date.now()}.zip`;
    a.click();
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
  <link rel="canonical" href="https://media.minitoolbox.dev/" />
  <meta property="og:title" content={t.metaTitle} />
  <meta property="og:description" content={t.metaDesc} />
  <meta property="og:url" content="https://media.minitoolbox.dev/" />
  <meta property="og:image" content="https://media.minitoolbox.dev/icon-512.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Title Header -->
  <div class="mb-8 text-center">
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      {t.title}
    </h1>
    <p class="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
      {t.desc}
    </p>
    <p class="mt-1 text-xs text-sky-700 font-medium">
      {t.subNotice}
    </p>
  </div>

  <!-- Mode Selector Tabs (용량 압축 vs 규격 리사이즈) -->
  <div class="mb-6 flex rounded-2xl bg-slate-200/70 p-1.5 shadow-inner">
    <button
      type="button"
      class="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition {activeTab === 'compress' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}"
      on:click={() => { activeTab = 'compress'; reprocessAll(); }}
    >
      <span class="text-base">🗜️</span>
      <span>{t.tabCompress}</span>
    </button>
    <button
      type="button"
      class="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs sm:text-sm font-bold transition {activeTab === 'resize' ? 'bg-white text-sky-800 shadow-sm' : 'text-slate-600 hover:text-slate-900'}"
      on:click={() => { activeTab = 'resize'; reprocessAll(); }}
    >
      <span class="text-base">📐</span>
      <span>{t.tabResize}</span>
    </button>
  </div>

  <!-- Presets Box depending on Tab -->
  {#if activeTab === 'compress'}
    <!-- Compress Mode Presets -->
    <div class="mb-6 rounded-2xl bg-white border border-sky-100 p-4 shadow-xs">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold text-sky-900 uppercase tracking-wider">{t.compressPresetTitle}</span>
        <span class="text-[11px] text-slate-500">{t.compressPresetSub}</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedCompressPreset === 'medium' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setCompressPreset('medium')}
        >
          <span class="block font-bold">{t.presetStd}</span>
          <span class="text-[11px] text-slate-500">{t.presetStdDesc}</span>
        </button>

        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedCompressPreset === 'high' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setCompressPreset('high')}
        >
          <span class="block font-bold">{t.presetHigh}</span>
          <span class="text-[11px] text-slate-500">{t.presetHighDesc}</span>
        </button>

        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedCompressPreset === 'gov_1mb' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setCompressPreset('gov_1mb')}
        >
          <span class="block font-bold">{t.presetGov}</span>
          <span class="text-[11px] text-slate-500">{t.presetGovDesc}</span>
        </button>

        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedCompressPreset === 'resume_100kb' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setCompressPreset('resume_100kb')}
        >
          <span class="block font-bold">{t.presetResume}</span>
          <span class="text-[11px] text-slate-500">{t.presetResumeDesc}</span>
        </button>
      </div>
    </div>
  {:else}
    <!-- Resize Mode Presets -->
    <div class="mb-6 rounded-2xl bg-white border border-sky-100 p-4 shadow-xs">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold text-sky-900 uppercase tracking-wider">{t.resizePresetTitle}</span>
        <span class="text-[11px] text-slate-500">{t.resizePresetSub}</span>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedResizePreset === 'resume' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setResizePreset('resume')}
        >
          <span class="block font-bold">{t.resizeResume}</span>
          <span class="text-[11px] text-slate-500">{t.resizeResumeDesc}</span>
        </button>

        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedResizePreset === 'passport' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setResizePreset('passport')}
        >
          <span class="block font-bold">{t.resizePassport}</span>
          <span class="text-[11px] text-slate-500">{t.resizePassportDesc}</span>
        </button>

        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedResizePreset === 'gov_doc' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setResizePreset('gov_doc')}
        >
          <span class="block font-bold">{t.resizeGov}</span>
          <span class="text-[11px] text-slate-500">{t.resizeGovDesc}</span>
        </button>

        <button
          type="button"
          class="rounded-xl p-2.5 border text-center transition {selectedResizePreset === 'sns_square' ? 'border-sky-500 bg-sky-50 text-sky-900 ring-2 ring-sky-400' : 'border-slate-200 hover:bg-sky-50/50 text-slate-700'}"
          on:click={() => setResizePreset('sns_square')}
        >
          <span class="block font-bold">{t.resizeSns}</span>
          <span class="text-[11px] text-slate-500">{t.resizeSnsDesc}</span>
        </button>
      </div>
    </div>
  {/if}

  <!-- Upload Area -->
  <div
    class="relative rounded-2xl border-2 border-dashed border-sky-200 bg-white p-8 text-center transition hover:border-sky-400 hover:bg-sky-50/20 shadow-xs"
    on:dragover|preventDefault
    on:drop={handleDrop}
    role="region"
    aria-label="Upload Area"
  >
    <input
      type="file"
      accept="image/*"
      multiple
      class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      on:change={handleFileSelect}
    />
    <div class="flex flex-col items-center justify-center space-y-3">
      <div class="rounded-full bg-sky-50 p-4 text-3xl border border-sky-100">📥</div>
      <div>
        <p class="text-sm font-bold text-slate-800">
          {t.dropTitle}
        </p>
        <p class="text-xs text-sky-700 mt-1 font-medium">
          {t.dropSub}
        </p>
      </div>
    </div>
  </div>

  <!-- Settings Bar -->
  <div class="mt-4 rounded-xl bg-white border border-slate-200 p-4 shadow-xs">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
      <div>
        <label for="format-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
          {t.saveFormat}
        </label>
        <select
          id="format-select"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-sky-500 focus:outline-none"
          bind:value={format}
          on:change={reprocessAll}
        >
          <option value="image/jpeg">{t.formatJpg}</option>
          <option value="image/webp">{t.formatWebp}</option>
          <option value="image/png">{t.formatPng}</option>
        </select>
      </div>

      <div>
        <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
          <span>{t.qualityLabel}</span>
          <span class="text-sky-700">{quality}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          class="w-full accent-sky-500"
          bind:value={quality}
          on:input={reprocessAll}
        />
      </div>
    </div>
  </div>

  <!-- Results List -->
  {#if items.length > 0}
    <div class="mt-6 space-y-4">
      <!-- Batch Action Bar -->
      <div class="flex items-center justify-between bg-white border border-sky-100 rounded-xl px-4 py-3 shadow-xs">
        <div class="text-xs font-bold text-slate-700">
          {t.processedTotalPrefix} <span class="text-sky-700">{items.length}</span> {t.processedTotalSuffix}
        </div>
        <div class="flex items-center gap-2">
          {#if items.length > 1}
            <button
              type="button"
              class="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-500 transition cursor-pointer"
              on:click={downloadAllAsZip}
            >
              <span>📦</span>
              <span>{t.downloadZip}</span>
            </button>
          {/if}
          <button
            type="button"
            class="text-xs text-rose-500 hover:text-rose-700 font-semibold px-2 py-1 cursor-pointer"
            on:click={clearAll}
          >
            {t.clearAll}
          </button>
        </div>
      </div>

      <!-- Item Cards -->
      <div class="space-y-3">
        {#each items as item (item.id)}
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
            <div class="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={item.previewUrl}
                alt="Preview"
                class="h-16 w-16 rounded-lg object-cover border border-slate-200"
              />
              <div class="min-w-0 flex-1">
                <p class="truncate text-xs font-bold text-slate-800 max-w-[200px] sm:max-w-xs">
                  {item.file.name}
                </p>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                  <span>{t.resolution}: {item.targetWidth}×{item.targetHeight}px</span>
                  <span>•</span>
                  <span>{formatBytes(item.originalSize)} → <strong class="text-sky-700">{formatBytes(item.compressedSize)}</strong></span>
                </div>
                {#if item.originalSize > 0 && item.compressedSize > 0}
                  <span class="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {Math.max(0, Math.round(((item.originalSize - item.compressedSize) / item.originalSize) * 100))}% {t.savedRate}
                  </span>
                {/if}
              </div>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                class="rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-sky-500 transition disabled:opacity-50 cursor-pointer"
                on:click={() => downloadSingle(item)}
                disabled={item.processing || !item.compressedBlob}
              >
                {item.processing ? t.processing : t.downloadSingle}
              </button>
              <button
                type="button"
                class="rounded-lg border border-slate-200 p-2 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                on:click={() => removeFile(item.id)}
                aria-label={t.delete}
              >
                ✕
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/if}

  <AdBanner />

  <!-- FAQ & Guide Section -->
  <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-base font-bold text-slate-900 mb-3">{t.faqTitle}</h2>
    <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">{t.faq1Q}</strong>
        <p class="mt-1 text-slate-500">
          {t.faq1A}
        </p>
      </div>

      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">{t.faq2Q}</strong>
        <p class="mt-1 text-slate-500">
          {t.faq2A}
        </p>
      </div>

      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">{t.faq3Q}</strong>
        <p class="mt-1 text-slate-500">
          {t.faq3A}
        </p>
      </div>
    </div>
  </section>
</div>
