const html = require('choo/html')

const Navbar = require('../components/Navbar');
const AddQuestionForm = require('../components/AddQuestionForm')

function view(state, emit) {
  return html`    
    <main class="sans-serif">
      ${state.cache(Navbar, 'nav-bar').render(state)}
      <div class="w-50 center pa3">
        ${state.cache(AddQuestionForm, 'bank-form').render(state.bank)}      
      </div>      
    </main>
  `
}

module.exports = view