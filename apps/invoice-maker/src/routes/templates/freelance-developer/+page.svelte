<script lang="ts">
  import InvoiceBuilder, { type LineItem } from '$lib/InvoiceBuilder.svelte';

  const initialItems: LineItem[] = [
    { id: '1', desc: 'Backend Architecture & REST/GraphQL API Development', qty: 35, price: 95 },
    { id: '2', desc: 'Frontend SvelteKit SPA Implementation & Responsive Polish', qty: 25, price: 90 },
    { id: '3', desc: 'Database Schema Optimization & Query Indexing (PostgreSQL)', qty: 10, price: 110 },
    { id: '4', desc: 'CI/CD Pipeline Setup & Automated Test Suite Integration', qty: 1, price: 650 }
  ];

  const initialFrom = {
    name: 'Alex Vance (Full-Stack Engineer)',
    email: 'alex@devnomad.io',
    address: 'Remote / Global\nGitHub: @alex-engineer\nTax ID: DEV-4482019'
  };

  const initialTo = {
    name: 'SaaS Platform Corp.',
    email: 'billing@saasplatform.com',
    address: '400 Concar Dr, San Mateo, CA 94402\nAttn: Engineering Team'
  };

  const initialNotes = 'Terms: Net 14 days.\nPayment via Stripe, Wire transfer, or Wise (transfer@devnomad.io).\nCode repository access handed over upon receipt of payment.';
</script>

<InvoiceBuilder
  customTitle="Freelance Developer Invoice Template"
  customSubtitle="Free, zero-signup A4 invoice generator optimized for software engineers, contractors, and technical consultants. Multi-currency, hourly and milestone billing."
  badgeText="Software Engineer & Dev Template"
  canonicalUrl="https://invoice.minitoolbox.dev/templates/freelance-developer/"
  professionTag="developer"
  {initialItems}
  {initialFrom}
  {initialTo}
  {initialNotes}
/>
