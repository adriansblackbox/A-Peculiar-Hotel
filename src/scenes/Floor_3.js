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
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('floor3','./assets/Floor_3.json' );
        this.load.spritesheet('playerDOWN', 'assets/DetDogForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerUP', 'assets/DetDogBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerLEFT', 'assets/DetDogLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerRIGHT', 'assets/DetDogRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerIdleDOWN', 'assets/idleForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleUP', 'assets/idleBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleLEFT', 'assets/idleLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleRIGHT', 'assets/idleRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('elevatorDoors', 'assets/elevatorAnim.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 32});
        this.load.audio('notebookOpen','./assets/sounds/Notebook_open.wav');
        this.load.audio('elevatorOpen', './assets/sounds/Elevator_open.wav');
        this.load.audio('floorMusic','./assets/sounds/floorbgm.wav');
    }
    create(){
        let floorBGMConfig = {
            mute: false,
            volume: 0.75,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.regular_bgm = this.sound.add('floorMusic', floorBGMConfig);
        this.musicplaying = false;
        this.findingTime = 10000;
        this.enteredElevator = false;
        this.spiritStart = false;



        if(!this.finishedLevel)
            this.cameras.main.fadeIn(1000, 0, 0, 0);
        else
            this.cameras.main.fadeIn(1000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
        this.createKeys();
        this.createMap();
        this.elevator.body.offset.y = 0.5;
        this.elevator.body.immovable = true;
        this.cameras.main.startFollow(this.player);

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;

        if(!this.finishedLevel){
            this.elevator.anims.play('elevatorDoorsClose', true);
        }
    }
    createMap(){
        const map = this.make.tilemap({key: 'floor3'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);
        const props = map.createLayer('props', tileset);
        props.setCollisionByProperty({collides: true});
        

        this.elevator = this.physics.add.sprite(game.config.width - 272, 48, 'elevatorDoors', 0);
        this.player = new Player(this, this.elevator.x, this.elevator.y + 30, 'player', 0);
        map.createLayer('abovePlayer', tileset);
        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, props);
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
        this.anims.create({
            key: 'elevatorDoorsClose',
            frames: this.anims.generateFrameNumbers('elevatorDoors', { start: 32, end: 0, first: 32}),
            frameRate: 15
        });
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
        if(!this.elevatorEntered){
            if(!(this.musicplaying)){
                this.musicplaying = true;
                this.regular_bgm.play();
            }
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
            this.regular_bgm.stop();
            this.musicplaying = false; 
            this.sound.play('notebookOpen', SFXConfig);
            game.config.prevScene = 'Floor_3';
            this.scene.switch('Drawing');
        }
        if(interactKey.isDown && !this.finishedLevel && !this.spiritStart){
            this.spiritStart = true;
            this.player.body.setVelocity(0, 0);
            this.cameras.main.fadeOut(1500, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Floor_3_OTHER', {findingTime: this.findingTime, password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList,
                playerX: this.player.x, playerY: this.player.y});
            });
        }else if(this.finishedLevel && !this.enteredElevator){
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
        }
    }
    collisions(){
    }

    elveatorExit(){
        let SFXConfig ={
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
            pan: 0 
        }
        this.regular_bgm.stop();
        this.musicplaying = false;
        this.sound.play('elevatorOpen',SFXConfig);
        this.elevatorEntered = true;
        this.elevator.anims.play('elevatorDoors', true);
        this.player.body.setVelocity(0, 0);
        this.cameras.main.fadeOut(3000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}