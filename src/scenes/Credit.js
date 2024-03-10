class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.add.bitmapText(this.game.config.width * 0.5, 150, 'arcade', 'CREDIT SCENE\nPRESS SPACE TO\nRETURN MENU', 32, 1).setOrigin(0.5)

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (this.startKey.isDown) {
            this.scene.start('titleScene')
        }
    }
}