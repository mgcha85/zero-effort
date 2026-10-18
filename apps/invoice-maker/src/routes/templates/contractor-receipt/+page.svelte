<script lang="ts">
  import InvoiceBuilder, { type LineItem } from '$lib/InvoiceBuilder.svelte';

  const initialItems: LineItem[] = [
    { id: '1', desc: 'On-Site Diagnostic & Structural Repair Labor', qty: 16, price: 85 },
    { id: '2', desc: 'Commercial Grade Materials & Hardware Replacement', qty: 1, price: 620 },
    { id: '3', desc: 'Electrical Sub-panel Inspection & Safety Certification', qty: 1, price: 280 },
    { id: '4', desc: 'Site Cleanup, Debris Removal & Municipal Disposal Fee', qty: 1, price: 150 }
  ];

  const initialFrom = {
    name: 'Reliable Build & Trade Services',
    email: 'billing@reliabletrades.com',
    address: '742 Evergreen Terrace\nSpringfield, OR 97477\nLicense #: CCB-194029'
  };

  const initialTo = {
    name: 'Oakmont Property Management LLC',
    email: 'invoices@oakmontpm.com',
    address: '1200 Commercial Way, Suite 400, Portland, OR 97201'
  };

  const initialNotes = 'Receipt of Work Order / Completed Contract.\nPayment due upon receipt.\nPayment methods accepted: Check, ACH Wire, or Card.\nAll work guaranteed with 12-month structural warranty.';
</script>

<InvoiceBuilder
  customTitle="Contractor Work Order & Receipt Generator"
  customSubtitle="Free, instant A4 contractor receipt and invoice maker. Itemize labor, parts, materials, and licenses. 100% in-browser, no accounts or watermarks."
  badgeText="Contractor & Trade Receipt Template"
  canonicalUrl="https://invoice.minitoolbox.dev/templates/contractor-receipt/"
  professionTag="contractor"
  {initialItems}
  {initialFrom}
  {initialTo}
  {initialNotes}
/>
