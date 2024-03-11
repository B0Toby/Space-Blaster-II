class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.add.bitmapText(this.game.config.width * 0.5, 150, 'arcade', ':(\nGAME OVER\nPRESS R TO RESTART', 32, 1).setOrigin(0.5)

        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if (this.restartKey.isDown) {
            this.scene.start('playScene')
        }
    }
}
