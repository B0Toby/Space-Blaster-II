let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 550,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    zoom: 1,
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
