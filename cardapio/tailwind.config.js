/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    //extend - extender (adicionar) propriedades (classes) padrões
    extend: {
      backgroundImage: {
        'home': "url('/assets/bg.png')",
      }
    },
  },
  plugins: [],
}

