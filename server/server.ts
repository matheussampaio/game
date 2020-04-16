import { createServer } from 'http'
import path from 'path'
import morgan from 'morgan'
import express from 'express'
import bodyParser from 'body-parser'
import errorhandler from 'errorhandler'
import methodOverride from 'method-override'
import cors from 'cors'
import { Server } from 'colyseus'
import { monitor } from '@colyseus/monitor'
import Bundler from 'parcel-bundler'

import logger from './logger'
import BattleRoom from './rooms/battle/room'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(errorhandler())

app.use(new Bundler('client/index.html', { hrm: false }).middleware())

const gameServer = new Server({
  server: createServer(app),
  express: app,
  pingInterval: 0
})

gameServer.define('battle', BattleRoom)

if (process.env.NODE_ENV !== 'production') {
  app.use('/colyseus', monitor())
}

gameServer.onShutdown(() => {
  console.log('game server is going down.')
})

const port = Number(process.env.PORT || 8080)

gameServer.listen(port)

logger.info(`listening on port ${port}`)

export default { app, gameServer }
