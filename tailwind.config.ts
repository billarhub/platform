import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FFE5E1",
          200: "#FFC4B3",
          300: "#FFA385",
          400: "#FF8257",
          500: "#FF6129",
          600: "#F26223",
          700: "#E5631D",
          800: "#D86417",
          900: "#CB6511",
        },
        secondary: "#1A1C20",
        white: "#fff",
        light: "",
        dark: '#313131',
        lightGray: {
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D9D9D9',
          400: '#CDCDCD',
          500: '#B1B1B1',
          600: '#959595',
          700: '#797979',
          800: '#5D5D5D',
          900: '#414141',
        },
        tabBorderBottom: "#565656",
        tabBackground: "#F1F1F1",
        deleteButtonBackground: "#D9D9D9",
        deleteButtonText: "#979797",
        table: {
          headers: '#646262',
          headerBackground: '#A6A6A6',
          bodyBackground: '#D9D9D9'
        },
        stepperText: '#2C2B2B',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dashboardCardGradient': 'linear-gradient(180deg, #FF4E00 0%, #A53605 100%)',
      },
    },
  },
  plugins: [],
}
export default config
