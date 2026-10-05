import { writable } from 'svelte/store';

export type Lang = 'en' | 'vi' | 'ko';

export const currentLang = writable<Lang>('en');
