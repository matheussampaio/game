import Phaser from 'phaser'

export default class SpaceshipUFO extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, 'ufo')

    // this.enableBody(true, 0, 0, true, true)
    // this.setCollideWorldBounds(true)

    console.log('constructor ufo')
  }

  create() {
    console.log('create ufo')
  }

  update() {
    console.log('update ufo')
  }
}
