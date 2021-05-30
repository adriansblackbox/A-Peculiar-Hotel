class Floor_2 extends Phaser.Scene{

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
        super("Floor_2");    
    }
    

    preload(){
        this.load.image('obj_1', './assets/chest.png');
        this.load.image('obj_2', './assets/chest.png');
        this.load.image('obj_3', './assets/chest.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.tilemapTiledJSON('floor2','./assets/Floor_2.json' );
        this.load.spritesheet('playerDOWN', 'assets/DetDogForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerUP', 'assets/DetDogBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerLEFT', 'assets/DetDogLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerRIGHT', 'assets/DetDogRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerIdleDOWN', 'assets/idleForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleUP', 'assets/idleBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleLEFT', 'assets/idleLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleRIGHT', 'assets/idleRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
    }
    create(){
        this.findingTime = 10000;
        this.elevatorEntered = false;
        this.playerDeciding = false;


        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.createKeys();

        const map = this.make.tilemap({key: 'floor2'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);


        this.elevator = this.physics.add.sprite(game.config.width + 944, 48, 'elevator', 0);
        this.elevator.body.offset.y = 0.5;
        this.elevator.body.immovable = true;
        if(!this.finishedLevel)
            this.player = new Player(this, this.elevator.x, this.elevator.y + 30, 'player', 0);
        else
        this.player = new Player(this, this.playerX, this.playerY, 'player', 0);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);

        this.createObjects();

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;
    }
    createObjects(){
        this.obj_1 = this.physics.add.sprite(game.config.width - 550, 100, 'obj_1', 0);
        this.obj_1.body.setImmovable();
        this.obj_2 = this.physics.add.sprite(game.config.width - 550, 150, 'obj_2', 0);
        this.obj_2.body.setImmovable();
        this.obj_3 = this.physics.add.sprite(game.config.width - 550, 200, 'obj_3', 0);
        this.obj_3.body.setImmovable();
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
        if(!this.elevatorEntered && !this.playerDeciding){
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
            this.player.setVelocity(0,0);
        }
        this.collisions();
        if(noteBookKey.isDown){
            game.config.prevScene = 'Floor_2';
            this.scene.switch('Drawing');
        }
        if(!this.finishedLevel && !this.playerDeciding){
            this.objectInteraction();
        }else if(this.finishedLevel && !this.enteredElevator){
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
        }
        if(this.playerDeciding){
            this.confirmObject();
        }
    }
    objectInteraction(){
        if(this.player.x <= this.obj_1.x + 30 && this.player.x >= this.obj_1.x - 30 && 
            this.player.y <= this.obj_1.y + 30 && this.player.y >= this.obj_1.y - 30){
                if(interactKey.isDown){
                    this.findingTime = 5000;
                    this.playerDeciding = true;
                }
        }

        if(this.player.x <= this.obj_2.x + 30 && this.player.x >= this.obj_2.x - 30 && 
            this.player.y <= this.obj_2.y + 30 && this.player.y >= this.obj_2.y - 30){
                if(interactKey.isDown){
                    this.findingTime = 8000;
                    this.playerDeciding = true;
                }
        }

        if(this.player.x <= this.obj_3.x + 30 && this.player.x >= this.obj_3.x - 30 && 
            this.player.y <= this.obj_3.y + 30 && this.player.y >= this.obj_3.y - 30){
                if(interactKey.isDown){
                    this.findingTime = 10000;
                    this.playerDeciding = true;
                }
        }
        
    }
    confirmObject(){
        if(keyUP.isDown){
            this.scene.start('Floor_2_OTHER', {findingTime: this.findingTime, password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList,
            playerX: this.player.x, playerY: this.player.y});
        }else if(keyDOWN.isDown){
            this.playerDeciding = false;
        }
    }
    collisions(){
        this.physics.add.collider(this.player, this.obj_1);
        this.physics.add.collider(this.player, this.obj_2);
        this.physics.add.collider(this.player, this.obj_3);
    }

    elveatorExit(){
        this.elevatorEntered = true;
        this.cameras.main.fadeOut(1500, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}