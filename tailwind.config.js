import { type Config } from "tailwindcss"

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a365d",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#2c5282",
          foreground: "#ffffff",
        },
        background: "#ffffff",
        foreground: "#1a202c",
        muted: {
          DEFAULT: "#e2e8f0",
          foreground: "#4a5568",
        },
      },
    },
  },
  plugins: [],
}

export default config

