class Boot {
    create() {
        console.log('Boot::create::begin');

        this.game.state.start('preload');

        console.log('Boot::create::end');
    }
}
