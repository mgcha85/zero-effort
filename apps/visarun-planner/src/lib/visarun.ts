export interface DestinationRule {
  id: string;
  name: string;
  nameEn: string;
  nameTh: string;
  flag: string;
  category: 'thailand' | 'indonesia' | 'vietnam' | 'japan';
  periodDays: number;
  reportWindowDaysBefore?: number;
  reportWindowDaysAfter?: number;
  description: string;
  descriptionEn: string;
  descriptionTh: string;
  officialPortalUrl?: string;
  tips: string[];
  tipsEn: string[];
  tipsTh: string[];
}

export const DESTINATIONS: DestinationRule[] = [
  {
    id: 'th-90day',
    name: '태국 90일 거주신고 (TM.47)',
    nameEn: 'Thailand 90-Day Report (TM.47)',
    nameTh: 'รายงานตัว 90 วัน (ตม.47) ประเทศไทย',
    flag: '🇹🇭',
    category: 'thailand',
    periodDays: 90,
    reportWindowDaysBefore: 15,
    reportWindowDaysAfter: 7,
    description: 'Non-Immigrant 비자로 90일 이상 연속 체류 시 필수 의무 보고. 기한 경과 시 일 2,000바트 이상의 벌금 부과.',
    descriptionEn: 'Mandatory report for stays exceeding 90 consecutive days on Non-Immigrant visas. Penalty: 2,000 THB fine.',
    descriptionTh: 'การรายงานตัวกรณีอยู่เกิน 90 วัน สำหรับผู้ถือวีซ่าประเภทคนอยู่ชั่วคราว หากเกินกำหนดปรับ 2,000 บาท',
    officialPortalUrl: 'https://tm47.immigration.go.th/',
    tips: [
      '온라인 신고는 마감 15일 전부터 7일 전까지만 열립니다.',
      '기한 7일 전 이내로 진입하면 온라인 접수가 차단되어 이민국 청사로 직접 방문해야 합니다.',
      '새로 입국한 날이 Day 1이 되며, 출국 후 재입국 시 90일 카운트는 1일부터 리셋됩니다.'
    ],
    tipsEn: [
      'Online filing window opens 15 days before and closes 7 days before your deadline.',
      'If within 7 days of deadline, online filing is locked; you must visit immigration in person.',
      'Arrival date counts as Day 1. Leaving Thailand and re-entering resets the 90-day counter.'
    ],
    tipsTh: [
      'เปิดรับคำขอยื่นออนไลน์ล่วงหน้า 15 วัน ถึง 7 วันก่อนครบกำหนด',
      'หากเหลือเวลาไม่ถึง 7 วัน ระบบออนไลน์จะปิด ต้องเดินทางไปรายงานตัวที่ ตม. ด้วยตนเอง',
      'วันเดินทางถึงนับเป็นวันที่ 1 หากเดินทางออกนอกประเทศแล้วกลับเข้ามาจะเริ่มนับใหม่'
    ]
  },
  {
    id: 'th-tourist-60',
    name: '태국 무비자 관광 (60일)',
    nameEn: 'Thailand Visa Exemption (60 Days)',
    nameTh: 'ยกเว้นการตรวจลงตราท่องเที่ยว (60 วัน)',
    flag: '🇹🇭',
    category: 'thailand',
    periodDays: 60,
    description: '2024년 7월부터 한국 등 93개국 대상 무비자 60일 체류 허용. 이민국에서 1회 30일 연장 가능.',
    descriptionEn: '60 days visa-free stay for 93 eligible passport holders. Extendable once for 30 days at local immigration.',
    descriptionTh: 'นักท่องเที่ยวจาก 93 ประเทศ พำนักได้สูงสุด 60 วัน ขยายเวลาพำนักได้อีก 30 วัน',
    tips: [
      '현지 이민국 방문 시 1,900바트에 30일 추가 연장 가능 (최대 90일).',
      '육로 비자런(Land border run)은 연간 2회로 제한될 수 있으므로 항공 비자런 권장.'
    ],
    tipsEn: [
      'Can be extended for 30 additional days (total 90 days) for 1,900 THB at local immigration offices.',
      'Land border runs may be limited to 2 times per calendar year. Flight visa runs are recommended.'
    ],
    tipsTh: [
      'สามารถต่ออายุพำนักได้อีก 30 วัน ที่สำนักงานตรวจคนเข้าเมือง ค่าธรรมเนียม 1,900 บาท',
      'การเดินทางเข้าออกทางด่านทางบกอาจจำกัดไม่เกิน 2 ครั้งต่อปีปฏิทิน'
    ]
  },
  {
    id: 'id-voa-30',
    name: '인도네시아/발리 도착비자 (VoA 30일)',
    nameEn: 'Indonesia / Bali Visa on Arrival (VoA 30 Days)',
    nameTh: 'อินโดนีเซีย / บาหลี Visa on Arrival (30 วัน)',
    flag: '🇮🇩',
    category: 'indonesia',
    periodDays: 30,
    description: '발리/자카르타 도착비자(e-VoA) 기본 30일. 온라인 또는 공항 이민국에서 1회 30일 연장 가능.',
    descriptionEn: '30 days standard stay in Bali & Indonesia. Extendable once online (e-VoA) for an additional 30 days (total 60 days).',
    descriptionTh: 'วีซ่าหน้าด่านบาหลี/จาการ์ตา 30 วัน ขยายเวลาออนไลน์ได้อีก 30 วัน (รวม 60 วัน)',
    officialPortalUrl: 'https://molina.imigrasi.go.id/',
    tips: [
      'e-VoA(B213)로 입국 시 온라인으로 간편하게 30일 추가 연장(총 60일) 가능.',
      '오버스테이 벌금은 1일당 1,000,000 루피아(약 8만 5천원)로 매우 무거우니 엄수 필수.'
    ],
    tipsEn: [
      'If entering with e-VoA (B213), apply for a 30-day extension online without visiting immigration.',
      'Overstay fine is 1,000,000 IDR (approx. $65 USD) per day. Strict adherence is vital.'
    ],
    tipsTh: [
      'หากเดินทางเข้าด้วย e-VoA สามารถกดขยายเวลาพำนักต่อได้ทางออนไลน์',
      'ค่าปรับกรณีอยู่เกินกำหนดสูงถึง 1,000,000 รูเปียห์ต่อวัน'
    ]
  },
  {
    id: 'vn-visa-45',
    name: '베트남 무비자 (45일)',
    nameEn: 'Vietnam Visa Exemption (45 Days)',
    nameTh: 'เวียดนาม ฟรีวีซ่า (45 วัน)',
    flag: '🇻🇳',
    category: 'vietnam',
    periodDays: 45,
    description: '적격 여권 소지자 45일 무비자 체류 허용. 90일 e-Visa는 입국 전 사전 신청 필요.',
    descriptionEn: '45-day unilateral visa exemption for eligible passport holders. 90-day e-Visa requires online application before arrival.',
    descriptionTh: 'ฟรีวีซ่าท่องเที่ยว 45 วัน สำหรับสัญชาติที่ได้รับยกเว้น หากต้องการ 90 วันต้องยื่น e-Visa ล่วงหน้า',
    tips: [
      '무비자 45일 만료 전 출국 후 주변국(태국, 캄보디아, 라오스) 경유 후 당일 재입국 가능.',
      '오버스테이 시 출국 공항에서 벌금 납부 및 블랙리스트 등재 위험이 있습니다.'
    ],
    tipsEn: [
      'Same-day border runs via Thailand, Cambodia, or Laos are possible before the 45-day deadline.',
      'Overstaying incurs steep airport fines and risk of temporary entry bans/blacklisting.'
    ],
    tipsTh: [
      'สามารถเดินทางออกไปยังประเทศเพื่อนบ้านแล้วกลับเข้ามาใหม่ได้ก่อนครบ 45 วัน',
      'การอยู่เกินกำหนดมีโทษปรับสูงที่สนามบินและอาจถูกขึ้นบัญชีดำห้ามเข้าประเทศ'
    ]
  },
  {
    id: 'jp-tourist-90',
    name: '일본 무비자 관광 (90일)',
    nameEn: 'Japan Visa Exemption (90 Days)',
    nameTh: 'ญี่ปุ่น ฟรีวีซ่าท่องเที่ยว (90 วัน)',
    flag: '🇯🇵',
    category: 'japan',
    periodDays: 90,
    description: '적격 여권 소지자 최대 90일 무비자 단기체재.',
    descriptionEn: 'Up to 90 days short-term stay for eligible visa-exempt passport holders.',
    descriptionTh: 'พำนักระยะสั้นสูงสุด 90 วัน สำหรับสัญชาติที่ได้รับการยกเว้น',
    tips: [
      '원칙상 연장 불가. 만료일 전 출국 필수.',
      '1년 내 180일 이상 무비자로 반복 체류 시 입국 심사관 인터뷰 및 거부 가능성 주의.'
    ],
    tipsEn: [
      'Generally not extendable. Departure before expiry date is strictly required.',
      'Spending over 180 days within a 365-day period under visa-free status may trigger immigration scrutiny.'
    ],
    tipsTh: [
      'ไม่สามารถขยายเวลาพำนักได้ ต้องเดินทางออกก่อนวันครบกำหนด',
      'การพำนักรวมเกิน 180 วันในรอบ 1 ปี อาจถูกตรวจสอบอย่างเข้มงวดที่ด่านตรวจคนเข้าเมือง'
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
