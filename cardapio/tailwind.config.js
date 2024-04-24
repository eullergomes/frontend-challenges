/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    //extend - extender (adicionar) propriedades (classes) padrões
    extend: {
      backgroundImage: {
        'home': "url('/assets/bg.png')",
      }
    },
  },
  plugins: [],
}

