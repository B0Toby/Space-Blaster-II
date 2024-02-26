let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

let game = new Phaser.Game(config)