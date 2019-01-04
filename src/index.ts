import * as Colyseus from 'colyseus.js'
import Phaser from 'phaser'

import GameScene from './scenes/game'
import DebugScene from './scenes/debug'

import './index.scss'

window.onload = () => {
  window.Phaser = Phaser
  const host = window.document.location.host.replace(/:.*/, '')
  const protocol = location.protocol.replace('http', 'ws')
  const port = location.port ? `:${location.port}` : ''

  const url = `${protocol}${host}${port}`

  console.log(url)

  const client = new Colyseus.Client(url)

  const room = client.join('battle')

  const players = {}

  const colors = ['red', 'green', 'yellow', 'blue', 'cyan', 'magenta']

  room.listen('players/:id', (change) => {
    if (change.operation === 'add') {
      const dom = document.createElement('div')

      dom.className = 'player'
      dom.style.left = `${change.value.x}px`
      dom.style.top = `${change.value.y}px`
      dom.style.background = colors[Math.floor(Math.random() * colors.length)]
      dom.innerHTML = `Player ${change.path.id}`

      players[change.path.id] = dom

      document.body.appendChild(dom)
    } else if (change.operation === 'remove') {
      document.body.removeChild(players[change.path.id])
      delete players[change.path.id]
    }
  })

  const config = {
    title: 'My Game',
    version: '0.0.0-alpha',
    input: {
      keyboard: false,
      mouse: true,
      touch: false,
      gamepad: false
    },
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
      GameScene,
      DebugScene
    ],
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    render: {
      pixelArt: true
    }
  }

  window.game = new Phaser.Game(config)
}
