/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          land: '#10b981',
          food: '#ef4444',
          meals: '#f59e0b',
          skills: '#3b82f6',
        }
      },
    },
    plugins: [],
  }