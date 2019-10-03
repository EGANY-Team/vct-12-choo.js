const html = require('choo/html')

const Navbar = require('../components/Navbar');
const Quiz = require('../components/Quiz');

module.exports = view

function view(state, emit) {
  return html`
    <main class="sans-serif">
      ${state.cache(Navbar, 'nav-bar').render(state)}
      <div class="w-50 center pa3">
        ${state.cache(Quiz, 'quiz-form').render(state)}      
      </div>      
    </main>
  `
}