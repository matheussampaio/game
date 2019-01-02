import Phaser from 'phaser'

import GameScene from './scenes/game'
import DebugScene from './scenes/debug'

window.onload = () => {
  window.Phaser = Phaser

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

  const game = new Phaser.Game(config)

  window.game = game
}
