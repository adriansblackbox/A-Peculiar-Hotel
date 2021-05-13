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
        this.load.image('player', './assets/Detective Doggert 001.png');

    }
    create(){
        this.createKeys();
        
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0);

        console.log(this.testNumber);
        
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