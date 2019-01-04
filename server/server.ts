import * as http from 'http'
import * as path from 'path'
import * as morgan from 'morgan'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as errorhandler from 'errorhandler'
import * as methodOverride from 'method-override'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'

import logger from './logger'
import { BattleRoom } from './rooms/battle'

const app = express()

const gameServer = new Server({
  server: http.createServer(app)
})

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

const port = Number(process.env.PORT || 8080)

gameServer.register('battle', BattleRoom)

app.use('/colyseus', monitor(gameServer))

gameServer.listen(port)

logger.info(`listening on port ${port}`)

export default { app, gameServer }
