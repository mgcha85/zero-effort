<script lang="ts">
  import LegalModal from './LegalModal.svelte';

  export let lang: 'ko' | 'en' | 'de' | 'vi' | 'ja' | 'es' | 'th' | 'fr' | string = 'en';

  let activeModal: 'terms' | 'privacy' | null = null;

  const legalContent: Record<string, { terms: { title: string; body: string }; privacy: { title: string; body: string } }> = {
    ko: {
      terms: {
        title: '이용약관',
        body: `
          <h4 class="font-bold text-base mb-2">제1조 (목적)</h4>
          <p class="mb-4">본 약관은 차데이터리서치(이하 "회사")가 제공하는 모든 온라인 유틸리티 서비스의 이용조건 및 절차에 관한 제반 사항을 규정함을 목적으로 합니다.</p>
          <h4 class="font-bold text-base mb-2">제2조 (서비스의 제공 및 면책)</h4>
          <p class="mb-4">회사는 무료 또는 유료로 웹 유틸리티 도구를 제공하며, 도구의 계산 결과는 참고용으로 법적 책임을 지지 않습니다. 사용자는 산출 결과의 정확성을 직접 최종 확인해야 합니다.</p>
          <h4 class="font-bold text-base mb-2">제3조 (지적 재산권)</h4>
          <p>서비스 내 알고리즘, UI 디자인, 소프트웨어 저작권은 회사에 귀속됩니다.</p>
        `
      },
      privacy: {
        title: '개인정보처리방침',
        body: `
          <h4 class="font-bold text-base mb-2">1. 개인정보 수집 및 처리 목적</h4>
          <p class="mb-4">본 서비스의 대다수 유틸리티(계산기, 미디어 변환기, PDF 도구)는 사용자의 개인정보나 입력 데이터를 서버로 전송하지 않고 브라우저 로컬(Client-side)에서 즉시 처리합니다.</p>
          <h4 class="font-bold text-base mb-2">2. 제3자 서비스 및 쿠키</h4>
          <p class="mb-4">접속 통계 분석(Google Analytics)을 위해 익명 쿠키가 사용될 수 있습니다. 사용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.</p>
          <h4 class="font-bold text-base mb-2">3. 개인정보 보호책임자</h4>
          <p>성명: 차민규 | 연락처: privacy@chadata.kr</p>
        `
      }
    },
    en: {
      terms: {
        title: 'Terms of Service',
        body: `
          <h4 class="font-bold text-base mb-2">Article 1 (Purpose)</h4>
          <p class="mb-4">These terms govern the use of online utility web tools provided by Cha Data Research ("the Company").</p>
          <h4 class="font-bold text-base mb-2">Article 2 (Service Provision & Disclaimer)</h4>
          <p class="mb-4">The company provides web utilities free of charge. Calculations and conversions are for informational purposes only. Users must independently verify final figures.</p>
          <h4 class="font-bold text-base mb-2">Article 3 (Intellectual Property)</h4>
          <p>All algorithms, UI designs, and software copyrights belong to Cha Data Research.</p>
        `
      },
      privacy: {
        title: 'Privacy Policy',
        body: `
          <h4 class="font-bold text-base mb-2">1. Zero Server Upload Architecture</h4>
          <p class="mb-4">Our utilities (PDF merger, photo resizer, calculators) process files and data 100% locally within client browser memory. No private files or text are transmitted to remote servers.</p>
          <h4 class="font-bold text-base mb-2">2. Analytics & Cookies</h4>
          <p class="mb-4">Anonymous statistical cookies (Google Analytics) may be used to measure aggregate visitor counts.</p>
          <h4 class="font-bold text-base mb-2">3. Data Protection Officer</h4>
          <p>Name: Min Gyu Cha | Contact: privacy@chadata.kr</p>
        `
      }
    },
    de: {
      terms: {
        title: 'Nutzungsbedingungen',
        body: `
          <h4 class="font-bold text-base mb-2">§ 1 Geltungsbereich</h4>
          <p class="mb-4">Diese Nutzungsbedingungen regeln die Nutzung der von Cha Data Research bereitgestellten webbasierten Hilfsprogramme.</p>
          <h4 class="font-bold text-base mb-2">§ 2 Haftungsausschluss</h4>
          <p class="mb-4">Die Bereitstellung der Tools erfolgt unentgeltlich. Berechnungsergebnisse dienen lediglich unverbindlichen Informationszwecken.</p>
          <h4 class="font-bold text-base mb-2">§ 3 Urheberrecht</h4>
          <p>Alle Softwarearchitekturen, Designs und Inhalte unterliegen dem Schutz des Urheberrechts.</p>
        `
      },
      privacy: {
        title: 'Datenschutzerklärung',
        body: `
          <h4 class="font-bold text-base mb-2">1. Lokale Datenverarbeitung (Zero-Upload)</h4>
          <p class="mb-4">Unsere Werkzeuge verarbeiten sensible Unterlagen und Berechnungen ausschließlich lokal im Arbeitsspeicher Ihres Endgeräts (Client-Side). Es findet keine Übertragung auf externe Server statt.</p>
          <h4 class="font-bold text-base mb-2">2. Webanalyse & Cookies</h4>
          <p class="mb-4">Zur Optimierung unseres Angebots werden anonymisierte Nutzungsstatistiken (Google Analytics) erfasst.</p>
          <h4 class="font-bold text-base mb-2">3. Datenschutzbeauftragter</h4>
          <p>Name: Min Gyu Cha | E-Mail: privacy@chadata.kr</p>
        `
      }
    }
  };

  function openModal(type: 'terms' | 'privacy') {
    activeModal = type;
  }

  function closeModal() {
    activeModal = null;
  }

  const labels: Record<string, { contact: string; terms: string; privacy: string; refund: string }> = {
    ko: { contact: '연락처', terms: '이용약관', privacy: '개인정보처리방침', refund: '환불/취소 정책' },
    en: { contact: 'Contact', terms: 'Terms of Service', privacy: 'Privacy Policy', refund: 'Refund Policy' },
    de: { contact: 'Kontakt', terms: 'Nutzungsbedingungen', privacy: 'Datenschutz', refund: 'Erstattungsrichtlinie' },
    vi: { contact: 'Liên hệ', terms: 'Điều khoản sử dụng', privacy: 'Chính sách bảo mật', refund: 'Chính sách hoàn tiền' },
    ja: { contact: 'お問い合わせ', terms: '利用規約', privacy: 'プライバシーポリシー', refund: '返金・キャンセルポリシー' },
    es: { contact: 'Contacto', terms: 'Términos de servicio', privacy: 'Política de privacidad', refund: 'Política de reembolso' },
    fr: { contact: 'Contact', terms: "Conditions d'utilisation", privacy: 'Confidentialité', refund: 'Remboursement' },
    th: { contact: 'ติดต่อเรา', terms: 'ข้อกำหนดการใช้งาน', privacy: 'นโยบายความเป็นส่วนตัว', refund: 'นโยบายการคืนเงิน' }
  };

  const businessInfo: Record<string, { reg: string; company: string }> = {
    ko: {
      reg: '통신판매업 신고번호: 제 2021-평택안출-0261호 | 사업자등록번호: 219-03-78291',
      company: '상호명: 차데이터리서치 | 대표자: 차민규 | 주소: 경기도 평택시 도대길 100-13'
    },
    en: {
      reg: 'Mail-order Business Reg: No. 2021-PyeongtaekAnjung-0261 | Business Reg No: 219-03-78291',
      company: 'Company: Cha Data Research | Representative: Min Gyu Cha | Address: 100-13, Dodae-gil, Pyeongtaek-si, Gyeonggi-do, Republic of Korea'
    },
    de: {
      reg: 'Versandhandelsregisternr.: 2021-PyeongtaekAnjung-0261 | USt-IdNr./Reg.-Nr.: 219-03-78291',
      company: 'Unternehmen: Cha Data Research | Vertreten durch: Min Gyu Cha | Adresse: 100-13, Dodae-gil, Pyeongtaek-si, Gyeonggi-do, Südkorea'
    },
    vi: {
      reg: 'Giấy phép ĐKKD: 2021-PyeongtaekAnjung-0261 | Mã số thuế: 219-03-78291',
      company: 'Doanh nghiệp: Cha Data Research | Đại diện: Min Gyu Cha | Địa chỉ: 100-13, Dodae-gil, Pyeongtaek-si, Gyeonggi-do, Hàn Quốc'
    },
    ja: {
      reg: '通信販売業届出番号: 第2021-平沢安出-0261号 | 事業者登録番号: 219-03-78291',
      company: '屋号: チャデータリサーチ | 代表者: 車民圭 (Min Gyu Cha) | 所在地: 大韓民国 京畿道 平沢市 都垈キル 100-13'
    },
    es: {
      reg: 'Registro de comercio electrónico: Nº 2021-PyeongtaekAnjung-0261 | NIF: 219-03-78291',
      company: 'Empresa: Cha Data Research | Representante: Min Gyu Cha | Dirección: 100-13, Dodae-gil, Pyeongtaek-si, Gyeonggi-do, República de Corea'
    },
    fr: {
      reg: "Enregistrement vente à distance : N° 2021-PyeongtaekAnjung-0261 | SIRET : 219-03-78291",
      company: "Entreprise : Cha Data Research | Représentant : Min Gyu Cha | Adresse : 100-13, Dodae-gil, Pyeongtaek-si, Gyeonggi-do, République de Corée"
    },
    th: {
      reg: 'ทะเบียนพาณิชย์อิเล็กทรอนิกส์: เลขที่ 2021-PyeongtaekAnjung-0261 | ทะเบียนนิติบุคคล: 219-03-78291',
      company: 'บริษัท: Cha Data Research | ผู้แทน: Min Gyu Cha | ที่อยู่: 100-13, Dodae-gil, Pyeongtaek-si, Gyeonggi-do, เกาหลีใต้'
    }
  };

  $: curLabels = labels[lang] || labels.en;
  $: curBiz = businessInfo[lang] || businessInfo.en;
  $: activeContent = (legalContent[lang] || legalContent.en)[activeModal || 'terms'];
</script>

<footer class="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-xs text-xs text-slate-500">
  <div class="mx-auto max-w-5xl px-4 py-6 sm:px-6">
    <!-- Links -->
    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-5 font-medium text-slate-600">
      <a href="mailto:contact@chadata.kr" class="hover:underline hover:text-slate-900 transition">
        {curLabels.contact}
      </a>
      <span class="text-slate-300">|</span>
      <a href="https://minitoolbox.dev/terms" class="hover:underline hover:text-slate-900 transition">
        {curLabels.terms}
      </a>
      <span class="text-slate-300">|</span>
      <a href="https://minitoolbox.dev/privacy" class="hover:underline hover:text-slate-900 transition">
        {curLabels.privacy}
      </a>
      <span class="text-slate-300">|</span>
      <a href="https://minitoolbox.dev/refund" class="hover:underline hover:text-slate-900 transition">
        {curLabels.refund}
      </a>
    </div>

    <!-- Required Business Info (Rule 11) - Fully Localized -->
    <div class="mt-3 text-center text-[10px] text-slate-400 space-y-0.5 leading-normal">
      <p>{curBiz.reg}</p>
      <p>{curBiz.company}</p>
      <p>© {new Date().getFullYear()} MiniToolbox · ZeroEffort. All rights reserved.</p>
    </div>
  </div>
</footer>

{#if activeModal}
  <LegalModal
    isOpen={true}
    title={activeContent.title}
    content={activeContent.body}
    lang={lang}
    onClose={closeModal}
  />
{/if}
