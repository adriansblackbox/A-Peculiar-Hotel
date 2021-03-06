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
        this.load.image('floor_3_obj_1', './assets/floor_3_obj_1.png');
        this.load.image('floor_3_obj_2', './assets/floor_3_obj_2.png');
        this.load.image('floor_3_obj_3', './assets/floor_3_obj_3.png');
        this.load.image('floor_3_obj_1Lit', './assets/floor_3_obj_1_Lit.png');
        this.load.image('floor_3_obj_2Lit', './assets/floor_3_obj_2_Lit.png');
        this.load.image('floor_3_obj_3Lit', './assets/floor_3_obj_3_Lit.png');
        this.load.image('dialogueBox', './assets/dialogueBox.png');
        this.load.image('dialogue_button', './assets/dialogue_button.png');
        this.load.image('dialogue_button_empty', './assets/dialogue_button_empty.png');

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
        this.load.audio('otherworldEnter', './assets/sounds/toOtherworld.wav');
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
        this.playerDeciding = false;
        this.elevatorEntered = false;

        this.tieObjects();



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

        this.createPrompts();

        if(!this.finishedLevel){
            this.elevator.anims.play('elevatorDoorsClose', true);
        }
    }
    tieObjects(){
        this.selectedItem = "";
        this.objectArray = ["Polished Plate", "Dancing Shoes", "Dirty Napkin"];
        this.objectTime = [18000, 25000, 20000]

        this.randIndex = Phaser.Math.Between(0, this.objectArray.length - 1);
        this.object_1_item = this.objectArray[this.randIndex];
        this.object_1_time = this.objectTime[this.randIndex];
        if(this.objectArray.length > 0){
            this.objectArray.splice(this.randIndex, 1);
        }
        this.randIndex = Phaser.Math.Between(0, this.objectArray.length - 1);
        this.object_2_item = this.objectArray[this.randIndex];
        this.object_2_time = this.objectTime[this.randIndex];
        if(this.objectArray.length > 0){
            this.objectArray.splice(this.randIndex, 1);
        }
        this.randIndex = Phaser.Math.Between(0, this.objectArray.length - 1);
        this.object_3_item = this.objectArray[this.randIndex];
        this.object_3_time = this.objectTime[this.randIndex];
        if(this.objectArray.length > 0){
            this.objectArray.splice(this.randIndex, 1);
        }
    }
    createPrompts(){
        this.yesSelected = false;
        this.noSelected = false;
        this.box = this.add.sprite(0,0, 'dialogueBox', 0);
        this.box.alpha = 0;
        this.yesbtn = this.add.sprite(0, 0, 'dialogue_button_empty').setInteractive();
        this.yesbtn.alpha = 0;
        this.nobtn = this.add.sprite(0, 0, 'dialogue_button_empty').setInteractive();
        this.nobtn.alpha = 0;
        this.style = { fontFamily: "IndieFlower", fontSize: '16px', fill: "#000000", align: "center" };
        this.style1 = { fontFamily: "IndieFlower", fontSize: '16px', fill: "#ff0000", align: "center" };
        this.foundText = this.add.text(0,0, "", this.style);
        this.itemText = this.add.text(0,0, "", this.style1);
        this.confirmText = this.add.text(0,0, "", this.style);
        
    }
    createObjects(){
        this.obj_1 = this.physics.add.sprite(239, 753, 'floor_3_obj_1', 0);
        this.obj_1.body.setImmovable();
        this.obj_2 = this.physics.add.sprite(465, 778, 'floor_3_obj_2', 0);
        this.obj_2.body.setImmovable();
        this.obj_3 = this.physics.add.sprite(599, 784, 'floor_3_obj_3', 0);
        this.obj_3.flipX = true;
        this.obj_3.body.setImmovable();
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
        this.createObjects();
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
        testKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }
    update(){
        if(!this.elevatorEntered && !this.playerDeciding){
            if(!(this.musicplaying)){
                this.musicplaying = true;
                this.regular_bgm.play();
            }
            if(!this.playerDeciding)
                this.player.update();
            else if (this.finishedLevel){
                this.player.update();
            }else{
                this.player.setVelocity(0,0)
                this.player.anims.pause();
            }
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
            this.canvas = this.sys.canvas;
            this.canvas.style.cursor = 'none';
            this.regular_bgm.stop();
            this.musicplaying = false;            
            this.sound.play('notebookOpen', SFXConfig);
            game.config.prevScene = 'Floor_3';
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
    collisions(){
        this.physics.add.collider(this.player, this.obj_1);
        this.physics.add.collider(this.player, this.obj_2);
        this.physics.add.collider(this.player, this.obj_3);
    }
    objectInteraction(){
        if(this.player.x <= this.obj_1.x + 30 && this.player.x >= this.obj_1.x - 30 && 
            this.player.y <= this.obj_1.y + 40 && this.player.y >= this.obj_1.y - 40){
                this.obj_1.setTexture('floor_3_obj_1Lit', 0);
                if(interactKey.isDown){
                    this.findingTime = this.object_1_time;
                    this.selectedItem = this.object_1_item;
                    this.playerDeciding = true;
                }
        }else{
            this.obj_1.setTexture('floor_3_obj_1', 0);
        }

        if(this.player.x <= this.obj_2.x + 30 && this.player.x >= this.obj_2.x - 30 && 
            this.player.y <= this.obj_2.y + 30 && this.player.y >= this.obj_2.y - 30){
                this.obj_2.setTexture('floor_3_obj_2Lit', 0);
                if(interactKey.isDown){
                    this.findingTime = this.object_2_time;
                    this.selectedItem = this.object_2_item;
                    this.playerDeciding = true;
                }
        }else{
            this.obj_2.setTexture('floor_3_obj_2', 0);
        }

        if(this.player.x <= this.obj_3.x + 30 && this.player.x >= this.obj_3.x - 30 && 
            this.player.y <= this.obj_3.y + 60 && this.player.y >= this.obj_3.y - 60){
                this.obj_3.setTexture('floor_3_obj_3Lit', 0);
                if(interactKey.isDown){
                    this.findingTime = this.object_3_time;
                    this.selectedItem = this.object_3_item;
                    this.playerDeciding = true;
                }
        }else{
            this.obj_3.setTexture('floor_3_obj_3', 0);
        }
        
    }
    confirmObject(){
        if(!this.yesSelected && !this.finishedLevel){
            this.player.anims.pause();
            this.box.x = this.player.x ;
            this.box.y = this.player.y + 100;
            this.box.alpha = 1;
            this.yesbtn.x = this.player.x + 30;
            this.yesbtn.y = this.player.y + 119;
            this.yesbtn.alpha = 1;
            this.nobtn.x = this.player.x  + 82;
            this.nobtn.y = this.player.y + 119;
            this.nobtn.alpha = 1;
            this.foundText.setText("You found a ");
            this.foundText.setX(this.player.x - 94);
            this.foundText.setY(this.player.y + 80);
            this.itemText.setText(this.selectedItem);
            this.itemText.setX(this.player.x - 10);
            this.itemText.setY(this.player.y + 80);
            this.confirmText.setText("Use this item?   Yes      No");
            this.confirmText.setX(this.player.x - 94);
            this.confirmText.setY(this.player.y + 110);

            this.yesbtn.on('pointerover', function (event) {this.yesbtn.setTexture('dialogue_button');}, this);
            this.yesbtn.on('pointerout', function (event) {this.yesbtn.setTexture('dialogue_button_empty')}, this);
            this.nobtn.on('pointerover', function (event) {this.nobtn.setTexture('dialogue_button')}, this);
            this.nobtn.on('pointerout', function (event) {this.nobtn.setTexture('dialogue_button_empty')}, this);

            this.yesbtn.on('pointerdown', function (event) {this.yesSelected = true},this);
            this.nobtn.on('pointerdown', function (event) {this.noSelected = true},this);
        }

        if(this.yesSelected && !this.finishedLevel && !this.spiritStart){
            this.regular_bgm.stop();
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
            this.sound.play('otherworldEnter', SFXConfig);
            this.spiritStart = true;
            this.player.body.setVelocity(0, 0);
            this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
            this.box.alpha = 0;
            this.yesbtn.alpha = 0;
            this.nobtn.alpha = 0;
            this.foundText.setText("");
            this.itemText.setText("");
            this.confirmText.setText("");
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.musicplaying = false;
                this.regular_bgm.stop();
                this.scene.start('Floor_3_OTHER', {findingTime: this.findingTime, password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList,
                playerX: this.player.x, playerY: this.player.y});
            });
        }else if(this.noSelected){
            this.noSelected = false;
            this.playerDeciding = false;
            this.box.alpha = 0;
            this.yesbtn.alpha = 0;
            this.nobtn.alpha = 0;
            this.foundText.setText("");
            this.itemText.setText("");
            this.confirmText.setText("");
        }
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
        this.sound.play('elevatorOpen',SFXConfig);
        this.elevatorEntered = true;
        this.elevator.anims.play('elevatorDoors', true);
        this.player.body.setVelocity(0, 0);
        this.cameras.main.fadeOut(3000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.musicplaying = false;
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, restartElevator: true, firstTime: false});
        })
    }
}