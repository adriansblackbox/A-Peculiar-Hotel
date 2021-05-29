class Floor_3 extends Phaser.Scene{

    // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        this.password = data.password;
        this.floorList = data.floorList;
        this.passwordIndex = data.passwordIndex;
        this.finishedLevel = data.finishedLevel;
        this.playerX = data.playerX;
        this.playerY = data.playerY;
    }
    ///////////////////////////
 
    constructor() {
        super("Floor_3");    
    }
    

    preload(){
        this.load.image('BG1', './assets/floor1BG.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('floor3','./assets/Floor_3.json' );

    }
    create(){
        this.findingTime = 10000;




        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.createKeys();

        const map = this.make.tilemap({key: 'floor3'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);


        this.elevator = this.physics.add.sprite(game.config.width + 20, 400, 'elevator', 0);
        this.elevator.body.offset.y = 0.5;
        this.elevator.body.immovable = true;
        if(!this.finishedLevel)
            this.player = new Player(this, game.config.width + 20, 430, 'player', 0);
        else
        this.player = new Player(this, this.playerX, this.playerY, 'player', 0);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);
    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
    update(){
        if(!this.elevatorEntered)
            this.player.update();
        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Floor_3';
            this.scene.switch('Drawing');
        }
        if(interactKey.isDown){
            this.scene.start('Floor_3_OTHER', {findingTime: this.findingTime, password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        }
    }
    collisions(){
    }

    elveatorExit(){
        this.elevatorEntered = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}