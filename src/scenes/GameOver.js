class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER\nPRESS R TO RESTART", {
            fontFamily: 'comic sans',
            fontSize: 40,
            fontStyle: 'bold',
            color: '#FACADE',
            align: 'center'
        })
        this.title.setOrigin(0.5)

        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if (this.restartKey.isDown) {
            this.scene.start('playScene')
        }
    }
}
