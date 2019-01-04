import { Room, EntityMap, Client, nosync } from 'colyseus'

import logger from '../logger'

export class State {
  players: EntityMap<Player> = {}

  @nosync
  something = "this wont be sent to client-side"

  createPlayer(id: string) {
    this.players[id] = new Player()
  }

  removePlayer(id: string) {
    delete this.players[id]
  }

  movePlayer(id: string, movement: any) {
    if (movement.x) {
      this.players[id].x += movement.x * 10
    } else if (movement.y) {
      this.players[id].y += movement.y * 10
    }
  }
}

export class Player {
  x = Math.floor(Math.random() * 400)

  y = Math.floor(Math.random() * 400)
}

export class BattleRoom extends Room {
  maxClients = 2

  onInit(options: any) {
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
