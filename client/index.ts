import 'babel-polyfill'
import Colyseus from 'colyseus.js'

import Game from './game'
import GameAPI from './game-api'

async function main() {
  const api = new GameAPI()
  const game = new Game()

  await api.connect('battle')

  api.room.state.onChange = (changes: Colyseus.DataChange[]) => {
    changes.forEach((change: Colyseus.DataChange) => {
      if (change.field === 'position') {
        game.graphics.clear()

        game.shape.x = change.value.x
        game.shape.y = change.value.y

        game.graphics.fillRectShape(game.shape);
      }
    })
  }
}

main()
