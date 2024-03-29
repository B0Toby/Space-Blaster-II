class Element extends Phaser.GameObjects.Sprite {Object
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key)

        this.scene = scene
        this.scene.add.existing(this)
        this.scene.physics.world.enableBody(this, 0)
        this.setData('type', type)
        this.setData('isDead', false)
    }

    explode(canDestroy) {
        if (!this.getData('isDead')) {
            this.setTexture('explosion1')
            this.play('explosion1')
            this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play()
            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false)
                }
            }
            this.setAngle(0)
            this.body.setVelocity(0, 0)
            this.on('animationcomplete', function () {
                if (canDestroy) {
                    this.destroy()
                }
                else {
                    this.setVisible(false)
                }
            }, this)
            this.setData('isDead', true)
        }
    }
}

// Player
class Player extends Element {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, 'Player')
        this.body.setCollideWorldBounds(true)
        this.setData('speed', 250)

        this.setData('isShooting', false)
        this.setData('timerShootDelay', 50)
        this.setData('timerShootTick', this.getData('timerShootDelay') - 1)
        this.setData('laserSpeed', -280)
        this.isPowerUpActive = false
    }

    moveUp() {
        this.body.velocity.y = -this.getData('speed')
    }
    moveDown() {
        this.body.velocity.y = this.getData('speed')
    }
    moveLeft() {
        this.body.velocity.x = -this.getData('speed')
    }
    moveRight() {
        this.body.velocity.x = this.getData('speed')
    }

    enhanceFireRate() {
        if(this.isPowerUpActive) return

        this.setData('timerShootDelay', 25) // rate of fire
        this.setData('laserSpeed', -400) // laser speed
        this.isPowerUpActive = true

        this.scene.time.delayedCall(10000, () => { // buff time
            this.setData('timerShootDelay', 50)
            this.setData('laserSpeed', -280)
            this.isPowerUpActive = false
        })
    }

    onDestroy() {
        this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                this.scene.scene.start('gameOverScene')
            },
            callbackScope: this,
            loop: false
        })
        this.scene.playerDead(this)
    }

    update() {
        this.body.setVelocity(0, 0)
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width)
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height)

        if (this.getData('isShooting')) {
            if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
                this.setData('timerShootTick', this.getData('timerShootTick') + 1)
            }
            else {
                let laser = new PlayerLaser(this.scene, this.x, this.y)
                this.scene.playerLasers.add(laser)
                this.scene.sfx.laser.play()
                this.setData('timerShootTick', 0)
            }
        }
    }
}

// Player laser
class PlayerLaser extends Element {
    constructor(scene, x, y) {
        super(scene, x, y, 'playerLaser')
        const playerLaserSpeed = scene.player.getData('laserSpeed')
        this.body.velocity.y = playerLaserSpeed
    }
}

// Enemy laser
class EnemyLaser extends Element {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyLaser')
        this.body.velocity.y = 200
    }
}

// Chaser ship
class ChaserShip extends Element {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyShip1', 'ChaserShip')

        this.body.velocity.y = Phaser.Math.Between(50, 100)

        this.states = {
            MOVE_DOWN: 'DOWN',
            CHASE: 'CHASE'
        }
        this.state = this.states.DOWN
    }

    update() {
        if (!this.getData('isDead') && this.scene.player) {
            if (Phaser.Math.Distance.Between(
                this.x,
                this.y,
                this.scene.player.x,
                this.scene.player.y
            ) < 300) { // Chase distance

                this.state = this.states.CHASE
            }

            // Chaser ship logic
            if (this.state == this.states.CHASE) {
                let dx = this.scene.player.x - this.x
                let dy = this.scene.player.y - this.y

                let angle = Math.atan2(dy, dx)

                let speed = 150
                this.body.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                )

                if (this.x < this.scene.player.x) {
                    this.angle -= 6
                }
                else {
                    this.angle += 6
                } 
            }
        }
    }
}

// Shooter ship
class ShooterShip extends Element {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyShip2', 'ShooterShip')
        this.play('enemyShip2')

        this.body.velocity.y = Phaser.Math.Between(50, 100)

        this.shootTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(800,2000),
            callback: function () {
                let laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y
                )
                laser.setScale(this.scaleX)
                this.scene.enemyLasers.add(laser)
            },
            callbackScope: this,
            loop: true
        })
    }

    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false)
            }
        }
    }
}

// SUS
class AmongusShip extends Element {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemyShip3', 'AmongusShip')
        this.play('enemyShip3')

        this.body.velocity.y = Phaser.Math.Between(50, 100)
    }
}

// Coin
class Coin extends Element {
    constructor(scene, x, y) {
        super(scene, x, y, 'coin', 'Coin')
        this.play('coin')

        this.body.velocity.y = Phaser.Math.Between(75, 100)
    }
}
