<script lang="ts">
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';
  import { PDFDocument } from 'pdf-lib';

  type Mode = 'merge' | 'split';
  let mode: Mode = 'merge';

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

  const jsonLd = buildWebAppJsonLd({
    name: 'PDF 합치기 나누기 - SecurePDF',
    url: 'https://pdf.minitoolbox.dev',
    description: '서버로 PDF 파일을 업로드하지 않고 브라우저에서 직접 빠르고 안전하게 PDF 문서를 합치거나(Merge) 원하는 페이지만 나눕니다(Split).',
    applicationCategory: 'BusinessApplication'
  });

  const jsonLdFaq = buildFaqJsonLd([
    {
      question: '민감한 계약서나 주민등록번호가 있는 PDF를 올려도 안전한가요?',
      answer: '100% 안전합니다. 일반적인 온라인 PDF 변환 사이트와 달리 파일이 외부 서버로 단 1바이트도 전송되지 않고 사용자의 웹 브라우저 메모리 안에서 WebAssembly 및 JavaScript 엔진으로 직접 처리됩니다.'
    },
    {
      question: '파일 용량 제한이나 페이지 수 제한이 있나요?',
      answer: '서버 업로드 방식이 아니므로 서버 트래픽 제한이 전혀 없습니다. 사용자의 컴퓨터 CPU 및 RAM 성능만큼 대용량 PDF도 무제한 처리할 수 있습니다.'
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
    progressMessage = 'PDF 페이지 정보를 읽는 중...';

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
        errorMessage = `[${f.name}] 파일을 읽는 중 오류가 발생했습니다: ` + (err.message || '암호화된 PDF이거나 손상된 파일');
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
      errorMessage = '병합하려면 최소 2개 이상의 PDF 파일이 필요합니다.';
      return;
    }
    errorMessage = '';
    processing = true;
    progressMessage = '내 브라우저에서 PDF 페이지를 안전하게 병합하는 중...';

    try {
      const mergedPdf = await PDFDocument.create();

      for (let i = 0; i < mergeFiles.length; i++) {
        progressMessage = `[${i + 1}/${mergeFiles.length}] ${mergeFiles[i].name} 처리 중...`;
        const fileBytes = await mergeFiles[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      progressMessage = '병합된 PDF 파일 생성 중...';
      const mergedBytes = await mergedPdf.save();
      downloadBlob(new Blob([mergedBytes], { type: 'application/pdf' }), 'merged_document.pdf');
    } catch (err: any) {
      console.error(err);
      errorMessage = 'PDF 병합 처리 중 오류가 발생했습니다: ' + (err.message || '알 수 없는 오류');
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
      errorMessage = 'PDF 파일만 업로드할 수 있습니다.';
      return;
    }

    processing = true;
    progressMessage = 'PDF 페이지 구조 분석 중...';
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      splitFile = f;
      splitPageCount = pdf.getPageCount();
      splitRange = `1-${splitPageCount}`;
    } catch (err: any) {
      console.error(err);
      errorMessage = 'PDF를 읽을 수 없습니다: ' + (err.message || '암호화된 파일이거나 손상됨');
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
    progressMessage = '선택한 페이지를 추출 및 분할하는 중...';

    try {
      const arrayBuffer = await splitFile.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);

      if (splitModeOption === 'range') {
        const pagesToExtract = parsePageRange(splitRange, splitPageCount);
        if (pagesToExtract.length === 0) {
          errorMessage = '유효한 페이지 번호를 입력해주세요 (예: 1-3, 5).';
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
        // Individual page download (downloads first 5 or gives a prompt)
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
      errorMessage = 'PDF 분할 처리 중 오류가 발생했습니다: ' + (err.message || '알 수 없는 오류');
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
  <title>PDF 합치기 나누기 - SecurePDF (서버 전송 0KB)</title>
  <meta name="description" content="개인정보 유출 걱정 없는 100% 브라우저 기반 PDF 합치기 및 나누기. 서버 전송 0KB, 내 기기 메모리에서 즉시 처리." />
  <meta name="keywords" content="PDF 합치기, PDF 나누기, PDF 병합, PDF 분할, PDF 페이지 추출, 안전한 PDF 변환기, 무업로드 PDF" />
  <link rel="canonical" href="https://pdf.minitoolbox.dev/" />
  <meta property="og:title" content="PDF 합치기 나누기 - SecurePDF" />
  <meta property="og:description" content="개인정보 유출 걱정 없는 100% 브라우저 기반 PDF 합치기 및 나누기 (서버 전송 없음)." />
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
      <span>🔒 100% 로컬 프라이버시 보장</span>
      <span class="text-rose-400">•</span>
      <span>외부 서버 전송 0바이트</span>
    </div>
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      PDF 합치기 나누기
    </h1>
    <p class="mt-2 text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
      계약서, 금융 서류, 주민번호 등 민감한 서류가 외부 서버에 업로드될 걱정 없이, 내 브라우저 엔진에서 직접 초고속 연산합니다.
    </p>

    <!-- Tab Selection -->
    <div class="mt-6 inline-flex rounded-xl bg-slate-200/70 p-1 border border-slate-300/60 shadow-inner">
      <button
        type="button"
        class="flex items-center gap-1.5 rounded-lg px-6 py-2 text-xs font-black transition {mode === 'merge' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
        on:click={() => { mode = 'merge'; errorMessage = ''; }}
      >
        <span>📑 PDF 합치기 (Merge)</span>
      </button>
      <button
        type="button"
        class="flex items-center gap-1.5 rounded-lg px-6 py-2 text-xs font-black transition {mode === 'split' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
        on:click={() => { mode = 'split'; errorMessage = ''; }}
      >
        <span>✂️ PDF 분할/추출 (Split)</span>
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
      <p class="text-xs text-rose-600 mt-0.5">내 컴퓨터의 프로세서와 메모리를 사용하여 직접 렌더링 중입니다.</p>
    </div>
  {/if}

  <!-- Mode 1: MERGE -->
  {#if mode === 'merge'}
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-bold text-slate-900">여러 개의 PDF 파일 합치기</h2>
          <p class="text-xs text-slate-500 mt-0.5">파일 순서를 위아래로 변경하여 원하는 순서대로 병합할 수 있습니다.</p>
        </div>
        {#if mergeFiles.length > 0}
          <button
            type="button"
            class="text-xs font-bold text-slate-500 hover:text-red-600 transition"
            on:click={() => mergeFiles = []}
          >
            전체 지우기
          </button>
        {/if}
      </div>

      <!-- Dropzone -->
      <div
        class="relative rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/20 p-8 text-center transition hover:border-rose-400 hover:bg-rose-50/40"
        on:dragover|preventDefault
        on:drop|preventDefault={(e) => handleMergeFiles(e.dataTransfer?.files || null)}
        role="region"
        aria-label="PDF 파일 추가 영역"
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
          <p class="text-sm font-bold text-slate-800">합칠 PDF 파일들을 드래그하거나 클릭하여 추가하세요</p>
          <p class="text-xs text-slate-500">여러 파일을 한 번에 선택할 수 있으며 대용량 파일도 즉시 인식됩니다</p>
        </div>
      </div>

      <!-- File Queue List -->
      {#if mergeFiles.length > 0}
        <div class="mt-6 space-y-2.5">
          <div class="flex justify-between items-center text-xs font-bold text-slate-600 pb-1 border-b border-slate-100">
            <span>선택된 파일 목록 ({mergeFiles.length}개)</span>
            <span>총 {mergeFiles.reduce((acc, curr) => acc + curr.pageCount, 0)}페이지</span>
          </div>

          {#each mergeFiles as item, idx}
            <div class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs transition hover:bg-slate-50">
              <div class="flex items-center space-x-3 overflow-hidden">
                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-700 text-[11px]">
                  {idx + 1}
                </span>
                <div class="truncate">
                  <p class="font-bold text-slate-800 truncate">{item.name}</p>
                  <p class="text-[11px] text-slate-500">{formatBytes(item.size)} • {item.pageCount}페이지</p>
                </div>
              </div>

              <div class="flex items-center space-x-1 shrink-0">
                <button
                  type="button"
                  class="rounded p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 disabled:opacity-30"
                  disabled={idx === 0}
                  on:click={() => moveMergeItem(idx, 'up')}
                  title="위로 이동"
                >
                  ▲
                </button>
                <button
                  type="button"
                  class="rounded p-1.5 text-slate-500 hover:bg-slate-200 hover:text-slate-800 disabled:opacity-30"
                  disabled={idx === mergeFiles.length - 1}
                  on:click={() => moveMergeItem(idx, 'down')}
                  title="아래로 이동"
                >
                  ▼
                </button>
                <button
                  type="button"
                  class="rounded p-1.5 text-red-500 hover:bg-red-100 hover:text-red-700"
                  on:click={() => removeMergeItem(idx)}
                  title="제거"
                >
                  ✕
                </button>
              </div>
            </div>
          {/each}

          <div class="mt-6 flex justify-end pt-2">
            <button
              type="button"
              class="rounded-xl bg-rose-600 px-6 py-3 text-sm font-bold text-white shadow-xs hover:bg-rose-500 transition disabled:opacity-50"
              disabled={processing || mergeFiles.length < 2}
              on:click={executeMerge}
            >
              하나의 PDF로 병합 다운로드
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
          <h2 class="text-base font-bold text-slate-900">PDF 페이지 분할 및 추출</h2>
          <p class="text-xs text-slate-500 mt-0.5">원하는 페이지 범위만 지정하여 새로운 PDF 파일로 안전하게 추출합니다.</p>
        </div>
      </div>

      {#if !splitFile}
        <div
          class="relative rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/20 p-8 text-center transition hover:border-rose-400 hover:bg-rose-50/40"
          on:dragover|preventDefault
          on:drop|preventDefault={(e) => handleSplitFile(e.dataTransfer?.files || null)}
          role="region"
          aria-label="분할할 PDF 파일 추가 영역"
        >
          <input
            type="file"
            accept="application/pdf"
            class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            on:change={(e) => handleSplitFile((e.target as HTMLInputElement).files)}
          />
          <div class="flex flex-col items-center justify-center space-y-2">
            <div class="rounded-full bg-rose-100 p-3 text-2xl text-rose-700">✂️</div>
            <p class="text-sm font-bold text-slate-800">분할할 PDF 파일을 드래그하거나 선택하세요</p>
            <p class="text-xs text-slate-500">1개 파일 선택 가능</p>
          </div>
        </div>
      {:else}
        <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-6 flex justify-between items-center text-xs">
          <div>
            <p class="font-bold text-slate-800 text-sm">{splitFile.name}</p>
            <p class="text-slate-500 mt-0.5">{formatBytes(splitFile.size)} • 총 {splitPageCount}페이지</p>
          </div>
          <button
            type="button"
            class="text-xs font-bold text-slate-500 hover:text-red-600 transition"
            on:click={() => splitFile = null}
          >
            다른 파일 선택
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label for="range-input" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              추출할 페이지 번호 또는 범위
            </label>
            <input
              id="range-input"
              type="text"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-2xs focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              placeholder="예: 1-3, 5, 7-9"
              bind:value={splitRange}
            />
            <p class="text-[11px] text-slate-500 mt-1">
              콤마(,)와 하이픈(-)을 사용하여 유연하게 페이지를 지정할 수 있습니다 (예: 1, 3, 5-8).
            </p>
          </div>

          <div class="flex justify-end pt-2">
            <button
              type="button"
              class="rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-rose-500 transition disabled:opacity-50"
              disabled={processing || !splitRange.trim()}
              on:click={executeSplit}
            >
              지정한 페이지만 새 PDF로 추출
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
      <span>서버 무전송 안심 처리 원리</span>
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
      <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
        <strong class="text-slate-800 block mb-1">💻 로컬 CPU/RAM 연산</strong>
        <p class="text-slate-500">인터넷 망을 통해 파일 바이트가 전송되지 않고 사용자의 기기 자원만으로 즉각 처리됩니다.</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
        <strong class="text-slate-800 block mb-1">🚫 데이터 저장 0%</strong>
        <p class="text-slate-500">어떠한 클라우드나 데이터베이스에도 보관되지 않으며 브라우저 탭을 닫는 즉시 메모리에서 영구 파기됩니다.</p>
      </div>
      <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
        <strong class="text-slate-800 block mb-1">⚡ 무제한 용량 & 초고속</strong>
        <p class="text-slate-500">서버 업로드/다운로드 대기 시간이 없어 수백 페이지 대용량 문서도 수초 이내에 병합/분할됩니다.</p>
      </div>
    </div>
  </section>
</div>
