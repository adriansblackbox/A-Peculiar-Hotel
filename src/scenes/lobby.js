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
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('lobby','./assets/Lobby.json' );
        this.load.audio('elevatorMusic','./assets/Elevator_bgm.wav');
        this.load.spritesheet('playerDOWN', 'assets/DetDogForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerUP', 'assets/DetDogBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerLEFT', 'assets/DetDogLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerRIGHT', 'assets/DetDogRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerIdleDOWN', 'assets/idleForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleUP', 'assets/idleBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleLEFT', 'assets/idleLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleRIGHT', 'assets/idleRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('elevatorDoors', 'assets/elevatorAnim.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 32});
        this.load.audio('notebookOpen','./assets/Notebook_open.wav');
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let lobbyBGMConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.sound.play('elevatorMusic', lobbyBGMConfig);
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
        this.elevator = this.physics.add.sprite(game.config.width/2 + 144, 0 + 48, 'elevatorDoors', 0);
        this.elevator.body.immovable = true;
        this.elevator.body.offset.y = 0.5;

        //starting to add the text (make sure to add character sprites below these lines)
        this.style = { font: "15px Arial", fill: "#ffff00", align: "center" };

        this.text = this.add.text(game.config.width/2.5, game.config.height*1.2, "WASD to move", this.style);
        this.text = this.add.text(game.config.width/2.9, game.config.height, "R-Key to open notebook", this.style);
        //end of text stuff

        
        this.player = new Player(this, game.config.width/2 - 12, game.config.height + 150, 'player', 0);
        map.createLayer('overPlayer', tileset);



        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;
        
    }
    createAnims(){
        this.anims.create({
            key: 'playerDOWN',
            frames: this.anims.generateFrameNumbers('playerDOWN', { start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'playerUP',
            frames: this.anims.generateFrameNumbers('playerUP', { start: 0, end: 6, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'playerLEFT',
            frames: this.anims.generateFrameNumbers('playerLEFT', { start: 0, end: 13, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'playerRIGHT',
            frames: this.anims.generateFrameNumbers('playerRIGHT', { start: 0, end: 13, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'playerIdleDOWN',
            frames: this.anims.generateFrameNumbers('playerIdleDOWN', { start: 0, end: 0, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'playerIdleUP',
            frames: this.anims.generateFrameNumbers('playerIdleUP', { start: 0, end: 0, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'playerIdleRIGHT',
            frames: this.anims.generateFrameNumbers('playerIdleRIGHT', { start: 0, end: 0, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'playerIdleLEFT',
            frames: this.anims.generateFrameNumbers('playerIdleLEFT', { start: 0, end: 0, first: 0}),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'elevatorDoors',
            frames: this.anims.generateFrameNumbers('elevatorDoors', { start: 0, end: 32, first: 0}),
            frameRate: 15
        });

    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }
    update(){
        if(!this.enteredElevator){
            this.player.update();
            if(this.player.direction == 'LEFT'){
                this.player.anims.play('playerLEFT', true);
                this.playerisLeft = true;
                this.playerisRight = false;
                this.playerisUp = false;
                this.playerisDown = false;
            }
            if(this.player.direction == 'RIGHT'){
                this.player.anims.play('playerRIGHT', true);
                this.playerisLeft = false;
                this.playerisRight = true;
                this.playerisUp = false;
                this.playerisDown = false;
            }
            if(this.player.direction == 'UP'){
                this.player.anims.play('playerUP', true);
                this.playerisLeft = false;
                this.playerisRight = false;
                this.playerisUp = true;
                this.playerisDown = false;
            }
            if(this.player.direction == 'DOWN'){
                this.player.anims.play('playerDOWN', true);
                this.playerisLeft = false;
                this.playerisRight = false;
                this.playerisUp = false;
                this.playerisDown = true;
            }
            if(this.player.direction == 'IDLE'){
                if(this.playerisDown)
                    this.player.anims.play('playerIdleDOWN', true);
                if(this.playerisUp)
                    this.player.anims.play('playerIdleUP', true);
                if(this.playerisLeft)
                    this.player.anims.play('playerIdleLEFT', true);
                if(this.playerisRight)
                    this.player.anims.play('playerIdleRIGHT', true);
            }
                


        }else{
            this.player.anims.stop();
        }
        this.collisions();
        if(Phaser.Input.Keyboard.JustDown(noteBookKey)){
            let SFXConfig = {
                mute: false,
                volume: 0.4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0,
                pan: 0
            } 
            this.sound.play('notebookOpen', SFXConfig);
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
        this.player.body.setVelocity(0, 0);
        this.elevator.anims.play('elevatorDoors', true);
        this.cameras.main.fadeOut(3000, 0,0,0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}