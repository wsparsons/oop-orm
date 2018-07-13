const app = require('express')()
const { PORT = 5000, NODE_ENV = 'development' } = process.env

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.get('/ping', (req, res, next) => {
  res.json({ message: 'pong!' })
})

app.use((req, res, next) => {
  const status = 404
  const message = `Could not ${req.method} ${req.path}`
  next({ status, message })
})

app.use((err, req, res, next) => {
  if (NODE_ENV !== 'test') console.error(err)

  const { status = 500, message = `Something went wrong` } = err
  res.status(status).json({ status, message })
})

module.exports = app
