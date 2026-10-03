<script lang="ts">
  import { onMount } from 'svelte';
  import type { MaskRect } from './types';

  export let lang: 'en' | 'de' | 'ko' = 'en';

  let fileInput: HTMLInputElement;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null = null;
  let currentImage: HTMLImageElement | null = null;

  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let currentY = 0;

  let masks: MaskRect[] = [];
  let maskStyle: 'black' | 'blur' = 'black';
  let isImageLoaded = false;
  let fileName = 'document.png';

  onMount(() => {
    if (canvas) {
      ctx = canvas.getContext('2d');
    }
  });

  function handleFile(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      loadFile(input.files[0]);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files[0]) {
      loadFile(e.dataTransfer.files[0]);
    }
  }

  function loadFile(file: File) {
    fileName = file.name.replace(/\.[^/.]+$/, '') + '_masked.png';
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        currentImage = img;
        masks = [];
        isImageLoaded = true;
        renderCanvas();
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  function renderCanvas() {
    if (!canvas || !currentImage) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to image natural size
    canvas.width = currentImage.naturalWidth;
    canvas.height = currentImage.naturalHeight;

    // Draw base image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(currentImage, 0, 0);

    // Draw all masks
    for (const mask of masks) {
      if (maskStyle === 'black') {
        ctx.fillStyle = '#0f172a'; // solid black/slate-900
        ctx.fillRect(mask.x, mask.y, mask.width, mask.height);
      } else {
        // Pixelated/blur placeholder effect
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(mask.x, mask.y, mask.width, mask.height);
      }
    }

    // Draw live drag rectangle if drawing
    if (isDrawing) {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      const x = Math.min(startX, currentX);
      const y = Math.min(startY, currentY);
      const w = Math.abs(currentX - startX);
      const h = Math.abs(currentY - startY);
      ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
    }
  }

  function getCanvasCoords(e: MouseEvent): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function startMask(e: MouseEvent) {
    if (!isImageLoaded) return;
    isDrawing = true;
    const pos = getCanvasCoords(e);
    startX = pos.x;
    startY = pos.y;
    currentX = pos.x;
    currentY = pos.y;
  }

  function moveMask(e: MouseEvent) {
    if (!isDrawing) return;
    const pos = getCanvasCoords(e);
    currentX = pos.x;
    currentY = pos.y;
    renderCanvas();
  }

  function endMask() {
    if (!isDrawing) return;
    isDrawing = false;
    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    const w = Math.abs(currentX - startX);
    const h = Math.abs(currentY - startY);

    if (w > 5 && h > 5) {
      masks.push({ x, y, width: w, height: h });
      masks = [...masks];
    }
    renderCanvas();
  }

  function undoMask() {
    masks.pop();
    masks = [...masks];
    renderCanvas();
  }

  function clearMasks() {
    masks = [];
    renderCanvas();
  }

  function downloadMasked() {
    if (!canvas || !isImageLoaded) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
</script>

<div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
    <div>
      <h3 class="text-base font-bold text-slate-900">
        {lang === 'ko' ? '안심 서류 마스킹 도구 (브라우저 직접 처리)' : lang === 'de' ? 'Sichere Dokumenten-Schwärzung (100% Lokal)' : 'Safe In-Browser Document Masker'}
      </h3>
      <p class="text-xs text-slate-500">
        {lang === 'ko' ? '임대차계약서, 여권, 급여명세서의 계좌번호(IBAN)나 서명 등 민감한 개인정보를 안전하게 가리고 저장하세요.' : lang === 'de' ? 'Schwärzen Sie sensible Daten wie IBAN, Unterschriften und Ausweisnummern vor der Weitergabe.' : 'Black out sensitive data (IBAN, signatures, tax ID) before sharing or printing.'}
      </p>
    </div>

    {#if isImageLoaded}
      <div class="flex items-center gap-2">
        <button
          type="button"
          on:click={undoMask}
          disabled={masks.length === 0}
          class="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
        >
          {lang === 'ko' ? '↩ 실행취소' : lang === 'de' ? '↩ Rückgängig' : '↩ Undo'}
        </button>
        <button
          type="button"
          on:click={clearMasks}
          disabled={masks.length === 0}
          class="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-40 transition"
        >
          {lang === 'ko' ? '전체 초기화' : lang === 'de' ? 'Zurücksetzen' : 'Reset'}
        </button>
        <button
          type="button"
          on:click={downloadMasked}
          class="rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-xs transition"
        >
          {lang === 'ko' ? '⬇ 마스킹 파일 다운로드' : lang === 'de' ? '⬇ Geschwärzte Datei laden' : '⬇ Download Masked'}
        </button>
      </div>
    {/if}
  </div>

  {#if !isImageLoaded}
    <!-- File Drop Zone -->
    <div
      class="mt-4 rounded-xl border-2 border-dashed border-slate-300 p-8 text-center hover:border-blue-500 hover:bg-slate-50/50 transition cursor-pointer"
      on:click={() => fileInput.click()}
      on:dragover|preventDefault
      on:drop|preventDefault={handleDrop}
      role="button"
      tabindex="0"
      on:keydown={(e) => e.key === 'Enter' && fileInput.click()}
    >
      <input
        type="file"
        accept="image/*"
        bind:this={fileInput}
        on:change={handleFile}
        class="hidden"
      />
      <div class="text-4xl mb-2">📑</div>
      <p class="text-xs font-bold text-slate-800">
        {lang === 'ko' ? '마스킹할 서류(여권, 계약서, 급여명세서) 이미지 업로드' : lang === 'de' ? 'Dokumenten-Scan hier ablegen oder auswählen' : 'Click or drop document scan (Passport, Lease, Bank statement)'}
      </p>
      <p class="mt-1 text-[11px] text-slate-400">
        JPG, PNG, WebP • 100% 브라우저 메모리 연산 (서버 전송 없음)
      </p>
    </div>
  {:else}
    <!-- Canvas Editor Area -->
    <div class="mt-4">
      <div class="mb-2 flex items-center justify-between text-xs text-slate-500">
        <span>💡 마우스로 드래그하여 가리고 싶은 영역에 사각형을 그리세요 (마스킹 수: {masks.length}개)</span>
        <button
          type="button"
          on:click={() => fileInput.click()}
          class="text-blue-600 font-semibold hover:underline"
        >
          {lang === 'ko' ? '다른 파일 선택' : 'Change Document'}
        </button>
      </div>

      <div class="max-h-[600px] overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-2 flex justify-center shadow-inner">
        <canvas
          bind:this={canvas}
          on:mousedown={startMask}
          on:mousemove={moveMask}
          on:mouseup={endMask}
          on:mouseleave={endMask}
          class="max-w-full h-auto cursor-crosshair rounded-lg shadow-md bg-white"
        ></canvas>
      </div>
    </div>
  {/if}
</div>
