class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // debug toggle
        // this.input.keyboard.on('keydown-E', function () {
        //     this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        //     this.physics.world.debugGraphic.clear()
        // }, this)

        this.bgmusic = this.sound.add('bgmusic', { volume: 0.5, loop: true })
        this.bgmusic.play()

        this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height)

        this.background = this.add.image(0, 0, 'background1').setOrigin(0, 0)

        this.anims.create({
            key: 'enemyShip2',
            frames: this.anims.generateFrameNumbers('enemyShip2'),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'enemyShip3',
            frames: this.anims.generateFrameNumbers('enemyShip3'),
            frameRate: 6,
            repeat: -1
        })
        this.anims.create({
            key: 'explosion1',
            frames: this.anims.generateFrameNumbers('explosion1'),
            frameRate: 10,
            repeat: 1,
        })
        this.anims.create({
            key: 'playerShip',
            frames: this.anims.generateFrameNumbers('playerShip'),
            frameRate: 20,
            repeat: -1
        })
        this.anims.create({
            key: 'coin',
            frames: this.anims.generateFrameNumbers('coin'),
            frameRate: 8,
            repeat: -1
        })

        this.sfx = {
            explosions: [
                this.sound.add('explosion1'),
                this.sound.add('explosion2'),
                this.sound.add('explosion3'),
                this.sound.add('explosion4'),
                this.sound.add('explosion5'),
                this.sound.add('explosion6')
            ],
            laser: this.sound.add('shot'),
        }

        // Score
        this.score = 0
        this.scoreText = this.add.bitmapText(this.game.config.width - 120, this.game.config.height - 40, 'arcade', this.score.toString().padStart(4, '0'), 48).setOrigin(0.5)

        this.player = new Player(this, this.game.config.width/2, this.game.config.height/2, 'playerShip')
        // console.log(this.player)
        this.player2 = new Player(this, game.config.width/2, game.config.height, 'playerShip')
        this.player2.setVisible(false)
        this.player2.body.enable = false
        this.isDuplicated = false

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        this.keySHIFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.enemies = this.add.group()
        this.enemyLasers = this.add.group()
        this.playerLasers = this.add.group()
        this.coins = this.add.group()

        this.coinSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(12500, 17500),
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
                        Phaser.Math.Between(50, this.game.config.width - 50),
                        0
                    )
                }
                else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType('ChaserShip').length < 5) {

                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(50, this.game.config.width - 50),
                            0
                        )
                    }
                }
                else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(50, this.game.config.width - 50),
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
    }

    togglePlayerDuplication() {
        this.isDuplicated = !this.isDuplicated
        this.player2.setVisible(this.isDuplicated)
        if (this.isDuplicated) {
            this.player2.x = this.player.x - 48
            this.player2.y = this.player.y
            this.player2.body.enable = true
        } else {
            this.player2.body.enable = false
        }
    }

    getEnemiesByType(type) {
        let arr = []
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            let enemy = this.enemies.getChildren()[i]
            if (enemy.getData('type') == type) {
                arr.push(enemy)
            }
        }
        return arr
    }

    spawnCoin() {
        let x = Phaser.Math.Between(50, this.game.config.width - 50)
        let coin = new Coin(this, x, 0)
        this.coins.add(coin)
    }

    collectCoin(player, coin) {
        coin.destroy();
        this.sound.play('coin');

        this.player.enhanceFireRate();
        if (this.isDuplicated) {
            this.player2.enhanceFireRate();
        }
    
        let flashEffect = (target) => {
            let flashCount = 0;
            let flashEvent = this.time.addEvent({
                delay: 100,
                callback: () => {
                    target.setTint(flashCount % 2 === 0 ? 0xFFFFFF : 0x000000);
                    flashCount++;
                    if (flashCount > 5) {
                        target.clearTint();
                        flashEvent.remove();
                    }
                },
                repeat: 5
            });
        };
    
        flashEffect(this.player);
        if (this.isDuplicated) {
            flashEffect(this.player2);
        }
    }
    

    playerDead(player) {
        // Destroy the other player if one is dead
        if (player === this.player && this.player2 && !this.player2.getData('isDead')) {
            this.player2.explode(false)
        }
        if (player === this.player2 && this.player && !this.player.getData('isDead')) {
            this.player.explode(false)
        }
        // Handle game over or other logic here
    }

    update() {
        if (!this.player.getData('isDead')) {
            this.player.update()
            if (this.keyW.isDown || this.keyUp.isDown) {
                this.player.moveUp()
            }
            if (this.keyS.isDown || this.keyDown.isDown) {
                this.player.moveDown()
            }
            if (this.keyA.isDown || this.keyLeft.isDown) {
                this.player.moveLeft()
            }
            if (this.keyD.isDown || this.keyRight.isDown) {
                this.player.moveRight()
            }            
        }

        if (this.keySpace.isDown) {
            this.player.setData('isShooting', true)
            if (this.isDuplicated) {
                this.player2.setData('isShooting', true)
            }
        } else {
            this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1)
            this.player.setData('isShooting', false)
            if (this.isDuplicated) {
                this.player2.setData('timerShootTick', this.player.getData('timerShootDelay') - 1)
                this.player2.setData('isShooting', false)
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keySHIFT)) {
            this.togglePlayerDuplication()
        }

        if (this.isDuplicated) {
            this.player2.setData('timerShootDelay', this.player.getData('timerShootDelay'))
            this.player2.setData('timerShootTick', this.player.getData('timerShootTick'))
            this.player2.x = this.player.x - 48
            this.player2.y = this.player.y

            if (this.player2.getData('isShooting')) {
                if (this.player2.getData('timerShootTick') < this.player2.getData('timerShootDelay')) {
                    this.player2.setData('timerShootTick', this.player2.getData('timerShootTick') + 1)
                } else {
                    let laser = new PlayerLaser(this, this.player2.x, this.player2.y)
                    this.playerLasers.add(laser)
                    this.sfx.laser.play()
                    this.player2.setData('timerShootTick', 0)
                }
            }
        }


        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy()
                }
                enemy.explode(true)
                playerLaser.destroy()
                this.score++
                this.scoreText.setText(this.score.toString().padStart(4, '0'))
            }
        }, null, this)

        this.physics.add.overlap([this.player, this.player2], this.enemies, function (player, enemy) {
            if (!player.getData('isDead') && !enemy.getData('isDead')) {
                player.explode(false)
                player.onDestroy()
                enemy.explode(true)
            }
        }, null, this)
        
        this.physics.add.overlap([this.player, this.player2], this.enemyLasers, function (player, laser) {
            if (!player.getData('isDead') && !laser.getData('isDead')) {
                player.explode(false)
                player.onDestroy()
                laser.destroy()
            }
        }, null, this)

        this.physics.add.overlap([this.player, this.player2], this.coins, this.collectCoin, null, this)

        // gg
        if (this.player.getData('isDead')) {
            this.cameras.main.shake(7, 0.015)
            this.bgmusic.stop()
        }
        if (this.score < 0) {
            this.bgmusic.stop()
            this.scene.start('gameOverScene')
        }
        if (this.score > highscore){
            highscore = this.score
        }

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
                    this.cameras.main.shake(10, 0.02)
                    this.score -= 4 // -4 when enemy go down screen
                    this.pass = this.sound.add('pass')
                    this.pass.play()
                    this.scoreText.setText(this.score.toString().padStart(4, '0'))
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
