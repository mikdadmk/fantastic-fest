module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Ensure this points to your JSX/TSX files
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontFamily: {
        'aesthetic': ['Aesthetic Romance', 'sans-serif'], // Custom font
        'anek': ['Anek Malayalam', 'sans-serif'], 
        'poppins': ['Poppins', 'sans-serif'],        // Google font
      },
    },
  },
  plugins: [],
}
