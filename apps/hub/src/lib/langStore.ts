import { writable } from 'svelte/store';

export type HubLang = 'ko' | 'en';

export const currentLang = writable<HubLang>('ko');

export const translations = {
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
  }
};
