class Title extends Phaser.Scene {
    constructor() {
        super("titleScene")
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)
        this.title = this.add.text(this.game.config.width * 0.5, 128, "SPACE BLASTER II\nPRESS SPACE TO START", {
            fontFamily: 'comic sans',
            fontSize: 40,
            fontStyle: 'bold',
            color: '#FACADE',
            align: 'center'
        })
        this.title.setOrigin(0.5)

        this.startKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (this.startKey.isDown) {
            this.scene.start('playScene')
        }
    }
}
