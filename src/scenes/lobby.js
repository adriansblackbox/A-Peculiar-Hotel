class Lobby extends Phaser.Scene{

    constructor() {
        super("Lobby");    
    }

        // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        // data to be passed into lobby
    }
    ///////////////////////////
    preload(){
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('lobby','./assets/Lobby.json' );
        this.load.image('monster','./assets/MM1.png' );

    }
    create(){
        this.enteredElevator = false;
        this.floorList = ['Floor_1', 'Floor_2', 'Floor_3', 'Floor_4', 'Floor_5', 'Floor_6'];

        this.password = [];
        this.passwordIndex = -1;

        this.passwordElements = [0, 1, 2, 3, 4, 5];
        while(this.password.length < 6){
            let randIndex = Phaser.Math.Between(0, this.passwordElements.length - 1);
            this.password.push(this.passwordElements[randIndex]);
            this.passwordElements.splice(randIndex, 1);
        }
        console.log('Password: ' + this.password);

        this.createKeys();
        const map = this.make.tilemap({key: 'lobby'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');

        map.createLayer('Ground', tileset);
        map.createLayer('extra', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        this.elevator = this.physics.add.sprite(game.config.width/2 + 125, 0 + 48, 'elevator', 0);
        this.elevator.body.immovable = true;
        this.elevator.body.offset.y = 0.5;
        this.monster = new Monster(this, game.config.width/2 - 12, game.config.height + 50, 'monster', 0);
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
        this.monster.update();
    }
    collisions(){
        if(!this.enteredElevator)
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
    }

    elveatorExit(){
        this.enteredElevator = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}