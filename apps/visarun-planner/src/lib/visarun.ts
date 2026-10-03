export interface DestinationRule {
  id: string;
  name: string;
  flag: string;
  category: 'thailand' | 'indonesia' | 'vietnam' | 'japan';
  periodDays: number;
  reportWindowDaysBefore?: number;
  reportWindowDaysAfter?: number;
  description: string;
  officialPortalUrl?: string;
  tips: string[];
}

export const DESTINATIONS: DestinationRule[] = [
  {
    id: 'th-90day',
    name: '태국 90일 거주신고 (TM.47)',
    flag: '🇹🇭',
    category: 'thailand',
    periodDays: 90,
    reportWindowDaysBefore: 15,
    reportWindowDaysAfter: 7,
    description: 'Non-Immigrant 비자로 90일 이상 연속 체류 시 필수 의무 보고. 기한 경과 시 일 2,000바트 이상의 벌금 부과.',
    officialPortalUrl: 'https://tm47.immigration.go.th/',
    tips: [
      '온라인 신고는 마감 15일 전부터 7일 전까지만 열립니다.',
      '기한 7일 전 이내로 진입하면 온라인 접수가 차단되어 이민국 청사로 직접 방문해야 합니다.',
      '새로 입국한 날이 Day 1이 되며, 출국 후 재입국 시 90일 카운트는 1일부터 리셋됩니다.'
    ]
  },
  {
    id: 'th-tourist-60',
    name: '태국 무비자 관광 (60일)',
    flag: '🇹🇭',
    category: 'thailand',
    periodDays: 60,
    description: '2024년 7월부터 한국 등 93개국 대상 무비자 60일 체류 허용. 이민국에서 1회 30일 연장 가능.',
    tips: [
      '현지 이민국 방문 시 1,900바트에 30일 추가 연장 가능 (최대 90일).',
      '육로 비자런(Land border run)은 연간 2회로 제한될 수 있으므로 항공 비자런 권장.'
    ]
  },
  {
    id: 'id-voa-30',
    name: '인도네시아/발리 도착비자 (VoA 30일)',
    flag: '🇮🇩',
    category: 'indonesia',
    periodDays: 30,
    description: '발리/자카르타 도착비자(e-VoA) 기본 30일. 온라인 또는 공항 이민국에서 1회 30일 연장 가능.',
    officialPortalUrl: 'https://molina.imigrasi.go.id/',
    tips: [
      'e-VoA(B213)로 입국 시 온라인으로 간편하게 30일 추가 연장(총 60일) 가능.',
      '오버스테이 벌금은 1일당 1,000,000 루피아(약 8만 5천원)로 매우 무거우니 엄수 필수.'
    ]
  },
  {
    id: 'vn-visa-45',
    name: '베트남 무비자 (45일)',
    flag: '🇻🇳',
    category: 'vietnam',
    periodDays: 45,
    description: '한국 여권 소지자 45일 무비자 체류 허용. 90일 e-Visa는 입국 전 사전 신청 필요.',
    tips: [
      '무비자 45일 만료 전 출국 후 주변국(태국, 캄보디아, 라오스) 경유 후 당일 재입국 가능.',
      '오버스테이 시 출국 공항에서 벌금 납부 및 블랙리스트 등재 위험이 있습니다.'
    ]
  },
  {
    id: 'jp-tourist-90',
    name: '일본 무비자 관광 (90일)',
    flag: '🇯🇵',
    category: 'japan',
    periodDays: 90,
    description: '한국 여권 소지자 최대 90일 무비자 단기체재.',
    tips: [
      '원칙상 연장 불가. 만료일 전 출국 필수.',
      '1년 내 180일 이상 무비자로 반복 체류 시 입국 심사관 인터뷰 및 거부 가능성 주의.'
    ]
  }
];

export interface CalculationResult {
  entryDate: string;
  deadlineDate: string;
  daysRemaining: number;
  isOverdue: boolean;
  onlineWindowStart?: string;
  onlineWindowEnd?: string;
  status: 'safe' | 'warning' | 'urgent' | 'overdue';
}

export function calculateStay(entryDateStr: string, rule: DestinationRule): CalculationResult {
  const entry = new Date(entryDateStr);
  entry.setHours(0, 0, 0, 0);

  // Day 1 is entry date -> + (periodDays - 1)
  const deadline = new Date(entry);
  deadline.setDate(deadline.getDate() + (rule.periodDays - 1));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = deadline.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0;

  let onlineWindowStart: string | undefined;
  let onlineWindowEnd: string | undefined;

  if (rule.reportWindowDaysBefore !== undefined) {
    const start = new Date(deadline);
    start.setDate(start.getDate() - rule.reportWindowDaysBefore);
    onlineWindowStart = start.toISOString().split('T')[0];
  }

  if (rule.reportWindowDaysAfter !== undefined) {
    const end = new Date(deadline);
    end.setDate(end.getDate() + rule.reportWindowDaysAfter);
    onlineWindowEnd = end.toISOString().split('T')[0];
  }

  let status: 'safe' | 'warning' | 'urgent' | 'overdue' = 'safe';
  if (isOverdue) status = 'overdue';
  else if (daysRemaining <= 7) status = 'urgent';
  else if (daysRemaining <= 15) status = 'warning';

  return {
    entryDate: entryDateStr,
    deadlineDate: deadline.toISOString().split('T')[0],
    daysRemaining,
    isOverdue,
    onlineWindowStart,
    onlineWindowEnd,
    status
  };
}

export function generateIcsCalendar(
  title: string,
  description: string,
  startDateStr: string,
  endDateStr: string
): string {
  const formatIcsDate = (dateStr: string) => dateStr.replace(/-/g, '') + 'T090000Z';
  const start = formatIcsDate(startDateStr);
  const end = formatIcsDate(endDateStr);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ZeroEffort//VisaRun Tracker//KO',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:visarun-${Date.now()}@zeroeffort.app`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:🔔 ${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'ACTION:DISPLAY',
    'DESCRIPTION:7일 전 비자 리포트/비자런 알림',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:1일 전 최종 비자 리포트 알림',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
