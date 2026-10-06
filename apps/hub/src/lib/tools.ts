import type { HubLang } from './langStore';

export interface ToolLocale {
  name: string;
  tagline: string;
  description: string;
  badge: string;
  categoryLabel: string;
  features: string[];
}

export type ToolColor = 'rose' | 'indigo' | 'blue' | 'amber' | 'emerald' | 'cyan' | 'purple';

export interface ToolItem {
  id: string;
  color: ToolColor;
  name: string;
  nameEn: string;
  subdomain: string;
  url: string;
  category: 'privacy' | 'travel' | 'career' | 'utility' | 'entertainment';
  categoryLabel: string;
  categoryLabelEn: string;
  icon: string;
  faviconPath: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  badge: string;
  badgeEn: string;
  targetRegion: string;
  targetRegionEn: string;
  features: string[];
  featuresEn: string[];
  i18n?: Partial<Record<HubLang, ToolLocale>>;
}

export const TOOLS: ToolItem[] = [
  {
    id: 'pdf-tools',
    color: 'rose',
    name: 'PDF 합치기 나누기',
    nameEn: 'Secure PDF Merge & Split',
    subdomain: 'pdf',
    url: 'https://pdf.minitoolbox.dev',
    category: 'privacy',
    categoryLabel: '보안 유틸리티',
    categoryLabelEn: 'Security Utility',
    icon: '📑',
    faviconPath: '/favicons/pdf.png',
    tagline: '서버 업로드 0KB 초고속 브라우저 PDF 편집기',
    taglineEn: '100% Client-Side In-Browser PDF Merger & Page Extractor',
    description: 'pdf-lib 기반으로 파일이 서버로 절대 전송되지 않아 주민번호/금융정보 유출 없이 안전하게 병합·분할합니다.',
    descriptionEn: 'Process confidential PDFs directly in your browser. Zero bytes uploaded to any remote server.',
    badge: '🔒 안심 0KB 서버 전송',
    badgeEn: '🔒 Zero Upload Guaranteed',
    targetRegion: 'Global 🌐',
    targetRegionEn: 'Global 🌐',
    features: ['다중 PDF 하나로 병합', '원하는 페이지만 추출/분할', '드래그 앤 드롭 순서 변경', '브라우저 로컬 즉시 다운로드'],
    featuresEn: ['Merge multiple PDFs into one', 'Extract or split specific pages', 'Drag & drop reordering', 'Instant local browser download'],
    i18n: {
      de: {
        name: 'Sicherer PDF-Merger & Extraktor',
        tagline: '100% Lokale PDF-Verarbeitung im Browser ohne Server-Upload',
        description: 'Verbinden und trennen Sie vertrauliche Verträge und Dokumente sicher in Ihrem Browser-Speicher.',
        badge: '🔒 0KB Server-Upload',
        categoryLabel: 'Datenschutz-Tools',
        features: ['Mehrere PDFs zusammenfügen', 'Einzelne Seiten extrahieren', 'Seiten per Drag & Drop sortieren', 'Sofortiger lokaler Download']
      },
      vi: {
        name: 'Ghép & Tách File PDF Bảo Mật',
        tagline: 'Trình chỉnh sửa PDF siêu tốc 100% trên trình duyệt (0KB tải lên)',
        description: 'Xử lý hợp đồng, tài liệu tài chính bảo mật tuyệt đối không gửi lên máy chủ bên thứ ba.',
        badge: '🔒 Không Tải Lên Máy Chủ',
        categoryLabel: 'Tiện Ích Bảo Mật',
        features: ['Ghép nhiều file PDF thành một', 'Trích xuất hoặc tách từng trang', 'Kéo thả sắp xếp thứ tự trang', 'Tải về trực tiếp tức thì']
      },
      ja: {
        name: '安全なPDF結合・ページ抽出ツール',
        tagline: 'サーバー送信0KBの完全ブラウザ完結PDF編集',
        description: '機密書類や個人情報を含むPDFをクラウドに預けず、ブラウザメモリ内で安全に結合・ページ分割します。',
        badge: '🔒 サーバー送信ゼロ保証',
        categoryLabel: 'セキュリティ・書類',
        features: ['複数PDFを1つに統合', '特定ページの抽出・分割', 'ドラッグ＆ドロップで並び替え', 'ブラウザから即時保存']
      }
    }
  },
  {
    id: 'wasm-media',
    name: '제로업로드 미디어 툴',
    nameEn: 'Zero-Upload Media Tools',
    subdomain: 'media',
    url: 'https://media.minitoolbox.dev',
    category: 'privacy',
    categoryLabel: '보안 유틸리티',
    categoryLabelEn: 'Security Utility',
    icon: '🖼️',
    faviconPath: '/favicons/media.png',
    tagline: '개인정보 안심 이미지 압축 & 규격 리사이저',
    taglineEn: 'Local In-Browser Photo Resizer & Format Converter',
    description: '정부24, 이력서(3x4cm), 여권 규격 사진을 브라우저 캔버스에서 100% 로컬로 압축하고 변환합니다.',
    descriptionEn: 'Resize photos for passports, resumes and official submissions without privacy concerns.',
    badge: '🔒 완전 로컬 처리',
    badgeEn: '🔒 100% Local Processing',
    targetRegion: 'Korea 🇰🇷',
    targetRegionEn: 'Korea / Global',
    features: ['정부24 / 공공기관 제출 규격', '이력서 증명사진 (3x4cm)', 'WebP / JPEG 무손실 압축', 'EXIF 메타데이터 제거'],
    featuresEn: ['Gov submission standards', 'Resume photo sizing (3x4cm)', 'WebP / JPEG lossless compression', 'EXIF metadata stripper'],
    i18n: {
      de: {
        name: 'Lokaler Foto-Resizer & Komprimierer',
        tagline: 'Sichere Bildkomprimierung und Passfoto-Skalierung im Browser',
        description: 'Passfotos und Ausweisbilder ohne Upload im Browser auf Standardmaße anpassen und komprimieren.',
        badge: '🔒 100% Lokale Verarbeitung',
        categoryLabel: 'Datenschutz-Tools',
        features: ['Standard Passfoto-Formate', 'Bewerbungsfoto-Zuschnitt', 'WebP/JPEG Komprimierung', 'EXIF-Metadaten entfernen']
      },
      vi: {
        name: 'Nén & Đổi Cỡ Ảnh Không Cần Tải Lên',
        tagline: 'Công cụ nén ảnh thẻ, ảnh hộ chiếu an toàn trên trình duyệt',
        description: 'Nén và đổi kích thước ảnh hồ sơ, hộ chiếu bảo mật 100% không sợ rò rỉ dữ liệu cá nhân.',
        badge: '🔒 Xử Lý Cục Bộ',
        categoryLabel: 'Tiện Ích Bảo Mật',
        features: ['Chuẩn ảnh hộ chiếu quốc tế', 'Ảnh thẻ xin việc làm (3x4cm)', 'Nén ảnh WebP/JPEG tối ưu', 'Xóa siêu dữ liệu EXIF']
      },
      ja: {
        name: '完全ローカル 画像圧縮・証明写真リサイズ',
        tagline: '証明写真（3x4cm）・パスポート規格対応の安全な画像編集',
        description: '履歴書や公的申請の写真、高解像度画像をサーバーにアップロードせずブラウザ上で圧縮・リサイズします。',
        badge: '🔒 100%ローカル処理',
        categoryLabel: 'セキュリティ・書類',
        features: ['公的機関・パスポート規格対応', '履歴書用証明写真サイズ（3x4cm）', 'WebP/JPEG可逆圧縮', 'EXIF位置情報の自動削除']
      }
    }
  },
  {
    id: 'anmeldung-prep',
    color: 'amber',
    name: '독일 안멜둥 서류 & 마스킹',
    nameEn: 'German Anmeldung Prep & Redactor',
    subdomain: 'anmeldung',
    url: 'https://anmeldung.minitoolbox.dev',
    category: 'privacy',
    categoryLabel: '글로벌 행정',
    categoryLabelEn: 'Global Admin',
    icon: '🏛️',
    faviconPath: '/favicons/anmeldung.png',
    tagline: '독일 거주지 등록 체크리스트 및 집주인 서류 민감정보 마스킹',
    taglineEn: 'Bürgeramt Checklist & Privacy Masking Tool',
    description: '독일 Bürgeramt 거주등록 필수 서류(Wohnungsgeberbestätigung 등) 체크와 임대차 계약서 내 민감정보를 로컬에서 안전하게 가립니다.',
    descriptionEn: 'Prepare Bürgeramt appointment papers and redact sensitive landlord/rental data locally.',
    badge: '🇩🇪 독일 이주자 필수',
    badgeEn: '🇩🇪 Germany Expat Essential',
    targetRegion: 'Germany 🇩🇪',
    targetRegionEn: 'Germany 🇩🇪',
    features: ['Bürgeramt 필수 서류 체크리스트', '온라인 테어민(Termin) 예약 링크', '브라우저 캔버스 블랙아웃 마스킹', '1클릭 보안 PDF/PNG 저장'],
    featuresEn: ['Bürgeramt appointment checklist', 'Direct online Termin links', 'In-browser blackout masking', '1-click secure PDF/PNG export'],
    i18n: {
      de: {
        name: 'Bürgeramt Anmeldung & Dokumenten-Schwärzung',
        tagline: 'Unterlagen-Checkliste und sichere Schwärzung für Mietvertrag & Ausweis',
        description: 'Verpassen Sie keine Pflichtdokumente (Wohnungsgeberbestätigung gem. § 19 BMG) und schwärzen Sie sensible Daten vor der Weitergabe.',
        badge: '🇩🇪 Bürgeramt Pflichtcheck',
        categoryLabel: 'Behörden & Verwaltung',
        features: ['6-Punkte Vermieterbescheinigung Prüfung', 'Direktlinks zur Terminbuchung', 'Lokale Dokumenten-Schwärzung', '1-Klick Export ohne Server']
      },
      vi: {
        name: 'Chuẩn Bị Giấy Tờ Đăng Ký Tạm Trú Đức (Anmeldung)',
        tagline: 'Danh mục kiểm tra giấy tờ Bürgeramt và che mờ thông tin hợp đồng nhà',
        description: 'Kiểm tra đầy đủ hồ sơ Wohnungsgeberbestätigung và bảo mật số hộ chiếu, số tài khoản trước khi in nộp.',
        badge: '🇩🇪 Cần Thiết Tại Đức',
        categoryLabel: 'Hành Chính Quốc Tế',
        features: ['Danh mục kiểm tra giấy tờ Bürgeramt', 'Kiểm tra 6 điều kiện giấy xác nhận chủ nhà', 'Công cụ che thông tin nhạy cảm', 'Lưu file bảo mật 1 chạm']
      },
      ja: {
        name: 'ドイツ住民登録（Anmeldung）書類チェック＆黒塗り',
        tagline: '役所（Bürgeramt）提出書類チェックリスト＆契約書個人情報マスキング',
        description: 'ドイツの住民登録に必要な家主確認書（Wohnungsgeberbestätigung）等の必須書類確認と、賃貸契約書の機密情報を安全に黒塗り保存します。',
        badge: '🇩🇪 ドイツ生活必須',
        categoryLabel: '海外行政・手続き',
        features: ['Bürgeramt必須書類チェックリスト', '家主確認書6大必須項目チェック', 'ブラウザ内黒塗りマスキング機能', '安全な1クリック保存']
      }
    }
  },
  {
    id: 'schengen-calc',
    name: '솅겐 90/180 체류일수 계산기',
    nameEn: 'Schengen 90/180 Day Tracker',
    subdomain: 'schengen',
    url: 'https://schengen.minitoolbox.dev',
    category: 'travel',
    categoryLabel: '해외 여행 / 비자',
    categoryLabelEn: 'Travel / Visa',
    icon: '🇪🇺',
    faviconPath: '/favicons/schengen.png',
    tagline: '유럽 솅겐 조약 무비자 90/180일 정밀 계산 및 오버스테이 방지',
    taglineEn: 'Precise Rolling 90/180 Day Window Calculator for Europe',
    description: '솅겐 협약국의 복수 입출국 일정을 타임라인으로 시뮬레이션하여 불법 체류 위험 없는 안전한 잔여 체류 가능 일수를 계산합니다.',
    descriptionEn: 'Calculate your exact remaining days in the Schengen area based on the official 90/180-day rolling rule.',
    badge: '🇪🇺 유럽 여행/워홀 필수',
    badgeEn: '🇪🇺 EU Travel Essential',
    targetRegion: 'Europe 🇪🇺',
    targetRegionEn: 'Europe 🇪🇺',
    features: ['180일 롤링 윈도우 정밀 알고리즘', '직관적인 인터랙티브 타임라인', '오버스테이 위험 실시간 경고', '브라우저 로컬 자동 저장'],
    featuresEn: ['180-day rolling window algorithm', 'Interactive visual timeline', 'Overstay risk warning alerts', 'Local browser persistent storage'],
    i18n: {
      de: {
        name: 'Schengen 90/180 Tage Rechner',
        tagline: 'Präzise Berechnung der legalen Aufenthaltsdauer im Schengen-Raum',
        description: 'Offizielle 90/180-Tage-Regel der EU-Kommission: Simulieren Sie Ein- und Ausreisedaten ohne Risiko eines Overstays.',
        badge: '🇪🇺 EU Reise-Rechner',
        categoryLabel: 'Reisen & Visum',
        features: ['Offizieller 180-Tage Rolling-Window Algorithmus', 'Interaktive visuelle Zeitleiste', 'Echtzeit Overstay-Warnungen', 'Automatische lokale Speicherung']
      },
      vi: {
        name: 'Công Cụ Tính Ngày Lưu Trú Schengen 90/180',
        tagline: 'Theo dõi thời hạn visa khối Schengen chính xác cho du khách và nomad',
        description: 'Tính toán chính xác số ngày được phép ở lại châu Âu theo quy tắc trượt 90 ngày trong 180 ngày của EU.',
        badge: '🇪🇺 Du Lịch Châu Âu',
        categoryLabel: 'Du Lịch / Visa',
        features: ['Thuật toán chuẩn quy tắc 90/180 ngày', 'Dòng thời gian tương tác trực quan', 'Cảnh báo nguy cơ quá hạn thị thực', 'Lưu dữ liệu an toàn trên máy']
      },
      ja: {
        name: 'シェンゲン協定 90/180日 滞在日数計算機',
        tagline: 'ヨーロッパ・シェンゲン域内の合法滞在可能日数を正確にシミュレーション',
        description: 'EU公式の「過去180日間のうち最大90日」ルールに基づき、複数回の出入国スケジュールからオーバーステイのリスクを自動判定します。',
        badge: '🇪🇺 欧州渡航・ノマド必携',
        categoryLabel: '海外旅行・ビザ',
        features: ['公式180日間ローリング計算', '直感的なタイムライン表示', '不法滞在リスクの事前警告', 'ローカル自動保存']
      }
    }
  },
  {
    id: 'visarun-planner',
    color: 'emerald',
    name: '동남아 비자런 & D-Day 플래너',
    nameEn: 'Southeast Asia Visa Run Planner',
    subdomain: 'visarun',
    url: 'https://visarun.minitoolbox.dev',
    category: 'travel',
    categoryLabel: '해외 여행 / 비자',
    categoryLabelEn: 'Travel / Visa',
    icon: '🌴',
    faviconPath: '/favicons/visarun.png',
    tagline: '태국 90일 리포트(TM.47) 및 동남아 비자 만료일 역산기',
    taglineEn: 'Thailand TM.47 & SEA Visa Expiry Date Calculator',
    description: '태국 TM.47 거주신고 기간, 베트남 무비자 45일, 발리 30일 VoA 연장 마감일을 계산하여 캘린더 등록 및 오버스테이 벌금을 예방합니다.',
    descriptionEn: 'Track Thailand TM.47 reporting, Vietnam 45-day visa-free, and Bali VoA expiration dates.',
    badge: '🌴 디지털 노마드 필수',
    badgeEn: '🌴 Digital Nomad Essential',
    targetRegion: 'SE Asia 🌴',
    targetRegionEn: 'SE Asia 🌴',
    features: ['태국 TM.47 온라인 신고 가능 기간', '동남아 국가별 비자 규정 프리셋', 'Google Calendar D-Day 등록 (.ics)', '오버스테이 벌금 방지 알림'],
    featuresEn: ['Thailand TM.47 online window', 'Country visa rules presets', 'Google Calendar (.ics) export', 'Overstay fine avoidance alerts'],
    i18n: {
      de: {
        name: 'Südostasien Visarun & TM.47 Planer',
        tagline: 'Fristen-Rechner für Thailand TM.47, Vietnam und Bali',
        description: 'Berechnen Sie Stichtage für Thailand 90-Tage-Meldungen und Visumsverlängerungen zur Vermeidung von Strafgebühren.',
        badge: '🌴 Nomad-Werkzeug',
        categoryLabel: 'Reisen & Visum',
        features: ['Thailand TM.47 Meldefenster', 'Visabestimmungen nach Ländern', 'Kalender-Export (.ics)', 'Strafen-Warnungen']
      },
      vi: {
        name: 'Lên Kế Hoạch Visa Run & Hạn Lưu Trú ĐNA',
        tagline: 'Tính ngày gia hạn visa Thái Lan (TM.47), Việt Nam, Bali cho nomad',
        description: 'Nhắc nhở hạn khai báo cư trú 90 ngày Thái Lan, thời hạn miễn thị thực Việt Nam 45 ngày và ngày xuất nhập cảnh tối ưu.',
        badge: '🌴 Tiện Ích Digital Nomad',
        categoryLabel: 'Du Lịch / Visa',
        features: ['Thời hạn khai báo TM.47 online', 'Quy định visa các nước Đông Nam Á', 'Xuất lịch Google Calendar (.ics)', 'Tránh tiền phạt quá hạn visa']
      },
      ja: {
        name: '東南アジア ビザラン＆滞在期限プランナー',
        tagline: 'タイ90日レポート（TM.47）・ベトナム・バリのビザ期限＆オーバーステイ防止',
        description: 'タイの90日居住届出期間やベトナム45日免税、バリ島到着ビザの期限を逆算し、カレンダー登録と過料発生を防ぎます。',
        badge: '🌴 海外ノマド必須',
        categoryLabel: '海外旅行・ビザ',
        features: ['タイTM.47オンライン届出期間計算', '各国ビザ規定プリセット', 'カレンダー登録用.ics出力', '過料（Overstay）予防']
      }
    }
  },
  {
    id: 'rirekisho-builder',
    color: 'rose',
    name: '일본 이력서 와레키 자동완성',
    nameEn: 'Japan JIS Resume (Rirekisho) Builder',
    subdomain: 'rirekisho',
    url: 'https://rirekisho.minitoolbox.dev',
    category: 'career',
    categoryLabel: '취업 / 커리어',
    categoryLabelEn: 'Career / Resume',
    icon: '📄',
    faviconPath: '/favicons/rirekisho.png',
    tagline: '생년월일 기반 와레키(令・平・昭) 학력/경력 자동 계산 및 JIS 이력서 생성',
    taglineEn: 'Automatic Wareki (Reiwa/Heisei) Calendar JIS Resume Maker',
    description: '생년월일만 입력하면 소학교부터 대학교 입학·졸업 연도를 일본 연호(令和/平成/昭和)로 자동 변환하여 표준 JIS B4/A4 규격 이력서를 생성합니다.',
    descriptionEn: 'Auto-calculate school graduation years in official Japanese Wareki and generate standard JIS resumes.',
    badge: '🇯🇵 일본 취업/이직 필수',
    badgeEn: '🇯🇵 Japan Career Essential',
    targetRegion: 'Japan 🇯🇵',
    targetRegionEn: 'Japan 🇯🇵',
    features: ['학력/경력 와레키 연도 원클릭 자동완성', '증명사진 삽입 및 여백 자동 조절', '일본 표준 JIS 규격 2페이지 레이아웃', '인쇄 최적화 및 1클릭 PDF 출력'],
    featuresEn: ['Auto-calculate school years in Wareki', 'Photo insertion with auto-fit', 'Standard JIS 2-page layout', 'Print-optimized 1-click PDF'],
    i18n: {
      ja: {
        name: '日本標準 JIS履歴書（和暦自動計算）',
        tagline: '生年月日から令和・平成・昭和の学歴・職歴年数を自動計算・JIS規格PDF出力',
        description: '生年月日を入力するだけで小・中・高・大学の入学・卒業年を和暦で自動入力。証明写真の貼付枠や綺麗なA4/B4レイアウトに対応。',
        badge: '🇯🇵 日本就職・転職必携',
        categoryLabel: '就職・キャリア',
        features: ['学歴・職歴の和暦ワンクリック自動計算', '証明写真の自動配置・調整機能', '日本標準JIS規格準拠2ページ仕様', '印刷対応・完全無料PDF出力']
      },
      vi: {
        name: 'Tạo Sơ Yếu Lý Lịch Chuẩn Nhật (Rirekisho)',
        tagline: 'Tự động tính năm niên hiệu Nhật (Reiwa/Heisei) và xuất file PDF chuẩn JIS',
        description: 'Chỉ cần nhập ngày sinh, hệ thống tự động đổi năm học cấp 1 đến đại học theo niên hiệu Nhật Bản và tạo CV chuẩn JIS.',
        badge: '🇯🇵 Việc Làm Tại Nhật',
        categoryLabel: 'Nghề Nghiệp / CV',
        features: ['Tự động tính năm Wareki', 'Chèn và căn chỉnh ảnh thẻ', 'Bố cục 2 trang chuẩn JIS', 'Xuất file PDF chuẩn in ấn']
      },
      de: {
        name: 'Japanischer JIS-Lebenslauf (Rirekisho)',
        tagline: 'Automatischer Wareki-Rechner (Reiwa/Heisei) & offizieller JIS-Lebenslauf',
        description: 'Berechnet Ausbildungsjahre im japanischen Kalender und generiert den offiziellen Standard-JIS-Lebenslauf im PDF-Format.',
        badge: '🇯🇵 Japan Karriere',
        categoryLabel: 'Karriere & CV',
        features: ['Wareki-Jahre automatisch berechnen', 'Passfoto-Zuschnitt & Einbettung', 'Offizielles 2-Seiten JIS-Layout', 'Druckoptimierter PDF-Export']
      },
      fr: {
        name: 'CV Japonais JIS (Rirekisho Builder)',
        tagline: 'Calculateur automatique d\'ère japonaise (Wareki) & CV standard JIS',
        description: 'Convertit automatiquement vos années d\'études en ères japonaises (Reiwa/Heisei) et produit un CV officiel JIS en PDF.',
        badge: '🇯🇵 Emploi au Japon',
        categoryLabel: 'Carrière & CV',
        features: ['Calcul automatique des ères japonaises', 'Insertion et recadrage de photo', 'Mise en page standard JIS 2 pages', 'Export PDF haute qualité']
      },
      es: {
        name: 'Generador de CV Japonés JIS (Rirekisho)',
        tagline: 'Cálculo automático de era japonesa (Wareki) y plantilla estándar JIS',
        description: 'Calcula años escolares en el calendario oficial japonés y genera un currículum estándar JIS de 2 páginas en PDF.',
        badge: '🇯🇵 Empleo en Japón',
        categoryLabel: 'Carrera y CV',
        features: ['Cálculo de años en calendario japonés', 'Inserción y ajuste de fotografía', 'Formato estándar JIS de 2 páginas', 'Exportación a PDF lista para imprimir']
      }
    }
  },
  {
    id: 'size-converter',
    color: 'cyan',
    name: '글로벌 신발/의류 치수 변환기',
    nameEn: 'Global Shoe & Clothing Size Converter',
    subdomain: 'size',
    url: 'https://size.minitoolbox.dev',
    category: 'utility',
    categoryLabel: '직구 / 생활',
    categoryLabelEn: 'Shopping Utility',
    icon: '👟',
    faviconPath: '/favicons/size.png',
    tagline: '해외직구(US, UK, EU, JP, KR, CM) 실패 없는 신발/의류 치수 원클릭 변환',
    taglineEn: 'Instant Multi-Standard Shoe & Clothing Size Converter',
    description: '미국, 영국, 유럽, 일본, 한국, 센티미터(CM) 간의 신발 치수와 브랜드별 실측 차이를 실시간으로 환산합니다.',
    descriptionEn: 'Accurate international conversion between US, UK, EU, JP, KR, and Centimeter sizing.',
    badge: '🛍️ 해외직구 실패 방지',
    badgeEn: '🛍️ Smart Cross-Border Shopping',
    targetRegion: 'Global 🌐',
    targetRegionEn: 'Global 🌐',
    features: ['남성/여성/키즈 세부 카테고리', 'US / UK / EU / JP / KR / CM 실시간 환산', '주요 브랜드(나이키, 아디다스 등) 팁', '결과 링크 1초 공유 기능'],
    featuresEn: ['Men / Women / Kids categories', 'US / UK / EU / JP / KR / CM conversion', 'Popular brand sizing advice', '1-second shareable URL links'],
    i18n: {
      de: {
        name: 'Internationaler Schuh- & Kleidergrößen-Umrechner',
        tagline: 'Präzise Größenumrechnung (EU, US, UK, JP, KR, CM) für Online-Shopping',
        description: 'Vergleichen Sie Schuh- und Kleidergrößen weltweit in Echtzeit, um Fehlkäufe bei internationalen Bestellungen zu vermeiden.',
        badge: '🛍️ Fehlkauf-Schutz',
        categoryLabel: 'Shopping & Alltag',
        features: ['Herren-, Damen- und Kindergrößen', 'Echtzeit-Umrechnung EU/US/UK/JP/CM', 'Tipps für Nike, Adidas & Co.', 'Ergebnis-Link in 1 Sekunde teilen']
      },
      vi: {
        name: 'Bảng Quy Đổi Size Giày & Quần Áo Quốc Tế',
        tagline: 'Chuyển đổi kích cỡ US, UK, EU, JP, KR, CM chuẩn xác khi mua hàng xách tay',
        description: 'Chuyển đổi tức thì kích cỡ giày dép và quần áo nam, nữ, trẻ em giữa các bảng đo chuẩn quốc tế mà không lo chọn nhầm cỡ.',
        badge: '🛍️ Mua Sắm Thông Minh',
        categoryLabel: 'Mua Sắm & Đời Sống',
        features: ['Phân loại Nam / Nữ / Trẻ em', 'Quy đổi US / UK / EU / JP / KR / CM', 'Mẹo chọn size theo thương hiệu', 'Chia sẻ kết quả bằng 1 đường link']
      },
      ja: {
        name: '海外 靴・洋服サイズ一括換算ツール',
        tagline: '海外通販（US・UK・EU・JP・KR・CM）で失敗しないリアルタイムサイズ比較',
        description: 'アメリカ、イギリス、ヨーロッパ、日本、韓国、実寸CM間のシューズ・アパレル規格を瞬時に換算します。',
        badge: '🛍️ 個人輸入・通販必携',
        categoryLabel: 'ショッピング・生活',
        features: ['メンズ・レディース・キッズ対応', 'US/UK/EU/JP/KR/CM瞬時換算', '主要ブランド（Nike/Adidas等）の目安', '換算結果リンクの1秒共有']
      },
      fr: {
        name: 'Convertisseur de Tailles Chaussures & Vêtements',
        tagline: 'Conversion internationale (US, UK, EU, JP, KR, CM) pour le shopping en ligne',
        description: 'Convertissez instantanément les pointures et tailles de vêtements entre standards internationaux pour éviter les erreurs d\'achat.',
        badge: '🛍️ Shopping Précis',
        categoryLabel: 'Shopping & Pratique',
        features: ['Catégories Hommes / Femmes / Enfants', 'Conversion US / UK / EU / JP / CM', 'Conseils marques (Nike, Adidas...)', 'Lien de partage rapide en 1 clic']
      },
      es: {
        name: 'Conversor Internacional de Tallas de Calzado y Ropa',
        tagline: 'Conversión precisa (US, UK, EU, JP, KR, CM) para compras online',
        description: 'Compare tallas internacionales de calzado y ropa en tiempo real para evitar errores en compras por internet.',
        badge: '🛍️ Compras Seguras',
        categoryLabel: 'Compras y Utilidades',
        features: ['Categorías Hombre / Mujer / Niños', 'Conversión US / UK / EU / JP / CM', 'Consejos de marcas principales', 'Compartir enlace de resultado en 1 clic']
      }
    }
  },
  {
    id: 'caro-game',
    color: 'indigo',
    name: '베트남 오목 P2P (Cờ Caro)',
    nameEn: 'Cờ Caro (Vietnamese Gomoku) P2P',
    subdomain: 'caro',
    url: 'https://caro.minitoolbox.dev',
    category: 'entertainment',
    categoryLabel: '게임 / 엔터',
    categoryLabelEn: 'Games / Fun',
    icon: '🎮',
    faviconPath: '/favicons/caro.png',
    tagline: 'WebRTC P2P 기반 서버 없는 실시간 온라인 베트남 오목 대국',
    taglineEn: 'Serverless Real-Time P2P Vietnamese Gomoku via WebRTC',
    description: '서버를 거치지 않고 브라우저와 브라우저가 직접 연결(P2P)되어 딜레이 없이 친구와 즐기는 100% 무료 5목 게임입니다.',
    descriptionEn: 'Play traditional Vietnamese Gomoku peer-to-peer directly with friends via WebRTC. Zero lag.',
    badge: '🇻🇳 베트남 전통 보드게임',
    badgeEn: '🇻🇳 Vietnamese Board Game',
    targetRegion: 'Vietnam 🇻🇳',
    targetRegionEn: 'Vietnam / Global',
    features: ['WebRTC 브라우저 간 P2P 직접 연결', '초대 링크 생성으로 즉시 대국 시작', '반응형 바둑판 및 턴 타이머', '채팅 및 돌 색상 선택 지원'],
    featuresEn: ['Serverless WebRTC P2P connection', '1-click shareable invite link', 'Responsive board with turn timers', 'In-game chat and piece colors'],
    i18n: {
      vi: {
        name: 'Cờ Caro Trực Tuyến P2P (Không Cần Server)',
        tagline: 'Chơi cờ Caro đối kháng trực tiếp qua trình duyệt với bạn bè bằng WebRTC',
        description: 'Kết nối P2P trực tiếp giữa hai trình duyệt không lưu dữ liệu trên server, tốc độ siêu nhanh và không giật lag.',
        badge: '🇻🇳 Trò Chơi Dân Gian',
        categoryLabel: 'Trò Chơi & Giải Trí',
        features: ['Kết nối trực tiếp WebRTC P2P', 'Tạo link mời bạn bè trong 1 giây', 'Bàn cờ co giãn và đếm ngược lượt đi', 'Hỗ trợ chat và đổi màu quân cờ']
      },
      de: {
        name: 'Vietnamesisches Gomoku P2P (Cờ Caro)',
        tagline: 'Serverloses Echtzeit-Fünf-in-einer-Reihe-Spiel über WebRTC',
        description: 'Spielen Sie traditionelles vietnamesisches Gomoku direkt von Browser zu Browser ohne Server-Verzögerung mit Freunden.',
        badge: '🇻🇳 Brettspiel-Klassiker',
        categoryLabel: 'Spiele & Freizeit',
        features: ['WebRTC Peer-to-Peer Verbindung', '1-Klick Einladungslink', 'Responsives Spielfeld mit Timer', 'In-Game Chat']
      },
      ja: {
        name: 'ベトナム五目並べ P2P (Cờ Caro)',
        tagline: 'WebRTC P2P通信によるサーバー不要のリアルタイムオンライン対局',
        description: 'ブラウザ同士がP2Pで直接通信し、遅延ゼロで友達と対局できる登録不要の五目並べゲームです。',
        badge: '🇻🇳 伝統ボードゲーム',
        categoryLabel: 'ゲーム・娯楽',
        features: ['WebRTCブラウザ間P2P直接通信', '対局招待URLを1クリック発行', 'レスポンシブ盤面＆持ち時間タイマー', 'チャット・石の色変更対応']
      },
      fr: {
        name: 'Gomoku Vietnamien P2P (Cờ Caro)',
        tagline: 'Jeu de morpion à 5 pions en temps réel sans serveur via WebRTC',
        description: 'Jouez au Gomoku traditionnel directement de navigateur à navigateur sans latence avec un ami via un lien direct.',
        badge: '🇻🇳 Jeu Traditionnel',
        categoryLabel: 'Jeux & Loisirs',
        features: ['Connexion directe WebRTC P2P', 'Lien d\'invitation instantané', 'Plateau responsive avec minuteur', 'Messagerie instantanée incluse']
      },
      es: {
        name: 'Gomoku Vietnamita P2P (Cờ Caro)',
        tagline: 'Juego de 5 en línea en tiempo real sin servidores mediante WebRTC',
        description: 'Juega al tradicional Gomoku vietnamita de navegador a navegador con amigos mediante un enlace de invitación directo.',
        badge: '🇻🇳 Juego Tradicional',
        categoryLabel: 'Juegos y Ocio',
        features: ['Conexión directa P2P con WebRTC', 'Enlace de invitación en 1 clic', 'Tablero adaptable con temporizador', 'Chat integrado durante la partida']
      }
    }
  },
  {
    id: 'timesync-planner',
    color: 'indigo',
    name: '노마드 타임싱크 (시차 & 회의 조율)',
    nameEn: 'Nomad TimeSync (World Overlap Planner)',
    subdomain: 'timesync',
    url: 'https://timesync.minitoolbox.dev',
    category: 'travel',
    categoryLabel: '글로벌 & 여행',
    categoryLabelEn: 'Global & Travel',
    icon: '🌐',
    faviconPath: '/favicons/timesync.png',
    tagline: '글로벌 리모트 워커를 위한 1초 시차 대조 & 골든 워킹 아워 플래너',
    taglineEn: 'Instant timezone comparison & golden overlap hours finder for digital nomads',
    description: '파리, 뉴욕, 런던, 샌프란시스코, 서울 등 세계 주요 도시의 시차를 슬라이더로 맞추고 전원 근무 가능한 골든타임을 찾아줍니다. 100% 브라우저 메모리 연산.',
    descriptionEn: 'Coordinate cross-border meetings across Paris, New York, London, SF & Asia. Find overlapping golden working hours and export calendar events locally with zero tracking.',
    badge: '🌟 골든타임 자동 감지',
    badgeEn: '🌟 Golden Hours Finder',
    targetRegion: 'Global 🌐 (US & EU)',
    targetRegionEn: 'Global 🌐 (US & EU)',
    features: ['24시간 인터랙티브 타임라인 슬라이더', '골든 워킹 아워(08~19시) 겹침 영역 자동 탐지', '1-Click 회의 일정 텍스트 복사', 'RFC 표준 .ICS 캘린더 파일 내보내기'],
    featuresEn: ['24-hour interactive visual time slider', 'Automatic overlap golden hours detection', '1-Click formatted schedule clipboard copy', 'RFC standard .ICS calendar export'],
    i18n: {
      de: {
        name: 'Nomad TimeSync (Zeitzonen-Planer)',
        tagline: 'Weltweiter Zeitzonen- & Meeting-Planer für Remote-Teams',
        description: 'Finden Sie optimale Überschneidungszeiten zwischen Berlin, Paris, New York und Asien mit 100% Datenschutz.',
        badge: '🌟 Golden Hours Finder',
        categoryLabel: 'Global & Reise',
        features: ['24-Stunden-Zeitschieberegler', 'Automatische Erkennung von Kernarbeitszeiten', '1-Klick-Zeitplan-Kopie', '.ICS-Kalenderexport']
      },
      vi: {
        name: 'Nomad TimeSync (Đồng Bộ Múi Giờ)',
        tagline: 'Tìm khung giờ họp vàng cho nhóm làm việc từ xa quốc tế',
        description: 'So sánh múi giờ giữa Paris, New York, London và Châu Á, tự động phát hiện khung giờ làm việc chung.',
        badge: '🌟 Tìm Giờ Vàng',
        categoryLabel: 'Toàn Cầu & Du Lịch',
        features: ['Thanh trượt thời gian tương tác 24h', 'Tự động phát hiện giờ làm việc chung', 'Sao chép tóm tắt lịch họp 1 chạm', 'Xuất file lịch .ICS chuẩn']
      },
      ja: {
        name: 'ノマド タイムシンク (時差会議プランナー)',
        tagline: '世界各地の時差を1秒で比較し最適な会議時間を自動算出',
        description: 'パリ、ニューヨーク、ロンドン、東京などの時差をスライダーで直感比較。全員が稼働可能なゴールデンアワーを完全ローカルで算出。',
        badge: '🌟 ゴールデンタイム自動検出',
        categoryLabel: 'グローバル・渡航',
        features: ['24時間インタラクティブタイムスライダー', 'ゴールデン稼働時間帯の自動重複検出', 'ワンクリック会議時間テキストコピー', 'RFC準拠 .ICSカレンダーエクスポート']
      },
      fr: {
        name: 'Nomad TimeSync (Planificateur de Fuseaux Horaires)',
        tagline: 'Trouvez instantanément le chevauchement parfait pour vos réunions d\'équipe',
        description: 'Coordonnez vos réunions entre Paris, New York, Londres et l\'Asie. Détection automatique des heures dorées communes avec zéro tracking.',
        badge: '🌟 Détection Heures Dorées',
        categoryLabel: 'Monde & Déplacement',
        features: ['Curseur horaire visuel 24h interactif', 'Détection des plages de travail communes', 'Copie du créneau de réunion en 1 clic', 'Export calendrier standard .ICS']
      },
      es: {
        name: 'Nomad TimeSync (Planificador de Husos Horarios)',
        tagline: 'Encuentre horas de reunión óptimas para equipos remotos globales',
        description: 'Coordine reuniones internacionales entre Madrid, Nueva York, Londres y Asia. Detección automática de horarios de solapamiento.',
        badge: '🌟 Horas Doradas Detectadas',
        categoryLabel: 'Global y Viajes',
        features: ['Control deslizante visual de 24 horas', 'Detección automática de horarios compartidos', 'Copia de horario con formato en 1 clic', 'Exportación de eventos en formato .ICS']
      }
    }
  }
,
  {
    id: 'qr-studio',
    color: 'emerald',
    name: '퓨어 QR 스튜디오',
    nameEn: 'PureQR Studio',
    subdomain: 'qr',
    url: 'https://qr.minitoolbox.dev',
    category: 'privacy',
    categoryLabel: '보안 유틸리티',
    categoryLabelEn: 'Security Utility',
    icon: '🔲',
    faviconPath: '/favicon.png',
    tagline: '만료 없는 진짜 영구 정적 QR 코드 생성기',
    taglineEn: 'Permanent Static QR Generator · No Redirects',
    description: '14일 뒤 유료 전환되는 리다이렉트 사기 없이, URL·와이파이·명함·왓츠앱 데이터를 100% 브라우저에서 직접 인코딩하는 인쇄용 벡터 SVG/PNG 생성기입니다.',
    descriptionEn: 'Zero redirect traps or subscription hostage fees. Encodes raw data directly into high-res vector SVG & PNG in your browser RAM.',
    badge: '🔒 영구 불변 0KB 전송',
    badgeEn: '🔒 Never Expires',
    targetRegion: 'Global 🌐',
    targetRegionEn: 'Global 🌐',
    features: ['URL·와이파이·vCard·WhatsApp 지원', '인쇄용 고해상도 벡터 SVG 다운로드', '2048px 초고화질 PNG 내보내기', '리다이렉트 제로 영구 보장'],
    featuresEn: ['URL, WiFi, vCard, WhatsApp & Email', 'High-res Vector SVG export for print', '2048px crisp PNG export', 'Zero redirects guarantee'],
    i18n: {
      de: {
        name: 'PureQR Studio (Permanente QR-Codes)',
        tagline: 'Echter permanenter statischer QR-Code-Generator ohne Ablauf & Abo-Fallen',
        description: 'Verschlüsselt Daten wie URL, WLAN, vCard oder WhatsApp direkt im Browser. Keine Weiterleitungs-Tricks, 100% kostenloser SVG/PNG-Export.',
        badge: '🔒 Läuft nie ab',
        categoryLabel: 'Sicherheits-Tools',
        features: ['URL, WLAN, vCard, WhatsApp & E-Mail', 'Vektor-SVG-Export für gestochen scharfen Druck', '2048px hochauflösendes PNG', 'Keine Redirects garantiert']
      },
      vi: {
        name: 'PureQR Studio (Tạo Mã QR Vĩnh Viễn)',
        tagline: 'Tạo mã QR tĩnh vĩnh viễn không hết hạn, không bẫy đăng ký trả phí',
        description: 'Mã hóa trực tiếp URL, WiFi, danh thiếp vCard, WhatsApp trên RAM trình duyệt. Xuất file vector SVG và PNG 2048px siêu nét.',
        badge: '🔒 Không Bao Giờ Hết Hạn',
        categoryLabel: 'Tiện Ích Bảo Mật',
        features: ['Hỗ trợ URL, WiFi, vCard, WhatsApp', 'Tải file vector SVG in ấn chất lượng cao', 'Xuất ảnh PNG 2048px siêu sắc nét', 'Cam kết 0 chuyển hướng']
      },
      ja: {
        name: 'PureQR Studio (永久・静的QRコード生成)',
        tagline: '有効期限・リダイレクト詐欺なしの完全静的QRコード作成ツール',
        description: 'URL、Wi-Fi自動接続、vCard名刺、WhatsAppをブラウザ内で直接生成。印刷用ベクターSVGおよび高解像度PNGを無制限出力。',
        badge: '🔒 期限切れゼロ保証',
        categoryLabel: 'セキュリティ・ユーティリティ',
        features: ['URL/Wi-Fi/vCard/WhatsApp対応', '印刷用高品質ベクターSVG出力', '2048px高解像度PNG保存', 'リダイレクトなし永久有効']
      },
      fr: {
        name: 'PureQR Studio (QR Codes Permanents)',
        tagline: 'Générateur de QR codes statiques permanents sans redirection ni expiration',
        description: 'Encodez directement URL, Wi-Fi, vCard et WhatsApp dans la mémoire de votre navigateur. Export vectoriel SVG et PNG 2048px.',
        badge: '🔒 N\'expire jamais',
        categoryLabel: 'Sécurité & Utilitaires',
        features: ['Support URL, Wi-Fi, vCard, WhatsApp', 'Export vectoriel SVG haute résolution', 'Export PNG net 2048px', 'Garantie sans redirection']
      },
      es: {
        name: 'PureQR Studio (Códigos QR Permanentes)',
        tagline: 'Generador de códigos QR estáticos y permanentes sin redirecciones ni caducidad',
        description: 'Codifica URL, Wi-Fi, vCard y WhatsApp directamente en la memoria del navegador. Exportación vectorial SVG y PNG 2048px.',
        badge: '🔒 Nunca caduca',
        categoryLabel: 'Utilidades de Seguridad',
        features: ['Soporte para URL, Wi-Fi, vCard y WhatsApp', 'Exportación vectorial SVG para impresión', 'Exportación PNG nítida de 2048px', 'Cero redirecciones garantizadas']
      }
    }
  },
  {
    id: 'invoice-maker',
    color: 'blue',
    name: '노마드 인보이스 메이커',
    nameEn: 'Nomad Invoice Maker',
    subdomain: 'invoice',
    url: 'https://invoice.minitoolbox.dev',
    category: 'utility',
    categoryLabel: '업무 생산성',
    categoryLabelEn: 'Work & Finance',
    icon: '🧾',
    faviconPath: '/favicon.png',
    tagline: '가입 없는 1초 프리랜서 A4 PDF 인보이스 빌더',
    taglineEn: 'Zero-Login A4 PDF Freelance Invoice & Receipt Builder',
    description: '로그인과 카드 등록 없이 브라우저에서 품목과 세액, 다국적 통화($, €, £, ₩, ¥, ₫)를 입력하고 깔끔한 A4 PDF 청구서를 즉시 발행합니다.',
    descriptionEn: 'Create clean, professional A4 invoices with multi-currency ($/€/£/₩/¥/₫) and tax support. No signup, zero server tracking.',
    badge: '⚡ 가입 없는 1초 PDF',
    badgeEn: '⚡ 1-Click A4 PDF',
    targetRegion: 'Global 🌐',
    targetRegionEn: 'Global 🌐',
    features: ['글로벌 다국적 통화($, €, £, ₩) 지원', '부가세/세율 및 할인 자동 계산', '브라우저 로컬 자동 임시저장', '여백 없는 완벽한 A4 PDF 인쇄'],
    featuresEn: ['Multi-currency ($/€/£/₩/¥/₫)', 'Automatic tax & discount calculation', 'Local storage draft auto-save', 'Clean A4 print & PDF export'],
    i18n: {
      de: {
        name: 'Nomad Invoice Maker (Rechnungs-Generator)',
        tagline: 'Professionelle A4 PDF-Rechnungen ohne Registrierung erstellen',
        description: 'Erstellen Sie A4-Rechnungen mit mehreren Währungen ($/€/£/₩/¥/₫) und Steuersätzen direkt im Browser. 100% lokal und privat.',
        badge: '⚡ 1-Klick A4 PDF',
        categoryLabel: 'Finanzen & Arbeit',
        features: ['Mehrwährungsfähig ($/€/£/₩/¥/₫)', 'Automatische Steuer- & Rabattberechnung', 'Automatische lokale Speicherung', 'Optimales A4-Drucklayout']
      },
      vi: {
        name: 'Nomad Invoice Maker (Tạo Hóa Đơn A4)',
        tagline: 'Tạo hóa đơn & biên lai A4 PDF chuyên nghiệp không cần đăng ký tài khoản',
        description: 'Hỗ trợ đa tiền tệ ($, €, £, ₩, ¥, ₫), tự động tính thuế VAT và chiết khấu. 100% bảo mật cục bộ trên trình duyệt.',
        badge: '⚡ Xuất PDF 1 Chạm',
        categoryLabel: 'Công Việc & Tài Chính',
        features: ['Hỗ trợ đa tiền tệ quốc tế', 'Tự động tính thuế & chiết khấu', 'Tự động lưu nháp trên máy', 'Định dạng in ấn A4 chuẩn đẹp']
      },
      ja: {
        name: 'ノマド インボイスメーカー (A4請求書生成)',
        tagline: '登録不要・1秒でA4 PDF請求書や領収書を作成・印刷',
        description: '会員登録やクラウド送信なしで、多通貨（$/€/£/₩/¥/₫）対応のスタイリッシュなA4請求書を発行。消費税・割引も自動計算。',
        badge: '⚡ 1クリックA4出力',
        categoryLabel: 'ビジネス・請求業務',
        features: ['多通貨（$/€/£/₩/¥/₫）対応', '消費税・割引の自動計算', 'ブラウザ内での下書き自動保存', '完璧なA4印刷プレビュー']
      },
      fr: {
        name: 'Nomad Invoice Maker (Factures PDF A4)',
        tagline: 'Créateur de factures et reçus A4 PDF sans inscription',
        description: 'Générez des factures professionnelles multi-devises ($/€/£/₩/¥/₫) avec calcul des taxes et remises directement dans le navigateur.',
        badge: '⚡ PDF A4 en 1 Clic',
        categoryLabel: 'Travail & Finance',
        features: ['Multi-devises ($/€/£/₩/¥/₫)', 'Calcul automatique taxes et remises', 'Sauvegarde locale automatique', 'Mise en page d\'impression A4 nette']
      },
      es: {
        name: 'Nomad Invoice Maker (Facturas PDF A4)',
        tagline: 'Creador de facturas y recibos PDF A4 sin registro para freelancers',
        description: 'Cree facturas profesionales multidivisa ($/€/£/₩/¥/₫) con cálculo de impuestos y descuentos directamente en su navegador.',
        badge: '⚡ PDF A4 en 1 Clic',
        categoryLabel: 'Trabajo y Finanzas',
        features: ['Soporte multidivisa ($/€/£/₩/¥/₫)', 'Cálculo automático de IVA y descuentos', 'Guardado automático local', 'Diseño de impresión A4 impecable']
      }
    }
  },
  {
    id: 'exif-scrubber',
    color: 'purple',
    name: '사진 위치(GPS) & EXIF 제거기',
    nameEn: 'EXIF Privacy Scrubber',
    subdomain: 'exif',
    url: 'https://exif.minitoolbox.dev',
    category: 'privacy',
    categoryLabel: '보안 유틸리티',
    categoryLabelEn: 'Security Utility',
    icon: '🛡️',
    faviconPath: '/favicon.png',
    tagline: '사진 속 숨겨진 집 주소(GPS)와 기기 정보 삭제',
    taglineEn: 'Strip Hidden GPS & Camera Metadata From Photos',
    description: '스마트폰 사진에 몰래 기록된 상세 위도/경도 위치와 기종 정보를 브라우저 내부에서 1초 만에 완전 파기하여 중고거래나 SNS에 안전하게 공유합니다.',
    descriptionEn: 'Remove home address GPS coordinates, device serials, and timestamps directly in browser RAM before posting online.',
    badge: '🛡️ GPS 완전 파기',
    badgeEn: '🛡️ GPS Stripped',
    targetRegion: 'Global 🌐',
    targetRegionEn: 'Global 🌐',
    features: ['JPG, PNG, WebP 일괄 처리', '위치 정보(GPS) 감지 및 즉시 파기', '화질 손실 없는 픽셀 보존', '일괄 ZIP 압축 다운로드'],
    featuresEn: ['Bulk JPG, PNG, WebP processing', 'Detects & strips GPS coordinates', 'Zero quality loss pixel preservation', 'Download all cleaned as .ZIP'],
    i18n: {
      de: {
        name: 'EXIF Privacy Scrubber (GPS-Entferner)',
        tagline: 'Versteckte GPS-Standortdaten und Kamera-Metadaten sicher aus Fotos löschen',
        description: 'Entfernen Sie präzise Wohnort-GPS-Koordinaten und Gerätedaten direkt im Browser vor dem Hochladen auf Kleinanzeigen oder Social Media.',
        badge: '🛡️ GPS Bereinigt',
        categoryLabel: 'Datenschutz-Tools',
        features: ['Stapelverarbeitung für JPG, PNG, WebP', 'Erkennt & entfernt GPS-Koordinaten', 'Null Qualitätsverlust bei Pixeln', 'Sammel-Download als .ZIP']
      },
      vi: {
        name: 'EXIF Privacy Scrubber (Xóa Tọa Độ GPS)',
        tagline: 'Xóa tọa độ vị trí GPS và thông tin thiết bị ẩn trong ảnh chụp',
        description: 'Loại bỏ vị trí nhà riêng và số sê-ri máy ảnh trực tiếp trên RAM trình duyệt trước khi đăng bán đồ cũ hoặc đăng mạng xã hội.',
        badge: '🛡️ Đã Xóa GPS',
        categoryLabel: 'Tiện Ích Bảo Mật',
        features: ['Xử lý hàng loạt file JPG, PNG, WebP', 'Phát hiện & hủy vị trí GPS tức thì', 'Giữ nguyên 100% chất lượng ảnh gốc', 'Tải về tất cả dưới dạng file ZIP']
      },
      ja: {
        name: 'EXIF プライバシースクラバー (GPS位置情報削除)',
        tagline: '写真に記録された自宅GPS座標や撮影機器情報をブラウザ内で完全消去',
        description: 'メルカリ・ヤフオク出品やSNS投稿前に、スマートフォン写真に潜む詳細な緯度・経度とシリアル情報を1秒で破棄。画質劣化ゼロ。',
        badge: '🛡️ GPS情報完全消去',
        categoryLabel: 'セキュリティ・プライバシー',
        features: ['JPG/PNG/WebP一括処理対応', 'GPS位置情報の検知と即時破棄', '画質劣化ゼロのピクセル保持', '一括ZIP圧縮ダウンロード']
      },
      fr: {
        name: 'EXIF Privacy Scrubber (Suppresseur GPS)',
        tagline: 'Supprimez les coordonnées GPS et métadonnées cachées des photos',
        description: 'Éliminez l\'adresse exacte et les données d\'appareil directement dans le navigateur avant de publier sur les petites annonces ou réseaux sociaux.',
        badge: '🛡️ GPS Nettoyé',
        categoryLabel: 'Utilitaires de Confidentialité',
        features: ['Traitement par lot JPG, PNG, WebP', 'Détecte et supprime les coordonnées GPS', 'Préservation intégrale de la qualité d\'image', 'Téléchargement groupé au format .ZIP']
      },
      es: {
        name: 'EXIF Privacy Scrubber (Eliminador de GPS)',
        tagline: 'Elimine coordenadas GPS y metadatos ocultos de sus fotografías',
        description: 'Elimine la ubicación de su casa y datos del dispositivo directamente en el navegador antes de publicar en redes sociales o sitios de compraventa.',
        badge: '🛡️ GPS Eliminado',
        categoryLabel: 'Utilidades de Privacidad',
        features: ['Procesamiento por lotes JPG, PNG, WebP', 'Detecta y elimina coordenadas GPS', 'Cero pérdida de calidad fotográfica', 'Descarga masiva en archivo .ZIP']
      }
    }
  }
];

export function getLocalizedTool(tool: ToolItem, lang: HubLang) {
  if (lang === 'en') {
    return {
      name: tool.nameEn,
      tagline: tool.taglineEn,
      description: tool.descriptionEn,
      badge: tool.badgeEn,
      categoryLabel: tool.categoryLabelEn,
      features: tool.featuresEn,
      targetRegion: tool.targetRegionEn
    };
  }
  if (lang === 'ko') {
    return {
      name: tool.name,
      tagline: tool.tagline,
      description: tool.description,
      badge: tool.badge,
      categoryLabel: tool.categoryLabel,
      features: tool.features,
      targetRegion: tool.targetRegion
    };
  }
  // de, vi, ja
  const override = tool.i18n?.[lang];
  return {
    name: override?.name || tool.nameEn,
    tagline: override?.tagline || tool.taglineEn,
    description: override?.description || tool.descriptionEn,
    badge: override?.badge || tool.badgeEn,
    categoryLabel: override?.categoryLabel || tool.categoryLabelEn,
    features: override?.features || tool.featuresEn,
    targetRegion: tool.targetRegionEn
  };
}

export function getCampaignUrl(tool: ToolItem, content = tool.id): string {
  const url = new URL(tool.url);
  url.searchParams.set('utm_source', 'hub');
  url.searchParams.set('utm_medium', 'internal');
  url.searchParams.set('utm_campaign', '7day-strategy');
  url.searchParams.set('utm_content', content);
  return url.toString();
}
