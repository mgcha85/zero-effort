export type SupportedLang = 'ko' | 'vi' | 'en';

export const translations = {
  ko: {
    appNameCaro: 'Cờ Caro & Cờ Tướng - 웹 대국실',
    appNameSize: '글로벌 직구 의류/신발 치수 변환기',
    appNameWasm: '초경량 개인정보 안심 파일 도구 (WASM)',
    terms: '이용약관',
    privacy: '개인정보처리방침',
    refund: '환불/취소 정책',
    copySuccess: '클립보드에 복사되었습니다!',
    shareResult: '결과 공유하기',
    calculate: '계산하기',
    reset: '초기화'
  },
  vi: {
    appNameCaro: 'Cờ Caro & Cờ Tướng Online - Chơi Ngay',
    appNameSize: 'Công Cụ Quy Đổi Size Giày & Quần Áo Quốc Tế',
    appNameWasm: 'Công Cụ Nén & Chuyển Đổi File Không Cần Tải Lên',
    terms: 'Điều khoản dịch vụ',
    privacy: 'Chính sách bảo mật',
    refund: 'Chính sách hoàn tiền',
    copySuccess: 'Đã sao chép vào bộ nhớ tạm!',
    shareResult: 'Chia sẻ kết quả',
    calculate: 'Tính toán',
    reset: 'Đặt lại'
  },
  en: {
    appNameCaro: 'Caro & Xiangqi Online - Instant P2P Board Games',
    appNameSize: 'Global Shoe & Clothing Size Converter',
    appNameWasm: 'Client-Side Private File & PDF Compressor (WASM)',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    refund: 'Refund Policy',
    copySuccess: 'Copied to clipboard!',
    shareResult: 'Share Result',
    calculate: 'Calculate',
    reset: 'Reset'
  }
} as const;

export function t(lang: SupportedLang, key: keyof typeof translations['ko']): string {
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}
