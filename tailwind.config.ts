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
        lightGray: '#D9D9D9',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
