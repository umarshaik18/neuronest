/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0f172a',
          primary: '#1e3a8a',
          primaryHover: '#1d4ed8',
          teal: '#0d9488',
          tealLight: '#ccfbf1',
          purple: '#7c3aed',
          purpleLight: '#f3e8ff',
          green: '#16a34a',
          greenLight: '#dcfce7',
          orange: '#ea580c',
          warmBg: '#f8fafc',
          cardBg: '#ffffff',
          slateMuted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'elevated': '0 20px 30px -10px rgba(30, 58, 138, 0.08), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
