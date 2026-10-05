<script lang="ts">
  import { onMount } from 'svelte';
  import { currentLang, translations } from '$lib/langStore';
  import QRCode from 'qrcode';

  type Tab = 'url' | 'wifi' | 'vcard' | 'whatsapp' | 'email' | 'text';
  let activeTab: Tab = 'url';

  // URL state
  let urlInput = 'https://minitoolbox.dev';

  // WiFi state
  let wifiSsid = 'MyHomeNetwork';
  let wifiPass = 'SuperSecurePass123';
  let wifiSec = 'WPA';
  let wifiHidden = false;

  // vCard state
  let vcardName = 'Alex Martin';
  let vcardPhone = '+1 555 123 4567';
  let vcardEmail = 'alex@example.com';
  let vcardOrg = 'Studio Design Inc.';
  let vcardTitle = 'Product Designer';

  // WhatsApp state
  let waPhone = '14155552671';
  let waMsg = 'Hello! I scanned your QR code.';

  // Email state
  let emailTo = 'contact@example.com';
  let emailSub = 'Inquiry from QR Code';
  let emailBody = 'Hi, I would like to learn more about your services.';

  // Plain Text state
  let textInput = 'Hello from 100% In-Browser PureQR Studio!';

  // Styling
  let fgColor = '#0f172a';
  let bgColor = '#ffffff';
  let eccLevel: 'L' | 'M' | 'Q' | 'H' = 'M';

  // UI state
  let canvasEl: HTMLCanvasElement;
  let svgContent = '';
  let copied = false;

  $: t = translations[$currentLang] || translations.en;

  // Build payload based on active tab
  $: rawPayload = (() => {
    switch (activeTab) {
      case 'url':
        return urlInput.trim() || 'https://minitoolbox.dev';
      case 'wifi': {
        const sec = wifiSec === 'nopass' ? 'nopass' : wifiSec;
        const h = wifiHidden ? 'H:true;' : '';
        return `WIFI:S:${wifiSsid};T:${sec};P:${wifiPass};${h};`;
      }
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardOrg}\nTITLE:${vcardTitle}\nEND:VCARD`;
      case 'whatsapp': {
        const cleanPhone = waPhone.replace(/[^\d]/g, '');
        const encodedMsg = encodeURIComponent(waMsg);
        return `https://wa.me/${cleanPhone}${encodedMsg ? '?text=' + encodedMsg : ''}`;
      }
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSub)}&body=${encodeURIComponent(emailBody)}`;
      case 'text':
      default:
        return textInput || ' ';
    }
  })();

  async function updateQr() {
    if (!canvasEl) return;
    try {
      await QRCode.toCanvas(canvasEl, rawPayload, {
        errorCorrectionLevel: eccLevel,
        margin: 2,
        scale: 8,
        color: {
          dark: fgColor,
          light: bgColor
        }
      });

      svgContent = await QRCode.toString(rawPayload, {
        type: 'svg',
        errorCorrectionLevel: eccLevel,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor
        }
      });
    } catch (err) {
      console.warn('QR render error:', err);
    }
  }

  $: if (rawPayload || fgColor || bgColor || eccLevel) {
    if (typeof window !== 'undefined') {
      updateQr();
    }
  }

  onMount(() => {
    updateQr();
  });

  function downloadSvg() {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pureqr-${activeTab}-${Date.now()}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function downloadPng() {
    if (!canvasEl) return;
    // Export 2048px high-res PNG
    const tempCanvas = document.createElement('canvas');
    QRCode.toCanvas(tempCanvas, rawPayload, {
      errorCorrectionLevel: eccLevel,
      margin: 2,
      width: 2048,
      color: {
        dark: fgColor,
        light: bgColor
      }
    }, (err) => {
      if (err) return;
      const url = tempCanvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `pureqr-${activeTab}-2048px-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  async function copyQrImage() {
    if (!canvasEl) return;
    try {
      canvasEl.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        copied = true;
        setTimeout(() => (copied = false), 2500);
      });
    } catch (e) {
      // Fallback
    }
  }

  const presets = [
    { name: 'Classic Slate', fg: '#0f172a', bg: '#ffffff' },
    { name: 'Emerald Forest', fg: '#064e3b', bg: '#ecfdf5' },
    { name: 'Royal Indigo', fg: '#312e81', bg: '#eef2ff' },
    { name: 'Crimson Rose', fg: '#881337', bg: '#fff1f2' },
    { name: 'Midnight Dark', fg: '#38bdf8', bg: '#0b1120' }
  ];
</script>

<svelte:head>
  <title>{t.siteTitle} | {t.subBrand}</title>
  <meta name="description" content={t.heroSub} />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-8 sm:px-6">
  <!-- Hero Section -->
  <div class="text-center mb-8">
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 mb-3 shadow-2xs">
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

  <!-- Main 2-Column Studio Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
    <!-- Left Column: Type Tabs & Input Fields -->
    <div class="lg:col-span-7 space-y-6">
      <!-- Tabs Navigation -->
      <div class="flex flex-wrap gap-1.5 p-1 bg-slate-200/70 rounded-2xl border border-slate-300/60 shadow-2xs">
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 {activeTab === 'url' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
          on:click={() => (activeTab = 'url')}
        >
          {t.tabUrl}
        </button>
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 {activeTab === 'wifi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
          on:click={() => (activeTab = 'wifi')}
        >
          {t.tabWifi}
        </button>
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 {activeTab === 'vcard' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
          on:click={() => (activeTab = 'vcard')}
        >
          {t.tabVcard}
        </button>
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 {activeTab === 'whatsapp' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
          on:click={() => (activeTab = 'whatsapp')}
        >
          {t.tabWhatsapp}
        </button>
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 {activeTab === 'email' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
          on:click={() => (activeTab = 'email')}
        >
          {t.tabEmail}
        </button>
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition duration-150 {activeTab === 'text' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'}"
          on:click={() => (activeTab = 'text')}
        >
          {t.tabText}
        </button>
      </div>

      <!-- Input Form Card -->
      <div class="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-xs space-y-4">
        {#if activeTab === 'url'}
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">{t.tabUrl}</label>
            <input
              type="url"
              bind:value={urlInput}
              placeholder={t.urlPlaceholder}
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        {:else if activeTab === 'wifi'}
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">{t.wifiSsid}</label>
              <input
                type="text"
                bind:value={wifiSsid}
                placeholder="WiFi Network Name"
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">{t.wifiPass}</label>
              <input
                type="text"
                bind:value={wifiPass}
                placeholder="WiFi Password"
                class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm text-slate-800 focus:border-emerald-500 focus:outline-hidden font-mono"
              />
            </div>
            <div class="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">{t.wifiSec}</label>
                <select
                  bind:value={wifiSec}
                  class="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-hidden"
                >
                  <option value="WPA">WPA / WPA2 / WPA3</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open (No password)</option>
                </select>
              </div>
              <div class="flex items-center pt-5">
                <label class="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input type="checkbox" bind:checked={wifiHidden} class="rounded text-emerald-600 focus:ring-emerald-500" />
                  <span>{t.wifiHidden}</span>
                </label>
              </div>
            </div>
          </div>
        {:else if activeTab === 'vcard'}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.vcardName}</label>
              <input type="text" bind:value={vcardName} class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.vcardPhone}</label>
              <input type="tel" bind:value={vcardPhone} class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.vcardEmail}</label>
              <input type="email" bind:value={vcardEmail} class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.vcardOrg}</label>
              <input type="text" bind:value={vcardOrg} class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.vcardTitle}</label>
              <input type="text" bind:value={vcardTitle} class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
          </div>
        {:else if activeTab === 'whatsapp'}
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.waPhone}</label>
              <input type="tel" bind:value={waPhone} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-hidden font-mono" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.waMsg}</label>
              <textarea rows="2" bind:value={waMsg} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-hidden"></textarea>
            </div>
          </div>
        {:else if activeTab === 'email'}
          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.emailTo}</label>
              <input type="email" bind:value={emailTo} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.emailSub}</label>
              <input type="text" bind:value={emailSub} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-hidden" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">{t.emailBody}</label>
              <textarea rows="2" bind:value={emailBody} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-emerald-500 focus:outline-hidden"></textarea>
            </div>
          </div>
        {:else if activeTab === 'text'}
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">{t.tabText}</label>
            <textarea
              rows="4"
              bind:value={textInput}
              placeholder={t.textPlaceholder}
              class="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 focus:border-emerald-500 focus:outline-hidden"
            ></textarea>
          </div>
        {/if}
      </div>

      <!-- Styling Card -->
      <div class="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-xs backdrop-blur-xs space-y-4">
        <h3 class="text-xs font-bold uppercase tracking-wider text-slate-500">{t.styleTitle}</h3>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">{t.fgColor}</label>
            <div class="flex items-center gap-2">
              <input type="color" bind:value={fgColor} class="w-10 h-10 rounded-lg cursor-pointer border border-slate-300" />
              <input type="text" bind:value={fgColor} class="w-24 rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-mono" />
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1.5">{t.bgColor}</label>
            <div class="flex items-center gap-2">
              <input type="color" bind:value={bgColor} class="w-10 h-10 rounded-lg cursor-pointer border border-slate-300" />
              <input type="text" bind:value={bgColor} class="w-24 rounded-lg border border-slate-300 px-2 py-1.5 text-xs font-mono" />
            </div>
          </div>
        </div>

        <!-- Presets -->
        <div class="pt-1">
          <span class="block text-[11px] font-semibold text-slate-500 mb-2">Palette Presets</span>
          <div class="flex flex-wrap gap-2">
            {#each presets as p}
              <button
                type="button"
                on:click={() => { fgColor = p.fg; bgColor = p.bg; }}
                class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-200 hover:border-slate-400 transition"
              >
                <span class="w-3 h-3 rounded-full border border-slate-300 shadow-2xs" style="background-color: {p.fg};"></span>
                <span class="w-3 h-3 rounded-full border border-slate-300 shadow-2xs -ml-1" style="background-color: {p.bg};"></span>
                <span>{p.name}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Error Correction Level -->
        <div class="pt-2 border-t border-slate-100">
          <label class="block text-xs font-bold text-slate-700 mb-1">{t.eccLevel}</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              class="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition {eccLevel === 'L' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}"
              on:click={() => (eccLevel = 'L')}
            >
              {t.eccL}
            </button>
            <button
              type="button"
              class="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition {eccLevel === 'M' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}"
              on:click={() => (eccLevel = 'M')}
            >
              {t.eccM}
            </button>
            <button
              type="button"
              class="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition {eccLevel === 'Q' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}"
              on:click={() => (eccLevel = 'Q')}
            >
              {t.eccQ}
            </button>
            <button
              type="button"
              class="px-2.5 py-1.5 rounded-xl text-xs font-bold border transition {eccLevel === 'H' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}"
              on:click={() => (eccLevel = 'H')}
            >
              {t.eccH}
            </button>
          </div>
          <span class="block text-[11px] text-slate-500 mt-1.5">{t.eccDesc}</span>
        </div>
      </div>
    </div>

    <!-- Right Column: Interactive QR Code Preview & Downloads -->
    <div class="lg:col-span-5 space-y-5">
      <div class="rounded-3xl border border-slate-200/90 bg-white/95 p-6 shadow-sm backdrop-blur-xs flex flex-col items-center">
        <!-- Render Canvas -->
        <div class="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center justify-center">
          <canvas bind:this={canvasEl} class="max-w-[280px] h-auto object-contain"></canvas>
        </div>

        <!-- Permanent Guarantee Callout -->
        <div class="mt-5 w-full rounded-2xl bg-emerald-50/80 border border-emerald-200/80 p-3.5 text-center">
          <div class="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-900">
            <span>🛡️</span>
            <span>Permanent Static QR Guarantee</span>
          </div>
          <p class="text-[11px] text-emerald-700 mt-1 leading-snug">
            Raw data is directly hardcoded into pixels. No redirect URL. 100% free forever.
          </p>
        </div>

        <!-- Download Buttons -->
        <div class="w-full space-y-2.5 mt-5">
          <button
            type="button"
            on:click={downloadSvg}
            class="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-bold text-white shadow-xs hover:from-emerald-500 hover:to-teal-500 transition duration-150 active:scale-98"
          >
            {t.downloadSvg}
          </button>
          <button
            type="button"
            on:click={downloadPng}
            class="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition duration-150"
          >
            {t.downloadPng}
          </button>
          <button
            type="button"
            on:click={copyQrImage}
            class="w-full flex items-center justify-center gap-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 transition py-1"
          >
            {#if copied}
              <span class="text-emerald-600 font-bold">✅ {t.copiedText}</span>
            {:else}
              <span>{t.copyBtn}</span>
            {/if}
          </button>
        </div>
      </div>

      <!-- Scam Explanation Banner -->
      <div class="rounded-3xl border border-amber-200/80 bg-amber-50/70 p-5 shadow-2xs">
        <h4 class="text-xs font-extrabold text-amber-900 mb-1.5 flex items-center gap-1.5">
          <span>{t.scamWarningTitle}</span>
        </h4>
        <p class="text-xs text-amber-800 leading-relaxed">
          {t.scamWarningDesc}
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="rounded-3xl border border-slate-200/90 bg-white/80 p-5 shadow-2xs space-y-3">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">{t.faqTitle}</h4>
        <div>
          <h5 class="text-xs font-bold text-slate-800">{t.faq1Q}</h5>
          <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.faq1A}</p>
        </div>
        <div class="pt-2 border-t border-slate-100">
          <h5 class="text-xs font-bold text-slate-800">{t.faq2Q}</h5>
          <p class="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.faq2A}</p>
        </div>
      </div>
    </div>
  </div>
</div>
