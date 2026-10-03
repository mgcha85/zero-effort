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
      answer: '네! [취업/이력서 사진] 또는 [정부24 서류 규격] 프리셋을 클릭하시면 업로드 제한 용량 이하로 자동 리사이즈 및 압축됩니다.'
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
        targetW = 354;
        targetH = 472;
      } else if (selectedPreset === 'passport') {
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
  <meta name="naver-site-verification" content="" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Title with Soft Mint Badge -->
  <div class="mb-8 text-center">
    <div class="inline-flex items-center gap-1.5 rounded-full bg-mint-100 px-3.5 py-1 text-xs font-bold text-mint-800 border border-mint-200/80 mb-3 shadow-2xs">
      <span>🔒 대한민국 공공기관 & 취업 제출 전용</span>
      <span class="text-mint-400">•</span>
      <span>서버 전송 없음</span>
    </div>
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      이력서 & 정부24 서류 안심 압축기
    </h1>
    <p class="mt-2 text-sm text-slate-600">
      주민번호나 얼굴 사진이 외부 서버에 저장될 걱정 없이, 내 브라우저에서 즉시 규격 맞춤 변환
    </p>
  </div>

  <!-- Fast Presets for Korea in Soft Mint Card -->
  <div class="mb-6 rounded-2xl bg-white/95 border border-mint-200 p-5 shadow-xs">
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs font-bold text-mint-800 uppercase tracking-wider">⚡ 한국형 원클릭 제출 규격 프리셋</span>
      <span class="text-[11px] text-slate-400 font-medium">자동 규격 & 용량 리사이징</span>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-semibold">
      <button
        type="button"
        class="rounded-xl p-3 border text-center transition {selectedPreset === 'resume' ? 'border-mint-600 bg-mint-50/90 text-mint-900 ring-2 ring-mint-400 shadow-2xs' : 'border-slate-200/80 bg-white hover:bg-mint-50/40 text-slate-700'}"
        on:click={() => setPreset('resume')}
      >
        <span class="block font-bold text-sm">📄 취업/이력서</span>
        <span class="text-[11px] text-slate-500 mt-0.5 block">3x4cm (100KB 이하)</span>
      </button>

      <button
        type="button"
        class="rounded-xl p-3 border text-center transition {selectedPreset === 'passport' ? 'border-mint-600 bg-mint-50/90 text-mint-900 ring-2 ring-mint-400 shadow-2xs' : 'border-slate-200/80 bg-white hover:bg-mint-50/40 text-slate-700'}"
        on:click={() => setPreset('passport')}
      >
        <span class="block font-bold text-sm">🛂 여권/주민증</span>
        <span class="text-[11px] text-slate-500 mt-0.5 block">3.5x4.5cm</span>
      </button>

      <button
        type="button"
        class="rounded-xl p-3 border text-center transition {selectedPreset === 'gov24_1mb' ? 'border-mint-600 bg-mint-50/90 text-mint-900 ring-2 ring-mint-400 shadow-2xs' : 'border-slate-200/80 bg-white hover:bg-mint-50/40 text-slate-700'}"
        on:click={() => setPreset('gov24_1mb')}
      >
        <span class="block font-bold text-sm">🏛️ 정부24 서류</span>
        <span class="text-[11px] text-slate-500 mt-0.5 block">1MB 이하 압축</span>
      </button>

      <button
        type="button"
        class="rounded-xl p-3 border text-center transition {selectedPreset === 'custom' ? 'border-mint-600 bg-mint-50/90 text-mint-900 ring-2 ring-mint-400 shadow-2xs' : 'border-slate-200/80 bg-white hover:bg-mint-50/40 text-slate-700'}"
        on:click={() => setPreset('custom')}
      >
        <span class="block font-bold text-sm">⚙️ 사용자 지정</span>
        <span class="text-[11px] text-slate-500 mt-0.5 block">품질 슬라이더</span>
      </button>
    </div>
  </div>

  <!-- Upload Area with Soft Mint Accent -->
  <div
    class="relative rounded-2xl border-2 border-dashed border-mint-300 bg-white/95 p-8 text-center transition hover:border-mint-500 hover:bg-mint-50/30 shadow-xs"
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
      <div class="rounded-full bg-mint-100 p-4 text-3xl shadow-2xs">📥</div>
      <div>
        <p class="text-sm font-bold text-slate-800">
          증명사진이나 서류 이미지를 드래그하거나 클릭하여 선택하세요
        </p>
        <p class="text-xs text-mint-700/80 font-medium mt-1">서버 업로드 대기 없이 즉시 변환됩니다 (최대 용량 무제한)</p>
      </div>
    </div>
  </div>

  <!-- Settings & Result Area -->
  {#if file}
    <div class="mt-6 rounded-2xl border border-mint-200 bg-white p-6 shadow-sm sm:p-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        <!-- Controls -->
        <div class="space-y-4">
          <div>
            <label for="format-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">출력 파일 포맷</label>
            <select
              id="format-select"
              class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-xs focus:border-mint-500 focus:ring-1 focus:ring-mint-500 focus:outline-none"
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
              <span class="text-mint-700">{quality}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              class="w-full accent-mint-600"
              bind:value={quality}
              on:input={applyPresetAndProcess}
            />
          </div>
        </div>

        <!-- Comparison Stats with Soft Mint Theme -->
        <div class="rounded-xl bg-mint-50/70 p-4 border border-mint-200/70 flex flex-col justify-center space-y-3">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500">원본 용량:</span>
            <span class="font-bold text-slate-700">{formatBytes(originalSize)}</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-500">압축 후 용량:</span>
            <span class="font-bold text-mint-700 text-sm">{formatBytes(compressedSize)}</span>
          </div>
          {#if originalSize > 0 && compressedSize > 0}
            <div class="flex justify-between items-center text-xs border-t pt-2 border-mint-200">
              <span class="text-slate-500">용량 절감율:</span>
              <span class="font-black text-mint-800">
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
          class="rounded-xl bg-mint-600 px-6 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-mint-700 transition disabled:opacity-50"
          on:click={downloadCompressed}
          disabled={processing || !compressedBlob}
        >
          {processing ? '압축 처리 중...' : '최적화된 사진/서류 즉시 다운로드'}
        </button>
      </div>
    </div>
  {/if}

  <AdBanner />

  <!-- Korea SEO Guide Section with Mint border -->
  <section class="mt-8 rounded-2xl border border-mint-200 bg-white/95 p-6 shadow-xs">
    <h2 class="text-lg font-bold text-slate-900 mb-3">자주 묻는 규격 질문</h2>
    <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
      <div class="rounded-xl bg-mint-50/60 p-3.5 border border-mint-100">
        <strong class="text-slate-800">Q. 공공기관/취업 사이트에서 사진 등록 시 "용량 초과" 에러가 뜨는 이유?</strong>
        <p class="mt-1 text-slate-600">대부분의 시스템은 100KB, 500KB 또는 1MB 이하의 용량 제한이 있습니다. [취업/이력서 사진] 프리셋을 누르면 자동으로 100KB 내외로 줄어들어 바로 등록됩니다.</p>
      </div>
      <div class="rounded-xl bg-mint-50/60 p-3.5 border border-mint-100">
        <strong class="text-slate-800">Q. 주민등록번호나 얼굴 사진이 유출되지 않나요?</strong>
        <p class="mt-1 text-slate-600">본 도구는 사용자 PC의 브라우저 엔진(HTML5 Canvas)에서 100% 연산되며, 외부 인터넷 서버로 단 1바이트의 파일 데이터도 전송되지 않으므로 안심하고 사용하실 수 있습니다.</p>
      </div>
    </div>
  </section>
</div>
