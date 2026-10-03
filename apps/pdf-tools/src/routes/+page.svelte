<script lang="ts">
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';
  import { currentLang, translations } from '$lib/langStore';
  import { PDFDocument } from 'pdf-lib';

  type Mode = 'merge' | 'split';
  let mode: Mode = 'merge';

  $: t = translations[$currentLang];

  // Merge state
  interface MergeItem {
    id: string;
    file: File;
    name: string;
    size: number;
    pageCount: number;
  }
  let mergeFiles: MergeItem[] = [];

  // Split state
  let splitFile: File | null = null;
  let splitPageCount = 0;
  let splitRange = '';
  let splitModeOption: 'range' | 'all' = 'range';

  let processing = false;
  let progressMessage = '';
  let errorMessage = '';

  $: jsonLd = buildWebAppJsonLd({
    name: $currentLang === 'en' ? 'Secure PDF Merge & Split - SecurePDF' : 'PDF 합치기 나누기 - SecurePDF',
    url: 'https://pdf.minitoolbox.dev',
    description: $currentLang === 'en'
      ? 'Process confidential PDFs directly in your browser. 100% client-side merge & extract with 0 bytes uploaded to remote servers.'
      : '서버로 PDF 파일을 업로드하지 않고 브라우저에서 직접 빠르고 안전하게 PDF 문서를 합치거나(Merge) 원하는 페이지만 나눕니다(Split).',
    applicationCategory: 'BusinessApplication'
  });

  $: jsonLdFaq = buildFaqJsonLd([
    {
      question: $currentLang === 'en'
        ? 'Is it safe to upload confidential contracts or passports?'
        : '민감한 계약서나 주민등록번호가 있는 PDF를 올려도 안전한가요?',
      answer: $currentLang === 'en'
        ? '100% safe. Unlike traditional cloud converter services, zero bytes are transmitted across any network. Everything processes locally inside your browser memory and Wasm engine.'
        : '100% 안전합니다. 일반적인 온라인 PDF 변환 사이트와 달리 파일이 외부 서버로 단 1바이트도 전송되지 않고 사용자의 웹 브라우저 메모리 안에서 WebAssembly 및 JavaScript 엔진으로 직접 처리됩니다.'
    },
    {
      question: $currentLang === 'en'
        ? 'Are there file size or page count limits?'
        : '파일 용량 제한이나 페이지 수 제한이 있나요?',
      answer: $currentLang === 'en'
        ? 'No server quotas or rate limits exist. Your local CPU and memory determine capacity, letting you process large multi-hundred-page PDFs freely.'
        : '서버 업로드 방식이 아니므로 서버 트래픽 제한이 전혀 없습니다. 사용자의 컴퓨터 CPU 및 RAM 성능만큼 대용량 PDF도 무제한 처리할 수 있습니다.'
    }
  ]);

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  async function handleMergeFiles(files: FileList | null) {
    if (!files) return;
    errorMessage = '';
    processing = true;
    progressMessage = t.readingPages;

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) continue;
      try {
        const arrayBuffer = await f.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        mergeFiles = [
          ...mergeFiles,
          {
            id: Math.random().toString(36).substring(2, 9),
            file: f,
            name: f.name,
            size: f.size,
            pageCount: pdf.getPageCount()
          }
        ];
      } catch (err: any) {
        console.error(err);
        errorMessage = `[${f.name}] ${t.readErrPrefix}` + (err.message || 'Error');
      }
    }
    processing = false;
    progressMessage = '';
  }

  function moveMergeItem(index: number, direction: 'up' | 'down') {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= mergeFiles.length) return;
    const items = [...mergeFiles];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    mergeFiles = items;
  }

  function removeMergeItem(index: number) {
    mergeFiles = mergeFiles.filter((_, i) => i !== index);
  }

  async function executeMerge() {
    if (mergeFiles.length < 2) {
      errorMessage = t.minMergeErr;
      return;
    }
    errorMessage = '';
    processing = true;
    progressMessage = t.mergingLocal;

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < mergeFiles.length; i++) {
        progressMessage = `[${i + 1}/${mergeFiles.length}] ${mergeFiles[i].name} ${t.processingItem}`;
        const fileBytes = await mergeFiles[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      progressMessage = t.generatingPdf;
      const mergedBytes = await mergedPdf.save();
      downloadBlob(new Blob([mergedBytes], { type: 'application/pdf' }), 'merged_document.pdf');
    } catch (err: any) {
      console.error(err);
      errorMessage = 'Error: ' + (err.message || 'Unknown error');
    } finally {
      processing = false;
      progressMessage = '';
    }
  }

  async function handleSplitFile(files: FileList | null) {
    if (!files || !files[0]) return;
    errorMessage = '';
    const f = files[0];
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      errorMessage = t.onlyPdfErr;
      return;
    }

    processing = true;
    progressMessage = t.analyzingPdf;
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      splitFile = f;
      splitPageCount = pdf.getPageCount();
      splitRange = `1-${splitPageCount}`;
    } catch (err: any) {
      console.error(err);
      errorMessage = t.readErrPrefix + (err.message || 'Error');
      splitFile = null;
    } finally {
      processing = false;
      progressMessage = '';
    }
  }

  function parsePageRange(rangeStr: string, maxPages: number): number[] {
    const indices: Set<number> = new Set();
    const parts = rangeStr.split(',').map((s) => s.trim());

    for (const part of parts) {
      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-').map((s) => s.trim());
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (!isNaN(start) && !isNaN(end)) {
          const from = Math.max(1, Math.min(start, end));
          const to = Math.min(maxPages, Math.max(start, end));
          for (let p = from; p <= to; p++) {
            indices.add(p - 1);
          }
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p) && p >= 1 && p <= maxPages) {
          indices.add(p - 1);
        }
      }
    }
    return Array.from(indices).sort((a, b) => a - b);
  }

  async function executeSplit() {
    if (!splitFile) return;
    errorMessage = '';
    processing = true;
    progressMessage = t.splittingPages;

    try {
      const arrayBuffer = await splitFile.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);

      if (splitModeOption === 'range') {
        const pagesToExtract = parsePageRange(splitRange, splitPageCount);
        if (pagesToExtract.length === 0) {
          errorMessage = t.validRangeErr;
          processing = false;
          return;
        }

        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(srcPdf, pagesToExtract);
        copied.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        downloadBlob(
          new Blob([pdfBytes], { type: 'application/pdf' }),
          `${splitFile.name.replace(/\.pdf$/i, '')}_extracted.pdf`
        );
      } else {
        const newPdf = await PDFDocument.create();
        const copied = await newPdf.copyPages(srcPdf, [0]);
        newPdf.addPage(copied[0]);
        const pdfBytes = await newPdf.save();
        downloadBlob(
          new Blob([pdfBytes], { type: 'application/pdf' }),
          `${splitFile.name.replace(/\.pdf$/i, '')}_page_1.pdf`
        );
      }
    } catch (err: any) {
      console.error(err);
      errorMessage = 'Error: ' + (err.message || 'Unknown error');
    } finally {
      processing = false;
      progressMessage = '';
    }
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>{t.metaTitle}</title>
  <meta name="description" content={t.metaDesc} />
  <link rel="canonical" href="https://pdf.minitoolbox.dev/" />
  <meta property="og:title" content={t.metaTitle} />
  <meta property="og:description" content={t.metaDesc} />
  <meta property="og:url" content="https://pdf.minitoolbox.dev/" />
  <meta property="og:image" content="https://pdf.minitoolbox.dev/icon-512.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Title & Privacy Shield Callout -->
  <div class="mb-8 text-center">
    <div class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-1 text-xs font-bold text-rose-800 border border-rose-200 mb-3 shadow-2xs">
      <span>{t.privacyBadge}</span>
    </div>
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      {t.title}
    </h1>
    <p class="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
      {t.desc}
    </p>

    <!-- Tab Selection -->
    <div class="mt-6 inline-flex rounded-xl bg-slate-200/70 p-1 border border-slate-300/60 shadow-inner">
      <button
        type="button"
        class="flex items-center gap-1.5 rounded-lg px-6 py-2 text-xs font-black transition {mode === 'merge' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
        on:click={() => { mode = 'merge'; errorMessage = ''; }}
      >
        <span>{t.tabMerge}</span>
      </button>
      <button
        type="button"
        class="flex items-center gap-1.5 rounded-lg px-6 py-2 text-xs font-black transition {mode === 'split' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
        on:click={() => { mode = 'split'; errorMessage = ''; }}
      >
        <span>{t.tabSplit}</span>
      </button>
    </div>
  </div>

  {#if errorMessage}
    <div class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-center justify-between">
      <span>⚠️ {errorMessage}</span>
      <button type="button" class="text-red-500 hover:text-red-700 font-bold" on:click={() => errorMessage = ''}>✕</button>
    </div>
  {/if}

  {#if processing}
    <div class="mb-6 rounded-xl border border-rose-200 bg-rose-50/80 p-4 text-center">
      <div class="inline-block animate-spin text-2xl mb-2">⏳</div>
      <p class="text-sm font-bold text-rose-800">{progressMessage}</p>
      <p class="text-xs text-rose-600 mt-0.5">{t.renderingNotice}</p>
    </div>
  {/if}

  <!-- Mode 1: MERGE -->
  {#if mode === 'merge'}
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-bold text-slate-900">{t.mergeTitle}</h2>
          <p class="text-xs text-slate-500 mt-0.5">{t.mergeSubtitle}</p>
        </div>
        {#if mergeFiles.length > 0}
          <button
            type="button"
            class="text-xs font-bold text-slate-500 hover:text-red-600 transition"
            on:click={() => mergeFiles = []}
          >
            {t.clearAll}
          </button>
        {/if}
      </div>

      <!-- Dropzone -->
      <div
        class="relative rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/20 p-8 text-center transition hover:border-rose-400 hover:bg-rose-50/40"
        on:dragover|preventDefault
        on:drop|preventDefault={(e) => handleMergeFiles(e.dataTransfer?.files || null)}
        role="region"
        aria-label="PDF Upload Zone"
      >
        <input
          type="file"
          accept="application/pdf"
          multiple
          class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          on:change={(e) => handleMergeFiles((e.target as HTMLInputElement).files)}
        />
        <div class="flex flex-col items-center justify-center space-y-2">
          <div class="rounded-full bg-rose-100 p-3 text-2xl text-rose-700">📑</div>
          <p class="text-sm font-bold text-slate-800">{t.dropMergeTitle}</p>
          <p class="text-xs text-slate-500">{t.dropMergeSub}</p>
        </div>
      </div>

      <!-- File Queue List -->
      {#if mergeFiles.length > 0}
        <div class="mt-6 space-y-2.5">
          <div class="flex justify-between items-center text-xs font-bold text-slate-600 pb-1 border-b border-slate-100">
            <span>{t.queueTitle} ({mergeFiles.length})</span>
            <span>{t.totalPrefix} {mergeFiles.reduce((acc, curr) => acc + curr.pageCount, 0)} {t.totalPagesSuffix}</span>
          </div>

          {#each mergeFiles as item, idx}
            <div class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs transition hover:bg-slate-50">
              <div class="flex items-center space-x-3 overflow-hidden">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-[11px]">
                  {idx + 1}
                </span>
                <div class="truncate">
                  <p class="font-bold text-slate-800 truncate">{item.name}</p>
                  <p class="text-[11px] text-slate-500">{formatBytes(item.size)} • {item.pageCount} {t.pagesSuffix}</p>
                </div>
              </div>

              <div class="flex items-center space-x-1 shrink-0">
                <button
                  type="button"
                  class="rounded p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 disabled:opacity-30"
                  disabled={idx === 0}
                  on:click={() => moveMergeItem(idx, 'up')}
                  title={t.moveUp}
                >
                  ▲
                </button>
                <button
                  type="button"
                  class="rounded p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 disabled:opacity-30"
                  disabled={idx === mergeFiles.length - 1}
                  on:click={() => moveMergeItem(idx, 'down')}
                  title={t.moveDown}
                >
                  ▼
                </button>
                <button
                  type="button"
                  class="rounded p-1.5 text-red-500 hover:bg-red-100 hover:text-red-700"
                  on:click={() => removeMergeItem(idx)}
                  title={t.remove}
                >
                  ✕
                </button>
              </div>
            </div>
          {/each}

          <div class="mt-6 flex justify-end pt-2">
            <button
              type="button"
              class="rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-xs hover:bg-rose-500 transition disabled:opacity-50 cursor-pointer"
              disabled={processing || mergeFiles.length < 2}
              on:click={executeMerge}
            >
              {t.mergeBtn}
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Mode 2: SPLIT -->
  {#if mode === 'split'}
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-bold text-slate-900">{t.splitTitle}</h2>
          <p class="text-xs text-slate-500 mt-0.5">{t.splitSubtitle}</p>
        </div>
      </div>

      {#if !splitFile}
        <div
          class="relative rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/20 p-8 text-center transition hover:border-rose-400 hover:bg-rose-50/40"
          on:dragover|preventDefault
          on:drop|preventDefault={(e) => handleSplitFile(e.dataTransfer?.files || null)}
          role="region"
          aria-label="PDF Split Dropzone"
        >
          <input
            type="file"
            accept="application/pdf"
            class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            on:change={(e) => handleSplitFile((e.target as HTMLInputElement).files)}
          />
          <div class="flex flex-col items-center justify-center space-y-2">
            <div class="rounded-full bg-rose-100 p-3 text-2xl text-rose-700">✂️</div>
            <p class="text-sm font-bold text-slate-800">{t.dropSplitTitle}</p>
            <p class="text-xs text-slate-500">{t.dropSplitSub}</p>
          </div>
        </div>
      {:else}
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-6 flex justify-between items-center text-xs">
          <div>
            <p class="font-bold text-slate-800 text-sm">{splitFile.name}</p>
            <p class="text-slate-500 mt-0.5">{formatBytes(splitFile.size)} • {t.totalPrefix} {splitPageCount} {t.totalPagesSuffix}</p>
          </div>
          <button
            type="button"
            class="text-xs font-bold text-slate-500 hover:text-red-600 transition"
            on:click={() => splitFile = null}
          >
            {t.changeFile}
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label for="range-input" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.rangeLabel}
            </label>
            <input
              id="range-input"
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-2xs focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder={t.rangePlaceholder}
              bind:value={splitRange}
            />
            <p class="text-[11px] text-slate-500 mt-1">
              {t.rangeHint}
            </p>
          </div>

          <div class="flex justify-end pt-2">
            <button
              type="button"
              class="rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-rose-500 transition disabled:opacity-50 cursor-pointer"
              disabled={processing || !splitRange.trim()}
              on:click={executeSplit}
            >
              {t.splitBtn}
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <AdBanner />

  <!-- Security & Privacy Architecture Highlights -->
  <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
    <h2 class="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
      <span>🛡️</span>
      <span>{t.archTitle}</span>
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
      <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
        <strong class="text-slate-800 block mb-1">{t.archItem1Title}</strong>
        <p class="text-slate-500">{t.archItem1Desc}</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
        <strong class="text-slate-800 block mb-1">{t.archItem2Title}</strong>
        <p class="text-slate-500">{t.archItem2Desc}</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
        <strong class="text-slate-800 block mb-1">{t.archItem3Title}</strong>
        <p class="text-slate-500">{t.archItem3Desc}</p>
      </div>
    </div>
  </section>
</div>
