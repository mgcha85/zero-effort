<script lang="ts">
  import InvoiceBuilder, { type LineItem } from '$lib/InvoiceBuilder.svelte';

  const initialItems: LineItem[] = [
    { id: '1', desc: 'Brand Identity Suite (Primary/Secondary Logo, Color Palette & Typography Guidelines)', qty: 1, price: 1800 },
    { id: '2', desc: 'Figma Mobile App UI Design System (35+ screens with interactive prototyping)', qty: 1, price: 2400 },
    { id: '3', desc: 'Commercial Marketing Assets & Social Media Vector Templates (Pack of 12)', qty: 1, price: 750 },
    { id: '4', desc: 'Full Commercial Asset Copyright & Vector Source Handover (.fig, .svg, .ai)', qty: 1, price: 400 }
  ];

  const initialFrom = {
    name: 'Kira Chen Creative Studio',
    email: 'hello@kirachen.design',
    address: 'Creative Quarter, Shoreditch\nLondon, UK\nVAT: GB 992 4810 23'
  };

  const initialTo = {
    name: 'Northwind Consumer Brands',
    email: 'finance@northwindbrands.com',
    address: '100 Bishopgate, London EC2N 4AG, UK'
  };

  const initialNotes = 'Payment terms: Due within 14 days of invoice date.\nAll intellectual property and vector raw assets transfer upon complete payment.\nBank: Barclays UK, Sort Code: 20-00-00, Account: 12345678, IBAN: GB29BARC20000012345678';
</script>

<InvoiceBuilder
  customTitle="Graphic Designer & Creative Invoice Template"
  customSubtitle="Free, aesthetic A4 invoice generator for freelance designers, illustrators, and creative agencies. Itemize milestones, asset licenses, and revisions without monthly fees."
  badgeText="Design & Creative Template"
  canonicalUrl="https://invoice.minitoolbox.dev/templates/graphic-designer/"
  professionTag="designer"
  {initialItems}
  {initialFrom}
  {initialTo}
  {initialNotes}
/>
