/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        vw: 'calc(100vw - (100vw - 100%))',
        indent: 'calc(100% - 50px)',
      },
      maxHeight: {
        inf: 999999999999,
      },
    },
  },
  plugins: [],
}
