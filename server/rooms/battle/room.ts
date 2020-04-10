import { Room, Client } from 'colyseus'
import { Logger } from 'pino'

import logger from '../../logger'
import State from './state'

export default class BattleRoom extends Room<State> {
  maxClients = 2
  log: Logger

  onCreate(options: any) {
    this.log = logger.child({ roomId: this.roomId })
    this.log.info('BattleRoom created!', options)

    this.setState(new State())
  }

  onJoin(client: Client) {
    this.log.info('Client joined', client.sessionId)

    this.state.createPlayer(client.sessionId)

    if (this.clients.length === this.maxClients) {
      this.log.info('locking room', this.roomId)
      this.lock()
    }
  }

  onLeave(client: Client) {
    this.state.removePlayer(client.sessionId)
  }

  onMessage(client: Client, data: any) {
    this.log.info(`BattleRoom received message from ${client.sessionId}: ${data}`)

    this.state.movePlayer(client.sessionId, data)
  }

  onDispose() {
    this.log.info('Dispose BattleRoom')
  }
}
