<script lang="ts">
  import InvoiceBuilder, { type LineItem } from '$lib/InvoiceBuilder.svelte';

  const initialItems: LineItem[] = [
    { id: '1', desc: 'Monthly Executive Strategic Advisory & Architecture Review', qty: 1, price: 3500 },
    { id: '2', desc: 'Technical Feasibility Study & Competitor Analysis', qty: 1, price: 1800 },
    { id: '3', desc: 'Stakeholder Workshop & Technology Roadmap Presentation', qty: 4, price: 250 }
  ];

  const initialFrom = {
    name: 'Apex Strategic Partners LLC',
    email: 'invoicing@apexstrategy.com',
    address: 'One World Trade Center, Suite 8500\nNew York, NY 10007\nTax ID: US-45892011'
  };

  const initialTo = {
    name: 'Horizon Capital Ventures',
    email: 'accounts@horizoncap.vc',
    address: '500 Boylston St, Boston, MA 02116\nAttn: Fund Management'
  };

  const initialNotes = 'Payment terms: Due within 15 calendar days.\nPlease remit via ACH or Direct Wire.\nBanking details: Bank of America, Routing: 026009593, Account: 483019284719';
</script>

<InvoiceBuilder
  customTitle="Consulting Invoice & Retainer Template"
  customSubtitle="Professional, client-side consulting invoice and retainer receipt maker. Zero server storage, multi-currency support, clean A4 print export."
  badgeText="Consulting & Advisory Template"
  canonicalUrl="https://invoice.minitoolbox.dev/templates/consultant/"
  professionTag="consultant"
  {initialItems}
  {initialFrom}
  {initialTo}
  {initialNotes}
/>
