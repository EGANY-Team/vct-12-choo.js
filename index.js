var css = require('sheetify')
var choo = require('choo')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
} else {
  app.use(require('choo-service-worker')())
}

app.use(require('./stores/quiz-store'))

app.route('/', require('./views/bank'))
app.route('/start', require('./views/quiz'))
app.route('/*', require('./views/404'))

module.exports = app.mount('main')
