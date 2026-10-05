import { writable } from 'svelte/store';

export type Lang = 'en' | 'vi' | 'ko' | 'fr' | 'de' | 'es' | 'ja';

export const currentLang = writable<Lang>('en');
