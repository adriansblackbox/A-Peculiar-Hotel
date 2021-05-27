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
        this.load.image('monster','./assets/GhostSprite.png' );
        this.load.image('chest','./assets/chest.png' );


    }
    create(){
        this.enteredElevator = false;
        this.floorList = ['Floor_1', 'Floor_2', 'Floor_3', 'Floor_4'];


        this.password = [];
        this.passwordIndex = -1;

        this.passwordElements = [0, 1, 2, 3, 4, 5];
        while(this.password.length < 4){
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

        //starting to add the text (make sure to add character sprites below these lines)
        this.style = { font: "15px Arial", fill: "#ffff00", align: "center" };

        this.text = this.add.text(game.config.width/2.5, game.config.height*1.2, "WASD to move", this.style);
        //end of text stuff

        this.monster = new Monster(this, game.config.width/2 - 12, game.config.height + 50, 'monster', 0);
        this.player = new Player(this, game.config.width/2 - 12, game.config.height + 150, 'player', 0);
        map.createLayer('overPlayer', tileset);


        this.chest = this.physics.add.sprite(game.config.width/2 - 80, game.config.height + 150, 'chest', 0);
        this.chestText = this.add.text(this.chest.x,this.chest.y - 20, "", this.style);

        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);
        
    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(!this.enteredElevator)
            this.player.update();
            //this.monster.update(this.player.x, this.player.y);
        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Lobby';
            this.scene.switch('Drawing');
        }
        if(this.player.x <= this.chest.x + 30 && this.player.x >= this.chest.x - 30 && 
            this.player.y <= this.chest.y + 30 && this.player.y >= this.chest.y - 30){
                this.chestText.setText("Press E");
                // put if E pressed logic here
        }else{
            this.chestText.setText("");
        }
    }
    collisions(){
        if(!this.enteredElevator)
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
        this.physics.world.collide(this.player, this.monster, this.memoryErased, null, this);
    }
    memoryErased(){
        this.player.x = game.config.width/2 - 12;
        this.player.y = game.config.height + 150;
    }
    elveatorExit(){
        this.enteredElevator = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}