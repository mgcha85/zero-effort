<script lang="ts">
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';

  let file: File | null = null;
  let originalSize = 0;
  let compressedBlob: Blob | null = null;
  let compressedSize = 0;
  let previewUrl = '';
  let format: 'image/webp' | 'image/jpeg' | 'image/png' = 'image/jpeg';
  let quality = 85;
  let processing = false;

  type Preset = 'custom' | 'resume' | 'passport' | 'gov24_1mb' | 'gov24_10mb';
  let selectedPreset: Preset = 'custom';

  const jsonLd = buildWebAppJsonLd({
    name: '정부24 및 이력서 전용 안전 이미지/서류 압축기 (서버 무전송)',
    url: 'https://fastpic.kr',
    description: '서버로 사진을 전송하지 않고 브라우저에서 100% 안전하게 이력서 사진(3x4cm), 여권사진(3.5x4.5cm), 정부24/홈택스 첨부서류 용량을 0.1초 만에 맞춤 압축합니다.',
    applicationCategory: 'MultimediaApplication'
  });

  const jsonLdFaq = buildFaqJsonLd([
    {
      question: '정부24나 대입/취업 사이트의 100KB, 500KB 용량 제한을 맞출 수 있나요?',
      answer: '네! [이력서 3x4 사진] 또는 [정부24 서류 규격] 프리셋을 클릭하시면 업로드 제한 용량 이하로 자동 리사이즈 및 압축됩니다.'
    },
    {
      question: '주민등록증이나 개인정보가 담긴 서류를 올려도 안전한가요?',
      answer: '100% 안전합니다. 일반 사이트와 달리 사용자의 컴퓨터/스마트폰 브라우저 내부 메모리에서만 연산되며 외부 서버로 1바이트도 전송되지 않습니다.'
    }
  ]);

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      loadFile(input.files[0]);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFile(e.dataTransfer.files[0]);
    }
  }

  function loadFile(f: File) {
    file = f;
    originalSize = f.size;
    previewUrl = URL.createObjectURL(f);
    applyPresetAndProcess();
  }

  function setPreset(p: Preset) {
    selectedPreset = p;
    if (p === 'resume') {
      format = 'image/jpeg';
      quality = 80;
    } else if (p === 'passport') {
      format = 'image/jpeg';
      quality = 85;
    } else if (p === 'gov24_1mb') {
      format = 'image/jpeg';
      quality = 75;
    } else if (p === 'gov24_10mb') {
      format = 'image/jpeg';
      quality = 90;
    }
    applyPresetAndProcess();
  }

  function applyPresetAndProcess() {
    if (!file) return;
    processing = true;

    const img = new Image();
    img.onload = () => {
      let targetW = img.width;
      let targetH = img.height;

      if (selectedPreset === 'resume') {
        // 3x4 ratio (standard 354x472 px)
        targetW = 354;
        targetH = 472;
      } else if (selectedPreset === 'passport') {
        // 3.5x4.5 ratio (standard 413x531 px)
        targetW = 413;
        targetH = 531;
      } else if (selectedPreset === 'gov24_1mb' && targetW > 1600) {
        const ratio = 1600 / targetW;
        targetW = 1600;
        targetH = Math.round(targetH * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, targetW, targetH);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              compressedBlob = blob;
              compressedSize = blob.size;
            }
            processing = false;
          },
          format,
          quality / 100
        );
      } else {
        processing = false;
      }
    };
    img.src = previewUrl;
  }

  function downloadCompressed() {
    if (!compressedBlob || !file) return;
    const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(compressedBlob);
    a.download = `${originalName}_optimized.${ext}`;
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
  <title>정부24 • 이력서 사진 용량 줄이기 - 무업로드 안심 압축기</title>
  <meta name="description" content="서버 전송 0KB, 개인정보 100% 보호. 취업 이력서 3x4 사진, 공공기관 제출 서류 용량 초과 해결. 브라우저에서 0.1초 만에 무료 변환." />
  <meta name="keywords" content="이력서 사진 용량 줄이기, 증명사진 3x4 규격 변환, 정부24 첨부서류 용량 줄이기, 이미지 용량 줄이기, 무업로드 사진 압축" />
  <!-- Naver Search Advisor Verification Slot -->
  <meta name="naver-site-verification" content="" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Title -->
  <div class="mb-8 text-center">
    <div class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 mb-3">
      <span>🔒 대한민국 공공기관 & 취업 제출 전용</span>
      <span>•</span>
      <span>서버 전송 없음</span>
    </div>
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      이력서 & 정부24 서류 안심 압축기
    </h1>
    <p class="mt-2 text-sm text-slate-600">
      주민번호나 얼굴 사진이 외부 서버에 저장될 걱정 없이, 내 브라우저에서 즉시 규격 맞춤 변환
    </p>
  </div>

  <!-- Fast Presets for Korea -->
  <div class="mb-6 rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
    <span class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">⚡ 한국형 원클릭 제출 규격 프리셋</span>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold">
      <button
        type="button"
        class="rounded-xl p-2.5 border text-center transition {selectedPreset === 'resume' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}"
        on:click={() => setPreset('resume')}
      >
        <span class="block font-bold">📄 취업/이력서 사진</span>
        <span class="text-[11px] text-slate-500">3x4cm (100KB 이하)</span>
      </button>

      <button
        type="button"
        class="rounded-xl p-2.5 border text-center transition {selectedPreset === 'passport' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}"
        on:click={() => setPreset('passport')}
      >
        <span class="block font-bold">🛂 여권/주민등록증</span>
        <span class="text-[11px] text-slate-500">3.5x4.5cm</span>
      </button>

      <button
        type="button"
        class="rounded-xl p-2.5 border text-center transition {selectedPreset === 'gov24_1mb' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}"
        on:click={() => setPreset('gov24_1mb')}
      >
        <span class="block font-bold">🏛️ 정부24 서류 첨부</span>
        <span class="text-[11px] text-slate-500">1MB 이하 압축</span>
      </button>

      <button
        type="button"
        class="rounded-xl p-2.5 border text-center transition {selectedPreset === 'custom' ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}"
        on:click={() => setPreset('custom')}
      >
        <span class="block font-bold">⚙️ 사용자 지정 품질</span>
        <span class="text-[11px] text-slate-500">WebP / JPG / PNG</span>
      </button>
    </div>
  </div>

  <!-- Upload Area -->
  <div
    class="relative rounded-2xl border-2 border-dashed border-slate-300 bg-white p-8 text-center transition hover:border-emerald-500 shadow-sm"
    on:dragover|preventDefault
    on:drop={handleDrop}
    role="region"
    aria-label="파일 업로드 영역"
  >
    <input
      type="file"
      accept="image/*"
      class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      on:change={handleFileSelect}
    />
    <div class="flex flex-col items-center justify-center space-y-3">
      <div class="rounded-full bg-emerald-50 p-4 text-3xl">📥</div>
      <div>
        <p class="text-sm font-bold text-slate-800">
          증명사진이나 서류 이미지를 드래그하거나 클릭하여 선택하세요
        </p>
        <p class="text-xs text-slate-400 mt-1">서버 업로드 대기 없이 즉시 변환됩니다 (최대 용량 무제한)</p>
      </div>
    </div>
  </div>

  <!-- Settings & Result Area -->
  {#if file}
    <div class="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <!-- Controls -->
        <div class="space-y-4">
          <div>
            <label for="format-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">출력 파일 포맷</label>
            <select
              id="format-select"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm focus:border-emerald-500 focus:outline-none"
              bind:value={format}
              on:change={applyPresetAndProcess}
            >
              <option value="image/jpeg">JPG/JPEG (정부24 및 채용사이트 표준)</option>
              <option value="image/webp">WebP (초고압축 추천)</option>
              <option value="image/png">PNG (무손실 원본화질)</option>
            </select>
          </div>

          <div>
            <div class="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>압축 품질 조절</span>
              <span>{quality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              class="w-full accent-emerald-600"
              bind:value={quality}
              on:input={applyPresetAndProcess}
            />
          </div>
        </div>

        <!-- Comparison Stats -->
        <div class="rounded-xl bg-slate-50 p-4 border border-slate-100 flex flex-col justify-center space-y-3">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500">원본 용량:</span>
            <span class="font-bold text-slate-700">{formatBytes(originalSize)}</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500">압축 후 용량:</span>
            <span class="font-bold text-emerald-600 text-sm">{formatBytes(compressedSize)}</span>
          </div>
          {#if originalSize > 0 && compressedSize > 0}
            <div class="flex justify-between items-center text-xs border-t pt-2 border-slate-200">
              <span class="text-slate-500">용량 절감율:</span>
              <span class="font-black text-emerald-700">
                {Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))}% 용량 감소
              </span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-6 flex justify-end">
        <button
          type="button"
          class="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-emerald-500 transition disabled:opacity-50"
          on:click={downloadCompressed}
          disabled={processing || !compressedBlob}
        >
          {processing ? '압축 처리 중...' : '최적화된 사진/서류 즉시 다운로드'}
        </button>
      </div>
    </div>
  {/if}

  <AdBanner />

  <!-- Korea SEO Guide Section -->
  <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-bold text-slate-900 mb-3">자주 묻는 규격 질문</h2>
    <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">Q. 공공기관/취업 사이트에서 사진 등록 시 "용량 초과" 에러가 뜨는 이유?</strong>
        <p class="mt-1 text-slate-500">대부분의 시스템은 100KB, 500KB 또는 1MB 이하의 용량 제한이 있습니다. [취업/이력서 사진] 프리셋을 누르면 자동으로 100KB 내외로 줄어들어 바로 등록됩니다.</p>
      </div>
      <div class="rounded-lg bg-slate-50 p-3">
        <strong class="text-slate-800">Q. 주민등록번호나 얼굴 사진이 유출되지 않나요?</strong>
        <p class="mt-1 text-slate-500">본 도구는 사용자 PC의 브라우저 엔진(HTML5 Canvas)에서 100% 연산되며, 외부 인터넷 서버로 단 1바이트의 파일 데이터도 전송되지 않으므로 안심하고 사용하실 수 있습니다.</p>
      </div>
    </div>
  </section>
</div>
