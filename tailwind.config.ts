import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{jsx,tsx}',
    './app/**/*.{jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-exo-2)', 'sans-serif'],
        exo2: ['var(--font-exo-2)', 'sans-serif'],
      },
      backgroundImage: {

      },
      colors: {

      },
    },
  },
  plugins: [],
}
export default config
