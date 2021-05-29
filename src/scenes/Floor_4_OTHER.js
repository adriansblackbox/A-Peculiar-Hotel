class Floor_4_OTHER extends Phaser.Scene{

    // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        this.findingTime = data.findingTime
        this.password = data.password;
        this.floorList = data.floorList;
        this.passwordIndex = data.passwordIndex;
        this.finishedLevel = data.finishedLevel;
    }
    ///////////////////////////
 
    constructor() {
        super("Floor_4_OTHER");    
    }
    

    preload(){
        this.load.image('BG6', './assets/floor6BG.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');

    }
    create(){
        this.timeOut = false;

        this.cameras.main.fadeIn(1500, 0, 0, 0);
        this.createKeys();
        this. background = this.add.image(game.config.width/2, game.config.height/2, 'BG6');
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
    update(time, delta){
        if(this.findingTime > 0)
            this.player.update();
        else if(!this.timeOut && this.findingTime <= 0){
            this.timeOut = true;
            this.exitLevel();
        }

        this.findingTime -= delta;

        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Floor_4_OTHER';
            this.scene.switch('Drawing');
        }
    }
    collisions(){
        
    }

    exitLevel(){
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Floor_4', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, finishedLevel: true
            , playerX: this.player.x, playerY: this.player.y});
        })
    }
}