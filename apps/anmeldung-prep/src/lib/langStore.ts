import { writable } from 'svelte/store';
import type { City, ResidenceType, CivilStatus } from './types';

export type Lang = 'en' | 'de' | 'ko';

export const currentLang = writable<Lang>('en');

export const translations: Record<Lang, {
  siteTitle: string;
  badge: string;
  heroTitle: string;
  heroSub: string;
  privacyBadge: string;
  selectCity: string;
  selectResidence: string;
  selectStatus: string;
  checklistTitle: string;
  checklistSub: string;
  completedBadge: string;
  requiredBadge: string;
  optionalBadge: string;
  tipsTitle: string;
  maskingToolTitle: string;
  landlordCheckTitle: string;
  landlordCheckSub: string;
  item1: string;
  item2: string;
  item3: string;
  item4: string;
  item5: string;
  item6: string;
  faqTitle: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
  cities: Record<City, string>;
  residences: Record<ResidenceType, string>;
  statuses: Record<CivilStatus, string>;
  metaTitle: string;
  metaDesc: string;
}> = {
  en: {
    siteTitle: 'Anmeldung Prep & Safe Masker',
    badge: '100% Client-Side • German Bürgeramt',
    heroTitle: 'German Anmeldung Checklist & Safe Masker',
    heroSub: 'Never miss an essential document at the German Bürgeramt. Get a personalized registration checklist for your city & housing type, and safely mask sensitive financial/ID data in your browser.',
    privacyBadge: '🔒 100% In-Browser Local Processing • No document or data ever uploaded to external servers',
    selectCity: '1. Select Your City',
    selectResidence: '2. Housing Situation',
    selectStatus: '3. Civil / Visa Status',
    checklistTitle: 'Your Tailored Document Checklist',
    checklistSub: 'Print or gather all physical original documents before your appointment',
    completedBadge: 'Completed',
    requiredBadge: 'Mandatory',
    optionalBadge: 'Conditional',
    tipsTitle: 'Crucial Official Tips & Pitfalls',
    maskingToolTitle: 'Private Document Redaction & Masking',
    landlordCheckTitle: 'Wohnungsgeberbestätigung (§19 BMG) 6-Point Audit',
    landlordCheckSub: 'Make sure your landlord confirmation includes all mandatory points below or your appointment will be rejected:',
    item1: 'Full Name & Physical Address of Landlord / Property Owner',
    item2: 'Official Move-in Date (Einzugsdatum)',
    item3: 'Exact Address of the Rented Apartment (Building, Floor, Door)',
    item4: 'Full Names of ALL Persons Moving In',
    item5: 'Declaration whether landlord is the Owner (Eigentümer) or Sublessor (Wohnungsgeber)',
    item6: 'Handwritten Original Signature of Landlord / Main Tenant',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    q1: 'Is a rental contract (Mietvertrag) enough for registration?',
    a1: 'No! Since November 2015 (§ 19 Bundesmeldegesetz), a signed Wohnungsgeberbestätigung from the landlord is strictly mandatory. Rental contracts alone are universally rejected.',
    q2: 'What is the 14-day legal deadline?',
    a2: 'German law specifies you must register within 14 days of moving in. However, due to severe appointment shortages in cities like Berlin or Munich, booking the appointment itself within 14 days or keeping your booking proof is accepted.',
    q3: 'Is my uploaded scan safe from leaks?',
    a3: '100% safe. This web application runs entirely inside your browser memory using HTML5 Canvas. Zero bytes are uploaded to the internet.',
    cities: {
      berlin: 'Berlin',
      munich: 'Munich (München)',
      hamburg: 'Hamburg',
      frankfurt: 'Frankfurt am Main',
      cologne: 'Cologne (Köln)',
      other: 'Other City in Germany'
    },
    residences: {
      wg_sublet: 'WG / Shared Flat / Sublet',
      own_apartment: 'Entire Apartment (Direct Lease)',
      dormitory: 'Student Dormitory (Studentenwerk)',
      host_family: 'Host Family / Temporary Guest'
    },
    statuses: {
      employed: 'Employed / Work Visa',
      student: 'Student / Language Learner',
      single: 'Single Person',
      married: 'Married with Family'
    },
    metaTitle: 'German Anmeldung Checklist & Safe Masker (Bürgeramt)',
    metaDesc: 'Personalized German Bürgeramt registration checklist and 100% in-browser private document redactor. Zero server uploads.'
  },
  de: {
    siteTitle: 'Anmeldung Prep & Dokumenten-Schwärzung',
    badge: '100% Lokal • Bürgeramt Hilfe',
    heroTitle: 'Bürgeramt Anmeldung Checkliste & Schwärzung',
    heroSub: 'Verpassen Sie keine Unterlagen beim Bürgeramt Termin. Personalisierte Checkliste für Ihre Stadt und Wohnsituation mit sicherer lokaler Schwärzung sensibler Daten.',
    privacyBadge: '🔒 100% Lokale Browser-Verarbeitung • Keine Server-Uploads',
    selectCity: '1. Stadt auswählen',
    selectResidence: '2. Wohnsituation',
    selectStatus: '3. Familien- / Berufsstatus',
    checklistTitle: 'Ihre persönliche Dokumenten-Checkliste',
    checklistSub: 'Bringen Sie alle Unterlagen im Original zum Termin mit',
    completedBadge: 'Erledigt',
    requiredBadge: 'Erforderlich',
    optionalBadge: 'Bedarfsweise',
    tipsTitle: 'Wichtige Hinweise & Fallstricke',
    maskingToolTitle: 'Sichere Dokumenten-Schwärzung',
    landlordCheckTitle: 'Wohnungsgeberbestätigung (§ 19 BMG) 6-Punkte Prüfung',
    landlordCheckSub: 'Stellen Sie sicher, dass Ihre Vermieterbescheinigung alle 6 Pflichtpunkte enthält:',
    item1: 'Name und Anschrift des Wohnungsgebers / Eigentümers',
    item2: 'Tatsächliches Einzugsdatum',
    item3: 'Genaue Anschrift der Wohnung (Stockwerk, Wohnungsnummer)',
    item4: 'Namen aller einziehenden meldepflichtigen Personen',
    item5: 'Angabe, ob der Wohnungsgeber Eigentümer oder Hauptmieter ist',
    item6: 'Eigenhändige Unterschrift des Wohnungsgebers',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    q1: 'Reicht der Mietvertrag für die Anmeldung aus?',
    a1: 'Nein! Gemäß § 19 Bundesmeldegesetz ist die Wohnungsgeberbestätigung zwingend erforderlich. Der Mietvertrag allein wird nicht akzeptiert.',
    q2: 'Gilt die 14-Tage-Frist streng?',
    a2: 'Gesetzlich gilt eine Frist von 14 Tagen ab Einzug. Wegen Terminmangel in Großstädten reicht der Nachweis einer fristgerechten Terminbuchung aus.',
    q3: 'Werden meine Dokumente auf Server hochgeladen?',
    a3: 'Nein, zu 100% lokal. Die Schwärzung erfolgt ausschließlich in Ihrem Browser-Speicher ohne Datenübertragung.',
    cities: {
      berlin: 'Berlin',
      munich: 'München',
      hamburg: 'Hamburg',
      frankfurt: 'Frankfurt am Main',
      cologne: 'Köln',
      other: 'Andere Stadt in Deutschland'
    },
    residences: {
      wg_sublet: 'WG / Untermiete (Wohngemeinschaft)',
      own_apartment: 'Eigene Wohnung (Hauptmieter)',
      dormitory: 'Studentenwohnheim',
      host_family: 'Gastfamilie / Vorübergehend'
    },
    statuses: {
      employed: 'Berufstätig / Arbeitsvisum',
      student: 'Student / Sprachschüler',
      single: 'Alleinstehend',
      married: 'Verheiratet mit Familie'
    },
    metaTitle: 'Bürgeramt Anmeldung Checkliste & Dokumenten-Schwärzung',
    metaDesc: 'Personalisierte Checkliste für den Bürgeramt-Termin und 100% lokale Schwärzung im Browser. Keine Server-Uploads.'
  },
  ko: {
    siteTitle: '독일 안멜둥 서류 마스커',
    badge: '100% 브라우저 처리 • 서버 전송 없음',
    heroTitle: '독일 관공서(Bürgeramt) 서류 체크리스트 & 안심 마스커',
    heroSub: '독일 전입신고(Anmeldung) 예약이 서류 누락으로 반려되지 않도록 내 상황별 필수 서류 목록을 확인하고, 계약서/여권의 민감한 개인정보를 브라우저에서 안전하게 마스킹하세요.',
    privacyBadge: '🔒 100% 브라우저 내부 연산 • 외부 서버로 개인정보 및 서류 전송 0KB',
    selectCity: '1. 거주 도시 선택',
    selectResidence: '2. 거주 형태 (임대 유형)',
    selectStatus: '3. 신분 / 가족 관계',
    checklistTitle: '내 맞춤 전입신고 서류 체크리스트',
    checklistSub: '관공서(Bürgeramt) 방문 전 원본 서류를 확인하고 체크하세요',
    completedBadge: '준비 완료',
    requiredBadge: '필수 지참',
    optionalBadge: '해당 시 지참',
    tipsTitle: '관공서 통과 핵심 팁 & 주의사항',
    maskingToolTitle: '계약서/여권 개인정보 안심 마스킹 도구',
    landlordCheckTitle: '집주인 확인서(Wohnungsgeberbestätigung) 6대 필수 점검',
    landlordCheckSub: '독일 연방주민등록법(§19 BMG) 규정에 따라 아래 6가지 항목 중 하나라도 누락되면 접수가 즉시 거부됩니다:',
    item1: '집주인(Wohnungsgeber) 또는 건물 소유주의 성명 및 실제 주소',
    item2: '실제 입주 일자 (Einzugsdatum)',
    item3: '임대 아파트의 정확한 상세 주소 (동, 층수, 호수 표기)',
    item4: '함께 전입하는 모든 동거인의 전체 영문 성명',
    item5: '임대인이 실제 소유주(Eigentümer)인지 전대인(Hauptmieter)인지 구분 체크',
    item6: '집주인 또는 원 임차인의 친필 원본 서명',
    faqTitle: '자주 묻는 질문 (FAQ)',
    q1: '임대차계약서(Mietvertrag)만 가져가도 전입신고가 되나요?',
    a1: '절대 불가능합니다! 2015년 개정된 연방주민등록법(BMG §19)에 따라 집주인이 서명한 법정 서식(Wohnungsgeberbestätigung)이 반드시 있어야만 등록됩니다.',
    q2: '입주 후 14일 이내 등록 기한을 넘기면 벌금을 내나요?',
    a2: '법적으로는 14일 이내 등록해야 하지만, 베를린이나 뮌헨처럼 예약이 극도로 밀리는 대도시는 14일 이내에 예약을 신청해 둔 확인 이메일(Terminbestätigung)만 있으면 벌금이 면제됩니다.',
    q3: '업로드한 여권이나 계약서가 인터넷에 유출되지 않나요?',
    a3: '100% 안전합니다. 일반 웹사이트와 달리 서버로 전송하지 않으며 고객님의 브라우저(HTML5 Canvas) 안에서만 마스킹되고 직접 다운로드됩니다.',
    cities: {
      berlin: 'Berlin (베를린)',
      munich: 'München (뮌헨)',
      hamburg: 'Hamburg (함부르크)',
      frankfurt: 'Frankfurt am Main (프랑크푸르트)',
      cologne: 'Köln (쾰른)',
      other: '기타 독일 도시 (Other City)'
    },
    residences: {
      wg_sublet: 'WG / 쯔비셴 (셰어하우스, 서브렛)',
      own_apartment: '단독 임대 계약 (아파트 전체)',
      dormitory: '대학 기숙사 (Studentenwerk)',
      host_family: '홈스테이 / 임시 거주'
    },
    statuses: {
      employed: '직장인 / 취업비자 (Employed)',
      student: '학생 / 어학연수 (Student)',
      single: '미혼 단독 전입 (Single)',
      married: '기혼 가족 동반 (Married)'
    },
    metaTitle: '독일 안멜둥 서류 마스커 - Anmeldung Prep & Safe Redaction',
    metaDesc: '독일 관공서(Bürgeramt) 전입신고 필수 서류 맞춤 체크리스트 및 계약서/여권 민감정보 100% 브라우저 로컬 안심 마스킹 도구.'
  }
};
