import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4B6BFB',
          dark: '#3A56E0',
          light: '#6B8AFF',
        },
        secondary: {
          DEFAULT: '#FF89BB',
          dark: '#FF6BA3',
          light: '#FFA8CC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;

