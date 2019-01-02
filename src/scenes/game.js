import Phaser from 'phaser'

import Images from '../assets/images'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' })
  }

  preload() {
    this.load.image('ufo', Images.SpaceshipUFO)
    // this.load.image('background', Images.BackgroundStarfield)
  }

  create() {
    // this.add.tileSprite(0, 0, this.game.canvas.width, this.game.canvas.height, 'background').setOrigin(0)
  }

  update() {
  }
}
