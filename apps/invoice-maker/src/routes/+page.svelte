<script lang="ts">
  import { onMount } from 'svelte';
  import { buildFaqJsonLd, buildWebAppJsonLd } from '@zero-effort/seo-config';
  import { currentLang, translations } from '$lib/langStore';

  interface LineItem {
    id: string;
    desc: string;
    qty: number;
    price: number;
  }

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

  let fromName = 'Nomad Studio Ltd.';
  let fromEmail = 'billing@nomadstudio.co';
  let fromAddress = '100 Innovation Way\nSan Francisco, CA 94105\nTax ID: US-98765432';

  let toName = 'Acme Global Corp.';
  let toEmail = 'accounting@acmeglobal.com';
  let toAddress = '250 Boulevard Saint-Germain\n75007 Paris, France\nVAT: FR123456789';

  let items: LineItem[] = [
    { id: '1', desc: 'Full-Stack Web Application Development', qty: 1, price: 3200 },
    { id: '2', desc: 'UI/UX Design System & Mobile Responsive Polish', qty: 1, price: 1400 },
    { id: '3', desc: 'SEO & Structured Data Optimization', qty: 1, price: 600 }
  ];

  let taxRate = 0; // %
  let discount = 0; // flat
  let notes = 'Payment terms: Due within 14 days.\nDirect Wire: Bank Name, Routing: 123456789, Account: 987654321\nWise: transfer@nomadstudio.co';

  $: t = translations[$currentLang] || translations.en;

  function plainQa(s: string) {
    return s.replace(/^[QA]\.\s*/, '');
  }

  $: jsonLd = buildWebAppJsonLd({
    name: t.siteTitle,
    url: 'https://invoice.minitoolbox.dev',
    description: t.heroSub,
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
    window.print();
  }

  function loadSample() {
    invoiceNumber = 'INV-2026-088';
    fromName = 'Lumière Digital SAS';
    fromEmail = 'finance@lumiere.paris';
    fromAddress = '12 Rue de Rivoli, 75001 Paris, France\nTVA: FR 88 123456789';
    toName = 'TechFlow Solutions Inc.';
    toEmail = 'ap@techflow.io';
    toAddress = '555 Market St, Suite 1800, San Francisco, CA 94105';
    selectedCurrency = currencies[1]; // EUR
    taxRate = 20; // 20% French TVA
    discount = 200;
    items = [
      { id: '1', desc: 'Quarterly Frontend Engineering & SvelteKit Migration', qty: 1, price: 4500 },
      { id: '2', desc: 'API Integration & Performance Tuning', qty: 20, price: 120 }
    ];
    notes = 'Conditions de règlement : 30 jours à réception.\nVirement bancaire : IBAN FR76 3000 4000 1234 5678 9012 345\nBIC / SWIFT : BNPAFRPPXXX';
  }

  function resetForm() {
    items = [{ id: '1', desc: '', qty: 1, price: 0 }];
    taxRate = 0;
    discount = 0;
    notes = '';
  }

  // Local storage auto-save
  onMount(() => {
    try {
      const saved = localStorage.getItem('nomad_inv_v1');
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
  });

  $: {
    if (typeof window !== 'undefined' && items) {
      try {
        localStorage.setItem('nomad_inv_v1', JSON.stringify({
          invoiceNumber, fromName, fromAddress, toName, toAddress,
          currencyCode: selectedCurrency.code,
          items, taxRate, discount, notes
        }));
      } catch {}
    }
  }
</script>

<svelte:head>
  <title>{t.siteTitle} | {t.subBrand}</title>
  <meta name="description" content={t.heroSub} />
  <link rel="canonical" href="https://invoice.minitoolbox.dev/" />
  <meta property="og:title" content={t.siteTitle} />
  <meta property="og:description" content={t.heroSub} />
  <meta property="og:url" content="https://invoice.minitoolbox.dev/" />
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
      <span>{t.badge}</span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
      {t.heroTitle}
    </h1>
    <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
      {t.heroSub}
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
          <input
            type="text"
            bind:value={fromName}
            placeholder={t.fromSection}
            class="block w-full sm:w-80 font-bold text-slate-900 text-lg border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-blue-600 focus:outline-hidden bg-transparent"
          />
          <textarea
            bind:value={fromAddress}
            rows="3"
            placeholder="Address, VAT / Tax ID"
            class="block w-full sm:w-80 text-xs text-slate-600 leading-relaxed border-b border-dashed border-slate-200 hover:border-slate-400 focus:border-blue-600 focus:outline-hidden bg-transparent resize-none"
          ></textarea>
        </div>
      </div>

      <div class="space-y-2 text-left sm:text-right w-full sm:w-auto">
        <div class="flex items-center sm:justify-end gap-2 text-xs font-bold text-slate-700">
          <span>{t.invNumber}:</span>
          <input
            type="text"
            bind:value={invoiceNumber}
            class="w-36 text-right font-mono font-bold text-slate-900 border-b border-dashed border-slate-300 focus:border-blue-600 focus:outline-hidden bg-transparent"
          />
        </div>
        <div class="flex items-center sm:justify-end gap-2 text-xs text-slate-600">
          <span>{t.issueDate}:</span>
          <input
            type="date"
            bind:value={issueDate}
            class="text-right text-xs font-medium text-slate-800 border-b border-dashed border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
          />
        </div>
        <div class="flex items-center sm:justify-end gap-2 text-xs text-slate-600">
          <span>{t.dueDate}:</span>
          <input
            type="date"
            bind:value={dueDate}
            class="text-right text-xs font-medium text-slate-800 border-b border-dashed border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
          />
        </div>
        <div class="no-print flex items-center sm:justify-end gap-2 text-xs font-semibold text-slate-600 pt-1">
          <span>{t.currency}:</span>
          <select
            bind:value={selectedCurrency}
            class="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-slate-800 cursor-pointer focus:outline-hidden"
          >
            {#each currencies as c}
              <option value={c}>{c.label}</option>
            {/each}
          </select>
        </div>
      </div>
    </div>

    <!-- Billed To Section -->
    <div class="py-6 border-b border-slate-100">
      <span class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">{t.toSection}</span>
      <input
        type="text"
        bind:value={toName}
        placeholder="Client or Company Name"
        class="block w-full sm:w-80 font-bold text-slate-800 text-base border-b border-dashed border-slate-300 hover:border-slate-500 focus:border-blue-600 focus:outline-hidden bg-transparent"
      />
      <textarea
        bind:value={toAddress}
        rows="2"
        placeholder="Client Address, Tax/VAT"
        class="block w-full sm:w-80 text-xs text-slate-600 leading-relaxed border-b border-dashed border-slate-200 hover:border-slate-400 focus:border-blue-600 focus:outline-hidden bg-transparent resize-none mt-1"
      ></textarea>
    </div>

    <!-- Line Items Table -->
    <div class="py-6">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b-2 border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <th class="py-2.5 pr-4">{t.descCol}</th>
              <th class="py-2.5 px-3 w-16 text-center">{t.qtyCol}</th>
              <th class="py-2.5 px-3 w-28 text-right">{t.priceCol}</th>
              <th class="py-2.5 pl-3 w-28 text-right">{t.totalCol}</th>
              <th class="no-print py-2.5 pl-2 w-8"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            {#each items as item (item.id)}
              <tr class="group">
                <td class="py-2.5 pr-4">
                  <input
                    type="text"
                    bind:value={item.desc}
                    placeholder="Description of service or product"
                    class="w-full text-xs font-medium text-slate-800 border-b border-transparent group-hover:border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
                  />
                </td>
                <td class="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="1"
                    bind:value={item.qty}
                    class="w-14 text-center text-xs font-semibold text-slate-800 border-b border-transparent group-hover:border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
                  />
                </td>
                <td class="py-2.5 px-3 text-right">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    bind:value={item.price}
                    class="w-24 text-right text-xs font-semibold text-slate-800 border-b border-transparent group-hover:border-slate-200 focus:border-blue-600 focus:outline-hidden bg-transparent"
                  />
                </td>
                <td class="py-2.5 pl-3 text-right font-bold text-slate-900 font-mono">
                  {formatMoney((Number(item.qty) || 0) * (Number(item.price) || 0))}
                </td>
                <td class="no-print py-2.5 pl-2 text-center">
                  {#if items.length > 1}
                    <button
                      type="button"
                      on:click={() => removeItem(item.id)}
                      class="text-slate-300 hover:text-rose-500 font-bold text-sm leading-none p-1"
                      title="Remove"
                    >
                      ×
                    </button>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <div class="no-print mt-3">
        <button
          type="button"
          on:click={addItem}
          class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50/80 px-3 py-1.5 rounded-xl border border-blue-200 transition"
        >
          {t.addItemBtn}
        </button>
      </div>
    </div>

    <!-- Summary & Notes Calculation Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-200">
      <!-- Left: Notes & Bank Details -->
      <div>
        <span class="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
          {t.paymentTerms}
        </span>
        <textarea
          bind:value={notes}
          rows="4"
          placeholder={t.paymentTermsPlaceholder}
          class="w-full rounded-xl border border-dashed border-slate-200 p-2.5 text-xs text-slate-600 leading-relaxed focus:border-blue-600 focus:outline-hidden bg-transparent resize-none font-mono"
        ></textarea>
      </div>

      <!-- Right: Subtotal, Tax, Discount, Total Due -->
      <div class="space-y-2 text-xs">
        <div class="flex justify-between text-slate-600 py-1">
          <span>{t.subtotal}:</span>
          <span class="font-bold text-slate-800 font-mono">{formatMoney(subtotal)}</span>
        </div>

        <div class="flex justify-between items-center text-slate-600 py-1">
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

        <div class="flex justify-between items-center text-slate-600 py-1">
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

        <div class="flex justify-between items-center py-3 border-t-2 border-slate-900 mt-2">
          <span class="text-sm font-black text-slate-900">{t.totalDue}:</span>
          <span class="text-xl font-black text-blue-600 font-mono">{formatMoney(totalDue)}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Privacy Note & FAQ (no-print) -->
  <div class="no-print mt-12 max-w-4xl mx-auto space-y-6">
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
  @media print {
    @page {
      size: A4 portrait;
      margin: 0;
    }

    :global(body) {
      background: white !important;
      margin: 0 !important;
    }

    .invoice-page {
      width: 210mm !important;
      max-width: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    :global(.no-print) {
      display: none !important;
    }

    .print-sheet {
      width: 210mm !important;
      min-height: 297mm;
      box-sizing: border-box;
      margin: 0 !important;
      border: none !important;
      box-shadow: none !important;
      padding: 12mm !important;
      border-radius: 0 !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .print-sheet table,
    .print-sheet tr,
    .print-sheet td,
    .print-sheet th {
      page-break-inside: avoid;
      break-inside: avoid;
    }
  }
</style>
