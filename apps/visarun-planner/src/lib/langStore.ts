import { writable } from 'svelte/store';

export type Lang = 'en' | 'fr' | 'de' | 'es' | 'vi' | 'ja' | 'ko' | 'th';

export const currentLang = writable<Lang>('en');

export const translations: Record<Lang, {
  siteTitle: string;
  subBrand: string;
  badge: string;
  step1Title: string;
  step2Title: string;
  entryDateLabel: string;
  calcCardTitle: string;
  deadlineLabel: string;
  daysRemainingLabel: string;
  onlineWindowLabel: string;
  safeStatus: string;
  warningStatus: string;
  urgentStatus: string;
  overdueStatus: string;
  downloadIcs: string;
  portalBtn: string;
  tipsTitle: string;
  daysSuffix: string;
  daysRemainingSuffix: string;
  overdueSuffix: string;
  maxStayLabel: string;
  entryDateHint: string;
  faqTitle: string;
  faq1Q: string;
  faq1A: string;
  faq2Q: string;
  faq2A: string;
}> = {
  en: {
    siteTitle: 'Southeast Asia Visa Run Planner',
    subBrand: 'Thailand TM.47 · Bali VoA · Vietnam Border Runs & ICS Export',
    badge: '🔒 100% In-Browser · 0KB Server Upload',
    step1Title: '1. Select Destination & Rule',
    step2Title: '2. Arrival Date',
    entryDateLabel: 'Recent Arrival Date (Stamp date)',
    calcCardTitle: 'Stay Expiration & Report Deadline',
    deadlineLabel: 'Report Deadline / Expiry Date',
    daysRemainingLabel: 'Days Remaining',
    onlineWindowLabel: 'Online Filing Window (TM.47 etc)',
    safeStatus: 'Safe (Plenty of time)',
    warningStatus: 'Warning (Online filing window open)',
    urgentStatus: 'Urgent (Online window closing soon)',
    overdueStatus: 'Overdue (Overstay penalty applies)',
    downloadIcs: '📅 Download Calendar (.ics) Alerts',
    portalBtn: 'Go to Official Immigration Portal',
    tipsTitle: '💡 Essential Rules & Overstay Penalties',
    daysSuffix: 'days',
    daysRemainingSuffix: 'days left',
    overdueSuffix: 'days overdue',
    maxStayLabel: 'Maximum Permitted Stay',
    entryDateHint: 'Enter arrival date stamped in your passport. Arrival day counts as Day 1.',
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'Q. When can I file the Thailand 90-day report (TM.47)?',
    faq1A: 'A. The online portal accepts applications from 15 days up to 7 days before your deadline. If within 7 days, you must report in person at an immigration office.',
    faq2Q: 'Q. Does leaving the country reset my 90-day count?',
    faq2A: 'A. Yes. Whenever you exit and re-enter, your arrival date becomes Day 1, resetting the 90-day count.'
  },
  fr: {
    siteTitle: 'Planificateur Visa Run Asie du Sud-Est',
    subBrand: 'Thaïlande TM.47 · Bali VoA · Départs/Retours Vietnam & Export ICS',
    badge: '🔒 100% Navigateur · 0 Ko Serveur',
    step1Title: '1. Destination & Règlement',
    step2Title: '2. Date d\'arrivée',
    entryDateLabel: 'Date d\'arrivée récente (tampon passeport)',
    calcCardTitle: 'Expiration de séjour & Date limite de rapport',
    deadlineLabel: 'Date limite de rapport / Expiration',
    daysRemainingLabel: 'Jours restants',
    onlineWindowLabel: 'Période de déclaration en ligne (TM.47, etc.)',
    safeStatus: 'Sûr (Temps suffisant)',
    warningStatus: 'Attention (Guichet en ligne ouvert)',
    urgentStatus: 'Urgent (Fermeture imminente en ligne)',
    overdueStatus: 'En retard (Pénalités de dépassement)',
    downloadIcs: '📅 Télécharger les alertes calendrier (.ics)',
    portalBtn: 'Portail Officiel de l\'Immigration',
    tipsTitle: '💡 Règles essentielles & Sanctions pour dépassement',
    daysSuffix: 'jours',
    daysRemainingSuffix: 'jours restants',
    overdueSuffix: 'jours de dépassement',
    maxStayLabel: 'Durée maximale autorisée',
    entryDateHint: 'Entrez la date inscrite sur votre tampon. Le jour d\'arrivée compte comme Jour 1.',
    faqTitle: 'Foire Aux Questions (FAQ)',
    faq1Q: 'Q. Quand déclarer le rapport des 90 jours en Thaïlande (TM.47) ?',
    faq1A: 'A. Le portail en ligne accepte les dossiers entre 15 et 7 jours avant la date limite. En deçà de 7 jours, il faut se rendre en personne au bureau de l\'immigration.',
    faq2Q: 'Q. Quitter le pays réinitialise-t-il le compteur des 90 jours ?',
    faq2A: 'A. Oui. Toute sortie et réentrée remet le compteur à zéro (le jour d\'arrivée redevient le jour 1).'
  },
  de: {
    siteTitle: 'Südostasien Visa Run & 90-Tage Planer',
    subBrand: 'Thailand TM.47 · Bali VoA · Vietnam Border Runs & ICS Export',
    badge: '🔒 100% Lokal im Browser · 0 KB Server-Upload',
    step1Title: '1. Reiseziel & Aufenthaltsregel wählen',
    step2Title: '2. Einreisedatum',
    entryDateLabel: 'Neuestes Einreisedatum (Stempeldatum)',
    calcCardTitle: 'Ablauf des Aufenthalts & Meldefrist',
    deadlineLabel: 'Meldefrist / Ablaufdatum',
    daysRemainingLabel: 'Verbleibende Tage',
    onlineWindowLabel: 'Online-Meldefenster (TM.47 etc.)',
    safeStatus: 'Sicher (Ausreichend Zeit)',
    warningStatus: 'Achtung (Online-Meldefenster offen)',
    urgentStatus: 'Dringend (Online-Frist schließt bald)',
    overdueStatus: 'Überfällig (Strafgebühren fällig)',
    downloadIcs: '📅 Kalender-Benachrichtigungen (.ics) herunterladen',
    portalBtn: 'Zum offiziellen Einwanderungsportal',
    tipsTitle: '💡 Wichtige Regeln & Überziehungsstrafen',
    daysSuffix: 'Tage',
    daysRemainingSuffix: 'Tage verbleibend',
    overdueSuffix: 'Tage überfällig',
    maxStayLabel: 'Maximal zulässiger Aufenthalt',
    entryDateHint: 'Geben Sie das Datum laut Passstempel ein. Der Einreisetag zählt als Tag 1.',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    faq1Q: 'Q. Wann kann der thailändische 90-Tage-Bericht (TM.47) online eingereicht werden?',
    faq1A: 'A. Online zwischen 15 und 7 Tagen vor Ablauf. Bei weniger als 7 Tagen ist ein persönlicher Besuch beim Immigration Office nötig.',
    faq2Q: 'Q. Setzt eine Ausreise den 90-Tage-Zähler zurück?',
    faq2A: 'A. Ja. Nach einer Aus- und Wiedereinreise wird der Zähler ab dem Anreisetag komplett neu gestartet.'
  },
  es: {
    siteTitle: 'Planificador de Visa Run en Sudeste Asiático',
    subBrand: 'Tailandia TM.47 · Bali VoA · Salidas fronterizas de Vietnam y exportación ICS',
    badge: '🔒 100% En el Navegador · 0KB al Servidor',
    step1Title: '1. Selecciona destino y normativa',
    step2Title: '2. Fecha de llegada',
    entryDateLabel: 'Fecha de llegada reciente (fecha de sello)',
    calcCardTitle: 'Vencimiento de estancia y plazo límite',
    deadlineLabel: 'Plazo de reporte / Fecha de vencimiento',
    daysRemainingLabel: 'Días restantes',
    onlineWindowLabel: 'Plazo para trámite online (TM.47, etc.)',
    safeStatus: 'Seguro (Tiempo suficiente)',
    warningStatus: 'Atención (Ventana online abierta)',
    urgentStatus: 'Urgente (Cierre de trámite online inminente)',
    overdueStatus: 'Vencido (Se aplican multas por estancia ilegal)',
    downloadIcs: '📅 Descargar alertas de calendario (.ics)',
    portalBtn: 'Ir al portal oficial de inmigración',
    tipsTitle: '💡 Normas clave y penalizaciones por sobreestadía',
    daysSuffix: 'días',
    daysRemainingSuffix: 'días restantes',
    overdueSuffix: 'días de exceso',
    maxStayLabel: 'Estancia máxima permitida',
    entryDateHint: 'Introduce la fecha de entrada sellada en tu pasaporte. El día de llegada cuenta como día 1.',
    faqTitle: 'Preguntas frecuentes (FAQ)',
    faq1Q: 'Q. ¿Cuándo tramitar el reporte de 90 días en Tailandia (TM.47)?',
    faq1A: 'A. El portal online acepta solicitudes entre 15 y 7 días antes de la fecha límite. Dentro de los 7 días restantes, debe hacerse en persona.',
    faq2Q: 'Q. ¿Salir del país reinicia el contador de 90 días?',
    faq2A: 'A. Sí. Cada salida y posterior reingreso reinicia la cuenta a partir del día 1.'
  },
  vi: {
    siteTitle: 'Công cụ tính Visa Run & Báo cáo lưu trú Đông Nam Á',
    subBrand: 'Thái Lan TM.47 · Bali VoA · Visa Run Việt Nam & Tải lịch .ics',
    badge: '🔒 Xử lý 100% trên trình duyệt · Không gửi dữ liệu',
    step1Title: '1. Chọn quốc gia và quy định',
    step2Title: '2. Ngày nhập cảnh',
    entryDateLabel: 'Ngày nhập cảnh gần nhất (theo dấu mộc hộ chiếu)',
    calcCardTitle: 'Hạn chót báo cáo & Hạn lưu trú',
    deadlineLabel: 'Hạn chót báo cáo / Ngày hết hạn',
    daysRemainingLabel: 'Số ngày còn lại',
    onlineWindowLabel: 'Khung thời gian nộp online (TM.47...)',
    safeStatus: 'An toàn (Còn nhiều thời gian)',
    warningStatus: 'Lưu ý (Đang mở nộp trực tuyến)',
    urgentStatus: 'Khẩn cấp (Sắp hết hạn nộp online)',
    overdueStatus: 'Quá hạn (Bị phạt do ở quá hạn)',
    downloadIcs: '📅 Tải nhắc nhở lịch (.ics)',
    portalBtn: 'Đến cổng dịch vụ di trú chính thức',
    tipsTitle: '💡 Quy định cần nhớ & Mức phạt quá hạn',
    daysSuffix: 'ngày',
    daysRemainingSuffix: 'ngày còn lại',
    overdueSuffix: 'ngày quá hạn',
    maxStayLabel: 'Thời gian lưu trú tối đa',
    entryDateHint: 'Nhập ngày đóng dấu vào hộ chiếu. Ngày đến được tính là ngày thứ 1.',
    faqTitle: 'Câu hỏi thường gặp (FAQ)',
    faq1Q: 'Q. Khi nào có thể nộp báo cáo 90 ngày Thái Lan (TM.47) online?',
    faq1A: 'A. Nộp trực tuyến từ 15 đến 7 ngày trước hạn chót. Nếu dưới 7 ngày, bạn phải đến trực tiếp cục xuất nhập cảnh.',
    faq2Q: 'Q. Xuất cảnh có làm mới lại thời hạn 90 ngày không?',
    faq2A: 'A. Có. Mỗi khi xuất cảnh và nhập cảnh lại, ngày vào mới sẽ là ngày 1 và bộ đếm 90 ngày được reset.'
  },
  ja: {
    siteTitle: '東南アジア ビザラン＆90日レポート計算ツール',
    subBrand: 'タイTM.47 · バリVoA · ベトナム出国ラン＆ICSカレンダー出力',
    badge: '🔒 100% ブラウザ完結 · サーバー送信0KB',
    step1Title: '1. 滞在国・ビザ種別の選択',
    step2Title: '2. 入国日の入力',
    entryDateLabel: '直近の入国日（パスポート押印日）',
    calcCardTitle: '滞在期限および報告期日',
    deadlineLabel: '報告期限 / 滞在満了日',
    daysRemainingLabel: '残り日数',
    onlineWindowLabel: 'オンライン申請受付期間（TM.47等）',
    safeStatus: '安全（余裕あり）',
    warningStatus: '注意（オンライン受付中）',
    urgentStatus: '緊急（オンライン締切直前）',
    overdueStatus: '期限超過（オーバーステイ・罰則対象）',
    downloadIcs: '📅 カレンダーアラート（.ics）を保存',
    portalBtn: '公式イミグレーションポータルへ',
    tipsTitle: '💡 注意事項および超過滞在の罰則',
    daysSuffix: '日',
    daysRemainingSuffix: '日残り',
    overdueSuffix: '日超過',
    maxStayLabel: '最大滞在可能期間',
    entryDateHint: 'パスポートの入国スタンプ日付を入力してください。入国当日が1日目として計算されます。',
    faqTitle: 'よくある質問（FAQ）',
    faq1Q: 'Q. タイの90日レポート（TM.47）はいつ申請できますか？',
    faq1A: 'A. オンラインポータルでは期日の15日前から7日前まで受け付けます。7日を切ると窓口へ直接出向く必要があります。',
    faq2Q: 'Q. 国外へ出国した場合、90日カウントはどうなりますか？',
    faq2A: 'A. 一度出国して再入国すると、その日が新たにDay 1となり90日カウントは完全にリセットされます。'
  },
  ko: {
    siteTitle: '동남아 비자런 & 90일 체류신고',
    subBrand: '태국 TM.47 · 발리 VoA · 베트남 무비자 알림 & 캘린더',
    badge: '🔒 100% 로컬 계산 · 서버 전송 0KB',
    step1Title: '1. 체류 국가 및 목적 선택',
    step2Title: '2. 입국일(도착일) 입력',
    entryDateLabel: '최근 입국일 (도착 스탬프 일자)',
    calcCardTitle: '체류 기한 및 신고 마감일',
    deadlineLabel: '체류 만료 / 신고 마감일',
    daysRemainingLabel: '남은 일수',
    onlineWindowLabel: '온라인 신고 가능 기간 (TM.47 등)',
    safeStatus: '안전 (기한 여유)',
    warningStatus: '주의 (온라인 신고 개시)',
    urgentStatus: '긴급 (온라인 접수 마감 임박 / 오버스테이 주의)',
    overdueStatus: '기한 경과 (오버스테이 / 벌금 대상)',
    downloadIcs: '📅 캘린더(.ics) 알림 다운로드',
    portalBtn: '공식 온라인 신고 사이트 바로가기',
    tipsTitle: '💡 필수 실무 주의사항 및 벌금 규정',
    daysSuffix: '일',
    daysRemainingSuffix: '일 남음',
    overdueSuffix: '일 초과',
    maxStayLabel: '최대 체류 허용',
    entryDateHint: '여권의 입국 도장에 찍힌 날짜를 입력하세요. 입국 당일이 1일째로 계산됩니다.',
    faqTitle: '자주 묻는 질문 (FAQ)',
    faq1Q: 'Q. 태국 90일 리포트(TM.47)는 언제 신청해야 하나요?',
    faq1A: 'A. 공식 온라인 포털 접수는 마감일 15일 전부터 7일 전까지만 가능합니다. 7일 이내로 진입하면 온라인 접수가 막히므로 직접 이민국 청사에 가셔야 합니다.',
    faq2Q: 'Q. 다른 나라로 여행 다녀오면 90일 카운트는 어떻게 되나요?',
    faq2A: 'A. 해외로 출국했다가 다시 입국하면 입국일이 다시 Day 1이 되어 90일 카운트가 완전히 리셋됩니다.'
  },
  th: {
    siteTitle: 'เครื่องมือวางแผนวีซ่ารัน & รายงาน 90 วัน',
    subBrand: 'รายงานตัว 90 วัน (ตม.47) · วีซ่าบาหลี · บอร์เดอร์รันเวียดนาม',
    badge: '🔒 ใช้งานบนเบราว์เซอร์ 100%',
    step1Title: '1. เลือกประเทศและประเภทวีซ่า',
    step2Title: '2. วันที่เดินทางถึง',
    entryDateLabel: 'วันที่เดินทางมาถึงล่าสุด',
    calcCardTitle: 'วันครบกำหนดรายงานตัว / สิ้นสุดการพำนัก',
    deadlineLabel: 'วันครบกำหนด',
    daysRemainingLabel: 'จำนวนวันที่เหลือ',
    onlineWindowLabel: 'ช่วงเวลายื่นออนไลน์ (ตม.47)',
    safeStatus: 'ปลอดภัย (ยังมีเวลา)',
    warningStatus: 'แจ้งเตือน (เปิดยื่นออนไลน์แล้ว)',
    urgentStatus: 'ด่วน (ใกล้หมดเวลายื่นออนไลน์)',
    overdueStatus: 'เกินกำหนด (มีค่าปรับ)',
    downloadIcs: '📅 ดาวน์โหลดการแจ้งเตือนปฏิทิน (.ics)',
    portalBtn: 'ไปที่เว็บไซต์ตรวจคนเข้าเมืองทางการ',
    tipsTitle: '💡 ข้อควรรู้และระเบียบค่าปรับ',
    daysSuffix: 'วัน',
    daysRemainingSuffix: 'วันที่เหลือ',
    overdueSuffix: 'วัน เกินกำหนด',
    maxStayLabel: 'ระยะเวลาพำนักสูงสุด',
    entryDateHint: 'ระบุวันที่ประทับตราเข้าเมืองในหนังสือเดินทาง วันที่มาถึงนับเป็นวันที่ 1',
    faqTitle: 'คำถามที่พบบ่อย (FAQ)',
    faq1Q: 'Q. รายงานตัว 90 วัน (ตม.47) ยื่นออนไลน์ได้เมื่อไหร่?',
    faq1A: 'A. สามารถยื่นออนไลน์ได้ล่วงหน้า 15 วัน ถึง 7 วันก่อนวันครบกำหนด หากเหลือน้อยกว่า 7 วัน ต้องไปยื่นที่สำนักงานตรวจคนเข้าเมืองด้วยตนเอง',
    faq2Q: 'Q. หากเดินทางออกนอกประเทศ การนับ 90 วันจะเป็นอย่างไร?',
    faq2A: 'A. เมื่อเดินทางออกและกลับเข้ามาใหม่ จะเริ่มนับวันแรกใหม่เป็นวันที่ 1'
  }
};
