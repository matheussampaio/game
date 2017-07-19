class Spaceship extends Phaser.Sprite {
    constructor(game, x, y) {
        console.log('Spaceship::constructor::begin');

        super(game, x, y, 'ufo', 0);

        window.spaceship = this;

        this.target = { x, y };

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;
        this.anchor.setTo(.5, .5);
        this.game.input.onDown.add(this.onClick, this);

        this.game.debug.body('ufo');

        console.log('Spaceship::constructor::end');
    }

    update() {
        if (this.game.ready === false) {
            return;
        }

        if (game.physics.arcade.distanceToXY(this, this.target.x, this.target.y) > 5) {
            this.angle = game.physics.arcade.angleToXY(this, this.target.x, this.target.y);

            game.physics.arcade.velocityFromRotation(this.angle, 100, this.body.velocity);
        } else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            this.game.ready = false;
        }
    }

    onClick(event) {
        this.target = event.positionDown;
    }
}
