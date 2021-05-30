let config = {
    type: Phaser.CANVAS,
    //width: 960,
    //height: 720,
    width: 640,
    height: 360,
    pixelArt: true,
    scene: [Lobby, Menu, Floor_4, Elevator, Floor_1, Floor_3, Floor_2, Floor_1_OTHER, Floor_2_OTHER, Floor_3_OTHER, Floor_4_OTHER, Drawing],

    // variables for states in game
    prevScene: '',
    resetGame: false,

    // physics logic
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,    // Set to true for testing purposes only
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
let keyLEFT, keyRIGHT, keyUP, keyDOWN, noteBookKey, eraseKey, goBack, interactKey;