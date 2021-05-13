//will probably want to change size
// Bailey: doubling size of the canvas from Rocket Patrol Assignment
let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 720,
    pixelArt: true,
    scene: [Floor_1],

    
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,    // Set to true for testing purposes only
            gravity: {
                x: 0,
                y: 0
            },
            fps: 60
        }
    },
    
};


let game = new Phaser.Game(config);
let keyLEFT, keyRIGHT, keyUP, keyDOWN;