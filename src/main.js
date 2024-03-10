let config = {
    type: Phaser.AUTO,
    width: 750,
    height: 540,
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    zoom: 1.6,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [ Load, Title, Play, GameOver, Credit ]
}

let game = new Phaser.Game(config)
