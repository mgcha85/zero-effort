export interface ToolItem {
  id: string;
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
}

export const TOOLS: ToolItem[] = [
  {
    id: 'pdf-tools',
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
    featuresEn: ['Merge multiple PDFs into one', 'Extract or split specific pages', 'Drag & drop reordering', 'Instant local browser download']
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
    featuresEn: ['Gov submission standards', 'Resume photo sizing (3x4cm)', 'WebP / JPEG lossless compression', 'EXIF metadata stripper']
  },
  {
    id: 'anmeldung-prep',
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
    featuresEn: ['Bürgeramt appointment checklist', 'Direct online Termin links', 'In-browser blackout masking', '1-click secure PDF/PNG export']
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
    tagline: '유럽 29개국 솅겐 조약 무비자 90일 역산 롤오버 계산기',
    taglineEn: 'Rolling 90/180 Days Schengen Visa Calculator',
    description: '복잡한 180일 롤링 윈도우 규정을 과거 체류일정과 계획일정 기반으로 역산하여 오버스테이 벌금 및 입국 거부를 원천 차단합니다.',
    descriptionEn: 'Accurately compute remaining days in Schengen area based on official rolling 180-day rules.',
    badge: '✈️ 디지털 노마드 필수',
    badgeEn: '✈️ Digital Nomad Essential',
    targetRegion: 'Europe 🇪🇺',
    targetRegionEn: 'Europe 🇪🇺',
    features: ['복수 출입국 일정 시뮬레이션', '실시간 잔여일수 & D-Day 알림', '1클릭 캘린더(.ics) 내보내기', '오버스테이 위험일 즉시 경고'],
    featuresEn: ['Multi-entry trip simulations', 'Real-time remaining days & alerts', '1-click calendar (.ics) sync', 'Immediate overstay hazard warning']
  },
  {
    id: 'visarun-planner',
    name: '동남아 비자런 & 90일 체류신고',
    nameEn: 'Southeast Asia Visa Run Planner',
    subdomain: 'visarun',
    url: 'https://visarun.minitoolbox.dev',
    category: 'travel',
    categoryLabel: '해외 여행 / 비자',
    categoryLabelEn: 'Travel / Visa',
    icon: '🌴',
    faviconPath: '/favicons/visarun.png',
    tagline: '태국 TM.47 거주보고 · 발리 VoA · 베트남 무비자 알림 & 캘린더',
    taglineEn: 'Thailand TM.47, Bali VoA & Vietnam Border Runs',
    description: '태국 90일 온라인 신고 가능 기간(15일 전 ~ 7일 전) D-Day 알림 및 동남아 장기 체류 비자런 일정을 스마트폰 캘린더로 연동합니다.',
    descriptionEn: 'Track Thailand 90-day TM.47 deadlines, Bali VoA extensions and export push alerts to your calendar.',
    badge: '🇹🇭 태국/발리 체류자 필수',
    badgeEn: '🇹🇭 SE Asia Expat Essential',
    targetRegion: 'SE Asia 🇹🇭🇮🇩',
    targetRegionEn: 'SE Asia 🇹🇭🇮🇩',
    features: ['태국 TM.47 온라인 신고 기간 알림', '발리 VoA (30+30일) 체류 카운터', '오버스테이 벌금 방지 알림', '공식 이민국 포털 원클릭 이동'],
    featuresEn: ['Thailand TM.47 online window countdown', 'Bali VoA (30+30d) extension tracker', 'Overstay fine prevention alerts', '1-click official immigration links']
  },
  {
    id: 'rirekisho-builder',
    name: '일본 이력서 와레키 자동완성',
    nameEn: 'Japan Resume JIS Builder',
    subdomain: 'rirekisho',
    url: 'https://rirekisho.minitoolbox.dev',
    category: 'career',
    categoryLabel: '취업 / 커리어',
    categoryLabelEn: 'Career & Jobs',
    icon: '📄',
    faviconPath: '/favicons/rirekisho.png',
    tagline: 'JIS 규격 A4 PDF 출력 & 일본 연호(令和·平成) 학력 자동 계산',
    taglineEn: 'JIS Standard A4 Resume Builder with Wareki Eras',
    description: '생년월일만 넣으면 일본 4월 학제 기준 초·중·고·대학교 입학/졸업 연도 및 연호를 자동 계산하며 표준 JIS A4로 즉시 인쇄/PDF 저장합니다.',
    descriptionEn: 'Generate authentic Japanese JIS standard resumes with automatic Wareki era and academic year computation.',
    badge: '🇯🇵 일본 취업/워홀 필수',
    badgeEn: '🇯🇵 Japan Work/Visa Essential',
    targetRegion: 'Japan 🇯🇵',
    targetRegionEn: 'Japan 🇯🇵',
    features: ['일본 연호(令和·平成·昭和) 자동변환', '4월 학제 입학/졸업 연도 자동계산', '증명사진(40x30mm) 로컬 첨부', '표준 JIS A4 1클릭 PDF 인쇄'],
    featuresEn: ['Wareki (Reiwa/Heisei/Showa) auto-converter', 'April fiscal school year calculation', 'Photo attachment (40x30mm)', 'Standard JIS A4 1-click print']
  },
  {
    id: 'size-converter',
    name: '글로벌 신발 치수 변환기',
    nameEn: 'Global Shoe & Clothing Size Converter',
    subdomain: 'size',
    url: 'https://size.minitoolbox.dev',
    category: 'utility',
    categoryLabel: '생활 유틸리티',
    categoryLabelEn: 'Daily Utility',
    icon: '👟',
    faviconPath: '/favicons/size.png',
    tagline: '해외 직구 맞춤 KR / US / UK / EU / JP 실시간 치수 변환',
    taglineEn: 'Instant Cross-Border Size Calculator',
    description: '동남아(Shopee, Lazada), 미국(Amazon), 유럽 직구 시 헷갈리는 신발 및 의류 치수를 오차 없이 즉시 상호 환산합니다.',
    descriptionEn: 'Convert shoe and clothing sizes across US, UK, EU, JP, and KR sizing systems with brand size charts.',
    badge: '🛍️ 해외직구 필수',
    badgeEn: '🛍️ Cross-Border Shopper',
    targetRegion: 'Global 🌏',
    targetRegionEn: 'Global 🌏',
    features: ['남성 / 여성 / 아동 신발 치수', 'US / UK / EU / CM 실시간 비교', '해외 직구 사이즈 가이드', '오프라인 캐싱 지원'],
    featuresEn: ['Men / Women / Kids shoe sizes', 'US / UK / EU / CM side-by-side', 'Global brand sizing guide', 'Offline instant caching']
  },
  {
    id: 'caro-game',
    name: '베트남 오목 온라인 (Cờ Caro)',
    nameEn: 'Caro Online (Gomoku)',
    subdomain: 'caro',
    url: 'https://caro.minitoolbox.dev',
    category: 'entertainment',
    categoryLabel: '게임 / 엔터테인먼트',
    categoryLabelEn: 'Entertainment & Game',
    icon: '♟️',
    faviconPath: '/favicons/caro.png',
    tagline: '무서버 WebRTC P2P 실시간 1:1 대국 & AI 오목 대결',
    taglineEn: 'Serverless P2P Real-Time Multiplayer Caro',
    description: '베트남 국민 보드게임인 15x15 오목(Cờ Caro)을 서버 비용 없이 브라우저 간 WebRTC DataChannel 직접 연결로 플레이합니다.',
    descriptionEn: 'Play authentic 15x15 Caro with smart AI bot or invite friends with zero-server WebRTC P2P link.',
    badge: '🎮 무설치 P2P 대국',
    badgeEn: '🎮 Zero-Install P2P Duel',
    targetRegion: 'Vietnam 🇻🇳',
    targetRegionEn: 'Vietnam 🇻🇳',
    features: ['초대 링크 원클릭 1:1 P2P 대국', '지능형 AI 봇 대결 모드', '무설치 초경량 브라우저 실행', '모바일 터치 최적화 UI'],
    featuresEn: ['1-click WebRTC invite link', 'Smart AI single-player bot', 'Zero-install ultra-lightweight', 'Mobile touch-optimized layout']
  }
];
