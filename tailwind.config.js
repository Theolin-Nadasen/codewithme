/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'outline-glow': {
          '0%, 100%': {
            textShadow: '0 0 10px rgba(74, 222, 128, 0.5), 0 0 20px rgba(74, 222, 128, 0.3), 0 0 30px rgba(74, 222, 128, 0.2)',
          },
          '50%': {
            textShadow: '0 0 20px rgba(74, 222, 128, 0.8), 0 0 30px rgba(74, 222, 128, 0.6), 0 0 40px rgba(74, 222, 128, 0.4)',
          },
        },
      },
      animation: {
        'outline-glow': 'outline-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
module.exports = config;