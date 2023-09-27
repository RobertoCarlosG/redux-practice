/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    "./src/**/*.{js,ts,jsx,tsx}",

    // path to tremor modules
    "./node_modules/@tremor/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

