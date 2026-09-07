/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./contexts/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        synapse: {
          dark: '#050814',
          obsidian: '#02040a',
          primary: '#0ea5e9', // Sky 500
          cyan: '#00f5ff',
          accent: '#6366f1', // Indigo 500
          violet: '#8b5cf6',
          light: '#f8fafc',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(14,165,233,0.3))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(0,245,255,0.7))' },
        }
      }
    },
  },
  plugins: [],
}
