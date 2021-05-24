let config = {
    type: Phaser.AUTO,
    //width: 960,
    //height: 720,
    width: 640,
    height: 360,
    pixelArt: true,
    scene: [Menu, Lobby, Elevator, Floor_1, Floor_2, Floor_3, Floor_4, Floor_5, Floor_6, Drawing],

    // variables for states in game
    prevScene: '',
    resetGame: false,

    // physics logic
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,    // Set to true for testing purposes only
            gravity: {
                x: 0,
                y: 0
            },
            fps: 60
        }
    },
    // scale game logic
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
};


let game = new Phaser.Game(config);
let keyLEFT, keyRIGHT, keyUP, keyDOWN, noteBookKey, eraseKey, goBack;