export interface Era {
  name: string;
  kanji: string;
  startYear: number;
  startMonth: number;
  startDay: number;
  endYear?: number;
}

export const ERAS: Era[] = [
  { name: 'Reiwa', kanji: '令和', startYear: 2019, startMonth: 5, startDay: 1 },
  { name: 'Heisei', kanji: '平成', startYear: 1989, startMonth: 1, startDay: 8, endYear: 2019 },
  { name: 'Showa', kanji: '昭和', startYear: 1926, startMonth: 12, startDay: 25, endYear: 1989 },
  { name: 'Taisho', kanji: '大正', startYear: 1912, startMonth: 7, startDay: 30, endYear: 1926 }
];

export function toWareki(year: number, month: number = 1, day: number = 1): { era: string; eraYear: number; label: string } {
  for (const era of ERAS) {
    if (year > era.startYear || (year === era.startYear && (month > era.startMonth || (month === era.startMonth && day >= era.startDay)))) {
      const eraYear = year - era.startYear + 1;
      const yearLabel = eraYear === 1 ? '元年' : `${eraYear}年`;
      return {
        era: era.kanji,
        eraYear,
        label: `${era.kanji}${yearLabel}`
      };
    }
  }
  return { era: '西暦', eraYear: year, label: `${year}年` };
}

export function fromWareki(eraKanji: string, eraYear: number): number | null {
  const era = ERAS.find(e => e.kanji === eraKanji);
  if (!era) return null;
  return era.startYear + eraYear - 1;
}

export interface EducationStage {
  year: number;
  month: number;
  contentJa: string;
  contentKo: string;
  type: 'admission' | 'graduation';
}

export function calculateEducationHistory(birthYear: number, birthMonth: number, birthDay: number): EducationStage[] {
  // Japanese school year: April 2 to April 1 of next year
  // Born between Jan 1 and Apr 1 -> starts elementary school at 6 in the year they turn 6
  // Born between Apr 2 and Dec 31 -> starts elementary school at 6 in the year they turn 7
  const isEarlyBorn = (birthMonth < 4) || (birthMonth === 4 && birthDay === 1);
  const elementaryStartYear = isEarlyBorn ? birthYear + 6 : birthYear + 7;

  return [
    {
      year: elementaryStartYear,
      month: 4,
      contentJa: '小学校 入学',
      contentKo: '초등학교 입학',
      type: 'admission'
    },
    {
      year: elementaryStartYear + 6,
      month: 3,
      contentJa: '小学校 卒業',
      contentKo: '초등학교 졸업',
      type: 'graduation'
    },
    {
      year: elementaryStartYear + 6,
      month: 4,
      contentJa: '中学校 入学',
      contentKo: '중학교 입학',
      type: 'admission'
    },
    {
      year: elementaryStartYear + 9,
      month: 3,
      contentJa: '中学校 卒業',
      contentKo: '중학교 졸업',
      type: 'graduation'
    },
    {
      year: elementaryStartYear + 9,
      month: 4,
      contentJa: '高等学校 入学',
      contentKo: '고등학교 입학',
      type: 'admission'
    },
    {
      year: elementaryStartYear + 12,
      month: 3,
      contentJa: '高等学校 卒業',
      contentKo: '고등학교 졸업',
      type: 'graduation'
    },
    {
      year: elementaryStartYear + 12,
      month: 4,
      contentJa: '大学 入学',
      contentKo: '대학교 입학',
      type: 'admission'
    },
    {
      year: elementaryStartYear + 16,
      month: 3,
      contentJa: '大学 卒業',
      contentKo: '대학교 졸업',
      type: 'graduation'
    }
  ];
}
