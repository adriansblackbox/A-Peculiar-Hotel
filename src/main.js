let config = {
    type: Phaser.CANVAS,
    //width: 960,
    //height: 720,
    width: 640,
    height: 320,
    pixelArt: true,
    scene: [Menu, Credits, Lobby, Drawing, Elevator, Floor_4, Floor_3, Floor_2, Floor_1_OTHER, Floor_2_OTHER, Floor_3_OTHER, Floor_4_OTHER,  Floor_0_OTHER, Floor_0, Floor_1],

    //3 is ballroom, 1 is square patrolling ghost, 2 is long corridor, 4 is following ghosts
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

let keyLEFT, keyRIGHT, keyUP, keyDOWN, noteBookKey, eraseKey, goBack, interactKey, keyYes, keyNo, testKey, statusKey, restartGame;