import { Room, Client } from 'colyseus'
import { Schema, type, MapSchema } from '@colyseus/schema'

import logger from '../../logger'
import State from './state'

export default class BattleRoom extends Room<State> {
  maxClients = 2

  onCreate(options: any) {
    logger.info('BattleRoom created!', options)

    this.setState(new State())
  }

  onJoin(client: Client) {
    logger.info('Client joined', client.sessionId)

    this.state.createPlayer(client.sessionId)
  }

  onLeave(client: Client) {
    this.broadcast(`${client.sessionId} left.`)

    this.state.removePlayer(client.sessionId)
  }

  onMessage(client: Client, data: any) {
    logger.info(`BattleRoom received message from ${client.sessionId}: ${data}`)

    this.state.movePlayer(client.sessionId, data)
  }

  onDispose() {
    logger.info('Dispose BattleRoom')
  }
}
