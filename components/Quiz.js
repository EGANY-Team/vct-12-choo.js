var Component = require('choo/component')
var html = require('choo/html')
var _ = require('underscore')

class Quiz extends Component {
  constructor(id, state, emit) {
    super(id)
    this.shouldInit = true
    this.emit = emit
    this.local = {}

    this.answer = this.answer.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.init = this.init.bind(this)
  }

  init(state, forced = false) {
    if (!this.shouldInit && !forced) return;

    // copy to avoid getting old object
    // keyword: pass by reference
    const _bank = state.bank.map(obj => Object.assign({}, obj))
    const total = Math.min(_bank.length, 5)

    this.local = {
      current: 0,
      total,
      quizzes: _.sample(_bank, total),
      points: 0,
      answer: ""
    }
    this.emit('render')
  }

  load() {
    this.shouldInit = false
  }

  unload() {
    this.shouldInit = true
  }

  handleInput({ target: { name, value } }) {
    this.local[name] = value;
  }

  answer(event) {
    const { quizzes, current, answer } = this.local
    const currentQuiz = quizzes[current]
    const isCorrect = currentQuiz.answer.trim().toLowerCase() === answer.trim().toLowerCase()

    event.preventDefault()

    if (isCorrect) {
      // correct answer
      this.local.points += 1
    }
    if (current < quizzes.length) {
      // go to next question if available
      this.local.current += 1
    }
    currentQuiz.correct = isCorrect
    currentQuiz.userAnswer = answer
    this.local.answer = ""
    this.emit('render')
  }

  renderResult() {
    return this.local.quizzes.map(q => html`
      <ul class="list pa0 mb2 ${q.correct ? "green" : "red"}">
        <li class="ma0">
          <strong>Question:</strong> ${q.question}
        </li>
        <li>
          <strong>Answer:</strong> ${q.answer}
        </li>
        <li>
          <strong>Your answer:</strong> ${q.userAnswer}
        </li>
      </ul>
    `)
  }

  createElement(state) {
    const retry = () => {
      this.init(state, true)
    }

    this.init(state)

    if (!this.local.quizzes || this.local.quizzes.length === 0) {
      return html`<div>No question found. Please add at least 1 question to start!</div>`
    }
    if (!this.local.quizzes[this.local.current]) {
      return html`
        <div>
          <h3>Done, your score is: ${this.local.points}/${this.local.total}</h3>
          <h3>Detail:</h3>
          ${this.renderResult()}
          <button
            class="button-reset db w-100 pa2 ba bg-transparent b--dark-green dark-green dim pointer"
            onclick=${retry}
          >
            Try again
          </button>
        </div>
      `
    }
    return html`
      <div>
        <h3>
          Question ${this.local.current + 1}/${this.local.total}: ${
      this.local.quizzes[this.local.current].question
      }
        </h3>
        <form class="flex flex-column w-100" onsubmit=${this.answer}>
          <input
            class="input-reset pa2 mb2 ba b--black-10"
            type="text"
            placeholder="Your answer"
            required="true"
            name="answer"
            value=${this.local.answer}
            oninput=${this.handleInput}
          >
          <button class="button-reset bg-dark-green white bn b dim pa2 pointer" type="submit">Answer</button>
        </form>
      </div>
    `
  }
  update() {
    return true
  }
}

module.exports = Quiz