import { Schema, type } from '@colyseus/schema'

export default class Player extends Schema {
  @type('number')
  x = Math.floor(Math.random() * 400)

  @type('number')
  y = Math.floor(Math.random() * 400)
}
