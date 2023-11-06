import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {

      },
      colors: {
        'marvingreen': '#2c634f',
        'marvinprimary-500': '#2c5c63',
        'marvinprimary-300': '#33A5B1',
        'marvinprimary-100': '#C3E9ED',
        'marvinblue': '#2c4163',
      },
    },
  },
  plugins: [],
}
export default config
