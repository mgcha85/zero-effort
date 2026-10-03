export interface WebAppMetadata {
  name: string;
  url: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  ratingValue?: number;
  ratingCount?: number;
  price?: string;
  priceCurrency?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

/**
 * Generate Schema.org WebApplication JSON-LD
 */
export function buildWebAppJsonLd(meta: WebAppMetadata): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.name,
    url: meta.url,
    description: meta.description,
    applicationCategory: meta.applicationCategory,
    operatingSystem: meta.operatingSystem || 'All',
    offers: {
      '@type': 'Offer',
      price: meta.price || '0',
      priceCurrency: meta.priceCurrency || 'USD'
    },
    aggregateRating: meta.ratingValue
      ? {
          '@type': 'AggregateRating',
          ratingValue: meta.ratingValue,
          ratingCount: meta.ratingCount || 100
        }
      : undefined
  };

  return JSON.stringify(data);
}

/**
 * Generate Schema.org FAQPage JSON-LD for SERP accordion snippet
 */
export function buildFaqJsonLd(faqs: FAQItem[]): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return JSON.stringify(data);
}

/**
 * Generate Schema.org HowTo JSON-LD
 */
export function buildHowToJsonLd(name: string, description: string, steps: HowToStep[]): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: step.name,
      text: step.text,
      url: step.url
    }))
  };

  return JSON.stringify(data);
}

/**
 * Hreflang alternate URL builder
 */
export function buildHreflangLinks(baseUrl: string, path: string, langs: string[] = ['ko', 'vi', 'en']) {
  return langs.map((lang) => ({
    rel: 'alternate',
    hreflang: lang,
    href: `${baseUrl}/${lang}${path.startsWith('/') ? path : '/' + path}`
  }));
}
