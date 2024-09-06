/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Tailwind가 적용될 파일의 경로 설정
  ],
  theme: {
    extend: {
      textColor: {
        DEFAULT: 'text-grey-500',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Forms 플러그인 추가
  ],
}