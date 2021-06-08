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
        this.load.image('player', './assets/idleForward.png');
        this.load.image('lobbytiles', './assets/Lobby_Tiles.png');
        this.load.image('front_desk', './assets/front_desk.png');
        this.load.image('front_desk_Lit', './assets/front_desk_Lit.png');
        this.load.image('dialogueBox', './assets/dialogueBox.png');
        this.load.image('dialogue_button', './assets/dialogue_button.png');
        this.load.image('dialogue_button_empty', './assets/dialogue_button_empty.png');
        this.load.tilemapTiledJSON('lobby','./assets/Lobby.json' );
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
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        let lobbyBGMConfig = {
            mute: false,
            volume: .5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.SFXConfig = {
            mute: false,
            volume: 0.4,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0,
            pan: 0
        } 

        this.regular_bgm = this.sound.add('floorMusic', lobbyBGMConfig);
        this.musicplaying = this.regular_bgm.isPlaying;
        this.musicPaused = false;
        //this.musicpaused = this.regular_bgm.isPaused;

        this.enteredElevator = false;
        this.floorList = ['Floor_1', 'Floor_2', 'Floor_3', 'Floor_4'];
        this.front_desk_fin = false;


        this.password = [];
        this.passwordIndex = -1;

        this.passwordElements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        while(this.password.length < 4){
            let randIndex = Phaser.Math.Between(0, this.passwordElements.length - 1);
            this.password.push(this.passwordElements[randIndex]);
            this.passwordElements.splice(randIndex, 1);
        }
        console.log('Password: ' + this.password);

        this.createKeys();
        this.createMap();

        //starting to add the text (make sure to add character sprites below these lines)
        this.style = { fontFamily: "IndieFlower", fontSize: '14px', fill: "#ffffff", align: "center" };

        this.text = this.add.text(260,470, "WASD to move", this.style);
        this.text = this.add.text(235, 335, "R-Key to open notebook", this.style);
        this.text = this.add.text(248, 390, "E-Key to interact\n with glowing objects", this.style);

        //end of text stuff

        this.cameras.main.startFollow(this.player);

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;

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
        this.itemText = this.add.text(0,0, "", this.style);
        this.confirmText = this.add.text(0,0, "", this.style);
        this.lastText = this.add.text(0,0, "", this.style1);
        
    }
    createObjects(){

        this.obj_1 = this.physics.add.sprite(304, 92, 'front_desk', 0);
        this.obj_1.body.immovable = true;
    }
    tieObjects(){
        this.selectedItem = "";
        this.objectArray = ["Rusted Neclace", "Hair Brush", "Pare", "Band-Aid"];
        this.objectTime = [50000, 40000, 25000, 30000]

        this.randIndex = Phaser.Math.Between(0, this.objectArray.length - 1);
        this.object_1_item = this.objectArray[this.randIndex];
        this.object_1_time = this.objectTime[this.randIndex];
    }
    createMap(){
        const map = this.make.tilemap({key: 'lobby'});
        const tileset = map.addTilesetImage('Lobby_Tiles', 'lobbytiles');
        

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        map.createLayer('extra', tileset);
        walls.setCollisionByProperty({collides: true});
        const props = map.createLayer('props', tileset);
        props.setCollisionByProperty({collides: true});
        this.elevator = this.physics.add.sprite(game.config.width/2 + 144, 0 + 48, 'elevatorDoors', 0);
        this.elevator.body.immovable = true;
        this.elevator.body.offset.y = 0.5;
        this.createObjects();
        this.player = new Player(this, game.config.width/2 - 12, game.config.height + 250, 'playerIdleUP', 0);
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

    }
    createKeys(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        testKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        statusKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(statusKey)){
            console.log("===============================");
            console.log("Music playing status is: ");
            console.log(this.regular_bgm.isPlaying);
            console.log("Music paused status is: ");
            console.log(this.regular_bgm.isPaused);
            console.log("is Scene asleep?");
            console.log(this.scene.isSleeping());
            console.log("is Scene paused?");
            console.log(this.scene.isPaused());
            console.log("is Scene active?");
            console.log(this.scene.isActive());
            console.log("is Scene visible?");
            console.log(this.scene.isVisible());
            console.log("===============================");
        }
        if(!this.enteredElevator){
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
            this.regular_bgm.pause();
            this.musicPaused = true;
            this.musicplaying = false;
            
            this.canvas = this.sys.canvas;
            this.canvas.style.cursor = 'none';
            this.sound.play('notebookOpen', this.SFXConfig);
            game.config.prevScene = 'Lobby';
            this.scene.switch('Drawing');
        }
        if(!this.finishedLevel && !this.playerDeciding){
            this.objectInteraction();
        }else if(this.finishedLevel && !this.enteredElevator){
            this.physics.world.collide(this.player, this.elevator, this.elevatorExit, null, this);
        }
        if(this.playerDeciding){
            this.confirmObject();
        }
    }
    objectInteraction(){
        if(this.player.x <= this.obj_1.x + 30 && this.player.x >= this.obj_1.x - 30 && 
            this.player.y <= this.obj_1.y + 30 && this.player.y >= this.obj_1.y - 30){
                this.obj_1.setTexture('front_desk_Lit', 0);
                if(interactKey.isDown){
                    this.findingTime = this.object_1_time;
                    this.selectedItem = this.object_1_item;
                    this.playerDeciding = true;
                }
        }else{
            this.obj_1.setTexture('front_desk', 0);
        }
    }
    confirmObject(){
        if(!this.yesSelected && !this.finishedLevel){
            this.player.anims.pause();
            this.box.x = this.player.x ;
            this.box.y = this.player.y + 100;
            this.box.alpha = 1;
            this.nobtn.x = this.player.x  + 82;
            this.nobtn.y = this.player.y + 124;
            this.nobtn.alpha = 1;
            this.foundText.setText("Hello and welcome to the");
            this.foundText.setX(this.player.x - 94);
            this.foundText.setY(this.player.y + 65);
            this.itemText.setText("Peculiar Hotel! Please make");
            this.itemText.setX(this.player.x - 94);
            this.itemText.setY(this.player.y + 80);
            this.confirmText.setText("your way to the elevator");
            this.confirmText.setX(this.player.x - 94);
            this.confirmText.setY(this.player.y + 95);
            this.lastText.setX(this.player.x - 94);
            this.lastText.setText("to your right.              →");
            this.lastText.setY(this.player.y + 114);

           
            this.nobtn.on('pointerover', function (event) {this.nobtn.setTexture('dialogue_button')}, this);
            this.nobtn.on('pointerout', function (event) {this.nobtn.setTexture('dialogue_button_empty')}, this);


            this.nobtn.on('pointerdown', function (event) {this.noSelected = true},this);
        }

        if(this.yesSelected && !this.finishedLevel && !this.spiritStart){
            this.regular_bgm.stop();
            this.musicplaying = false;
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
            this.box.alpha = 0;
            this.nobtn.alpha = 0;
            this.foundText.setText("");
            this.itemText.setText("");
            this.confirmText.setText("");
            this.lastText.setText("");
            this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
        }else if(this.noSelected){
            this.noSelected = false;
            this.front_desk_fin = true;
            this.playerDeciding = false;
            this.box.alpha = 0;
            this.nobtn.alpha = 0;
            this.foundText.setText("");
            this.itemText.setText("");
            this.confirmText.setText("");
            this.lastText.setText("");
        }
    }
    collisions(){
        if(!this.enteredElevator && this.front_desk_fin)
            this.physics.world.collide(this.player, this.elevator, this.elveatorExit, null, this);
        this.physics.add.collider(this.player, this.obj_1);

        
    }
    
    elveatorExit(){
        this.regular_bgm.stop();
        this.sound.play('elevatorOpen',this.SFXConfig);
        this.enteredElevator = true;
        this.player.body.setVelocity(0, 0);
        this.elevator.anims.play('elevatorDoors', true);
        this.cameras.main.fadeOut(3000, 0,0,0)
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.musicplaying = false;
            this.scene.start('Elevator', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, restartElevator: true});
        })
    }
}