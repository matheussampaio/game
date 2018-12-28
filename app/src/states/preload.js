class Preload extends Phaser.State {
  constructor() {
    console.log('Preload::constructor::being')

    super()

    this.asset = null
    this.ready = false

    console.log('Preload::constructor::end')
  }

  preload() {
    console.log('Preload::preload::begin')


    console.log('Preload::preload::end')
  }

  create() {
    console.log('Preload::create::begin')

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)

    this.load.image('ufo', 'assets/sprites/ufo.png')
    this.load.image('background', 'assets/misc/starfield.jpg')

    this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71)

    this.load.start()

    console.log('Preload::create::end')
  }

  update() {
    console.log('Preload::update::being')

    if (this.ready) {
      this.game.state.start('game')
    }

    console.log('Preload::update::end')
  }

  onLoadComplete() {
    this.ready = true
  }
}
