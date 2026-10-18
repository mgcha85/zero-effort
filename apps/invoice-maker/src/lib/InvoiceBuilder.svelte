<script lang="ts">
  import { onMount } from 'svelte';
  import { buildFaqJsonLd, buildWebAppJsonLd } from '@zero-effort/seo-config';
  import { currentLang, translations } from '$lib/langStore';
  import { trackEvent } from '@zero-effort/shared-ui';

  export interface LineItem {
    id: string;
    desc: string;
    qty: number;
    price: number;
  }

  export let customTitle: string = '';
  export let customSubtitle: string = '';
  export let badgeText: string = '';
  export let canonicalUrl: string = 'https://invoice.minitoolbox.dev/';
  export let professionTag: string = 'freelance';

  export let initialItems: LineItem[] = [
    { id: '1', desc: 'Full-Stack Web Application Development', qty: 1, price: 3200 },
    { id: '2', desc: 'UI/UX Design System & Mobile Responsive Polish', qty: 1, price: 1400 },
    { id: '3', desc: 'SEO & Structured Data Optimization', qty: 1, price: 600 }
  ];

  export let initialFrom: { name: string; email: string; address: string } = {
    name: 'Nomad Studio Ltd.',
    email: 'billing@nomadstudio.co',
    address: '100 Innovation Way\nSan Francisco, CA 94105\nTax ID: US-98765432'
  };

  export let initialTo: { name: string; email: string; address: string } = {
    name: 'Acme Global Corp.',
    email: 'accounting@acmeglobal.com',
    address: '250 Boulevard Saint-Germain\n75007 Paris, France\nVAT: FR123456789'
  };

  export let initialNotes: string = 'Payment terms: Due within 14 days.\nDirect Wire: Bank Name, Routing: 123456789, Account: 987654321\nWise: transfer@nomadstudio.co';
  export let initialTaxRate: number = 0;
  export let initialDiscount: number = 0;

  // Currencies
  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'KRW', symbol: '₩', label: 'KRW (₩)' },
    { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
    { code: 'VND', symbol: '₫', label: 'VND (₫)' }
  ];

  let selectedCurrency = currencies[0];

  // Invoice Data
  let invoiceNumber = 'INV-2026-001';
  let issueDate = new Date().toISOString().split('T')[0];
  let dueDate = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];

  let fromName = initialFrom.name;
  let fromAddress = initialFrom.address;

  let toName = initialTo.name;
  let toAddress = initialTo.address;

  let items: LineItem[] = JSON.parse(JSON.stringify(initialItems));
  let taxRate = initialTaxRate;
  let discount = initialDiscount;
  let notes = initialNotes;

  $: t = translations[$currentLang] || translations.en;

  function plainQa(s: string) {
    return s ? s.replace(/^[QA]\.\s*/, '') : '';
  }

  $: displayTitle = customTitle || t.heroTitle;
  $: displaySubtitle = customSubtitle || t.heroSub;
  $: displayBadge = badgeText || t.badge;

  $: jsonLd = buildWebAppJsonLd({
    name: displayTitle,
    url: canonicalUrl,
    description: displaySubtitle,
    applicationCategory: 'BusinessApplication'
  });

  $: jsonLdFaq = buildFaqJsonLd([
    { question: plainQa(t.faq1Q), answer: plainQa(t.faq1A) },
    { question: plainQa(t.faq2Q), answer: plainQa(t.faq2A) }
  ]);

  // Computed values
  $: subtotal = items.reduce((sum, item) => sum + (Number(item.qty) || 0) * (Number(item.price) || 0), 0);
  $: taxAmount = (subtotal * (Number(taxRate) || 0)) / 100;
  $: totalDue = Math.max(0, subtotal + taxAmount - (Number(discount) || 0));

  function addItem() {
    items = [...items, { id: Math.random().toString(36).substring(2, 9), desc: '', qty: 1, price: 0 }];
  }

  function removeItem(id: string) {
    if (items.length <= 1) return;
    items = items.filter(it => it.id !== id);
  }

  function formatMoney(amount: number) {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: ['KRW', 'JPY', 'VND'].includes(selectedCurrency.code) ? 0 : 2,
      maximumFractionDigits: ['KRW', 'JPY', 'VND'].includes(selectedCurrency.code) ? 0 : 2
    }).format(amount);
    return `${selectedCurrency.symbol}${formatted}`;
  }

  function handlePrint() {
    trackEvent('invoice_print', {
      tool: 'invoice_maker',
      template: professionTag,
      language: $currentLang,
      currency: selectedCurrency.code,
      line_item_count: items.length
    });
    window.print();
  }

  function loadSample() {
    invoiceNumber = 'INV-2026-088';
    fromName = initialFrom.name;
    fromAddress = initialFrom.address;
    toName = initialTo.name;
    toAddress = initialTo.address;
    items = JSON.parse(JSON.stringify(initialItems));
    taxRate = initialTaxRate;
    discount = initialDiscount;
    notes = initialNotes;
  }

  function resetForm() {
    items = [{ id: '1', desc: '', qty: 1, price: 0 }];
    taxRate = 0;
    discount = 0;
    notes = '';
  }

  let isMounted = false;
  const storageKey = `nomad_inv_${professionTag}_v1`;

  onMount(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.invoiceNumber) invoiceNumber = d.invoiceNumber;
        if (d.fromName) fromName = d.fromName;
        if (d.fromAddress) fromAddress = d.fromAddress;
        if (d.toName) toName = d.toName;
        if (d.toAddress) toAddress = d.toAddress;
        if (d.items && Array.isArray(d.items)) items = d.items;
        if (d.currencyCode) {
          const match = currencies.find(c => c.code === d.currencyCode);
          if (match) selectedCurrency = match;
        }
        if (d.taxRate !== undefined) taxRate = d.taxRate;
        if (d.discount !== undefined) discount = d.discount;
        if (d.notes !== undefined) notes = d.notes;
      }
    } catch {}
    isMounted = true;
  });

  $: {
    if (isMounted && typeof window !== 'undefined' && items) {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          invoiceNumber, fromName, fromAddress, toName, toAddress,
          currencyCode: selectedCurrency.code,
          items, taxRate, discount, notes
        }));
      } catch {}
    }
  }

  const allTemplates = [
    { slug: '', label: 'General Freelance & Creator', desc: 'Versatile invoice & receipt template for digital nomads and contractors' },
    { slug: 'freelance-developer', label: 'Software Developer & Engineer', desc: 'Milestone, sprint, and hourly technical consulting invoice format' },
    { slug: 'consultant', label: 'Consultant & Business Advisory', desc: 'Professional retainer and advisory fee invoice layout' },
    { slug: 'graphic-designer', label: 'Graphic Designer & Creative', desc: 'Creative project billing with brand identity, licensing, and revisions' },
    { slug: 'contractor-receipt', label: 'Contractor Work Order & Receipt', desc: 'Parts, labor, and materials breakdown for trade and service contractors' }
  ];
</script>

<svelte:head>
  <title>{displayTitle} | Nomad Invoice</title>
  <meta name="description" content={displaySubtitle} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:title" content={displayTitle} />
  <meta property="og:description" content={displaySubtitle} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary" />
  {@html `<script type="application/ld+json">${jsonLd}</script>`}
  {@html `<script type="application/ld+json">${jsonLdFaq}</script>`}
</svelte:head>

<div class="invoice-page mx-auto max-w-6xl px-4 py-8 sm:px-6">
  <!-- Hero Section (no-print) -->
  <div class="no-print text-center mb-8">
    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200/80 mb-3 shadow-2xs">
      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      <span>{displayBadge}</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
      {displayTitle}
    </h1>
    <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
      {displaySubtitle}
    </p>

    <!-- Top Action Bar -->
    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        on:click={handlePrint}
        class="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-xs hover:from-blue-500 hover:to-indigo-500 transition duration-150 active:scale-98"
      >
        {t.printPdfBtn}
      </button>
      <button
        type="button"
        on:click={loadSample}
        class="inline-flex items-center gap-1.5 rounded-2xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
      >
        <span>⚡</span>
        <span>{t.sampleBtn}</span>
      </button>
      <button
        type="button"
        on:click={resetForm}
        class="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-500 hover:text-rose-600 transition"
      >
        <span>{t.resetBtn}</span>
      </button>
    </div>
  </div>

  <!-- A4 Printable Sheet Container -->
  <div class="print-sheet mx-auto max-w-4xl bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-12 transition-all">
    <!-- Invoice Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-8">
      <div>
        <h2 class="text-3xl font-black tracking-tight text-slate-900">{t.invoiceTitle}</h2>
        <div class="mt-3 space-y-1">
          <div class="print-only font-bold text-slate-900 text-lg leading-snug">{fromName || t.fromSection}</div>
          <input
            type="text"
            bind:value={fromName}
            placeholder={t.fromSection}
            class="no-print block w-full sm:w-80 font-bold text-slate-900 text-lg border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-blue-600 focus:outline-hidden bg-transparent"
          />
          <div class="print-only text-xs text-slate-600 leading-relaxed whitespace-pre-line mt-1">{fromAddress}</div>
          <textarea
            bind:value={fromAddress}
            rows="3"
            placeholder="Address, VAT / Tax ID"
            class="no-print block w-full sm:w-80 text-xs text-slate-600 leading-relaxed border-b border-dashed border-slate-200 hover:border-slate-400 focus:border-blue-600 focus:outline-hidden bg-transparent resize-none"
          ></textarea>
        </div>
      </div>

      <div class="space-y-2 text-left sm:text-right w-full sm:w-auto">
        <div class="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-700">
          <span>{t.invNumber}:</span>
          <span class="print-only font-mono font-bold text-slate-900">{invoiceNumber}</span>
          <input
            type="text"
            bind:value={invoiceNumber}
            class="no-print w-36 text-right font-mono font-bold text-slate-900 border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-hidden bg-transparent"
          />
        </div>
        <div class="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-700">
          <span>{t.issueDate}:</span>
          <span class="print-only font-mono font-semibold text-slate-800">{issueDate}</span>
          <input
            type="date"
            bind:value={issueDate}
            class="no-print w-36 text-right font-mono text-slate-800 border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-hidden bg-transparent text-xs"
          />
        </div>
        <div class="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-700">
          <span>{t.dueDate}:</span>
          <span class="print-only font-mono font-semibold text-slate-800">{dueDate}</span>
          <input
            type="date"
            bind:value={dueDate}
            class="no-print w-36 text-right font-mono text-slate-800 border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-hidden bg-transparent text-xs"
          />
        </div>
        <div class="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-700 pt-1">
          <span>{t.currency}:</span>
          <span class="print-only font-mono font-semibold text-slate-800">{selectedCurrency.label}</span>
          <select
            bind:value={selectedCurrency}
            class="no-print border border-slate-200 rounded-lg px-2 py-0.5 text-xs font-bold text-slate-800 bg-slate-50 focus:border-blue-600 focus:outline-hidden"
          >
            {#each currencies as cur}
              <option value={cur}>{cur.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Bill To Section -->
    <div class="py-6 border-b border-slate-200">
      <span class="text-xs font-bold tracking-wider text-slate-600 uppercase">{t.toSection}</span>
      <div class="mt-2 space-y-1">
        <div class="print-only font-bold text-slate-900 text-base leading-snug">{toName || 'Client Name / Company'}</div>
        <input
          type="text"
          bind:value={toName}
          placeholder="Client / Company Name"
          class="no-print block w-full sm:w-80 font-bold text-slate-900 text-base border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-blue-600 focus:outline-hidden bg-transparent"
        />
        <div class="print-only text-xs text-slate-600 leading-relaxed whitespace-pre-line mt-1">{toAddress}</div>
        <textarea
          bind:value={toAddress}
          rows="2"
          placeholder="Client Address, VAT / Tax Registration ID"
          class="no-print block w-full sm:w-80 text-xs text-slate-600 leading-relaxed border-b border-dashed border-slate-200 hover:border-slate-400 focus:border-blue-600 focus:outline-hidden bg-transparent resize-none"
        ></textarea>
      </div>
    </div>

    <!-- Line Items Table -->
    <div class="py-6 overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-slate-300 text-slate-600 uppercase font-black tracking-wider pb-3">
            <th class="py-2.5 w-1/2">{t.itemDesc}</th>
            <th class="py-2.5 text-right w-16">{t.itemQty}</th>
            <th class="py-2.5 text-right w-28">{t.itemPrice}</th>
            <th class="py-2.5 text-right w-28">{t.itemTotal}</th>
            <th class="no-print py-2.5 w-10 text-center"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          {#each items as item (item.id)}
            <tr class="invoice-row group hover:bg-slate-50/60 transition-colors">
              <td class="py-3 pr-4 align-top">
                <div class="print-only text-slate-800 font-medium whitespace-pre-line leading-relaxed">{item.desc}</div>
                <textarea
                  bind:value={item.desc}
                  rows="2"
                  placeholder="Task, deliverable, or product description..."
                  class="no-print w-full text-slate-800 font-medium border-b border-dashed border-slate-200 group-hover:border-slate-400 focus:border-blue-600 focus:outline-hidden bg-transparent resize-none leading-relaxed"
                ></textarea>
              </td>
              <td class="py-3 px-2 text-right align-top">
                <span class="print-only font-mono font-medium text-slate-800">{item.qty}</span>
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  bind:value={item.qty}
                  class="no-print w-16 text-right font-mono font-medium text-slate-800 border-b border-dashed border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
                />
              </td>
              <td class="py-3 px-2 text-right align-top">
                <span class="print-only font-mono font-medium text-slate-800">{formatMoney(Number(item.price) || 0)}</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  bind:value={item.price}
                  class="no-print w-24 text-right font-mono font-medium text-slate-800 border-b border-dashed border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
                />
              </td>
              <td class="py-3 pl-4 text-right font-mono font-bold text-slate-900 align-top">
                {formatMoney((Number(item.qty) || 0) * (Number(item.price) || 0))}
              </td>
              <td class="no-print py-3 text-center align-top">
                {#if items.length > 1}
                  <button
                    type="button"
                    on:click={() => removeItem(item.id)}
                    class="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 font-bold p-1 rounded-sm transition-opacity"
                    title="Remove item"
                  >
                    ✕
                  </button>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <!-- Add Item Button (no-print) -->
      <div class="no-print mt-4">
        <button
          type="button"
          on:click={addItem}
          class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 px-3 py-1.5 rounded-xl border border-blue-200/60 transition"
        >
          <span>＋</span>
          <span>{t.addItemBtn}</span>
        </button>
      </div>
    </div>

    <!-- Summary & Totals -->
    <div class="summary-grid border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-start gap-8">
      <div class="summary-notes w-full sm:w-1/2 space-y-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-600">{t.notesSection}</span>
        <div class="print-only text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3 rounded-xl border border-slate-200">
          {notes}
        </div>
        <textarea
          bind:value={notes}
          rows="4"
          placeholder="Bank details, IBAN/SWIFT, Wise email, due date terms..."
          class="no-print w-full text-xs text-slate-600 leading-relaxed border border-dashed border-slate-200 rounded-xl p-3 hover:border-slate-400 focus:border-blue-600 focus:outline-hidden bg-slate-50/60 resize-none"
        ></textarea>
      </div>

      <div class="summary-totals w-full sm:w-72 space-y-2 text-xs">
        <div class="flex justify-between text-slate-600 py-1">
          <span>{t.subtotal}:</span>
          <span class="font-bold text-slate-800 font-mono">{formatMoney(subtotal)}</span>
        </div>

        {#if Number(taxRate) > 0}
          <div class="flex justify-between items-center text-slate-600 py-1">
            <div class="flex items-center gap-1">
              <span>{t.taxRate}:</span>
              <span class="print-only font-semibold text-slate-800">{taxRate}%</span>
              <span class="no-print inline-flex items-center gap-1">
                <input
                  type="number"
                  min="0"
                  max="100"
                  bind:value={taxRate}
                  class="w-12 text-center border-b border-dashed border-slate-300 font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden bg-transparent"
                />
                <span>%</span>
              </span>
            </div>
            <span class="font-bold text-slate-800 font-mono">{formatMoney(taxAmount)}</span>
          </div>
        {:else}
          <div class="no-print flex justify-between items-center text-slate-600 py-1">
            <div class="flex items-center gap-1">
              <span>{t.taxRate}:</span>
              <input
                type="number"
                min="0"
                max="100"
                bind:value={taxRate}
                class="w-12 text-center border-b border-dashed border-slate-300 font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden bg-transparent"
              />
              <span>%</span>
            </div>
            <span class="font-bold text-slate-800 font-mono">{formatMoney(taxAmount)}</span>
          </div>
        {/if}

        {#if Number(discount) > 0}
          <div class="flex justify-between items-center text-slate-600 py-1">
            <div class="flex items-center gap-1">
              <span>{t.discount}:</span>
              <span class="no-print inline-flex items-center">
                <input
                  type="number"
                  min="0"
                  bind:value={discount}
                  class="w-16 text-center border-b border-dashed border-slate-300 font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden bg-transparent"
                />
              </span>
            </div>
            <span class="font-bold text-rose-600 font-mono">-{formatMoney(Number(discount) || 0)}</span>
          </div>
        {:else}
          <div class="no-print flex justify-between items-center text-slate-600 py-1">
            <div class="flex items-center gap-1">
              <span>{t.discount}:</span>
              <input
                type="number"
                min="0"
                bind:value={discount}
                class="w-16 text-center border-b border-dashed border-slate-300 font-semibold text-slate-800 focus:border-blue-600 focus:outline-hidden bg-transparent"
              />
            </div>
            <span class="font-bold text-rose-600 font-mono">-{formatMoney(Number(discount) || 0)}</span>
          </div>
        {/if}

        <div class="flex justify-between items-center py-3 border-t-2 border-slate-900 mt-2">
          <span class="text-sm font-black text-slate-900">{t.totalDue}:</span>
          <span class="text-xl font-black text-blue-600 font-mono">{formatMoney(totalDue)}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Template Hub Navigation (SEO & Internal Linking, no-print) -->
  <div class="no-print mt-12 max-w-4xl mx-auto">
    <div class="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm font-extrabold uppercase tracking-wider text-slate-900">
            Free Profession Invoice Templates
          </h3>
          <p class="text-xs text-slate-500 mt-0.5">
            Pre-configured layouts designed specifically for contractor billing, consulting, and digital nomad workflows.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {#each allTemplates as item}
          <a
            href={item.slug ? `/templates/${item.slug}` : '/'}
            class="group p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/40 transition flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition">
                  {item.label}
                </span>
                <span class="text-slate-400 group-hover:translate-x-0.5 transition-transform text-xs">→</span>
              </div>
              <p class="text-[11px] text-slate-500 mt-1 leading-normal">
                {item.desc}
              </p>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>

  <!-- Privacy Note & FAQ (no-print) -->
  <div class="no-print mt-8 max-w-4xl mx-auto space-y-6">
    <div class="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-center text-xs text-slate-500">
      {t.privacyNote}
    </div>

    <!-- FAQ -->
    <div class="rounded-3xl border border-slate-200/90 bg-white/90 p-6 shadow-2xs space-y-4">
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
</div>

<style>
  .print-only {
    display: none;
  }

  @media print {
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }

    :global(html),
    :global(body) {
      background: #ffffff !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    :global(.no-print),
    .no-print {
      display: none !important;
    }

    .print-only {
      display: block !important;
    }

    span.print-only {
      display: inline !important;
    }

    .invoice-page {
      width: 100% !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    .print-sheet {
      width: 100% !important;
      max-width: none !important;
      min-height: auto !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      border-radius: 0 !important;
    }

    .invoice-row {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }

    .summary-grid,
    .summary-notes,
    .summary-totals {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
  }
</style>
