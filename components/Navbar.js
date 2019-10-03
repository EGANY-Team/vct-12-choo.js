var Component = require('choo/component')
var html = require('choo/html')

class Navbar extends Component {
  constructor(id, state, emit) {
    super(id)
    this.emit = emit;
    this.local = state.components[id] = {
      active: ""
    }
  }
  load() {
    if (location) {
      this.local.active = location.pathname
      this.emit('render')
    }
  }

  renderMenu() {
    return [
      { path: '/', title: 'Bank' },
      { path: '/start', title: 'Start' }
    ].map(({ path, title }) => {
      return html`
        <li onclick=${() => {
          this.local.active = path
        }}>
          <a href="${path}" class="db link dim mh2 ${path === this.local.active ? "white" : "white-60"}">${title}</a>
        </li>
      `
    })
  }
  createElement() {
    return html`
      <nav class="flex pv3 ph4 justify-between items-center bg-dark-green white">
        <h3 class="ma0">
          Vọc cùng Thành #12 - Choo
        </h3>
        <ul class="flex list items-center ma0">
          ${this.renderMenu()}
        </ul>
      </nav>
    `
  }

  update() {
    return true
  }
}

module.exports = Navbar