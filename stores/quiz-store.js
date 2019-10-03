function store(state, emitter) {
  state.bank = []

  emitter.on('DOMContentLoaded', function () {
    emitter.on('bank:add', function (quiz) {
      state.bank = [...state.bank, quiz]
      emitter.emit(state.events.RENDER)
    })
    emitter.on('bank:remove', function (id) {
      state.bank = state.bank.filter(q => q.id !== id);
      emitter.emit(state.events.RENDER)
    })
  })
}

module.exports = store