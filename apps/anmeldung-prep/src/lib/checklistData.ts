import type { City, ResidenceType, CivilStatus, ChecklistItem } from './types';

export function generateAnmeldungChecklist(
  city: City,
  residence: ResidenceType,
  status: CivilStatus,
  lang: 'en' | 'de' | 'ko'
): ChecklistItem[] {
  const items: ChecklistItem[] = [];

  // 1. Passport / National ID (Always required)
  items.push({
    id: 'doc_id',
    title: lang === 'ko' ? '여권 또는 신분증 원본' : lang === 'de' ? 'Reisepass oder Personalausweis im Original' : 'Original Passport or National ID Card',
    germanTerm: 'Reisepass / Personalausweis',
    required: true,
    category: 'identity',
    description: lang === 'ko'
      ? '등록하는 모든 가족 구성원의 유효한 여권 원본을 지참해야 합니다.'
      : lang === 'de'
      ? 'Gültiges Ausweisdokument für alle anzumeldenden Personen im Original.'
      : 'Valid original passport for every family member being registered.',
    criticalTips: lang === 'ko'
      ? '사본은 거부될 수 있으므로 반드시 원본을 지참하세요. 비자(Aufenthaltstitel)가 있다면 함께 지참.'
      : lang === 'de'
      ? 'Kopien werden meist abgelehnt. Wenn vorhanden, auch den Aufenthaltstitel mitbringen.'
      : 'Copies are usually rejected. Bring original physical passports and visa/permit if already issued.'
  });

  // 2. Landlord Confirmation (Wohnungsgeberbestätigung - Strict Law requirement § 19 BMG)
  items.push({
    id: 'doc_landlord',
    title: lang === 'ko' ? '집주인 입주확인서 (가장 중요한 필수 서류)' : lang === 'de' ? 'Wohnungsgeberbestätigung gem. § 19 BMG' : 'Landlord Confirmation Form (Most Crucial)',
    germanTerm: 'Wohnungsgeberbestätigung nach § 19 BMG',
    required: true,
    category: 'housing',
    description: lang === 'ko'
      ? '임대차계약서(Mietvertrag)만으로는 접수 불가능하며, 집주인이나 임대인이 직접 서명한 법정 서식입니다.'
      : lang === 'de'
      ? 'Der Mietvertrag allein reicht nicht aus! Gesetzlich vorgeschriebene Bescheinigung des Vermieters.'
      : 'Rental contract alone is NOT accepted. Must be the signed official statutory form from your landlord or main tenant.',
    criticalTips: lang === 'ko'
      ? '필수 6대 기재사항: 1) 집주인 이름/주소, 2) 실제 입주일(Einzugsdatum), 3) 아파트 상세 주소(층/호수), 4) 입주자 성명, 5) 소유자 또는 전대인 여부, 6) 친필 서명'
      : lang === 'de'
      ? 'Muss enthalten: Name/Anschrift des Wohnungsgebers, Einzugsdatum, genaue Anschrift, Namen aller Mieter, Unterschrift.'
      : 'Mandatory items: Landlord name/address, Move-in date, precise apartment address (floor/door), all tenant names, signature.'
  });

  // 3. Official Registration Form (Anmeldeformular)
  items.push({
    id: 'doc_form',
    title: lang === 'ko' ? '전입신고 신청서 (도시별 관공서 서식)' : lang === 'de' ? 'Anmeldeformular der Meldebehörde' : 'Official Registration Application Form',
    germanTerm: 'Anmeldung bei der Meldebehörde (Anmeldeformular)',
    required: true,
    category: 'appointment',
    description: lang === 'ko'
      ? '사전에 작성해가면 대기 및 처리 시간이 5분 이내로 대폭 단축됩니다.'
      : lang === 'de'
      ? 'Vorab ausgefüllt mitbringen, um den Termin deutlich zu verkürzen.'
      : 'Pre-filled form significantly speeds up your appointment to under 5 minutes.',
    criticalTips: lang === 'ko'
      ? '종교세(Kirchensteuer) 문항: 종교가 없거나 원치 않을 경우 반드시 "- " 또는 "keine" / "rk(가톨릭)"/"ev(개신교)" 여부를 신중히 체크하세요 (급여의 8~9% 공제).'
      : lang === 'de'
      ? 'Achten Sie auf das Feld "Religionsgemeinschaft" (Kirchensteuerpflicht).'
      : 'Pay attention to the religion field: leaving it blank or declaring Protestant/Catholic triggers 8-9% church tax on income.'
  });

  // 4. Sublet Permission (if WG or subletting)
  if (residence === 'wg_sublet') {
    items.push({
      id: 'doc_sublet',
      title: lang === 'ko' ? '원집주인 전대 동의서 (하우스마이스터/건물주 승인)' : lang === 'de' ? 'Untervermietungserlaubnis des Eigentümers' : 'Landlord Subletting Permission',
      germanTerm: 'Erlaubnis zur Untervermietung',
      required: true,
      category: 'housing',
      description: lang === 'ko'
        ? 'WG 또는 쯔비셴/전대(Untermiete) 계약인 경우, 메인 임차인의 서명 외에 원 건물주의 전대 허가 확인이 필요할 수 있습니다.'
        : lang === 'de'
        ? 'Bei Untermiete verlangen manche Bürgerämter die Zustimmung des Haupteigentümers.'
        : 'If subletting from a main tenant, some Bürgeramt offices verify landlord consent for the sublease.',
      criticalTips: lang === 'ko'
        ? 'Wohnungsgeberbestätigung 상에 Hauptmieter가 서명할 경우 "im Auftrag des Eigentümers" 확인을 받아두면 완벽합니다.'
        : lang === 'de'
        ? 'Hauptmieter muss im Auftrag des Eigentümers handeln.'
        : 'Ensure the main tenant has written authority to issue the confirmation.'
    });
  }

  // 5. Marriage / Family Certificate
  if (status === 'married') {
    items.push({
      id: 'doc_marriage',
      title: lang === 'ko' ? '혼인관계증명서 (아포스티유 및 공증 번역본)' : lang === 'de' ? 'Heiratsurkunde mit Apostille & beglaubigter Übersetzung' : 'Marriage Certificate (Apostilled & Certified Translation)',
      germanTerm: 'Heiratsurkunde / Familienbuch',
      required: true,
      category: 'family',
      description: lang === 'ko'
        ? '배우자와 함께 등록하거나 세금 등급(Steuerklasse 3/5 or 4/4) 혜택을 받기 위해 필수 제출.'
        : lang === 'de'
        ? 'Erforderlich für gemeinsame Anmeldung und steuerliche Einstufung (Steuerklasse).'
        : 'Required to register as a married couple and obtain German tax bracket (Steuerklasse) benefits.',
      criticalTips: lang === 'ko'
        ? '한국/외국 발행 증명서는 반드시 영문/독문 공증 번역(Beglaubigte Übersetzung)과 아포스티유 원본을 첨부해야 인정됩니다.'
        : lang === 'de'
        ? 'Ausländische Urkunden müssen durch beeidigte Übersetzer übersetzt sein.'
        : 'Foreign documents must have apostille stamp and certified sworn German translation.'
    });
  }

  // 6. University Enrollment Certificate (if student)
  if (status === 'student') {
    items.push({
      id: 'doc_imma',
      title: lang === 'ko' ? '대학 입학허가서 또는 재학증명서' : lang === 'de' ? 'Immatrikulationsbescheinigung oder Zulassungsbescheid' : 'Enrollment Certificate (Immatrikulationsbescheinigung)',
      germanTerm: 'Immatrikulationsbescheinigung',
      required: false,
      category: 'identity',
      description: lang === 'ko'
        ? '학생 신분 확인 및 방송수신료(GEZ/Rundfunkbeitrag) 감면 또는 학생 혜택 등록에 활용됩니다.'
        : lang === 'de'
        ? 'Nützlich für Studentenstatus und eventuelle Befreiungen (z.B. BAföG/Rundfunkbeitrag).'
        : 'Helpful for student resident perks and public broadcasting fee (GEZ/Rundfunkbeitrag) exemptions.',
      criticalTips: lang === 'ko'
        ? '학생 기숙사(Studentenwerk) 거주 시 기숙사 사무실에서 발급한 Wohnungsgeberbestätigung을 반드시 지참하세요.'
        : lang === 'de'
        ? 'Wohnungsgeberbestätigung vom Studierendenwerk einholen.'
        : 'Student dorms (Studentenwerk) have a specialized office to stamp your Wohnungsgeberbestätigung.'
    });
  }

  // 7. Appointment Confirmation
  items.push({
    id: 'doc_termin',
    title: lang === 'ko' ? '관공서 예약 확인증 (Terminbestätigung)' : lang === 'de' ? 'Terminbestätigung (Terminnummer)' : 'Appointment Confirmation Ticket',
    germanTerm: 'Terminbestätigung / Wartenummer',
    required: true,
    category: 'appointment',
    description: lang === 'ko'
      ? '베를린, 뮌헨 등 대도시는 사전 예약(Termin) 없이는 방문 접수가 불가능합니다.'
      : lang === 'de'
      ? 'In Großstädten ist ein vorheriger Termin zwingend erforderlich.'
      : 'In Berlin, Munich, etc., appointments are mandatory. Print or keep email with barcode on phone.',
    criticalTips: lang === 'ko'
      ? '예약 팁: 매일 평일 아침 8:00~8:30 사이, 또는 취소표가 풀리는 오전 시간에 새로고침하면 당일/익일 빠른 예약이 잡힙니다.'
      : lang === 'de'
      ? 'Tipp: Morgens zwischen 8:00 und 8:30 Uhr werden oft stornierte Termine freigeschaltet.'
      : 'Pro-tip: Check appointment portals between 8:00 AM and 8:30 AM on weekdays for canceled slots.'
  });

  return items;
}
