class Game extends Phaser.State {
    constructor() {
        console.log('Game::constructor::being');

        super();

        console.log('Game::constructor::end');
    }

    create() {
        console.log('Game::create::being');


        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');

        this.game.ready = false;
        this.game.input.mouse.capture = true;
        this.game.time.advancedTiming = true;
        this.game.state.disableVisibilityChange = true;

        this.spaceship = new Spaceship(this.game, 100, 200);
        this.game.add.existing(this.spaceship);

        this.ui = new UI(this.game);

        this.ui.onButtonClicked.add(this.onButtonClicked, this);

        this.game.add.existing(this.ui);

        console.log('Game::create::end');
    }

    update() {

    }

    onButtonClicked() {
        console.log('Game::onButtonClicked');

        if (this.game.ready === false) {
            this.game.ready = true;
        }
    }

    render() {
        this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00');
    }
}
