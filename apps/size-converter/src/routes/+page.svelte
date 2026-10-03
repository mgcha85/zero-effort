<script lang="ts">
  import { onMount } from 'svelte';
  import { buildWebAppJsonLd, buildFaqJsonLd } from '@zero-effort/seo-config';
  import { AdBanner } from '@zero-effort/shared-ui';

  type Gender = 'men' | 'women';
  type Lang = 'en' | 'vi' | 'ko';

  let currentLang: Lang = 'en';
  let detectedCountry = '';
  let gender: Gender = 'men';
  let inputVal: number = 260; // mm default
  let inputStandard: 'KR' | 'US' | 'EU' | 'UK' | 'VN' | 'CN' = 'KR';
  let copied = false;

  const content = {
    en: {
      title: 'Global Shoe & Clothing Size Converter',
      sub: 'Accurate sizing conversion for Shopee, Lazada, TikTok Shop & Taobao cross-border shopping',
      genderLabel: 'Gender',
      men: 'Men',
      women: 'Women',
      standardLabel: 'Your Known Size Standard',
      valLabel: 'Size Value',
      resultHeader: 'Equivalent Size Results',
      shareBtn: 'Share this size',
      copiedBtn: 'Link copied!',
      tableTitle: 'Universal Footwear Sizing Conversion Matrix',
      footLen: 'Foot Length',
      badge: '🌏 Cross-Border E-Commerce Ready'
    },
    vi: {
      title: 'Bảng Quy Đổi Size Giày Chuẩn Quốc Tế',
      sub: 'Tra cứu chuẩn xác size khi mua hàng quốc tế trên Shopee, Lazada, TikTok Shop, Taobao',
      genderLabel: 'Giới tính',
      men: 'Nam',
      women: 'Nữ',
      standardLabel: 'Hệ size bạn đang có',
      valLabel: 'Giá trị size',
      resultHeader: 'Kết Quả Quy Đổi Tương Đương',
      shareBtn: 'Chia sẻ kết quả',
      copiedBtn: 'Đã sao chép link!',
      tableTitle: 'Bảng Tra Cứu Toàn Diện Size Giày Quốc Tế',
      footLen: 'Chiều dài bàn chân',
      badge: '🌏 Tối ưu cho Shopee & TikTok Shop'
    },
    ko: {
      title: '글로벌 직구 신발/의류 치수 변환기',
      sub: '해외직구(타오바오, 쇼피, 아마존) 실패 없는 신발 치수 원클릭 실시간 변환',
      genderLabel: '성별',
      men: '남성',
      women: '여성',
      standardLabel: '보유 중인 사이즈 규격',
      valLabel: '사이즈 값',
      resultHeader: '국가별 치수 환산 결과',
      shareBtn: '이 치수 공유하기',
      copiedBtn: '링크가 복사되었습니다!',
      tableTitle: '글로벌 신발 규격 대조표',
      footLen: '발 길이',
      badge: '🌏 해외직구 필수 도구'
    }
  };

  const shoeChart = [
    { mm: 230, cm: 23.0, usM: 5.0, usW: 6.5, eu: 36.5, uk: 4.5, vn: 36, cn: 36 },
    { mm: 235, cm: 23.5, usM: 5.5, usW: 7.0, eu: 37.5, uk: 5.0, vn: 37, cn: 37 },
    { mm: 240, cm: 24.0, usM: 6.0, usW: 7.5, eu: 38.5, uk: 5.5, vn: 38, cn: 38 },
    { mm: 245, cm: 24.5, usM: 6.5, usW: 8.0, eu: 39.0, uk: 6.0, vn: 39, cn: 39 },
    { mm: 250, cm: 25.0, usM: 7.0, usW: 8.5, eu: 40.0, uk: 6.5, vn: 40, cn: 40 },
    { mm: 255, cm: 25.5, usM: 7.5, usW: 9.0, eu: 40.5, uk: 7.0, vn: 40.5, cn: 41 },
    { mm: 260, cm: 26.0, usM: 8.0, usW: 9.5, eu: 41.5, uk: 7.5, vn: 41, cn: 42 },
    { mm: 265, cm: 26.5, usM: 8.5, usW: 10.0, eu: 42.0, uk: 8.0, vn: 42, cn: 43 },
    { mm: 270, cm: 27.0, usM: 9.0, usW: 10.5, eu: 43.0, uk: 8.5, vn: 43, cn: 44 },
    { mm: 275, cm: 27.5, usM: 9.5, usW: 11.0, eu: 43.5, uk: 9.0, vn: 43.5, cn: 45 },
    { mm: 280, cm: 28.0, usM: 10.0, usW: 11.5, eu: 44.5, uk: 9.5, vn: 44, cn: 46 },
    { mm: 285, cm: 28.5, usM: 10.5, usW: 12.0, eu: 45.0, uk: 10.0, vn: 45, cn: 47 }
  ];

  $: t = content[currentLang];

  $: matchedShoe = shoeChart.reduce((prev, curr) => {
    let prevDiff = 0;
    let currDiff = 0;
    if (inputStandard === 'KR') {
      prevDiff = Math.abs(prev.mm - inputVal);
      currDiff = Math.abs(curr.mm - inputVal);
    } else if (inputStandard === 'US') {
      const target = gender === 'men' ? curr.usM : curr.usW;
      const prevTarget = gender === 'men' ? prev.usM : prev.usW;
      prevDiff = Math.abs(prevTarget - inputVal);
      currDiff = Math.abs(target - inputVal);
    } else if (inputStandard === 'EU' || inputStandard === 'VN') {
      prevDiff = Math.abs(prev.eu - inputVal);
      currDiff = Math.abs(curr.eu - inputVal);
    } else if (inputStandard === 'CN') {
      prevDiff = Math.abs(prev.cn - inputVal);
      currDiff = Math.abs(curr.cn - inputVal);
    } else {
      prevDiff = Math.abs(prev.uk - inputVal);
      currDiff = Math.abs(curr.uk - inputVal);
    }
    return currDiff < prevDiff ? curr : prev;
  });

  const jsonLd = buildWebAppJsonLd({
    name: 'Universal Cross-Border Shoe Size Converter (US, EU, UK, KR, VN, CN)',
    url: 'https://crossbordersize.com',
    description: 'Instant shoe sizing converter for Shopee, Lazada, Taobao, and TikTok Shop. Accurate mapping between US, EU, UK, Korea mm, Vietnam, and China sizes.',
    applicationCategory: 'UtilityApplication'
  });

  const jsonLdFaq = buildFaqJsonLd([
    {
      question: 'How to convert Korean shoe size (mm) to US/EU?',
      answer: 'A Korean size 260mm corresponds to US Men 8.0, EU 41.5, and UK 7.5.'
    },
    {
      question: 'Why are cross-border shoe sizes often inconsistent?',
      answer: 'Brands and regional factories follow differing conventions (US, UK, European Continental, China Code). Measuring foot length in cm/mm provides the most reliable baseline.'
    }
  ]);

  onMount(async () => {
    if (typeof window === 'undefined') return;

    // 1. Check URL query param first (Googlebot or direct share link)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang') as Lang;
    if (urlLang && content[urlLang]) {
      currentLang = urlLang;
      return;
    }

    // 2. Check saved preference in localStorage
    const saved = localStorage.getItem('user_lang') as Lang;
    if (saved && content[saved]) {
      currentLang = saved;
      return;
    }

    // 3. Fast check: Browser locale (0ms)
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('vi')) {
      currentLang = 'vi';
      inputStandard = 'VN';
      return;
    } else if (navLang.startsWith('ko')) {
      currentLang = 'ko';
      inputStandard = 'KR';
      return;
    }

    // 4. Fallback check: GeoIP lookup by IP address
    try {
      const res = await fetch('https://api.country.is');
      if (res.ok) {
        const data = await res.json();
        detectedCountry = data.country || '';
        if (data.country === 'VN') {
          currentLang = 'vi';
          inputStandard = 'VN';
        } else if (data.country === 'KR') {
          currentLang = 'ko';
          inputStandard = 'KR';
        } else {
          currentLang = 'en';
          inputStandard = 'US';
        }
      }
    } catch (e) {
      // Offline or network error: keep default 'en'
    }
  });

  function setLanguage(l: Lang) {
    currentLang = l;
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_lang', l);
    }
  }

  function copyShareLink() {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}?std=${inputStandard}&val=${inputVal}&lang=${currentLang}`;
      navigator.clipboard.writeText(url);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    }
  }
</script>

<svelte:head>
  <title>{t.title} - Shopee, Lazada & TikTok Shop Size Chart</title>
  <meta name="description" content="{t.sub}" />
  <meta name="keywords" content="shopee shoe size chart, korean to us shoe size, taobao size chart, lazada size converter, tiktok shop sizing" />
  <link rel="canonical" href="https://size.minitoolbox.dev/" />
  <meta property="og:title" content="{t.title} - Shopee, Lazada & TikTok Shop Size Chart" />
  <meta property="og:description" content="{t.sub}" />
  <meta property="og:url" content="https://size.minitoolbox.dev/" />
  <meta property="og:image" content="https://size.minitoolbox.dev/icon-512.png" />
  <meta name="twitter:card" content="summary_large_image" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
  <!-- Language Selector bar with IP badge -->
  <div class="mb-6 flex flex-wrap justify-between items-center gap-2">
    <div class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
      <span>{t.badge}</span>
      {#if detectedCountry}
        <span class="text-blue-400">•</span>
        <span class="text-[11px] font-normal text-blue-600">IP: {detectedCountry}</span>
      {/if}
    </div>

    <!-- Manual Switcher -->
    <div class="flex items-center space-x-1 rounded-lg bg-slate-100 p-1 text-xs font-bold">
      <button
        type="button"
        class="px-2.5 py-1 rounded transition {currentLang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}"
        on:click={() => setLanguage('en')}
      >
        🇺🇸 English
      </button>
      <button
        type="button"
        class="px-2.5 py-1 rounded transition {currentLang === 'vi' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}"
        on:click={() => setLanguage('vi')}
      >
        🇻🇳 Tiếng Việt
      </button>
      <button
        type="button"
        class="px-2.5 py-1 rounded transition {currentLang === 'ko' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}"
        on:click={() => setLanguage('ko')}
      >
        🇰🇷 한국어
      </button>
    </div>
  </div>

  <!-- Title -->
  <div class="mb-8 text-center">
    <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
      {t.title}
    </h1>
    <p class="mt-2 text-sm text-slate-600">
      {t.sub}
    </p>
  </div>

  <!-- Calculator Card -->
  <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div>
        <label for="gender-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.genderLabel}</label>
        <div class="flex rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            class="flex-1 rounded-md py-1.5 text-xs font-bold transition {gender === 'men' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}"
            on:click={() => gender = 'men'}
          >
            {t.men}
          </button>
          <button
            type="button"
            class="flex-1 rounded-md py-1.5 text-xs font-bold transition {gender === 'women' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'}"
            on:click={() => gender = 'women'}
          >
            {t.women}
          </button>
        </div>
      </div>

      <div>
        <label for="std-select" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.standardLabel}</label>
        <select
          id="std-select"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
          bind:value={inputStandard}
        >
          <option value="KR">Korea (mm) - e.g. 260</option>
          <option value="US">USA (US) - e.g. 8.0</option>
          <option value="EU">Europe (EU) - e.g. 41.5</option>
          <option value="VN">Vietnam (VN) - e.g. 41</option>
          <option value="CN">China / Taobao (CN) - e.g. 42</option>
          <option value="UK">UK - e.g. 7.5</option>
        </select>
      </div>

      <div>
        <label for="val-input" class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{t.valLabel}</label>
        <input
          id="val-input"
          type="number"
          step="0.5"
          class="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
          bind:value={inputVal}
        />
      </div>
    </div>

    <!-- Conversion Results Grid -->
    <div class="mt-8 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-6 border border-blue-100">
      <h3 class="text-xs font-black uppercase tracking-wider text-blue-800 mb-4">{t.resultHeader}</h3>
      <div class="grid grid-cols-2 sm:grid-cols-6 gap-3 text-center">
        <div class="rounded-xl bg-white p-3 shadow-sm border border-blue-100/50">
          <span class="block text-[11px] font-bold text-slate-400">Vietnam (VN)</span>
          <span class="text-xl font-black text-blue-700">{matchedShoe.vn}</span>
        </div>
        <div class="rounded-xl bg-white p-3 shadow-sm border border-blue-100/50">
          <span class="block text-[11px] font-bold text-slate-400">Korea (mm)</span>
          <span class="text-xl font-black text-slate-800">{matchedShoe.mm}</span>
        </div>
        <div class="rounded-xl bg-white p-3 shadow-sm border border-blue-100/50">
          <span class="block text-[11px] font-bold text-slate-400">US (USA)</span>
          <span class="text-xl font-black text-slate-800">{gender === 'men' ? matchedShoe.usM : matchedShoe.usW}</span>
        </div>
        <div class="rounded-xl bg-white p-3 shadow-sm border border-blue-100/50">
          <span class="block text-[11px] font-bold text-slate-400">EU (Europe)</span>
          <span class="text-xl font-black text-slate-800">{matchedShoe.eu}</span>
        </div>
        <div class="rounded-xl bg-white p-3 shadow-sm border border-blue-100/50">
          <span class="block text-[11px] font-bold text-slate-400">China (Taobao)</span>
          <span class="text-xl font-black text-slate-800">{matchedShoe.cn}</span>
        </div>
        <div class="rounded-xl bg-white p-3 shadow-sm border border-blue-100/50">
          <span class="block text-[11px] font-bold text-slate-400">{t.footLen}</span>
          <span class="text-xl font-black text-slate-800">{matchedShoe.cm} cm</span>
        </div>
      </div>
    </div>

    <!-- Share Button -->
    <div class="mt-6 flex justify-end">
      <button
        type="button"
        class="inline-flex items-center space-x-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        on:click={copyShareLink}
      >
        <span>{copied ? `✅ ${t.copiedBtn}` : `🔗 ${t.shareBtn}`}</span>
      </button>
    </div>
  </div>

  <AdBanner />

  <!-- Size Chart Table for Programmatic SEO -->
  <section class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
    <h2 class="text-lg font-bold text-slate-900 mb-4">{t.tableTitle}</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-600">
        <thead class="bg-slate-50 text-[11px] font-bold uppercase text-slate-500 border-b">
          <tr>
            <th class="py-2.5 px-3">CM</th>
            <th class="py-2.5 px-3">KR (mm)</th>
            <th class="py-2.5 px-3">VN / EU</th>
            <th class="py-2.5 px-3">US Men</th>
            <th class="py-2.5 px-3">US Women</th>
            <th class="py-2.5 px-3">China (CN)</th>
            <th class="py-2.5 px-3">UK</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each shoeChart as row}
            <tr class="hover:bg-slate-50/80">
              <td class="py-2 px-3 font-semibold">{row.cm}</td>
              <td class="py-2 px-3">{row.mm}</td>
              <td class="py-2 px-3 font-bold text-blue-600">{row.vn} / {row.eu}</td>
              <td class="py-2 px-3">{row.usM}</td>
              <td class="py-2 px-3">{row.usW}</td>
              <td class="py-2 px-3">{row.cn}</td>
              <td class="py-2 px-3">{row.uk}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </section>
</div>
