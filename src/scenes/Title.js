class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.add.bitmapText(this.game.config.width * 0.5, 150, 'arcade', 'SPACE BLASTER II\nPRESS SPACE TO START\nC FOR CREDIT', 32, 1).setOrigin(0.5)

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.C = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    }

    update() {
        if (this.startKey.isDown) {
            this.scene.start('playScene')
        }
        if (this.C.isDown) {
            this.scene.start('creditScene')
        }
    }
}
