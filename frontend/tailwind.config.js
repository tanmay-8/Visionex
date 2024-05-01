/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        "light-bg":"#eff4f6",
        "dark-bg":"#191c24",
        "light-bg-sec":"#ffffff",
        "dark-bg-sec":"#22252f",
        "light-text":"#1B9C85",
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};
