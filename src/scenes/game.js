import Phaser from 'phaser'

import Images from '../assets/images'
import SpaceshipUFO from './game-objects/spaceship-ufo'

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
    // this.ufo = new SpaceshipUFO(this, 100, 100)
    //
    this.ufo2 = new SpaceshipUFO(this, 300, 300)

    // this.physics.add.existing(this.ufo2)
    this.ufo = this.physics.add.image(100, 100, 'ufo')
  }

  update() {
    this.ufo.setVelocityX(10)
  }
}
