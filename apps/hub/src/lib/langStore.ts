import { writable } from 'svelte/store';

export type HubLang = 'en' | 'ko' | 'de' | 'vi' | 'ja';

function getInitialLang(): HubLang {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('minitoolbox_hub_lang') as HubLang;
    if (saved && ['en', 'ko', 'de', 'vi', 'ja'].includes(saved)) {
      return saved;
    }
    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('vi')) return 'vi';
    if (nav.startsWith('ja')) return 'ja';
  } catch (e) {
    // fallback
  }
  return 'en';
}

export const currentLang = writable<HubLang>('en');

export function initLang() {
  if (typeof window !== 'undefined') {
    const lang = getInitialLang();
    currentLang.set(lang);
  }
}

export function setLang(lang: HubLang) {
  currentLang.set(lang);
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('minitoolbox_hub_lang', lang);
    } catch (e) {}
  }
}

export const translations = {
  en: {
    portalBadge: 'Global Micro Webtools Hub',
    zeroUploadBadge: '🔒 Zero-Upload Guaranteed (0KB)',
    heroBadge: '🚀 8 Lightweight Client-Side Micro Webapps',
    heroTitlePrefix: 'Fast, Free & ',
    heroTitleHighlight: 'Zero-Upload',
    heroTitleSuffix: ' Utilities',
    heroDesc: 'Zero bytes of private data uploaded to any remote server. Everything executes 100% locally inside your browser memory and WebAssembly sandbox.',
    searchPlaceholder: 'Search tools (e.g. PDF, Anmeldung, Schengen, Resume, Visa Run...)',
    categories: {
      all: 'All Tools',
      privacy: '🔒 Privacy / Docs',
      travel: '✈️ Travel / Visa',
      career: '📄 Career / Resume',
      utility: '🛠️ Shopping / Utility',
      entertainment: '🎮 Games / Fun'
    },
    launchBtn: 'Open Tool →',
    freeBadge: 'Free & No Install',
    charterTitle: '🛡️ MiniToolbox.dev Privacy Charter',
    charterItems: [
      {
        title: '1. Zero-Upload Architecture',
        desc: 'No image, PDF file, or sensitive text is ever transmitted to a central server. All processing happens entirely within client device memory.'
      },
      {
        title: '2. Forever Free & Ad-Supported',
        desc: 'No signups, subscriptions, or paywalls required. Modest infrastructure costs are offset solely by non-intrusive banner sponsorships.'
      },
      {
        title: '3. Dedicated Subdomain Routing',
        desc: 'Each tool operates on its dedicated edge subdomain (pdf., size., anmeldung., etc.) delivering sub-second load times worldwide.'
      }
    ],
    faqTitle: 'Frequently Asked Questions (FAQ)',
    faqs: [
      {
        q: 'Are my files really never uploaded to any server?',
        a: 'Yes, 100% guaranteed. All tools on MiniToolbox run locally in your browser memory using WebAssembly, Canvas API, and pdf-lib. You can inspect the browser DevTools (F12) Network tab to verify that 0 bytes of file payloads leave your device.'
      },
      {
        q: 'Is it completely free? Do I need to create an account?',
        a: 'All tools are permanently free with no account creation, no signups, and no paywalls or file conversion limits.'
      },
      {
        q: 'Can I use these tools on mobile devices?',
        a: 'Yes. MiniToolbox is fully responsive and optimized for mobile browsers including iOS Safari and Android Chrome.'
      }
    ],
    metaTitle: 'MiniToolbox.dev | Zero-Upload Privacy Micro Webtools Hub',
    metaDesc: '100% client-side privacy webtools. Merge/split PDFs, photo resizer, Schengen 90/180 tracker, German Anmeldung checklist & redact, Japan JIS resume builder, Visa run planner.'
  },
  ko: {
    portalBadge: '글로벌 마이크로 웹툴 포털',
    zeroUploadBadge: '🔒 서버 업로드 0KB 보장',
    heroBadge: '🚀 8개의 초경량 독립 마이크로 웹앱 허브',
    heroTitlePrefix: '작지만 강력한, ',
    heroTitleHighlight: 'Zero-Upload',
    heroTitleSuffix: ' 도구 모음',
    heroDesc: '서버로 단 1바이트의 개인정보도 전송하지 않습니다. 모든 작업은 브라우저 캔버스와 WebAssembly 내부에서 100% 안전하게 실행됩니다.',
    searchPlaceholder: '필요한 도구를 검색해보세요 (예: PDF, 안멜둥, 솅겐, 이력서, 비자런...)',
    categories: {
      all: '전체 도구 (All)',
      privacy: '🔒 보안 / 서류',
      travel: '✈️ 해외 여행 / 비자',
      career: '📄 취업 / 커리어',
      utility: '🛠️ 직구 / 생활',
      entertainment: '🎮 게임 / 엔터'
    },
    launchBtn: '도구 실행하기 →',
    freeBadge: '무료 & 무설치',
    charterTitle: '🛡️ MiniToolbox.dev 프라이버시 헌장',
    charterItems: [
      {
        title: '1. 제로 업로드 (Zero-Upload)',
        desc: '어떠한 이미지, PDF 문서, 개인정보도 중앙 서버로 업로드되지 않습니다. 모든 연산은 방문자의 디바이스 메모리 안에서만 수행됩니다.'
      },
      {
        title: '2. 영구 무료 (Free & Ad-Supported)',
        desc: '회원가입이나 유료 결제 없이 영구적으로 무료로 사용할 수 있습니다. 서버 유지비는 비간섭형 배너 광고를 통해서만 충당됩니다.'
      },
      {
        title: '3. 고유 도메인 라우팅',
        desc: '각 도구는 독립적인 서브도메인(pdf., size., anmeldung. 등)을 통해 전 세계 어디서든 가장 빠른 에지 CDN 네트워크로 제공됩니다.'
      }
    ],
    faqTitle: '자주 묻는 질문 (FAQ)',
    faqs: [
      {
        q: '정말로 제 파일이 서버로 전송되지 않나요?',
        a: '네. MiniToolbox의 모든 유틸리티는 WebAssembly, HTML5 Canvas, 브라우저 pdf-lib 라이브러리를 통해 100% 사용자의 PC/스마트폰 메모리에서만 동작합니다. 개발자 도구(F12)의 네트워크 탭을 확인해보셔도 파일 데이터가 외부로 1바이트도 전송되지 않음을 직접 확인하실 수 있습니다.'
      },
      {
        q: '모든 도구가 무료인가요? 결제나 가입이 필요한가요?',
        a: '회원가입, 신용카드 등록, 파일 개수 제한이 전혀 없는 100% 무료 서비스입니다. 복잡한 설치 없이 브라우저에서 즉시 실행됩니다.'
      },
      {
        q: '스마트폰 모바일 브라우저에서도 사용 가능한가요?',
        a: '아이폰 Safari, 안드로이드 Chrome 등 모바일 웹 브라우저 환경에서도 모든 기능(사진 리사이징, PDF 분할, 솅겐 계산기 등)이 동일하게 반응형으로 동작합니다.'
      }
    ],
    metaTitle: 'MiniToolbox.dev | 제로-업로드 프라이버시 마이크로 웹툴 포털',
    metaDesc: '서버 전송 0KB 완전 로컬 마이크로 유틸리티 포털. PDF 합치기/나누기, 서류 사진 리사이즈, 솅겐 체류일수 계산, 독일 안멜둥 서류 마스킹, 일본 이력서 와레키 자동완성, 동남아 비자런 D-Day 플래너.'
  },
  de: {
    portalBadge: 'Globales Portal für Web-Tools',
    zeroUploadBadge: '🔒 0KB Server-Upload Garantiert',
    heroBadge: '🚀 8 Unabhängige Client-Side Micro-Webapps',
    heroTitlePrefix: 'Schnell, Kostenlos & ',
    heroTitleHighlight: 'Zero-Upload',
    heroTitleSuffix: ' Werkzeuge',
    heroDesc: 'Null Byte private Daten verlassen Ihr Gerät. Alle Dateiverarbeitungen und Berechnungen laufen zu 100% lokal im Browser-Speicher und in der WebAssembly-Sandbox ab.',
    searchPlaceholder: 'Tools suchen (z.B. PDF, Anmeldung, Schengen, Lebenslauf, Schuhgröße...)',
    categories: {
      all: 'Alle Tools',
      privacy: '🔒 Datenschutz / Dokumente',
      travel: '✈️ Reisen / Visum',
      career: '📄 Karriere / Bewerbung',
      utility: '🛠️ Shopping / Nützliches',
      entertainment: '🎮 Spiele / Freizeit'
    },
    launchBtn: 'Tool öffnen →',
    freeBadge: 'Kostenlos & Ohne Installation',
    charterTitle: '🛡️ MiniToolbox.dev Datenschutz-Charta',
    charterItems: [
      {
        title: '1. Zero-Upload Architektur',
        desc: 'Keine Bilder, PDF-Dokumente oder sensiblen Texte werden jemals an einen zentralen Server übertragen. Alles wird im lokalen Gerätespeicher verarbeitet.'
      },
      {
        title: '2. Dauerhaft Kostenlos',
        desc: 'Keine Registrierung, keine Abonnements oder versteckten Kosten. Die minimale Infrastruktur wird durch unaufdringliche Bannerwerbung finanziert.'
      },
      {
        title: '3. Dedizierte Subdomains',
        desc: 'Jedes Werkzeug läuft auf einer eigenen Subdomain (pdf., anmeldung., schengen. usw.) mit weltweiter blitzschneller Auslieferung.'
      }
    ],
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    faqs: [
      {
        q: 'Werden meine Daten wirklich nicht hochgeladen?',
        a: 'Ja, zu 100% garantiert. Sämtliche Tools laufen direkt in Ihrem Browser über WebAssembly, Canvas und pdf-lib. Sie können im Entwickler-Tab (F12) überprüfen, dass 0 Byte Daten übertragen werden.'
      },
      {
        q: 'Ist die Nutzung dauerhaft kostenlos?',
        a: 'Ja, alle Funktionen stehen ohne Registrierung, Kreditkarte oder Dateilimits dauerhaft kostenlos zur Verfügung.'
      },
      {
        q: 'Funktionieren die Tools auf Mobilgeräten?',
        a: 'Ja, MiniToolbox ist voll responsive und für iOS Safari und Android Chrome optimiert.'
      }
    ],
    metaTitle: 'MiniToolbox.dev | Datenschutz-fokussierte Web-Utilities (Zero-Upload)',
    metaDesc: '100% lokale Browser-Tools. PDF zusammenfügen/teilen, Bürgeramt-Checkliste, Schengen 90/180-Tage-Rechner, Foto-Komprimierung ohne Server-Upload.'
  },
  vi: {
    portalBadge: 'Cổng Công Cụ Web Tiện Ích Toàn Cầu',
    zeroUploadBadge: '🔒 Bảo Đảm Không Tải Lên Máy Chủ (0KB)',
    heroBadge: '🚀 8 Ứng Dụng Web Siêu Nhẹ Hoạt Động Cục Bộ',
    heroTitlePrefix: 'Nhanh Chóng, Miễn Phí & ',
    heroTitleHighlight: 'Zero-Upload',
    heroTitleSuffix: ' Tiện Ích',
    heroDesc: 'Không tải bất kỳ dữ liệu cá nhân nào lên máy chủ. Mọi thao tác xử lý tập tin, tính toán đều chạy 100% ngay trên trình duyệt của bạn với WebAssembly.',
    searchPlaceholder: 'Tìm kiếm công cụ (ví dụ: PDF, Cờ Caro, Schengen, Size giày, Visa run...)',
    categories: {
      all: 'Tất cả công cụ',
      privacy: '🔒 Bảo mật / Tài liệu',
      travel: '✈️ Du lịch / Visa',
      career: '📄 Nghề nghiệp / CV',
      utility: '🛠️ Mua sắm / Tiện ích',
      entertainment: '🎮 Trò chơi / Giải trí'
    },
    launchBtn: 'Mở công cụ →',
    freeBadge: 'Miễn phí & Không cần cài đặt',
    charterTitle: '🛡️ Cam Kết Bảo Mật MiniToolbox.dev',
    charterItems: [
      {
        title: '1. Kiến Trúc Zero-Upload',
        desc: 'Không có hình ảnh, tập tin PDF hay thông tin nhạy cảm nào được tải lên máy chủ. Toàn bộ xử lý nằm trong bộ nhớ thiết bị của bạn.'
      },
      {
        title: '2. Miễn Phí Mãi Mãi',
        desc: 'Không cần đăng ký tài khoản, không yêu cầu thẻ tín dụng hay gói thuê bao.'
      },
      {
        title: '3. Tốc Độ Tối Đa',
        desc: 'Mỗi công cụ chạy trên tên miền phụ độc lập (pdf., caro., size.,...) qua mạng lưới CDN toàn cầu.'
      }
    ],
    faqTitle: 'Câu Hỏi Thường Gặp (FAQ)',
    faqs: [
      {
        q: 'Tập tin của tôi có thực sự không bị tải lên máy chủ?',
        a: 'Hoàn toàn chính xác. Mọi công cụ chạy bằng WebAssembly và Canvas trực tiếp trên máy của bạn. Bạn có thể kiểm tra tab Network trong F12 để thấy không có byte dữ liệu nào rời khỏi thiết bị.'
      },
      {
        q: 'Dịch vụ có miễn phí không?',
        a: 'Hoàn toàn miễn phí, không giới hạn số lượng tập tin và không yêu cầu đăng nhập.'
      },
      {
        q: 'Có dùng được trên điện thoại không?',
        a: 'Có, giao diện tương thích hoàn hảo với cả iPhone Safari và Android Chrome.'
      }
    ],
    metaTitle: 'MiniToolbox.dev | Bộ Công Cụ Tiện Ích Web Bảo Mật Cục Bộ',
    metaDesc: 'Bộ tiện ích xử lý hoàn toàn trên trình duyệt: Ghép/tách PDF, chơi cờ caro P2P, tính ngày Schengen, đổi size giày quốc tế không cần tải lên máy chủ.'
  },
  ja: {
    portalBadge: 'グローバル マイクロWebツールポータル',
    zeroUploadBadge: '🔒 サーバー送信0KB保証',
    heroBadge: '🚀 8つの完全ローカル動作マイクロWebツール',
    heroTitlePrefix: '高速・安全・',
    heroTitleHighlight: 'Zero-Upload',
    heroTitleSuffix: ' ツールキット',
    heroDesc: 'サーバーへ機密ファイルや個人情報を一切送信しません。すべての処理はお使いのブラウザメモリとWebAssembly内で100%ローカルに完結します。',
    searchPlaceholder: 'ツールを検索（例: PDF, 履歴書, シェンゲン, 靴サイズ...）',
    categories: {
      all: 'すべてのツール',
      privacy: '🔒 プライバシー / 書類',
      travel: '✈️ 海外旅行 / ビザ',
      career: '📄 就職 / 履歴書',
      utility: '🛠️ 通販 / ユーティリティ',
      entertainment: '🎮 ゲーム / エンタメ'
    },
    launchBtn: 'ツールを開く →',
    freeBadge: '完全無料・インストール不要',
    charterTitle: '🛡️ MiniToolbox.dev プライバシー憲章',
    charterItems: [
      {
        title: '1. ゼロ・アップロード設計',
        desc: 'いかなる画像、PDF、個人情報も外部サーバーへ送信・保存されません。すべての計算は端末内部で実行されます。'
      },
      {
        title: '2. 永久無料＆会員登録不要',
        desc: 'アカウント登録やクレジットカード情報の入力は一切不要で、永久に無料でご利用いただけます。'
      },
      {
        title: '3. 独自サブドメイン配信',
        desc: '各ツールは独立したエッジサブドメイン（pdf., rirekisho., size.等）から世界中どこでも瞬時にロードされます。'
      }
    ],
    faqTitle: 'よくある質問 (FAQ)',
    faqs: [
      {
        q: '本当にファイルがサーバーに送信されないのですか？',
        a: 'はい、100%保証します。WebAssemblyやCanvas、ローカルJavaScriptライブラリのみを使用し、ブラウザ内で直接処理されます。開発者ツール（F12）のNetworkタブでも外部通信が0バイトであることをご確認いただけます。'
      },
      {
        q: '無料ですか？回数制限はありますか？',
        a: '完全無料です。利用回数やファイルサイズによる課金や制限は一切ありません。'
      },
      {
        q: 'スマートフォンでも利用できますか？',
        a: 'iOS SafariやAndroid Chromeなどのモバイルブラウザでも快適にご利用いただけます。'
      }
    ],
    metaTitle: 'MiniToolbox.dev | サーバー送信ゼロの安心Web便利ツールポータル',
    metaDesc: 'サーバー送信0KBの安心ブラウザツール群。PDF結合・分割、JIS規格履歴書作成、写真リサイズ、シェンゲン協定90日滞在計算など完全無料。'
  }
};
