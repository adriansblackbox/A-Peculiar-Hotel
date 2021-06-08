class Floor_0 extends Phaser.Scene{

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
        super("Floor_0");    
    }
    

    preload(){
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('lasttiles', './assets/last_floor_tiles.png');
        this.load.image('desk', './assets/final_desk.png');
        this.load.image('desk_Lit', './assets/final_desk_Lit.png');
        this.load.image('dialogueBox', './assets/dialogueBox.png');
        this.load.image('dialogue_button', './assets/dialogue_button.png');
        this.load.image('dialogue_button_empty', './assets/dialogue_button_empty.png');
        this.load.tilemapTiledJSON('floor0','./assets/Floor_0.json' );
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
        this.SFXConfig ={
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
            pan: 0 
        }
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
        //this.regular_bgm = this.sound.add('floorMusic', floorBGMConfig);
        this.musicplaying = false;
        this.findingTime = 10000;
        this.enteredElevator = false;
        this.spiritStart = false;
        this.playerDeciding = false;



        if(!this.finishedLevel)
            this.cameras.main.fadeIn(1000, 0, 0, 0);
        else
            this.cameras.main.fadeIn(1000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
        this.createKeys();

        const map = this.make.tilemap({key: 'floor0'});
        const tileset = map.addTilesetImage('last_floor_tiles', 'lasttiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        const props = map.createLayer('props', tileset);
        props.setCollisionByProperty({collides: true});


        this.elevator = this.physics.add.sprite(112, 48, 'elevatorDoors', 0);
        this.elevator.body.offset.y = 0.5;
        this.elevator.body.immovable = true;
        this.obj_1 = this.physics.add.sprite(56, 189, 'desk', 0);
        this.obj_1.body.immovable = true;
        this.player = new Player(this, this.elevator.x, this.elevator.y + 30, 'player', 0);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, props)
        this.physics.add.collider(this.player, this.obj_1)

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;

        if(!this.finishedLevel){
            this.elevator.anims.play('elevatorDoorsClose', true);
        }
        this.createPrompts();
    }
    createPrompts(){
        this.yesSelected = false;
        this.noSelected = false;
        this.box = this.add.sprite(0,0, 'dialogueBox', 0);
        this.box.alpha = 0;
        this.nobtn = this.add.sprite(0, 0, 'dialogue_button_empty').setInteractive();
        this.nobtn.alpha = 0;
        this.style = { fontFamily: "IndieFlower", fontSize: '16px', fill: "#000000", align: "center" };
        this.style1 = { fontFamily: "IndieFlower", fontSize: '16px', fill: "#ff0000", align: "center" };
        this.foundText = this.add.text(0,0, "", this.style);
        this.itemText = this.add.text(0,0, "", this.style1);
        this.confirmText = this.add.text(0,0, "", this.style);
        this.lastText = this.add.text(0,0, "", this.style1);
        
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
                //this.regular_bgm.play();
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
        
        if(!this.playerDeciding){
            this.objectInteraction();
        }else{
            this.confirmObject();
        }
    }
    collisions(){
    }
    objectInteraction(){
        if(this.player.x <= this.obj_1.x + 10 && this.player.x >= this.obj_1.x - 15 && 
            this.player.y <= this.obj_1.y && this.player.y >= this.obj_1.y - 70){
                this.obj_1.setTexture('desk_Lit', 0);
                if(interactKey.isDown){
                    this.findingTime = this.object_1_time;
                    this.selectedItem = this.object_1_item;
                    this.playerDeciding = true;
                }
        }else{
            this.obj_1.setTexture('desk', 0);
        }
    }
    confirmObject(){
        if(!this.yesSelected){
            this.player.anims.pause();
            this.box.x = this.player.x ;
            this.box.y = this.player.y + 100;
            this.box.alpha = 1;
            this.nobtn.x = this.player.x  + 82;
            this.nobtn.y = this.player.y + 124;
            this.nobtn.alpha = 1;
            this.foundText.setText("You found a ");
            this.foundText.setX(this.player.x - 94);
            this.foundText.setY(this.player.y + 80);
            this.itemText.setText("Knife");
            this.itemText.setX(this.player.x - 10);
            this.itemText.setY(this.player.y + 80);
            this.confirmText.setText("Pull it out of the Skeleton?");
            this.confirmText.setX(this.player.x - 94);
            this.confirmText.setY(this.player.y + 95);
            this.lastText.setText("                    yes");
            this.lastText.setY(this.player.y + 114);

           
            this.nobtn.on('pointerover', function (event) {this.nobtn.setTexture('dialogue_button')}, this);
            this.nobtn.on('pointerout', function (event) {this.nobtn.setTexture('dialogue_button_empty')}, this);


            this.nobtn.on('pointerdown', function (event) {this.noSelected = true},this);
        }

        if(this.noSelected){
            //this.noSelected = false;
            this.sound.play('otherworldEnter', this.SFXConfig);
            this.spiritStart = true;
            this.player.body.setVelocity(0, 0);
            this.playerDeciding = false;
            this.box.alpha = 0;
            this.nobtn.alpha = 0;
            this.foundText.setText("");
            this.itemText.setText("");
            this.confirmText.setText("");
            this.lastText.setText("");
            this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Floor_0_OTHER', {findingTime: this.findingTime, password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList,
                playerX: this.player.x, playerY: this.player.y});
            });
        }
    }

    elveatorExit(){
        //this.regular_bgm.stop();
        this.musicplaying = false;
        this.sound.play('elevatorOpen',this.SFXConfig);
        this.elevatorEntered = true;
        this.elevator.anims.play('elevatorDoors', true);
        this.player.body.setVelocity(0, 0);
        this.cameras.main.fadeOut(3000, 0, 0, 0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList});
        })
    }
}