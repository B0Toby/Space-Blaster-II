class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        this.title = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title').setOrigin(0.5)
        this.anims.create({
            key: 'title',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('title', {
                start: 0,
                end: 7
            })
        })
        this.title.play('title')

        this.titleLoop = this.sound.add('titleLoop', { volume: 0.5, loop: true })
        this.titleLoop.play()

        this.input.keyboard.on('keydown', () => {
            this.titleLoop.stop()
            this.scene.start('menuScene')
        })
    }
}
