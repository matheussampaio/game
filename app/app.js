let game;

window.onload = function () {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');

    game.state.add('boot', Boot);
    game.state.add('preload', Preload);
    game.state.add('game', Game);

    game.state.start('boot');
};
