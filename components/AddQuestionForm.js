var Component = require('choo/component')
var html = require('choo/html')

class AddQuizForm extends Component {
  constructor(id, state, emit) {
    super(id)
    this.emit = emit
    this.bank = state.bank;
    this.local = state.components[id] = {
      question: "",
      answer: ""
    }
    this.handleInput = this.handleInput.bind(this)
    this.addQuiz = this.addQuiz.bind(this)
    this.renderQuestions = this.renderQuestions.bind(this)
  }

  handleInput(event) {
    const { target: { name, value } } = event;
    this.local[name] = value;
  }

  addQuiz(event) {
    event.preventDefault()

    this.emit('bank:add', Object.assign({ id: Date.now() }, this.local))
    this.local.question = ""
    this.local.answer = ""
  }

  renderQuestions() {
    return this.bank.map(({ id, question }) => {
      return html`
        <li>
          <p>
            ${question.endsWith('?') ? question : question + '?'}
            <span class="pointer dim red" onclick=${() => this.emit('bank:remove', id)}>(remove)</span>
          </p>
        </li>
      `
    })
  }

  createElement() {
    return html`
      <div>
        <form class="flex flex-column w-100" onsubmit=${this.addQuiz}>
          <h2 class="dark-green">Add question</h2>
          <input
            class="input-reset pa2 ba b--black-10 mb2"
            autofocus="true"
            type="text"
            required="true"
            placeholder="Question"
            name="question"
            value=${this.local.question}
            oninput=${this.handleInput}
          >
          <input
            type="text"
            class="input-reset pa2 ba b--black-10 mb2"
            placeholder="Answer"
            required="true"
            name="answer"
            value=${this.local.answer}
            oninput=${this.handleInput}
          >
          <button class="button-reset bg-dark-green bn pa2 white b dim pointer" type="submit">Add</button>
        </form>

        <ol>          
          ${this.renderQuestions()}
        </ol>
      </div>
    `
  }

  update(bank) {
    this.bank = bank
    return true
  }
}

module.exports = AddQuizForm