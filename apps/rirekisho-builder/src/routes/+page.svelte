<script lang="ts">
  import { onMount } from 'svelte';
  import { currentLang, translations } from '$lib/langStore';
  import { toWareki, calculateEducationHistory, type EducationStage } from '$lib/wareki';
  import { AdBanner } from '@zero-effort/shared-ui';

  interface HistoryItem {
    id: string;
    year: string;
    month: string;
    content: string;
  }

  // Basic Form State
  let currentDate = new Date().toISOString().split('T')[0];
  let currentDateWareki = '';
  
  let name = '';
  let furigana = '';
  let birthDate = '1998-05-15';
  let gender = 'male';
  let phone = '';
  let email = '';
  let postalCode = '';
  let address = '';
  let addressFurigana = '';
  let photoDataUrl = '';

  // History tables
  let educationHistory: HistoryItem[] = [];
  let workHistory: HistoryItem[] = [];
  let licenseHistory: HistoryItem[] = [
    { id: '1', year: '2020', month: '12', content: '実用日本語文字・語彙検定 (JLPT N1) 合格' },
    { id: '2', year: '2021', month: '06', content: 'TOEIC Listening & Reading Test 860点 取得' }
  ];

  let motivation = '貴社のグローバル展開および先進的な技術力に深く共感し、これまでに培ったITスキルと語学力を活かして貢献したく志望いたしました。';
  let personalRequests = '貴社の規定に従います。';

  let activeTab: 'form' | 'preview' = 'form';
  let activeSection: 'basic' | 'history' | 'bio' = 'basic';

  $: t = translations[$currentLang];

  $: {
    if (currentDate) {
      const [y, m, d] = currentDate.split('-').map(Number);
      const w = toWareki(y, m, d);
      currentDateWareki = `${w.label} ${m}月 ${d}日 現在`;
    }
  }

  function autoFillEducation() {
    if (!birthDate) return;
    const [by, bm, bd] = birthDate.split('-').map(Number);
    if (!by || !bm || !bd) return;

    const stages = calculateEducationHistory(by, bm, bd);
    educationHistory = stages.map((s, idx) => {
      const w = toWareki(s.year, s.month, 1);
      return {
        id: `edu-${idx}`,
        year: `${w.era}${w.eraYear === 1 ? '元' : w.eraYear} (${s.year})`,
        month: s.month.toString(),
        content: $currentLang === 'ko' ? s.contentKo : s.contentJa
      };
    });
  }

  onMount(() => {
    // Load local storage if exists
    try {
      const saved = localStorage.getItem('rirekisho_data_v1');
      if (saved) {
        const data = JSON.parse(saved);
        name = data.name || '';
        furigana = data.furigana || '';
        birthDate = data.birthDate || '1998-05-15';
        gender = data.gender || 'male';
        phone = data.phone || '';
        email = data.email || '';
        postalCode = data.postalCode || '';
        address = data.address || '';
        addressFurigana = data.addressFurigana || '';
        photoDataUrl = data.photoDataUrl || '';
        educationHistory = data.educationHistory || [];
        workHistory = data.workHistory || [];
        licenseHistory = data.licenseHistory || [];
        motivation = data.motivation || '';
        personalRequests = data.personalRequests || '';
      } else {
        autoFillEducation();
      }
    } catch {
      autoFillEducation();
    }
  });

  function saveToLocal() {
    try {
      const data = {
        name, furigana, birthDate, gender, phone, email, postalCode,
        address, addressFurigana, photoDataUrl,
        educationHistory, workHistory, licenseHistory,
        motivation, personalRequests
      };
      localStorage.setItem('rirekisho_data_v1', JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  $: {
    // Auto save on edits
    if (name || furigana || birthDate) {
      saveToLocal();
    }
  }

  function handlePhotoUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (re) => {
        photoDataUrl = re.target?.result as string;
        saveToLocal();
      };
      reader.readAsDataURL(file);
    }
  }

  function removePhoto() {
    photoDataUrl = '';
    saveToLocal();
  }

  function addHistoryRow(type: 'work' | 'edu' | 'license') {
    const newRow: HistoryItem = {
      id: Math.random().toString(36).substring(7),
      year: '',
      month: '',
      content: ''
    };
    if (type === 'work') workHistory = [...workHistory, newRow];
    else if (type === 'edu') educationHistory = [...educationHistory, newRow];
    else licenseHistory = [...licenseHistory, newRow];
    saveToLocal();
  }

  function removeHistoryRow(type: 'work' | 'edu' | 'license', id: string) {
    if (type === 'work') workHistory = workHistory.filter(r => r.id !== id);
    else if (type === 'edu') educationHistory = educationHistory.filter(r => r.id !== id);
    else licenseHistory = licenseHistory.filter(r => r.id !== id);
    saveToLocal();
  }

  function printDocument() {
    window.print();
  }

  function resetForm() {
    if (confirm('すべての入力内容をリセットしますか？ / 정말 초기화하시겠습니까?')) {
      localStorage.removeItem('rirekisho_data_v1');
      name = '';
      furigana = '';
      birthDate = '1998-05-15';
      gender = 'male';
      phone = '';
      email = '';
      postalCode = '';
      address = '';
      addressFurigana = '';
      photoDataUrl = '';
      workHistory = [];
      autoFillEducation();
    }
  }

  function formatBirthAge(bDateStr: string): string {
    if (!bDateStr) return '';
    const [y, m, d] = bDateStr.split('-').map(Number);
    const w = toWareki(y, m, d);
    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) {
      age--;
    }
    return `${w.label} ${m}月 ${d}日 生 (満 ${age} 歳)`;
  }
</script>

<svelte:head>
  <title>{t.siteTitle} | {t.subBrand}</title>
  <meta
    name="description"
    content={$currentLang === 'ja'
      ? 'JIS規格の履歴書をブラウザ上で簡単に無料作成・A4印刷。生年月日から小学校・中学校・高校・大学の入学・卒業年度（和暦・西暦）を自動計算。サーバー送信0KBの完全ローカル仕様。'
      : $currentLang === 'en'
      ? 'Free online Japanese JIS Standard resume builder. Automatic Wareki (Reiwa, Heisei, Showa) calculation for all school admission & graduation years. 100% in-browser private execution.'
      : 'JIS규격 일본 이력서(履歴書) 무료 자동완성. 생년월일만 넣으면 일본 학사일정에 맞춰 소학교/중학교/고등학교/대학교 입학·졸업 와레키(令和・平成・昭和) 자동 계산. 100% 브라우저 로컬 안전 출력.'}
  />
</svelte:head>

<div class="mx-auto max-w-6xl px-4 py-6 sm:px-6">
  <!-- Top Action Bar (no-print) -->
  <div class="no-print mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm border border-slate-200">
    <div class="flex items-center space-x-2">
      <button
        type="button"
        class="inline-flex items-center space-x-1.5 rounded-xl px-4 py-2 text-sm font-bold transition shadow-sm {activeTab === 'form' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
        on:click={() => (activeTab = 'form')}
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        <span>{t.tabEdit}</span>
      </button>

      <button
        type="button"
        class="inline-flex items-center space-x-1.5 rounded-xl px-4 py-2 text-sm font-bold transition shadow-sm {activeTab === 'preview' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
        on:click={() => (activeTab = 'preview')}
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        <span>{t.preview}</span>
      </button>
    </div>

    <div class="flex items-center space-x-2">
      <button
        type="button"
        class="inline-flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
        on:click={resetForm}
      >
        <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
        <span>{t.resetBtn}</span>
      </button>

      <button
        type="button"
        class="inline-flex items-center space-x-2 rounded-xl bg-rose-600 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-rose-700 transition"
        on:click={printDocument}
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        <span>{t.printBtn}</span>
      </button>
    </div>
  </div>

  <!-- Form Mode (no-print) -->
  {#if activeTab === 'form'}
    <div class="no-print space-y-6">
      <!-- Section switcher -->
      <div class="flex border-b border-slate-200">
        <button
          type="button"
          class="border-b-2 px-4 py-2.5 text-sm font-bold transition {activeSection === 'basic' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'}"
          on:click={() => (activeSection = 'basic')}
        >
          1. {t.tabBasic}
        </button>
        <button
          type="button"
          class="border-b-2 px-4 py-2.5 text-sm font-bold transition {activeSection === 'history' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'}"
          on:click={() => (activeSection = 'history')}
        >
          2. {t.tabEdu}
        </button>
        <button
          type="button"
          class="border-b-2 px-4 py-2.5 text-sm font-bold transition {activeSection === 'bio' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-800'}"
          on:click={() => (activeSection = 'bio')}
        >
          3. {t.tabBio}
        </button>
      </div>

      <!-- Tab 1: Basic Info -->
      {#if activeSection === 'basic'}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl bg-white p-6 border border-slate-200 shadow-xs">
          <div class="md:col-span-2 space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{t.nameFurigana}</label>
                <input type="text" bind:value={furigana} placeholder="例: やまだ たろう" class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{t.name}</label>
                <input type="text" bind:value={name} placeholder="例: 山田 太郎 / TARO YAMADA" class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-rose-500 focus:outline-hidden" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-semibold text-slate-600">{t.birthDate}</label>
                  <button type="button" on:click={autoFillEducation} class="text-[11px] font-bold text-rose-600 hover:underline">
                    {t.recalculateBtn}
                  </button>
                </div>
                <input type="date" bind:value={birthDate} on:change={autoFillEducation} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
                <p class="mt-1 text-[11px] text-slate-500">{formatBirthAge(birthDate)}</p>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{t.gender}</label>
                <select bind:value={gender} class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden">
                  <option value="male">{t.genderMale}</option>
                  <option value="female">{t.genderFemale}</option>
                  <option value="none">{t.genderNone}</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{t.phone}</label>
                <input type="tel" bind:value={phone} placeholder="例: 090-1234-5678" class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">{t.email}</label>
                <input type="email" bind:value={email} placeholder="例: yamada@example.com" class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">{t.postalCode}</label>
              <input type="text" bind:value={postalCode} placeholder="例: 〒100-0001" class="w-48 rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">{t.addressFurigana}</label>
              <input type="text" bind:value={addressFurigana} placeholder="例: とうきょうと ちよだく..." class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">{t.address}</label>
              <input type="text" bind:value={address} placeholder="例: 東京都千代田区千代田1-1 ..." class="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-rose-500 focus:outline-hidden" />
            </div>
          </div>

          <!-- Photo upload block -->
          <div class="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/50">
            <span class="text-xs font-bold text-slate-700 mb-3">{t.photo}</span>
            <div class="w-30 h-40 bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center border border-slate-300 relative shadow-xs">
              {#if photoDataUrl}
                <img src={photoDataUrl} alt="Portrait" class="w-full h-full object-cover" />
              {:else}
                <div class="text-center p-2 text-slate-400">
                  <svg class="h-8 w-8 mx-auto mb-1 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <span class="text-[10px] leading-tight block">30mm x 40mm<br/>(4:3)</span>
                </div>
              {/if}
            </div>

            <div class="mt-4 flex flex-col space-y-2 w-full max-w-48">
              <label class="cursor-pointer text-center rounded-xl bg-white border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
                {t.photoUpload}
                <input type="file" accept="image/*" class="hidden" on:change={handlePhotoUpload} />
              </label>
              {#if photoDataUrl}
                <button type="button" on:click={removePhoto} class="text-xs font-semibold text-rose-600 hover:underline">
                  {t.photoRemove}
                </button>
              {/if}
            </div>
          </div>
        </div>
      {/if}

      <!-- Tab 2: Education and Career -->
      {#if activeSection === 'history'}
        <div class="space-y-6">
          <div class="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-800 flex items-start space-x-2">
            <span class="text-base">💡</span>
            <p>{t.autoCalcNotice}</p>
          </div>

          <!-- Education -->
          <div class="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-900">{t.educationHeader}</h3>
              <button type="button" on:click={() => addHistoryRow('edu')} class="text-xs font-bold text-rose-600 hover:underline">
                {t.addRow}
              </button>
            </div>

            <div class="space-y-2">
              {#each educationHistory as row (row.id)}
                <div class="flex items-center space-x-2">
                  <input type="text" bind:value={row.year} placeholder="年 / 和暦" class="w-32 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs focus:border-rose-500 focus:outline-hidden" />
                  <input type="text" bind:value={row.month} placeholder="月" class="w-16 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs text-center focus:border-rose-500 focus:outline-hidden" />
                  <input type="text" bind:value={row.content} placeholder="学校名・学部・学科 入学/卒業" class="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-rose-500 focus:outline-hidden" />
                  <button type="button" on:click={() => removeHistoryRow('edu', row.id)} class="text-slate-400 hover:text-rose-600 p-1">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Work Experience -->
          <div class="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-900">{t.workHeader}</h3>
              <button type="button" on:click={() => addHistoryRow('work')} class="text-xs font-bold text-rose-600 hover:underline">
                {t.addRow}
              </button>
            </div>

            {#if workHistory.length === 0}
              <p class="text-xs text-slate-400 italic">{t.noWorkNotice}</p>
            {/if}

            <div class="space-y-2">
              {#each workHistory as row (row.id)}
                <div class="flex items-center space-x-2">
                  <input type="text" bind:value={row.year} placeholder="年 / 和暦" class="w-32 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs focus:border-rose-500 focus:outline-hidden" />
                  <input type="text" bind:value={row.month} placeholder="月" class="w-16 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs text-center focus:border-rose-500 focus:outline-hidden" />
                  <input type="text" bind:value={row.content} placeholder="会社名 入社 / 一身上の都合により退職 / 現在に至る" class="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-rose-500 focus:outline-hidden" />
                  <button type="button" on:click={() => removeHistoryRow('work', row.id)} class="text-slate-400 hover:text-rose-600 p-1">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>

          <!-- Licenses and Certifications -->
          <div class="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-bold text-slate-900">{t.licensesHeader}</h3>
              <button type="button" on:click={() => addHistoryRow('license')} class="text-xs font-bold text-rose-600 hover:underline">
                {t.addRow}
              </button>
            </div>

            <div class="space-y-2">
              {#each licenseHistory as row (row.id)}
                <div class="flex items-center space-x-2">
                  <input type="text" bind:value={row.year} placeholder="年 / 和暦" class="w-32 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs focus:border-rose-500 focus:outline-hidden" />
                  <input type="text" bind:value={row.month} placeholder="月" class="w-16 rounded-xl border border-slate-300 px-2.5 py-1.5 text-xs text-center focus:border-rose-500 focus:outline-hidden" />
                  <input type="text" bind:value={row.content} placeholder="資格名・免許名 取得 / 合格" class="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs focus:border-rose-500 focus:outline-hidden" />
                  <button type="button" on:click={() => removeHistoryRow('license', row.id)} class="text-slate-400 hover:text-rose-600 p-1">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              {/each}
            </div>
          </div>
        </div>
      {/if}

      <!-- Tab 3: Bio and Requests -->
      {#if activeSection === 'bio'}
        <div class="rounded-2xl bg-white p-6 border border-slate-200 shadow-xs space-y-6">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">{t.motivationHeader}</label>
            <textarea
              bind:value={motivation}
              rows="6"
              placeholder="志望動機や自己PR、特技などを簡潔に記載します。"
              class="w-full rounded-xl border border-slate-300 p-3.5 text-xs leading-relaxed focus:border-rose-500 focus:outline-hidden"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">{t.requestsHeader}</label>
            <textarea
              bind:value={personalRequests}
              rows="4"
              placeholder="希望職種、勤務地、勤務時間など（特に希望がない場合は「貴社の規定に従います」と記載します）"
              class="w-full rounded-xl border border-slate-300 p-3.5 text-xs leading-relaxed focus:border-rose-500 focus:outline-hidden"
            ></textarea>
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- JIS A4 Standard Printable Layout -->
  <!-- Visible always in preview mode or during print -->
  <div class="{activeTab === 'preview' ? 'block' : 'hidden'} print:block my-4">
    <!-- Page 1 of JIS Resume -->
    <div class="jis-page bg-white mx-auto border border-slate-300 shadow-lg p-8 sm:p-10 mb-8 text-black" style="max-width: 210mm; min-height: 297mm; font-size: 11pt;">
      <!-- Title & Date -->
      <div class="flex justify-between items-baseline border-b-2 border-black pb-2 mb-3">
        <h1 class="text-2xl font-black tracking-widest text-black">履　歴　書</h1>
        <div class="text-xs text-slate-700 font-medium">{currentDateWareki}</div>
      </div>

      <!-- Basic Profile & Photo Header Grid -->
      <div class="grid grid-cols-12 border-t border-l border-r border-black mb-3">
        <!-- Name & Bio Info (col 9) -->
        <div class="col-span-9 border-r border-black">
          <div class="border-b border-black p-1.5 flex text-xs">
            <span class="w-20 text-[10px] text-slate-500">ふりがな</span>
            <span class="font-medium">{furigana || '　'}</span>
          </div>
          <div class="border-b border-black p-2 flex items-baseline">
            <span class="w-20 text-xs font-bold text-slate-600">氏　　名</span>
            <span class="text-xl font-black">{name || '　'}</span>
          </div>
          <div class="p-2 flex justify-between items-center text-xs">
            <div>
              <span class="text-slate-600 font-bold mr-2">生年月日</span>
              <span>{formatBirthAge(birthDate)}</span>
            </div>
            <div class="border-l border-black pl-3 pr-2">
              <span class="font-bold">{gender === 'male' ? '男' : gender === 'female' ? '女' : ''}</span>
            </div>
          </div>
        </div>

        <!-- ID Photo Box (col 3) -->
        <div class="col-span-3 flex flex-col items-center justify-center p-2 bg-slate-50/20 text-center">
          {#if photoDataUrl}
            <img src={photoDataUrl} alt="Photo" class="w-24 h-32 object-cover border border-slate-400" />
          {:else}
            <div class="w-24 h-32 border border-dashed border-slate-400 flex flex-col items-center justify-center text-[10px] text-slate-400 p-1 leading-tight">
              <span>写　真</span>
              <span class="mt-1 text-[8px]">縦 40mm<br/>横 30mm</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Address & Contact Info -->
      <div class="border border-black mb-4 text-xs">
        <div class="border-b border-black p-1.5 flex">
          <span class="w-20 text-[10px] text-slate-500">ふりがな</span>
          <span>{addressFurigana || '　'}</span>
        </div>
        <div class="border-b border-black p-2 flex justify-between">
          <div class="flex-1">
            <span class="font-bold mr-2">現 住 所</span>
            <span>{postalCode ? `${postalCode} ` : ''}{address || '　'}</span>
          </div>
          <div class="w-44 border-l border-black pl-2">
            <span class="text-slate-500 text-[10px] block">電話番号</span>
            <span>{phone || '　'}</span>
          </div>
        </div>
        <div class="p-2 flex justify-between">
          <div class="flex-1">
            <span class="font-bold mr-2">連絡先</span>
            <span class="text-slate-500 text-[11px]">(同上)</span>
          </div>
          <div class="w-44 border-l border-black pl-2">
            <span class="text-slate-500 text-[10px] block">E-mail</span>
            <span class="truncate block">{email || '　'}</span>
          </div>
        </div>
      </div>

      <!-- Academic & Career Background Table -->
      <div class="border border-black text-xs">
        <!-- Table Header -->
        <div class="grid grid-cols-12 bg-slate-100/70 border-b border-black font-bold text-center py-1">
          <div class="col-span-2 border-r border-black">年</div>
          <div class="col-span-1 border-r border-black">月</div>
          <div class="col-span-9">学歴・職歴（各別にまとめて書く）</div>
        </div>

        <!-- Academic Header -->
        <div class="grid grid-cols-12 border-b border-black py-1 font-bold text-center text-slate-700 bg-slate-50/50">
          <div class="col-span-2 border-r border-black"></div>
          <div class="col-span-1 border-r border-black"></div>
          <div class="col-span-9 tracking-wider">学　　歴</div>
        </div>

        <!-- Academic Rows -->
        {#each educationHistory as row}
          <div class="grid grid-cols-12 border-b border-slate-200 py-1 items-center">
            <div class="col-span-2 border-r border-black text-center font-medium">{row.year}</div>
            <div class="col-span-1 border-r border-black text-center">{row.month}</div>
            <div class="col-span-9 pl-3">{row.content}</div>
          </div>
        {/each}

        <!-- Work Header -->
        <div class="grid grid-cols-12 border-b border-black py-1 font-bold text-center text-slate-700 bg-slate-50/50">
          <div class="col-span-2 border-r border-black"></div>
          <div class="col-span-1 border-r border-black"></div>
          <div class="col-span-9 tracking-wider">職　　歴</div>
        </div>

        <!-- Work Rows -->
        {#if workHistory.length === 0}
          <div class="grid grid-cols-12 border-b border-slate-200 py-1 items-center">
            <div class="col-span-2 border-r border-black text-center"></div>
            <div class="col-span-1 border-r border-black text-center"></div>
            <div class="col-span-9 pl-3 text-slate-700">なし</div>
          </div>
        {:else}
          {#each workHistory as row}
            <div class="grid grid-cols-12 border-b border-slate-200 py-1 items-center">
              <div class="col-span-2 border-r border-black text-center font-medium">{row.year}</div>
              <div class="col-span-1 border-r border-black text-center">{row.month}</div>
              <div class="col-span-9 pl-3">{row.content}</div>
            </div>
          {/each}
        {/if}

        <!-- End marker -->
        <div class="grid grid-cols-12 py-1 items-center">
          <div class="col-span-2 border-r border-black text-center"></div>
          <div class="col-span-1 border-r border-black text-center"></div>
          <div class="col-span-9 text-right pr-6 font-bold tracking-widest text-slate-700">以　上</div>
        </div>
      </div>
    </div>

    <!-- Page Break for Printing -->
    <div class="page-break"></div>

    <!-- Page 2 of JIS Resume -->
    <div class="jis-page bg-white mx-auto border border-slate-300 shadow-lg p-8 sm:p-10 mb-8 text-black" style="max-width: 210mm; min-height: 297mm; font-size: 11pt;">
      <!-- Licenses & Certifications Table -->
      <div class="border border-black text-xs mb-6">
        <!-- Table Header -->
        <div class="grid grid-cols-12 bg-slate-100/70 border-b border-black font-bold text-center py-1">
          <div class="col-span-2 border-r border-black">年</div>
          <div class="col-span-1 border-r border-black">月</div>
          <div class="col-span-9">免　許　・　資　格</div>
        </div>

        {#each licenseHistory as row}
          <div class="grid grid-cols-12 border-b border-slate-200 py-1.5 items-center">
            <div class="col-span-2 border-r border-black text-center font-medium">{row.year}</div>
            <div class="col-span-1 border-r border-black text-center">{row.month}</div>
            <div class="col-span-9 pl-3">{row.content}</div>
          </div>
        {/each}
        <div class="grid grid-cols-12 py-1 items-center">
          <div class="col-span-2 border-r border-black text-center"></div>
          <div class="col-span-1 border-r border-black text-center"></div>
          <div class="col-span-9 text-right pr-6 font-bold tracking-widest text-slate-700">以　上</div>
        </div>
      </div>

      <!-- Motivation and Self PR Block -->
      <div class="border border-black text-xs mb-6">
        <div class="bg-slate-100/70 border-b border-black font-bold p-1.5">
          志望の動機、特技、好きな学科、アピールポイントなど
        </div>
        <div class="p-3 leading-relaxed whitespace-pre-wrap min-h-36">
          {motivation}
        </div>
      </div>

      <!-- Personal Requests Block -->
      <div class="border border-black text-xs">
        <div class="bg-slate-100/70 border-b border-black font-bold p-1.5">
          本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）
        </div>
        <div class="p-3 leading-relaxed whitespace-pre-wrap min-h-24">
          {personalRequests}
        </div>
      </div>
    </div>
  </div>

  <!-- Ad Banner (no-print) -->
  <div class="no-print mt-8">
    <AdBanner />
  </div>

  <!-- FAQ Section (no-print) -->
  <section class="no-print mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
    <h2 class="text-base font-bold text-slate-900 mb-4">{t.faqTitle}</h2>
    <div class="space-y-4 text-xs text-slate-600 leading-relaxed">
      <div>
        <p class="font-bold text-slate-800">{t.faq1Q}</p>
        <p class="mt-1 text-slate-600">{t.faq1A}</p>
      </div>
      <div>
        <p class="font-bold text-slate-800">{t.faq2Q}</p>
        <p class="mt-1 text-slate-600">{t.faq2A}</p>
      </div>
    </div>
  </section>
</div>
