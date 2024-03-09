class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // debug toggle
        this.input.keyboard.on('keydown-E', function () {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height)

        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.anims.create({
            key: "enemyShip2",
            frames: this.anims.generateFrameNumbers("enemyShip2"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "enemyShip3",
            frames: this.anims.generateFrameNumbers("enemyShip3"),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: "explosion1",
            frames: this.anims.generateFrameNumbers("explosion1"),
            frameRate: 10,
            repeat: 1,
        })
        this.anims.create({
            key: "playerShip",
            frames: this.anims.generateFrameNumbers("playerShip"),
            frameRate: 20,
            repeat: -1
        })

        this.sfx = {
            explosions: [
                this.sound.add("explosion1"),
                this.sound.add("explosion2"),
                this.sound.add("explosion3"),
                this.sound.add("explosion4")
            ],
            laser: this.sound.add("shot"),
        }

        

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "playerShip"
        )
        // console.log(this.player)


        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.enemies = this.add.group()
        this.enemyLasers = this.add.group()
        this.playerLasers = this.add.group()
        this.coins = this.add.group()

        this.coinSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(15000, 20000),
            callback: this.spawnCoin,
            callbackScope: this,
            loop: true
        })

        this.time.addEvent({
            delay: 1000,
            callback: function () {
                let enemy = null

                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new ShooterShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    )
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {

                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        )
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    )
                }

                if (enemy !== null) {
                    enemy.setScale(Phaser.Math.Between(10, 20) * 0.1)
                    this.enemies.add(enemy)
                }
            },
            callbackScope: this,
            loop: true
        })

        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy()
                }
                enemy.explode(true)
                playerLaser.destroy()
            }
        })

        this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                player.explode(false)
                player.onDestroy()
                enemy.explode(true)
            }
        })

        this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                player.explode(false)
                player.onDestroy()
                laser.destroy()
            }
        })
    }

    getEnemiesByType(type) {
        let arr = []
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i]
            if (enemy.getData("type") == type) {
                arr.push(enemy)
            }
        }
        return arr
    }

    spawnCoin() {
        let x = Phaser.Math.Between(0, this.game.config.width)
        let coin = new Coin(this, x, 0)
        this.coins.add(coin)
    }

    collectCoin(player, coin) {
        coin.destroy()
        player.enhanceFireRate()
        this.sound.play("coin")
        // this.cameras.main.shake(150, 0.01)
    }

    update() {

        if (!this.player.getData("isDead")) {
            this.player.update()
            if (this.keyW.isDown) {
                this.player.moveUp()
            }
            else if (this.keyS.isDown) {
                this.player.moveDown()
            }
            if (this.keyA.isDown) {
                this.player.moveLeft()
            }
            else if (this.keyD.isDown) {
                this.player.moveRight()
            }

            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true)
            }
            else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1)
                this.player.setData("isShooting", false)
            }
        }

        if (this.player.getData("isDead")) {
            this.cameras.main.shake(100, 0.01)
        }

        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)

        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i]

            enemy.update()

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy()
                    }
                    enemy.destroy()
                }
            }
        }

        for (let i = 0; i < this.enemyLasers.getChildren().length; i++) {
            let laser = this.enemyLasers.getChildren()[i]
            laser.update()
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy()
                }
            }
        }

        for (let i = 0; i < this.playerLasers.getChildren().length; i++) {
            let laser = this.playerLasers.getChildren()[i]
            laser.update()
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy()
                }
            }
        }
    }
}
