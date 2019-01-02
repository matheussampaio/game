import Phaser from 'phaser'

export default class DebugScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Debug', active: true })
  }

  create() {
    const fpsOptions = { fontSize: 10, color: '#00ff00', align: 'left' }
    this.fpsText = this.add.text(10, 10, '--', fpsOptions)
    this.lastFps = 0
  }

  update() {
    if (this.lastFps !== this.game.loop.actualFps.toFixed(0)) {
      this.lastFps = this.game.loop.actualFps.toFixed(0)
      this.fpsText.setText(this.lastFps)
    }
  }
}
