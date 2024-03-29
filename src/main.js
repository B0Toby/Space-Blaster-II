// Name: Toby Pang
// Title: Space Blaster II
// Approximate time: 32 hours

/*
Phaser's major components: physics systems, cameras, text objects, animation manager, timers

Creative Tilt Justification:
My game has its unique and interesting chaser ship logic,
new pickup that enhance the firing rate and the speed of the lasers,
and the strategic depth added by allowing players to toggle between
1/2 ships using the shift key. These elements, along with the "juice"
like screen shakes when player ship is destroyed, enrich the gaming
experience, demonstrating creativity, technical skill, and extra polish.

Sources:
https://sfxr.me/
https://soundraw.io/
https://motionarray.com/sound-effects/video-game-fails-1638351/
https://www.looperman.com/loops/detail/349097/startup-menu-esq-almost-8bit-typa-loop-free-115bpm-8bit-chiptune-arpeggio-loop
https://www.dafont.com/arcade-classic-2.font
*/

let config = {
    type: Phaser.AUTO,
    width: 750,
    height: 540,
    scale: {
        // mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    zoom: 1.6,
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [ Load, Title, Menu, Tutor, Credit, Play, GameOver ]
}

let game = new Phaser.Game(config)

let highscore = 0
