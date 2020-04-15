import * as Colyseus from 'colyseus.js'
import Phaser from 'phaser'

import { getWebsocketURL } from './utils'

let shape = null
let graphics = null

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  scene: {
    create() {
      graphics = this.add.graphics({
        lineStyle: {
          width: 3,
          color: 0xff00ff
        },
        fillStyle: {
          color: 0x00ff00
        }
      });

      shape = new Phaser.Geom.Rectangle(100, 100, 20, 20)
    }
  }
}

new Phaser.Game(config)

const client = new Colyseus.Client(getWebsocketURL())

client.joinOrCreate('battle')
  .then((room: Colyseus.Room) => {
    room.state.onChange = (changes: Colyseus.DataChange[]) => {
      changes.forEach((change: Colyseus.DataChange) => {
        if (change.field === 'position') {
          graphics.clear()

          shape.x = change.value.x
          shape.y = change.value.y

          graphics.fillRectShape(shape);
        }
      })
    }
  })
