module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
      },
      colors: {
        custom: {
          black: '#0F1727',
          textWhite: '#FDFFFF',
          grey: '#3b3b3b',
          boxBorder: 'rgba(55,65,81,1)',
          boxBorderTop: 'rgba(129,140,248,1)',
          boxBg: 'rgba(31,41,55,1)',
          progressBorder: 'rgba(55,65,81,1)'
        }
      }
    },
  },
  plugins: [],
}