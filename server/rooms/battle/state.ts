import { Schema, type, MapSchema } from '@colyseus/schema'

import Player from './player'

export default class State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>()

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
