/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Component/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        'orange-300': '#D4AF37',
        'orange-400': '#C9A227',
        'orange-500': '#BD9718',
      },
      fontFamily: {
        lora: ['Lora', 'serif'],
        Inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '14': '3.5rem',
        '18': '4.5rem',
        '24': '6rem',
        '55': '13.75rem',
        '80': '20rem',
      },
      height: {
        '820': '820px',
      },
      zIndex: {
        '50': '50',
      },
    },
  },
  plugins: [],
} 