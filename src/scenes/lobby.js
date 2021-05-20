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
        this.load.image('BG1', './assets/floor1BG.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('lobby','./assets/Lobby.json' );
    }
    create(){
        this.cameras.main.roundPixels = true;
        this.createKeys();
        //this.background = this.add.image(game.config.width/2, game.config.height/2, 'BG1');
        const map = this.make.tilemap({key: 'lobby'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);
        this.elevator = this.physics.add.sprite(game.config.width/2 + 125, 0 + 48, 'elevator', 0);
        this.elevator.body.offset.y = 0.5;
        this.player = new Player(this, game.config.width/2 - 12, game.config.height + 150, 'player', 0);
        map.createLayer('overPlayer', tileset);

        //const debugGraphics = this.add.graphics().setAlpha(0.7);
        //walls.renderDebug(debugGraphics, {
            //tileColor: null,
            //collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            //faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        //})


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
        this.player.update();
        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Lobby';
            this.scene.switch('Drawing');
        }
    }
    collisions(){
        this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
    }

    elveatorExit(){
        this.scene.start('Elevator', {test: this.test});
    }
}