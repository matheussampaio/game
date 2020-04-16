import Phaser from 'phaser'

export default class Game {
  config: Phaser.Types.Core.GameConfig
  game: Phaser.Game
  shape: Phaser.Geom.Rectangle
  graphics: any

  constructor() {
    const self = this
    this.config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 1000,
      scene: {
        create() {
          self.graphics = this.add.graphics({
            lineStyle: {
              width: 3,
              color: 0xff00ff
            },
            fillStyle: {
              color: 0x00ff00
            }
          });

          self.shape = new Phaser.Geom.Rectangle(100, 100, 20, 20)
        }
      }
    }

    this.game = new Phaser.Game(this.config)
  }
}
