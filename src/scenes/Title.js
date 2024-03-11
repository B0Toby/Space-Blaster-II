class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        this.title = this.add.image(0, 0, 'title').setOrigin(0, 0)

        this.titleLoop = this.sound.add('titleLoop', { volume: 0.5, loop: true })
        this.titleLoop.play()

        this.input.keyboard.on('keydown', () => {
            this.titleLoop.stop()
            this.scene.start('menuScene')
        })
    }
}
