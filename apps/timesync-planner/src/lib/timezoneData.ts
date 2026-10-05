export interface CityInfo {
  id: string;
  name: { [lang: string]: string };
  country: string;
  flag: string;
  timezone: string;
}

export const POPULAR_CITIES: CityInfo[] = [
  { id: 'paris', name: { en: 'Paris', fr: 'Paris', de: 'Paris', es: 'París', ko: '파리' }, country: 'France', flag: '🇫🇷', timezone: 'Europe/Paris' },
  { id: 'new_york', name: { en: 'New York', fr: 'New York', de: 'New York', es: 'Nueva York', ko: '뉴욕' }, country: 'United States', flag: '🇺🇸', timezone: 'America/New_York' },
  { id: 'san_francisco', name: { en: 'San Francisco', fr: 'San Francisco', de: 'San Francisco', es: 'San Francisco', ko: '샌프란시스코' }, country: 'United States', flag: '🇺🇸', timezone: 'America/Los_Angeles' },
  { id: 'london', name: { en: 'London', fr: 'Londres', de: 'London', es: 'Londres', ko: '런던' }, country: 'United Kingdom', flag: '🇬🇧', timezone: 'Europe/London' },
  { id: 'berlin', name: { en: 'Berlin', fr: 'Berlin', de: 'Berlin', es: 'Berlín', ko: '베를린' }, country: 'Germany', flag: '🇩🇪', timezone: 'Europe/Berlin' },
  { id: 'seoul', name: { en: 'Seoul', fr: 'Séoul', de: 'Seoul', es: 'Seúl', ko: '서울' }, country: 'South Korea', flag: '🇰🇷', timezone: 'Asia/Seoul' },
  { id: 'tokyo', name: { en: 'Tokyo', fr: 'Tokyo', de: 'Tokio', es: 'Tokio', ko: '도쿄' }, country: 'Japan', flag: '🇯🇵', timezone: 'Asia/Tokyo' },
  { id: 'singapore', name: { en: 'Singapore', fr: 'Singapour', de: 'Singapur', es: 'Singapur', ko: '싱가포르' }, country: 'Singapore', flag: '🇸🇬', timezone: 'Asia/Singapore' },
  { id: 'dubai', name: { en: 'Dubai', fr: 'Dubaï', de: 'Dubai', es: 'Dubái', ko: '두바이' }, country: 'UAE', flag: '🇦🇪', timezone: 'Asia/Dubai' },
  { id: 'sydney', name: { en: 'Sydney', fr: 'Sydney', de: 'Sydney', es: 'Sídney', ko: '시드니' }, country: 'Australia', flag: '🇦🇺', timezone: 'Australia/Sydney' },
  { id: 'bangkok', name: { en: 'Bangkok', fr: 'Bangkok', de: 'Bangkok', es: 'Bangkok', ko: '방콕' }, country: 'Thailand', flag: '🇹🇭', timezone: 'Asia/Bangkok' }
];

export function getLocalHourInTz(baseDate: Date, targetTimezone: string): { hour: number; formatted: string; dayDiff: number } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetTimezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  
  const parts = formatter.formatToParts(baseDate);
  const hourPart = parts.find(p => p.type === 'hour');
  const dayPart = parts.find(p => p.type === 'day');
  
  const hour = hourPart ? parseInt(hourPart.value, 10) % 24 : 0;
  const day = dayPart ? parseInt(dayPart.value, 10) : baseDate.getUTCDate();
  
  // Calculate relative day diff compared to baseDate UTC day
  const dayDiff = day - baseDate.getUTCDate();
  const formatted = `${String(hour).padStart(2, '0')}:00`;
  
  return { hour, formatted, dayDiff };
}

export type SlotCategory = 'work' | 'flex' | 'sleep';

export function getSlotCategory(hour: number): SlotCategory {
  if (hour >= 9 && hour <= 18) return 'work';
  if ((hour >= 7 && hour < 9) || (hour > 18 && hour <= 21)) return 'flex';
  return 'sleep';
}
