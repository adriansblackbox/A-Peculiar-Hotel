class Floor_2 extends Phaser.Scene{

    // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        this.testNumber = data.test;
    }
    ///////////////////////////
 
    constructor() {
        super("Floor_2");    
    }

    preload(){
        this.load.image('BG', './assets/floor2BG.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');

    }
    create(){
        this.createKeys();
        this. background = this.add.image(game.config.width/2, game.config.height/2, 'BG');
        this.elevator = this.physics.add.sprite(game.config.width/2, 0 + 20, 'elevator', 0);
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0);
        
    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(){
        this.player.update();
    }
}