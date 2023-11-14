import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{jsx,tsx}", "./app/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-exo-2)", "sans-serif"],
        exo2: ["var(--font-exo-2)", "sans-serif"],
      },
      colors: {
        light: {
          primary: '#333', // Define your light mode colors here
          secondary: '#666',
          // ...
        },
        dark: {
          primary: '#ccc', // Define your dark mode colors here
          secondary: '#999',
          // ...
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
