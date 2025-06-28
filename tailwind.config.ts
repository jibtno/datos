import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
  fontFamily: {
    outfit: ["var(--font-outfit)", "sans-serif"],
    mont:   ["Mont", "sans-serif"],
  },
  fontSize: {
    "theme-xs": "0.75rem",    // 12 px
    "theme-sm": "0.8125rem",  // 13 px
  },
  // colours, boxShadow, zIndex … unchanged
},
      colors: {
        ...colors,
        primary: "#FF6B00",
        brand: colors.blue,
        'blue-light': colors.sky,
        gray: colors.slate,
        success: colors.emerald,
        error: colors.red,
        warning: colors.amber,
        'theme-pink': colors.pink,
        'theme-purple': colors.purple,
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-theme-sm)',
        'theme-md': 'var(--shadow-theme-md)',
        'theme-lg': 'var(--shadow-theme-lg)',
        'theme-xl': 'var(--shadow-theme-xl)',
        'theme-xs': 'var(--shadow-theme-xs)',
        'datepicker': 'var(--shadow-datepicker)',
        'focus-ring': 'var(--shadow-focus-ring)',
        'slider-navigation': 'var(--shadow-slider-navigation)',
        'tooltip': 'var(--shadow-tooltip)',
      },
      zIndex: {
        '1': 'var(--z-index-1)',
        '9': 'var(--z-index-9)',
        '99': 'var(--z-index-99)',
        '999': 'var(--z-index-999)',
        '9999': 'var(--z-index-9999)',
        '99999': 'var(--z-index-99999)',
        '999999': 'var(--z-index-999999)',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailgrids/plugin"),
  ],
};
export default config;
