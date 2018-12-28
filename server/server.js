const http = require('http')
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const methodOverride = require('method-override')
const socketio = require('socket.io')

const logger = require('./logger')

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(express.static(path.resolve('dist')))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(methodOverride())
app.use(errorhandler())

app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'))
})

const server = http.Server(app)
const io = socketio(server)

server.listen(process.env.PORT || 8080)

logger.info('listening on port 8080')

let id = 0

io.on('connection', (socket) => {
  id += 1

  logger.info('connection', id)

  socket.emit('hello', { id })

  socket.on('start', (data) => {
    logger.info('start', data)
  })
})

module.exports = server
