class Lobby extends Phaser.Scene{

    constructor() {
        super("Lobby");    
    }

        // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        this.test = data.test;
    }
    ///////////////////////////
    preload(){
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('lobby','./assets/Lobby.json' );
    }
    create(){
        this.enteredElevator = false;
        this.floorList = ['Floor_1', 'Floor_2', 'Floor_3', 'Floor_4', 'Floor_5', 'Floor_6'];


        this.cameras.main.roundPixels = true;
        this.createKeys();
        const map = this.make.tilemap({key: 'lobby'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);
        this.elevator = this.physics.add.sprite(game.config.width/2 + 125, 0 + 48, 'elevator', 0);
        this.elevator.body.immovable = true;
        this.elevator.body.offset.y = 0.5;
        this.player = new Player(this, game.config.width/2 - 12, game.config.height + 150, 'player', 0);
        map.createLayer('overPlayer', tileset);


        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);
    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey('A');
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(!this.enteredElevator)
            this.player.update();
        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Lobby';
            this.scene.switch('Drawing');
        }
    }
    collisions(){
        if(!this.enteredElevator)
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
    }

    elveatorExit(){
        this.enteredElevator = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {test: this.test, floorList: this.floorList});
        })
    }
}