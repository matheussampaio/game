import Phaser from 'phaser'

import GameScene from './scenes/game'
import DebugScene from './scenes/debug'

import './index.scss'

window.onload = () => {
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
    width: 800,
    height: 500,
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
