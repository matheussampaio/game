class UI extends Phaser.Group {
  constructor(game, x, y) {
    console.log('UI::constructor::begin')

    super(game)

    const button = this.game.make.button(0, 0, 'button', this.actionOnClick, this, 2, 1, 0)

    button.x = this.game.world.width - button.width - 10
    button.y = (this.game.world.height - button.height) / 2

    this.add(button)

    this.onButtonClicked = new Phaser.Signal()

    console.log('UI::constructor::end')
  }

  actionOnClick() {
    this.onButtonClicked.dispatch(this)
  }
}
