class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene')
    }

    create() {
        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.add.bitmapText(172, 75, 'arcade', 'Credits:', 24, 0).setOrigin(0.5)
        this.add.bitmapText(300, 150, 'arcade', 'Code/Art: Toby Pang\nSFX/Music:\nsfxr.me\nsoundraw.io\nwww.looperman.com\nInstructor: Nathan Altice', 18, 0).setOrigin(0.5)
        this.add.bitmapText(this.game.config.width * 0.5, 400, 'arcade', 'Back to Menu (Press S)', 32, 1).setOrigin(0.5)

        this.titleLoop = this.sound.add('titleLoop', { volume: 0.5, loop: true })
        this.titleLoop.play()
        
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        if (this.keyS.isDown) {
            this.scene.start('menuScene')
            this.titleLoop.stop()
        }
    }
}
