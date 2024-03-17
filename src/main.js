// Name: Toby Pang
// Title: Space Blaster II
// Approximate time: 32 hours

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
            debug: false,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [ Load, Title, Menu, Tutor, Credit, Play, GameOver ]
}

let game = new Phaser.Game(config)

let highscore = 0
