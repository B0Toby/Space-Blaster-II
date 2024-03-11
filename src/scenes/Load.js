class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        // font
        this.load.bitmapFont('arcade', 'font/Arcade.png', 'font/Arcade.xml')

        // audio
        this.load.audio('bgmusic', 'audio/bgm.wav')
        this.load.audio('titleLoop', 'audio/titleLoop.wav')
        this.load.audio('explosion1', 'audio/sfx-explosion1.wav')
        this.load.audio('explosion2', 'audio/sfx-explosion2.wav')
        this.load.audio('explosion3', 'audio/sfx-explosion3.wav')
        this.load.audio('explosion4', 'audio/sfx-explosion4.wav')
        this.load.audio('shot', 'audio/shot.wav')
        this.load.audio('coin', 'audio/coin.wav')

        // img
        this.load.image('background1', 'img/originalBackground.png')
        this.load.image('coin', 'img/coin.png')

        this.load.spritesheet('title', 'img/title.png', {
            frameWidth: 750,
            frameHeight: 540
        })

        this.load.spritesheet('explosion1', 'img/explosion1.png', {
            frameWidth: 54,
            frameHeight: 54
        })
        this.load.image('enemyShip1', 'img/enemyShip1.png')
        this.load.spritesheet('enemyShip2', 'img/enemyShip2.png', {
            frameWidth: 56,
            frameHeight: 32
        })
        this.load.spritesheet('enemyShip3', 'img/enemyShip3.png', {
            frameWidth: 28,
            frameHeight: 20
        })
        this.load.image('enemyLaser', 'img/enemyLaser.png')
        this.load.image('playerLaser', 'img/playerLaser.png')
        this.load.spritesheet('playerShip', 'img/playerShip.png', {
            frameWidth: 48,
            frameHeight: 48
        })

        // loadingBar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xFFFFFF
            }
        })
        
        this.load.on('fileprogress', (file, value) => {
            loadingBar.fillRect(0, this.cameras.main.height / 2, this.cameras.main.width * value, 5)
        })

        this.load.on('complete', () => {
            this.scene.start('titleScene')
        })
    }
}
