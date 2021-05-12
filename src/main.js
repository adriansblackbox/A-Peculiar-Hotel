//will probably want to change size
// Bailey: doubling size of the canvas from Rocket Patrol Assignment
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    pixelArt: true,
    //scene: [Menu, Play],

    /*
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
    */   
};


let game = new Phaser.Game(config);
let keyLEFT, keyRIGHT, keyF, keyR, keyUP, keyDOWN, keySPACE;