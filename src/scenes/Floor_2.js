class Floor_2 extends Phaser.Scene{

    // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        this.test = data.test;
        this.floorList = data.floorList;
    }
    ///////////////////////////
 
    constructor() {
        super("Floor_2");    
    }
    

    preload(){
        this.load.image('BG2', './assets/floor2BG.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');

    }
    create(){
        this.cameras.main.fadeIn(1500, 0, 0, 0);
        this.elevatorEntered = false;
        this.createKeys();
        this. background = this.add.image(game.config.width/2, game.config.height/2, 'BG2');
        this.elevator = this.physics.add.sprite(game.config.width/2, 0 + 20, 'elevator', 0);
        this.elevator.body.immovable = true;
        this.player = new Player(this, game.config.width/2, game.config.height/2, 'player', 0);
        this.cameras.main.startFollow(this.player);
    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(!this.elevatorEntered)
            this.player.update();
        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Floor_2';
            this.scene.switch('Drawing');
        }
    }
    collisions(){
        if(!this.elevatorEntered)
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
    }

    elveatorExit(){
        this.elevatorEntered = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {test: this.test, floorList: this.floorList});
        })
    }
}