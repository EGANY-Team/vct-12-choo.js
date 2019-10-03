var html = require('choo/html')

var TITLE = 'Vọc cùng Thành #12 - Không tìm thấy trang'


function view(state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)
  return html`
  <main class="sans-serif w-50 pa2 center tc">
    <h1 class="f1">404</h1>
    <img src="https://media1.tenor.com/images/242ad7ff116d66f6913992fe2a4d6c31/tenor.gif?itemid=7666840" alt="you're drunk, go home">
    <a class="db link green dim b mv3" href="/">You're drunk, go home!</a>
  </main>
  `
}

module.exports = view