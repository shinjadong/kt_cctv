/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // CCTV 보안 업계에 어울리는 색상 팔레트
      colors: {
        'security-blue': '#1e40af',
        'trust-green': '#059669',
        'warning-orange': '#ea580c',
        'professional-gray': '#374151'
      },
      // 폰트 패밀리 추가
      fontFamily: {
        'garamond': ['var(--font-garamond)', 'serif'],
      },
      // 모바일 최적화를 위한 반응형 breakpoints
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
} 