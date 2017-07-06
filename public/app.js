const Game = {
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas').getContext('2d'),
    WIDTH: this.canvas.width,
    HEIGHT: this.canvas.height,
    spaceships: [],

    addSpaceship({ x, y, dx, dy, width = 50, height = 50 }) {
        if (dx == null) {
            dx = Math.random() * 10 - 5;
        }

        if (dy == null) {
            dy = Math.random() * 10 - 5;
        }

        this.spaceships.push({
            x, y, width, height, dx, dy
        });

        console.log('add', {
            x, y, width, height, dx, dy
        });
    },

    update() {
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);

        // move
        this.spaceships.forEach((spaceship) => {
            if (Keyboard.leftPressed) {
                spaceship.dx += spaceship.dx >= 0 ? -0.1 : 0.1;
            } else if (Keyboard.rightPressed) {
                spaceship.dx += spaceship.dx >= 0 ? 0.1 : -0.1;
            } else if (Keyboard.upPressed) {
                spaceship.dy += spaceship.dy >= 0 ? 0.1 : -0.1;
            } else if (Keyboard.downPressed) {
                spaceship.dy += spaceship.dy >= 0 ? -0.1 : 0.1;
            }

            if (Keyboard.count) {
                console.log(Keyboard.count, { dx: spaceship.dx, dy: spaceship.dy });
            }

            spaceship.x += spaceship.dx;
            spaceship.y += spaceship.dy;

            if (spaceship.x <= 0 || spaceship.x >= this.WIDTH) {
                spaceship.dx *= -1;
            }

            if (spaceship.y <= 0 || spaceship.y >= this.HEIGHT) {
                spaceship.dy *= -1;
            }
        });
    },

    render() {
        this.spaceships.forEach((spaceship) => {
            this.ctx.beginPath();
            this.ctx.arc(spaceship.x, spaceship.y, 10, 0, Math.PI*2);
            this.ctx.fillStyle = '#0095DD';
            this.ctx.fill();
            this.ctx.closePath();
        });
    }
};

const Keyboard = {
    count: 0,
    keys: [
        {
            code: 37,
            name: 'left'
        },
        {
            code: 38,
            name: 'up'
        },
        {
            code: 39,
            name: 'right'
        },
        {
            code: 40,
            name: 'down'
        }
    ],

    keyDownHandler(e) {
        Keyboard.keys.forEach((key) => {
            const name = key.name + 'Pressed';

            if (key.code === e.keyCode && !Keyboard[name]) {
                Keyboard.count += key.code;
                Keyboard[name] = true;
                console.log('down', key.name);
            }
        });
    },

    keyUpHandler(e) {
        Keyboard.keys.forEach((key) => {
            const name = key.name + 'Pressed';

            if (key.code === e.keyCode && Keyboard[name]) {
                Keyboard.count -= key.code;
                Keyboard[name] = false;
                console.log('up', key.name);
            }
        });
    }
};

;(() => {

    Game.addSpaceship({
        x: Game.WIDTH / 2,
        y: Game.HEIGHT / 2
    });

    function main(tFrame) {
        Game.stopMain = window.requestAnimationFrame(main);

        Game.update();
        Game.render();
    }

    document.addEventListener('keydown', Keyboard.keyDownHandler, false);
    document.addEventListener('keyup', Keyboard.keyUpHandler, false);


    const socket = io.connect('http://localhost:3000');

    socket.on('hello', function (data) {
        console.log(data);
        socket.emit('start', { my: 'data'  });
    });

    main(performance.now());
})();
