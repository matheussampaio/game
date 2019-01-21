import Phaser from 'phaser'

export default class FindGameScene extends Phaser.Scene {
  menuContainer = document.getElementById('menu-container')

  startButton = document.getElementById('start-game')

  constructor() {
    super({ key: 'FindGame' })
  }

  create() {
    this.menuContainer.classList.remove('hidden')

    this.startButton.addEventListener('click', () => {
      this.startGame()
    })
  }

  startGame() {
    this.menuContainer.classList.add('hidden')
    this.scene.start('Game')
  }
}
