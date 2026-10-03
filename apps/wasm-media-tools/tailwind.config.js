/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    '../../packages/shared-ui/src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#F2FAF7',
          100: '#E2F5EE',
          200: '#C5EBDD',
          300: '#98DBC4',
          400: '#5EC3A4',
          500: '#34A887',
          600: '#26876D',
          700: '#1F6C58',
          800: '#1C5647',
          900: '#18473B'
        }
      }
    }
  },
  plugins: []
};
