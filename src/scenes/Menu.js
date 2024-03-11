class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.add.bitmapText(this.game.config.width * 0.5, 200, 'arcade', 'Play (Press W)\nCredit (Press A)\nTutorial (Press D)', 32, 1).setOrigin(0.5)
        this.add.bitmapText(this.game.config.width * 0.5, 400, 'arcade', 'HIGHSCORE: ' + highscore, 32, 1).setOrigin(0.5)

        this.titleLoop = this.sound.add('titleLoop', { volume: 0.5, loop: true })
        this.titleLoop.play()

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (this.keyA.isDown) {
            this.scene.start('creditScene')
            this.titleLoop.stop()
        }
        if (this.keyD.isDown) {
            this.scene.start('tutorScene')
            this.titleLoop.stop()
        }
        if (this.keyW.isDown) {
            this.scene.start('playScene')
            this.titleLoop.stop()
        }
    }
}
