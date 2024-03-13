class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)
        this.gg = this.sound.add('gg')
        this.gg.play()

        this.add.bitmapText(this.game.config.width * 0.5, 200, 'arcade', ':(\nGAME OVER\nPRESS R TO RESTART', 32, 1).setOrigin(0.5)
        this.add.bitmapText(this.game.config.width * 0.5, 400, 'arcade', 'HIGHSCORE: ' + highscore, 32, 1).setOrigin(0.5)

        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (this.restartKey.isDown) {
            this.scene.start('playScene')
        }
    }
}
