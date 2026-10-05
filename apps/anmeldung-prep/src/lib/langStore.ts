import { writable } from 'svelte/store';
import type { City, ResidenceType, CivilStatus } from './types';

export type Lang = 'en' | 'fr' | 'de' | 'es' | 'vi' | 'ja' | 'ko';

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
  fr: {
    siteTitle: 'Préparation Anmeldung & Masquage Privé',
    badge: '100% Côté Client • Bürgeramt Allemand',
    heroTitle: 'Checklist Anmeldung Allemagne & Masquage de Données',
    heroSub: 'Ne manquez aucun document obligatoire pour votre rendez-vous au Bürgeramt. Checklist personnalisée selon votre ville et type de logement, avec masquage 100% local des données sensibles.',
    privacyBadge: '🔒 Traitement 100% Local en Navigateur • Zéro document téléversé sur un serveur',
    selectCity: '1. Choisissez votre ville',
    selectResidence: '2. Situation de logement',
    selectStatus: '3. Statut civil / visa',
    checklistTitle: 'Votre liste personnalisée de documents',
    checklistSub: 'Rassemblez tous les originaux papier avant de vous rendre à votre rendez-vous',
    completedBadge: 'Terminé',
    requiredBadge: 'Obligatoire',
    optionalBadge: 'Conditionnel',
    tipsTitle: 'Conseils officiels & pièges à éviter',
    maskingToolTitle: 'Outil de masquage local de documents',
    landlordCheckTitle: 'Contrôle en 6 points de la Wohnungsgeberbestätigung (§19 BMG)',
    landlordCheckSub: 'Assurez-vous que l\'attestation de votre propriétaire comporte tous les points obligatoires :',
    item1: 'Nom complet et adresse physique du propriétaire / bailleur',
    item2: 'Date officielle d\'emménagement (Einzugsdatum)',
    item3: 'Adresse exacte du logement (bâtiment, étage, porte)',
    item4: 'Noms et prénoms de TOUTES les personnes emménageant',
    item5: 'Déclaration précisant si le bailleur est propriétaire ou sous-loueur',
    item6: 'Signature manuscrite originale du bailleur / locataire principal',
    faqTitle: 'Foire Aux Questions (FAQ)',
    q1: 'Le contrat de bail (Mietvertrag) suffit-il pour s\'inscrire ?',
    a1: 'Non ! Depuis 2015 (§ 19 BMG), la Wohnungsgeberbestätigung signée est obligatoire. Un bail seul sera systématiquement rejeté.',
    q2: 'Qu\'en est-il du délai légal de 14 jours ?',
    a2: 'La loi exige une inscription sous 14 jours. Cependant, face à la pénurie de rendez-vous à Berlin ou Munich, la prise de rendez-vous sous 14 jours ou la confirmation de réservation fait foi.',
    q3: 'Mes documents numérisés sont-ils en sécurité ?',
    a3: '100% en sécurité. L\'outil fonctionne dans la mémoire vive de votre navigateur via HTML5 Canvas. Aucun octet n\'est envoyé sur un serveur.',
    cities: {
      berlin: 'Berlin',
      munich: 'Munich (München)',
      hamburg: 'Hambourg',
      frankfurt: 'Francfort-sur-le-Main',
      cologne: 'Cologne (Köln)',
      other: 'Autre ville en Allemagne'
    },
    residences: {
      wg_sublet: 'Colocation (WG) / Sous-location',
      own_apartment: 'Appartement individuel (Bail direct)',
      dormitory: 'Résidence étudiante (Studentenwerk)',
      host_family: 'Famille d\'accueil / Hébergement temporaire'
    },
    statuses: {
      employed: 'Salarié / Visa de travail',
      student: 'Étudiant / Cours de langue',
      single: 'Célibataire',
      married: 'Marié(e) avec famille'
    },
    metaTitle: 'Checklist Anmeldung Allemagne & Masquage Sécurisé (Bürgeramt)',
    metaDesc: 'Checklist personnalisée pour l\'enregistrement au Bürgeramt allemand et masquage 100% local des pièces justificatives.'
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
    item5: 'Erklärung, ob Wohnungsgeber Eigentümer oder Hauptmieter ist',
    item6: 'Handschriftliche Originalunterschrift des Wohnungsgebers',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    q1: 'Reicht der Mietvertrag für die Anmeldung aus?',
    a1: 'Nein! Seit November 2015 (§ 19 BMG) ist die Vorlage einer Wohnungsgeberbestätigung zwingend erforderlich. Ein Mietvertrag genügt nicht.',
    q2: 'Wie streng ist die 14-Tage-Frist?',
    a2: 'Gesetzlich gilt eine Frist von zwei Wochen nach Einzug. Bei Terminengpässen (z.B. in Berlin) genügt der Nachweis einer rechtzeitigen Terminbuchung.',
    q3: 'Sind meine hochgeladenen Dokumente sicher?',
    a3: '100% sicher. Die Verarbeitung und Schwärzung findet ausschließlich lokal in Ihrem Browser mittels HTML5 Canvas statt. Kein Upload.',
    cities: {
      berlin: 'Berlin',
      munich: 'München',
      hamburg: 'Hamburg',
      frankfurt: 'Frankfurt am Main',
      cologne: 'Köln',
      other: 'Andere Stadt in Deutschland'
    },
    residences: {
      wg_sublet: 'WG / Untermiete',
      own_apartment: 'Eigene Wohnung (Hauptmieter)',
      dormitory: 'Studentenwohnheim (Studentenwerk)',
      host_family: 'Gastfamilie / Zwischenmiete'
    },
    statuses: {
      employed: 'Angestellt / Arbeitsvisum',
      student: 'Student / Sprachkurs',
      single: 'Alleinstehend',
      married: 'Verheiratet mit Familie'
    },
    metaTitle: 'Bürgeramt Anmeldung Checkliste & Dokumenten-Schwärzung',
    metaDesc: 'Personalisierte Checkliste für die Anmeldung beim Bürgeramt und sichere lokale Dokumentenschwärzung ohne Server-Upload.'
  },
  es: {
    siteTitle: 'Preparación Anmeldung & Ocultación Segura',
    badge: '100% Local • Bürgeramt Alemania',
    heroTitle: 'Checklist para Anmeldung en Alemania y Ocultador Seguro',
    heroSub: 'No olvide ningún documento para su cita en el Bürgeramt. Lista personalizada para su ciudad y vivienda, con enmascaramiento local de datos confidenciales.',
    privacyBadge: '🔒 Procesamiento 100% en Navegador • Ningún archivo subido a servidores',
    selectCity: '1. Seleccione su ciudad',
    selectResidence: '2. Situación de vivienda',
    selectStatus: '3. Estado civil / visado',
    checklistTitle: 'Su Lista Personalizada de Documentos',
    checklistSub: 'Reúna todos los originales físicos antes de su cita',
    completedBadge: 'Completado',
    requiredBadge: 'Obligatorio',
    optionalBadge: 'Condicional',
    tipsTitle: 'Consejos oficiales y errores comunes',
    maskingToolTitle: 'Herramienta de ocultación local de documentos',
    landlordCheckTitle: 'Auditoría en 6 puntos de la Wohnungsgeberbestätigung (§19 BMG)',
    landlordCheckSub: 'Verifique que el formulario de su casero incluya todos los campos obligatorios:',
    item1: 'Nombre completo y dirección del casero / arrendador',
    item2: 'Fecha oficial de mudanza (Einzugsdatum)',
    item3: 'Dirección exacta del piso (edificio, planta, puerta)',
    item4: 'Nombres completos de TODAS las personas que se empadronan',
    item5: 'Declaración de si el arrendador es propietario o subarrendador',
    item6: 'Firma manuscrita original del arrendador',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    q1: '¿Es suficiente el contrato de alquiler (Mietvertrag)?',
    a1: '¡No! Desde 2015 (§ 19 BMG), la Wohnungsgeberbestätigung firmada por el casero es obligatoria. El contrato por sí solo es rechazado.',
    q2: '¿Qué ocurre con el plazo legal de 14 días?',
    a2: 'La ley exige registrarse dentro de los 14 días posteriores a la mudanza. Si no hay citas libres, reservar la cita dentro de ese plazo o conservar el resguardo es válido.',
    q3: '¿Mis documentos privados están a salvo?',
    a3: '100% seguro. Se procesa en memoria con HTML5 Canvas en su navegador sin enviar ningún archivo a internet.',
    cities: {
      berlin: 'Berlín',
      munich: 'Múnich (München)',
      hamburg: 'Hamburgo',
      frankfurt: 'Fráncfort del Meno',
      cologne: 'Colonia (Köln)',
      other: 'Otra ciudad en Alemania'
    },
    residences: {
      wg_sublet: 'Piso compartido (WG) / Subarriendo',
      own_apartment: 'Piso completo (Contrato directo)',
      dormitory: 'Residencia de estudiantes (Studentenwerk)',
      host_family: 'Familia anfitriona / Alojamiento temporal'
    },
    statuses: {
      employed: 'Empleado / Visado de trabajo',
      student: 'Estudiante / Curso de idiomas',
      single: 'Soltero/a',
      married: 'Casado/a con familia'
    },
    metaTitle: 'Checklist para Anmeldung en Alemania y Ocultador Seguro (Bürgeramt)',
    metaDesc: 'Checklist personalizada para el registro de domicilio en Alemania y ocultación de datos en navegador con 0KB de carga.'
  },
  vi: {
    siteTitle: 'Chuẩn Bị Hồ Sơ Anmeldung Đức',
    badge: '100% Xử Lý Trực Tiếp • Bürgeramt Đức',
    heroTitle: 'Danh Mục Hồ Sơ Đăng Ký Cư Trú (Anmeldung) Tại Đức',
    heroSub: 'Không bao giờ lo thiếu giấy tờ khi đi Bürgeramt. Lập danh sách hồ sơ chuẩn theo thành phố và loại nhà ở của bạn, đồng thời che mờ thông tin nhạy cảm an toàn ngay trên máy tính.',
    privacyBadge: '🔒 Xử lý 100% trong trình duyệt • Không tải tài liệu lên bất kỳ máy chủ nào',
    selectCity: '1. Chọn thành phố',
    selectResidence: '2. Tình trạng nhà ở',
    selectStatus: '3. Tình trạng hôn nhân / visa',
    checklistTitle: 'Danh Sách Giấy Tờ Cần Chuẩn Bị',
    checklistSub: 'Chuẩn bị đầy đủ bản gốc và bản in trước ngày hẹn',
    completedBadge: 'Đã xong',
    requiredBadge: 'Bắt buộc',
    optionalBadge: 'Tùy trường hợp',
    tipsTitle: 'Lưu Ý Quan Trọng Từ Cơ Quan Đức',
    maskingToolTitle: 'Công Cụ Che Mờ Dữ Liệu Riêng Tư',
    landlordCheckTitle: 'Kiểm Tra 6 Điểm Trên Giấy Xác Nhận Chủ Nhà (Wohnungsgeberbestätigung)',
    landlordCheckSub: 'Đảm bảo giấy xác nhận của chủ nhà có đủ 6 mục sau để tránh bị từ chối lịch hẹn:',
    item1: 'Họ tên và địa chỉ cư trú của chủ nhà / người cho thuê',
    item2: 'Ngày chính thức chuyển vào ở (Einzugsdatum)',
    item3: 'Địa chỉ chính xác của căn hộ (Số nhà, tầng, số phòng)',
    item4: 'Họ tên của TẤT CẢ những người dọn vào ở',
    item5: 'Khai báo chủ nhà là chủ sở hữu (Eigentümer) hay người cho thuê lại',
    item6: 'Chữ ký tay bản gốc của chủ nhà',
    faqTitle: 'Câu Hỏi Thường Gặp (FAQ)',
    q1: 'Hợp đồng thuê nhà (Mietvertrag) có đủ để đăng ký không?',
    a1: 'Không! Kể từ năm 2015 (§ 19 BMG), giấy Wohnungsgeberbestätigung có chữ ký chủ nhà là bắt buộc. Chỉ mang hợp đồng thuê nhà sẽ bị từ chối.',
    q2: 'Thời hạn 14 ngày có bị phạt không nếu không đặt được lịch hẹn?',
    a2: 'Luật quy định trong 14 ngày, nhưng do tình trạng quá tải lịch hẹn ở Berlin/Munich, chỉ cần bạn đặt lịch hẹn trong vòng 14 ngày hoặc lưu bằng chứng tìm hẹn là hợp lệ.',
    q3: 'Tài liệu của tôi có bị lộ lên mạng không?',
    a3: 'Hoàn toàn an toàn. Mọi thao tác xử lý bằng Canvas ngay trong trình duyệt của bạn, không gửi bất kỳ byte nào ra ngoài.',
    cities: {
      berlin: 'Berlin',
      munich: 'Munich (München)',
      hamburg: 'Hamburg',
      frankfurt: 'Frankfurt am Main',
      cologne: 'Cologne (Köln)',
      other: 'Thành phố khác tại Đức'
    },
    residences: {
      wg_sublet: 'Ở ghép (WG) / Thuê lại',
      own_apartment: 'Thuê nguyên căn (Hợp đồng trực tiếp)',
      dormitory: 'Ký túc xá sinh viên (Studentenwerk)',
      host_family: 'Gia đình bản xứ / Khách tạm trú'
    },
    statuses: {
      employed: 'Đi làm / Visa lao động',
      student: 'Sinh viên / Học tiếng',
      single: 'Độc thân',
      married: 'Đã kết hôn / Cả gia đình'
    },
    metaTitle: 'Hướng Dẫn Hồ Sơ Anmeldung Đức & Che Dữ Liệu An Toàn',
    metaDesc: 'Danh mục chuẩn bị hồ sơ đăng ký thường trú tại Đức và công cụ che thông tin cá nhân an toàn trên trình duyệt.'
  },
  ja: {
    headerTitle: 'ドイツ住民登録(アンメルドゥング)準備＆マスキング',
    siteTitle: 'ドイツ住民登録(アンメルドゥング)準備＆マスキング',
    badge: '100% ローカル処理 • ドイツ役所(Bürgeramt)',
    heroTitle: 'ドイツ住民登録 (Anmeldung) 必要書類チェック＆安心マスキング',
    heroSub: 'ドイツの役所(Bürgeramt)予約で書類不備を防ぐ。都市・滞在形態別の必要書類チェックリストと、契約書内の機密情報をブラウザ内で安全に黒塗り・マスキングします。',
    privacyBadge: '🔒 100% ブラウザ内ローカル処理 • 外部サーバー送信ゼロ',
    selectCity: '1. 登録する都市を選択',
    selectResidence: '2. 滞在・住居形態',
    selectStatus: '3. ビザ / 身分区分',
    checklistTitle: 'あなた専用の必要書類チェックリスト',
    checklistSub: '予約当日は必ず原本および印刷した用紙を持参してください',
    completedBadge: '完了',
    requiredBadge: '必須',
    optionalBadge: '該当者のみ',
    tipsTitle: '重要な注意事項とトラブル対策',
    maskingToolTitle: '書類の機密情報黒塗り・マスキングツール',
    landlordCheckTitle: '大家の入居確認書 (Wohnungsgeberbestätigung) 6大必須項目監査',
    landlordCheckSub: '予約当日の不受理を防ぐため、確認書に以下の必須6項目が全て含まれているか確認してください：',
    item1: '大家／所有者の氏名および現住所',
    item2: '正式な入居日 (Einzugsdatum)',
    item3: '賃貸物件の正確な住所 (建物、階数、部屋番号)',
    item4: '入居する全員の氏名',
    item5: '賃貸人が所有者か転貸人かの明記',
    item6: '大家の直筆サイン原本',
    faqTitle: 'よくある質問 (FAQ)',
    q1: '賃貸契約書 (Mietvertrag) だけで住民登録できますか？',
    a1: 'できません。2015年11月以降(連邦住民登録法§19)、大家が署名した入居確認書(Wohnungsgeberbestätigung)の提出が法律で義務付けられており、契約書単体では受理されません。',
    q2: '入居後14日以内の期限に予約が取れない場合はどうなりますか？',
    a2: 'ベルリンやミュンヘン等では予約枠不足が常態化しているため、入居後14日以内に予約手続きを行った証拠（予約確認メールや予約番号）を保存しておけば罰則対象にはなりません。',
    q3: 'アップロードした賃貸書類の機密情報は安全ですか？',
    a3: '100%安全です。HTML5 Canvasによりブラウザのメモリ内でのみ処理されるため、データが外部サーバーへ送信されることは一切ありません。',
    cities: {
      berlin: 'ベルリン (Berlin)',
      munich: 'ミュンヘン (München)',
      hamburg: 'ハンブルク (Hamburg)',
      frankfurt: 'フランクフルト (Frankfurt)',
      cologne: 'ケルン (Köln)',
      other: 'その他のドイツ主要都市'
    },
    residences: {
      wg_sublet: 'シェアハウス (WG) / サブレット(また貸し)',
      own_apartment: 'アパート単身・直接賃貸 (Hauptmiete)',
      dormitory: '学生寮 (Studentenwerk)',
      host_family: 'ホームステイ / 一時滞在'
    },
    statuses: {
      employed: '就労ビザ / 正社員',
      student: '留学生 / ワーホリ / 語学留学生',
      single: '単身者',
      married: '既婚 / 家族同伴'
    },
    metaTitle: 'ドイツ住民登録(Anmeldung)書類チェックリスト＆安全マスキング',
    metaDesc: 'ドイツBürgeramt住民登録に必要な書類を都市・住居形態別に自動診断。入居確認書の監査とローカル書類マスキングに対応。'
  },
  ko: {
    siteTitle: '독일 안멜둥 서류 & 마스킹',
    badge: '100% 브라우저 연산 • 독일 Bürgeramt',
    heroTitle: '독일 안멜둥(거주등록) 필수 서류 & 안심 마스킹',
    heroSub: '독일 관청(Bürgeramt) 테어민 당일 서류 미비로 퇴짜 맞지 마세요. 거주 도시 및 거주 형태별 맞춤 서류 체크리스트와 임대차 계약서 내 민감정보 브라우저 로컬 안심 마스킹을 제공합니다.',
    privacyBadge: '🔒 100% 브라우저 메모리 연산 • 개인정보 및 서류 파일의 외부 서버 전송 0바이트',
    selectCity: '1. 거주 등록 도시 선택',
    selectResidence: '2. 거주 형태 (Wohnsituation)',
    selectStatus: '3. 체류 / 비자 상태',
    checklistTitle: '나의 맞춤형 안멜둥 준비 서류 목록',
    checklistSub: '테어민 당일 모든 서류는 반드시 실물 원본(Original) 및 출력본으로 지참해야 합니다.',
    completedBadge: '준비 완료',
    requiredBadge: '필수 지참',
    optionalBadge: '해당자 필수',
    tipsTitle: '관청 테어민 필수 체크포인트 & 꿀팁',
    maskingToolTitle: '임대차 계약서 민감정보 로컬 마스킹 도구',
    landlordCheckTitle: '집주인 거주확인서(Wohnungsgeberbestätigung) 6대 필수항목 검증',
    landlordCheckSub: '2015년 개정 법률(§ 19 BMG)에 따라 아래 6개 항목 중 단 하나라도 누락되면 테어민이 즉시 취소됩니다:',
    item1: '집주인 / 임대인의 성명 및 실제 주소',
    item2: '실제 입주일(Einzugsdatum - 계약 시작일과 다를 경우 입주일 기준)',
    item3: '임대 주택의 정확한 상세 주소 (동, 층수, 호수 명시)',
    item4: '전입하는 모든 동거인의 전체 영문 성명',
    item5: '임대인이 실제 소유주(Eigentümer)인지 전대인(Wohnungsgeber)인지 체크 여부',
    item6: '집주인의 친필 서명(Originalunterschrift)',
    faqTitle: '자주 묻는 질문 (FAQ)',
    q1: '임대차 계약서(Mietvertrag)만으로 안멜둥이 가능한가요?',
    a1: '불가능합니다! 2015년 11월 개정된 연방주민등록법(§ 19 BMG)에 따라 집주인이 서명한 \'거주확인서(Wohnungsgeberbestätigung)\' 원본이 반드시 필요하며, 계약서만으로는 접수가 거부됩니다.',
    q2: '입주 후 14일 이내 등록 원칙을 지키지 못하면 벌금이 나오나요?',
    a2: '법적으로는 14일 이내 등록이 원칙이나, 베를린이나 뮌헨 등 대도시의 테어민 예약난이 심각한 경우 입주 14일 이내에 테어민을 예약해 둔 예약 확인서(Buchungsbestätigung)를 소지하고 있으면 과태료가 면제됩니다.',
    q3: '업로드한 계약서 이미지나 개인정보가 유출될 위험은 없나요?',
    a3: '전혀 없습니다. 본 도구는 HTML5 Canvas 기술을 통해 사용자의 PC/스마트폰 브라우저 메모리 안에서만 동작하며, 외부 서버로 단 1바이트의 이미지나 텍스트 데이터도 전송되지 않습니다.',
    cities: {
      berlin: '베를린 (Berlin)',
      munich: '뮌헨 (München)',
      hamburg: '함부르크 (Hamburg)',
      frankfurt: '프랑크푸르트 (Frankfurt)',
      cologne: '쾰른 (Köln)',
      other: '독일 기타 도시'
    },
    residences: {
      wg_sublet: 'WG / 쯔비쉔 / 서브렛 (Untermiete)',
      own_apartment: '단독 임대차 (Hauptmiete)',
      dormitory: '학생 기숙사 (Studentenwohnheim)',
      host_family: '홈스테이 / 임시 거주'
    },
    statuses: {
      employed: '취업 / 직장인 비자',
      student: '대학생 / 어학연수 / 유학생',
      single: '단독 1인 전입',
      married: '가족 / 부부 동반 전입'
    },
    metaTitle: '독일 안멜둥(거주등록) 필수 서류 체크리스트 & 안심 마스킹 도구',
    metaDesc: '독일 Bürgeramt 테어민 대비 도시별 거주확인서(Wohnungsgeberbestätigung) 필수 항목 검증 및 계약서 민감정보 로컬 블랙아웃 마스킹.'
  }
};
