import { writable } from 'svelte/store';

export type Lang = 'en' | 'ko' | 'es' | 'de' | 'fr';

export const currentLang = writable<Lang>('en');

export const translations: Record<Lang, {
  siteTitle: string;
  badge: string;
  heroTitle: string;
  heroSub: string;
  privacyBadge: string;
  addTrip: string;
  entryDate: string;
  exitDate: string;
  country: string;
  note: string;
  addBtn: string;
  loadSample: string;
  clearAll: string;
  myTrips: string;
  noTrips: string;
  duration: string;
  days: string;
  delete: string;
  simTitle: string;
  simSub: string;
  refDateLabel: string;
  statusToday: string;
  usedDays: string;
  remainingDays: string;
  overstayAlert: string;
  maxContinuousStay: string;
  latestExit: string;
  completeReset: string;
  downloadIcs: string;
  timelineTitle: string;
  timelineSub: string;
  inSchengen: string;
  outSchengen: string;
  faqTitle: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
}> = {
  en: {
    siteTitle: 'Schengen 90/180 Tracker',
    badge: '100% Client-Side • 0KB Server Upload',
    heroTitle: 'Schengen 90/180 Day Rollover Tracker',
    heroSub: 'Accurate rolling window calculator for non-EU travelers, digital nomads & tourists. Calculate remaining days, rollover simulations, and departure deadlines with zero server tracking.',
    privacyBadge: '🔒 All trip data saved locally in your browser (LocalStorage). Never uploaded to any server.',
    addTrip: 'Add New Trip to Schengen Area',
    entryDate: 'Entry Date',
    exitDate: 'Exit Date',
    country: 'Country (Optional)',
    note: 'Note / Purpose (Optional)',
    addBtn: '+ Add Trip',
    loadSample: 'Load Sample Trips',
    clearAll: 'Clear All Trips',
    myTrips: 'Your Recorded Trips',
    noTrips: 'No trips added yet. Add past or planned trips above or click "Load Sample Trips".',
    duration: 'Duration',
    days: 'days',
    delete: 'Delete',
    simTitle: 'Rollover Simulation & Status',
    simSub: 'EU Regulation 610/2013 compliant rolling 180-day calculation',
    refDateLabel: 'Simulation Reference Date (Entry or Today)',
    statusToday: 'Schengen Status on Selected Date',
    usedDays: 'Days Used in 180-Day Window',
    remainingDays: 'Days Remaining (Limit: 90)',
    overstayAlert: '⚠️ Warning: Overstay detected! Exceeds 90-day legal allowance.',
    maxContinuousStay: 'Max Continuous Stay If Entering On This Date',
    latestExit: 'Latest Legal Departure Date',
    completeReset: 'Full 90-Day Reset Date (If staying outside)',
    downloadIcs: '📅 Add Departure Reminder to Calendar (.ics)',
    timelineTitle: '180-Day Rolling Timeline & Day Breakdown',
    timelineSub: 'Visual inspection of each day in the reference window',
    inSchengen: 'In Schengen',
    outSchengen: 'Out of Area',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    q1: 'What is the Schengen 90/180-day rolling rule?',
    a1: 'You cannot stay more than 90 days in any 180-day period across all Schengen countries. The 180-day window continuously moves backward from each day of your stay. Both the date of entry and exit count as full days.',
    q2: 'Which countries belong to the Schengen Area?',
    a2: '29 European nations including France, Germany, Italy, Spain, Switzerland, Greece, Portugal, Austria, Netherlands, Poland, Sweden, Norway, and Iceland. Note: The UK and Ireland are NOT part of Schengen.',
    q3: 'Is my passport or travel history private?',
    a3: 'Yes, 100%. All dates and itineraries are calculated directly inside your browser and stored in your device\'s LocalStorage. No server receives, logs, or tracks your travel details.'
  },
  ko: {
    siteTitle: '솅겐 체류일수 계산기',
    badge: '100% 브라우저 연산 • 서버 전송 없음',
    heroTitle: '솅겐 90/180일 체류일수 역산기',
    heroSub: '유럽 솅겐 조약 국가 90/180 롤링 윈도우 규칙 완벽 계산. 유럽 여행자, 디지털 노마드, 유학생을 위한 체류 잔여일 및 최장 체류일수 시뮬레이터.',
    privacyBadge: '🔒 모든 여행 일정은 브라우저(LocalStorage)에만 안전하게 저장되며 외부 서버로 전송되지 않습니다.',
    addTrip: '솅겐 지역 입출국 일정 추가',
    entryDate: '입국일 (Entry)',
    exitDate: '출국일 (Exit)',
    country: '국가 (선택)',
    note: '메모 / 목적 (선택)',
    addBtn: '+ 일정 추가',
    loadSample: '샘플 일정 불러오기',
    clearAll: '모든 일정 초기화',
    myTrips: '등록된 여행 일정 목록',
    noTrips: '등록된 일정이 없습니다. 위에서 일정을 추가하거나 [샘플 일정 불러오기]를 눌러보세요.',
    duration: '체류 기간',
    days: '일',
    delete: '삭제',
    simTitle: '체류일수 역산 & 시뮬레이션',
    simSub: 'EU 솅겐 국경법(규정 610/2013) 롤링 윈도우 공식 연산',
    refDateLabel: '시뮬레이션 기준일 (오늘 또는 미래 입국 예정일)',
    statusToday: '해당 기준일 시점의 솅겐 체류 상태',
    usedDays: '직전 180일 내 사용한 체류일수',
    remainingDays: '합법 잔여 체류일수 (최대 90일)',
    overstayAlert: '⚠️ 주의: 90일 체류 한도를 초과했습니다 (오버스테이 위험)!',
    maxContinuousStay: '이 날짜에 입국 시 최장 연속 체류 가능일수',
    latestExit: '최종 합법 출국 마감일',
    completeReset: '90일 한도 완전 리셋일 (체류 중단 시)',
    downloadIcs: '📅 캘린더에 출국 마감일 등록 (.ics 다운로드)',
    timelineTitle: '180일 롤링 타임라인 & 일별 현황',
    timelineSub: '기준일 직전 180일 윈도우 내 일자별 체류/비체류 현황 시각화',
    inSchengen: '솅겐 체류',
    outSchengen: '외곽 체류',
    faqTitle: '자주 묻는 질문 (FAQ)',
    q1: '솅겐 90/180일 롤링 윈도우 규칙이 무엇인가요?',
    a1: '어느 날을 기준으로 삼든 그 직전 180일 동안 솅겐 회원국 전체 체류 합계가 90일을 넘지 않아야 하는 규칙입니다. 입국일과 출국일 당일도 각각 1일 체류로 산정됩니다.',
    q2: '어느 국가들이 솅겐 조약에 속하나요?',
    a2: '프랑스, 독일, 이탈리아, 스페인, 스위스, 그리스, 오스트리아, 네덜란드, 노르웨이, 아이슬란드 등 29개국입니다. 영국(UK)과 아일랜드는 솅겐 협약국이 아닙니다.',
    q3: '제 여행 정보가 외부에 노출될 위험이 있나요?',
    a3: '전혀 없습니다. 모든 계산은 브라우저 내부에서만 수행되며, 데이터는 본인의 기기 LocalStorage에만 저장됩니다. 서버 로그나 외부 전송은 0KB입니다.'
  },
  es: {
    siteTitle: 'Calculadora Schengen 90/180',
    badge: '100% en el Navegador • Sin Envío al Servidor',
    heroTitle: 'Calculadora de Días Schengen 90/180',
    heroSub: 'Calculadora de ventana móvil de 90/180 días del espacio Schengen. Calcula tus días restantes y fechas límite de salida sin registro.',
    privacyBadge: '🔒 Todos los datos se guardan localmente en su navegador (LocalStorage).',
    addTrip: 'Añadir viaje a la zona Schengen',
    entryDate: 'Fecha de Entrada',
    exitDate: 'Fecha de Salida',
    country: 'País (Opcional)',
    note: 'Nota (Opcional)',
    addBtn: '+ Añadir Viaje',
    loadSample: 'Cargar Ejemplo',
    clearAll: 'Borrar Todo',
    myTrips: 'Viajes Registrados',
    noTrips: 'No hay viajes añadidos. Añade uno arriba o carga el ejemplo.',
    duration: 'Duración',
    days: 'días',
    delete: 'Eliminar',
    simTitle: 'Simulación y Estado Schengen',
    simSub: 'Conforme al Reglamento (UE) n° 610/2013',
    refDateLabel: 'Fecha de Referencia (Hoy o Entrada Futura)',
    statusToday: 'Estado en la Fecha Seleccionada',
    usedDays: 'Días Utilizados en los últimos 180 días',
    remainingDays: 'Días Restantes (Límite: 90)',
    overstayAlert: '⚠️ ¡Atención! Se ha detectado estancia excesiva (Overstay).',
    maxContinuousStay: 'Estancia Máxima Continua Permitida',
    latestExit: 'Fecha Límite Legal de Salida',
    completeReset: 'Fecha de Reinicio Total (90 días libres)',
    downloadIcs: '📅 Añadir Recordatorio al Calendario (.ics)',
    timelineTitle: 'Línea de Tiempo de 180 Días',
    timelineSub: 'Desglose visual día a día en la ventana de 180 días',
    inSchengen: 'En Schengen',
    outSchengen: 'Fuera de Schengen',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    q1: '¿Qué es la regla de los 90/180 días de Schengen?',
    a1: 'No se puede permanecer más de 90 días dentro de cualquier período móvil de 180 días en los países Schengen.',
    q2: '¿Qué países forman el espacio Schengen?',
    a2: '29 países europeos incluidos España, Francia, Alemania, Italia, Suiza, Grecia y Portugal. El Reino Unido e Irlanda no forman parte.',
    q3: '¿Mis datos de viaje son privados?',
    a3: '100% privados. Todo se procesa en su dispositivo y se guarda en LocalStorage. Cero datos en el servidor.'
  },
  de: {
    siteTitle: 'Schengen 90/180 Rechner',
    badge: '100% Client-Side • Kein Server-Upload',
    heroTitle: 'Schengen 90/180 Tage Rollover Rechner',
    heroSub: 'Präziser Rechner für die 90/180-Tage-Regel im Schengen-Raum für Reisende, Nomaden und Touristen.',
    privacyBadge: '🔒 Alle Reisedaten werden nur lokal in Ihrem Browser gespeichert (LocalStorage).',
    addTrip: 'Reise in den Schengen-Raum hinzufügen',
    entryDate: 'Einreisedatum',
    exitDate: 'Ausreisedatum',
    country: 'Land (Optional)',
    note: 'Notiz (Optional)',
    addBtn: '+ Reise hinzufügen',
    loadSample: 'Beispiel laden',
    clearAll: 'Alles löschen',
    myTrips: 'Erfasste Reisen',
    noTrips: 'Noch keine Reisen erfasst. Fügen Sie oben eine Reise hinzu.',
    duration: 'Dauer',
    days: 'Tage',
    delete: 'Löschen',
    simTitle: 'Simulation & Status',
    simSub: 'Konform mit EU-Verordnung 610/2013',
    refDateLabel: 'Referenzdatum (Heute oder geplante Einreise)',
    statusToday: 'Schengen-Status am gewählten Datum',
    usedDays: 'Verbrauchte Tage im 180-Tage-Fenster',
    remainingDays: 'Verbleibende Tage (Limit: 90)',
    overstayAlert: '⚠️ Warnung: Überziehung der 90 Tage festgestellt!',
    maxContinuousStay: 'Maximal möglicher Aufenthalt ab diesem Datum',
    latestExit: 'Spätestes legales Ausreisedatum',
    completeReset: 'Vollständiger Reset der 90 Tage (bei Ausreise)',
    downloadIcs: '📅 Ausreise-Erinnerung in Kalender laden (.ics)',
    timelineTitle: '180-Tage rollende Zeitleiste',
    timelineSub: 'Visuelle Aufschlüsselung der Tage im 180-Tage-Fenster',
    inSchengen: 'Im Schengen-Raum',
    outSchengen: 'Außerhalb',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    q1: 'Was ist die 90/180-Tage-Regel?',
    a1: 'Sie dürfen sich innerhalb jedes 180-Tage-Zeitraums maximal 90 Tage im gesamten Schengen-Raum aufhalten.',
    q2: 'Welche Länder gehören zum Schengen-Raum?',
    a2: '29 europäische Staaten wie Deutschland, Frankreich, Italien, Spanien, die Schweiz und Österreich. Großbritannien und Irland gehören nicht dazu.',
    q3: 'Sind meine Reisedaten sicher?',
    a3: 'Ja, 100%. Alles bleibt in Ihrem Browser und wird niemals an externe Server übertragen.'
  }
,
  fr: {
    siteTitle: 'Calculateur Règle 90/180 Schengen',
    badge: '100% Côté Client • 0KB Téléversement Serveur',
    heroTitle: 'Calculateur de Séjour Règle 90/180 Jours Schengen',
    heroSub: 'Calculateur glissant précis pour voyageurs non-UE, nomades digitaux et touristes. Calculez les jours restants et les dates limites de départ avec zéro suivi serveur.',
    privacyBadge: '🔒 Toutes vos données de voyage restent stockées localement dans votre navigateur (LocalStorage). Zéro fuite serveur.',
    addTrip: 'Ajouter un Séjour dans l\'Espace Schengen',
    entryDate: 'Date d\'entrée',
    exitDate: 'Date de sortie',
    country: 'Pays (Facultatif)',
    note: 'Remarque / Motif (Facultatif)',
    addBtn: '+ Ajouter le séjour',
    loadSample: 'Charger un exemple',
    clearAll: 'Tout effacer',
    myTrips: 'Historique de mes séjours',
    noTrips: 'Aucun séjour enregistré. Ajoutez vos dates ci-dessus ou chargez un exemple.',
    duration: 'Durée',
    days: 'jours',
    delete: 'Supprimer',
    simTitle: 'Simulation de Statut & Jours Restants',
    simSub: 'Vérifiez votre conformité à une date de référence choisie sur la fenêtre glissante de 180 jours.',
    refDateLabel: 'Date de référence pour le calcul',
    statusToday: 'Statut à la date choisie',
    usedDays: 'Jours consommés (sur 90)',
    remainingDays: 'Jours restants autorisés',
    overstayAlert: '⚠️ Dépassement détecté ! Vous dépassez le quota autorisé de 90 jours.',
    maxContinuousStay: 'Séjour continu maximum possible',
    latestExit: 'Date limite de sortie recommandée',
    completeReset: 'Remise à zéro complète du quota 90j',
    downloadIcs: '📅 Exporter les rappels de départ (.ICS)',
    timelineTitle: 'Visualisation Chronologique (Fenêtre 180 Jours)',
    timelineSub: 'Aperçu jour par jour de vos périodes de présence et d\'absence.',
    inSchengen: 'Dans Schengen',
    outSchengen: 'Hors Schengen',
    faqTitle: 'Foire Aux Questions (FAQ)',
    q1: 'Q. Comment fonctionne exactement la règle des 90/180 jours de l\'espace Schengen ?',
    a1: 'A. Tout ressortissant non-UE exempté de visa court séjour peut séjourner au maximum 90 jours sur toute période glissante de 180 jours. Chaque jour passé dans Schengen est vérifié par rapport aux 179 jours précédents.',
    q2: 'Q. Les dates d\'entrée et de sortie comptent-elles comme des journées entières ?',
    a2: 'A. Oui. Le jour d\'arrivée et le jour de départ comptent chacun pour un jour complet dans le quota des 90 jours.',
    q3: 'Q. Mes données de passeport ou de dates de voyage sont-elles envoyées à un serveur ?',
    a3: 'A. Non, absolument aucun octet n\'est envoyé sur un serveur. Tout est calculé dans votre navigateur.'
  }
};
