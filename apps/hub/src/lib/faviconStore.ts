import { writable, derived } from 'svelte/store';

export interface FaviconConfig {
  svg: string;
  png48: string;
  png: string;
}

export const DEFAULT_FAVICON: FaviconConfig = {
  svg: '/favicon.svg',
  png48: '/favicon-48x48.png',
  png: '/favicon.png'
};

export const FAVICON_MAP: Record<string, FaviconConfig> = {
  main: DEFAULT_FAVICON,
  all: DEFAULT_FAVICON,
  privacy: {
    svg: '/favicons/privacy.svg',
    png48: '/favicons/privacy-48x48.png',
    png: '/favicons/privacy.png'
  },
  travel: {
    svg: '/favicons/travel.svg',
    png48: '/favicons/travel-48x48.png',
    png: '/favicons/travel.png'
  },
  career: {
    svg: '/favicons/career.svg',
    png48: '/favicons/career-48x48.png',
    png: '/favicons/career.png'
  },
  utility: {
    svg: '/favicons/utility.svg',
    png48: '/favicons/utility-48x48.png',
    png: '/favicons/utility.png'
  },
  entertainment: {
    svg: '/favicons/entertainment.svg',
    png48: '/favicons/entertainment-48x48.png',
    png: '/favicons/entertainment.png'
  },
  terms: {
    svg: '/favicons/terms.svg',
    png48: '/favicons/terms-48x48.png',
    png: '/favicons/terms.png'
  },
  refund: {
    svg: '/favicons/refund.svg',
    png48: '/favicons/refund-48x48.png',
    png: '/favicons/refund.png'
  }
};

export const activeFaviconKey = writable<string>('main');

export const currentFavicon = derived(activeFaviconKey, ($key) => {
  return FAVICON_MAP[$key] || DEFAULT_FAVICON;
});

if (typeof document !== 'undefined') {
  activeFaviconKey.subscribe((key) => {
    const config = FAVICON_MAP[key] || DEFAULT_FAVICON;
    const linkSvg = document.getElementById('app-favicon') as HTMLLinkElement | null;
    if (linkSvg) linkSvg.href = config.svg;
    const linkPng = document.getElementById('app-favicon-png') as HTMLLinkElement | null;
    if (linkPng) linkPng.href = config.png48;
  });
}

export function setFaviconByRoute(pathname: string, activeCategory?: string) {
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean || clean === '') {
    if (activeCategory && activeCategory !== 'all' && FAVICON_MAP[activeCategory]) {
      activeFaviconKey.set(activeCategory);
    } else {
      activeFaviconKey.set('main');
    }
    return;
  }

  if (FAVICON_MAP[clean]) {
    activeFaviconKey.set(clean);
  } else if (clean.startsWith('category/')) {
    const cat = clean.split('/')[1];
    if (FAVICON_MAP[cat]) {
      activeFaviconKey.set(cat);
      return;
    }
    activeFaviconKey.set('main');
  } else {
    activeFaviconKey.set('main');
  }
}
