import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nfl: {
          navy: '#013369',
          red: '#D50A0A',
        },
        seahawks: {
          navy: '#002244',
          green: '#69BE28',
          grey: '#A5ACAF',
        },
        patriots: {
          blue: '#002244',
          red: '#C60C30',
          silver: '#B0B7BC',
        },
        surface: {
          900: '#0a0f1a',
          800: '#111827',
          700: '#1a2236',
          600: '#2a3349',
          500: '#3b4560',
        },
      },
    },
  },
  plugins: [],
};
export default config;
