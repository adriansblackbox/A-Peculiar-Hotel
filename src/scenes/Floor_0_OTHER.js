//const COLOR_PRIMARY = 0x4e342e;
//const COLOR_LIGHT = 0x7b5e57;
//const COLOR_DARK = 0x260e04;

var dialogue1 = "This isn't the exit...\n\n\nI found everything you asked for so \nwhy can't I leave this place?\n\nYes, you did but...\n\n\nI never said doing so would let you leave.\n\n\nWhy? I trusted you!\n\n\nI trusted people once too and then one day,\nsomeone trusted ended my life.\n\nNow I hope to teach others the same lesson.\n\n\nDon't worry I will never put you through\nthe same thing.\n\nBut you will never be able to leave this\nplace just like the other guests.\n\nI'll find a way...\n\n\nAnd every time you do I'll wipe\nyour memory.\n\nJust like I have every other time before.\n\n\nNo I don't believe you.\n\n\nYou never do but here we are again.\n\n\nWell, it's time for 'corrective action'.\n\n\nWait, no! Stop!\n\n\nI hope you enjoy your stay, dear guest.\n\n\nPlease, keep entertaining me for eternity.\n\n\n\n\n\n";

class Floor_0_OTHER extends Phaser.Scene{

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
        super("Floor_0_OTHER");    
    }
    

    preload(){
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('lasttiles', './assets/last_floor_tiles.png');
        this.load.image('ghostcatDialogue', './assets/ghostCatDialogue.png');
        this.load.image('dogDialogue', './assets/dogdialogue.png');
        this.load.image('dialogueBG', './assets/elevatorScreen.png');

        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');

        this.load.tilemapTiledJSON('floor0_OTHER','./assets/Floor_0_OTHER.json' );
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
        this.conversationDone = false;
        this.dialogueSetUp = false;
        this.dialogue_1_InProgress = false;
        this.dialogue_1_End = false; 




        this.elevatorTime = 0;
        this.enteredElevator = false;
        this.spiritStart = false;
        this.endGame = false;
        this.fadingOut = false;

        this.cameras.main.fadeIn(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);


        const map = this.make.tilemap({key: 'floor0_OTHER'});
        const tileset = map.addTilesetImage('last_floor_tiles', 'lasttiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        const props = map.createLayer('props', tileset);
        props.setCollisionByProperty({collides: true});


        this.player = new Player(this, 100, 170, 'playerIdleLEFT', 0);

        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, props)

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;


        this.dialogueBG = this.add.sprite(game.config.width/2 - 200, game.config.height/2, 'dialogueBG', 0);
        this.dogDialogue = this.add.sprite(game.config.width/2 - 200, game.config.height/2, 'dogDialogue', 0);
        this.catDialogue = this.add.sprite(game.config.width/2 - 200, game.config.height/2, 'ghostcatDialogue', 0);
        this.dialogueBG.alpha = 0;
        this.dogDialogue.alpha = 0;
        this.catDialogue.alpha = 0;
        this.createTextBoxes();

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
    createTextBoxes(){
        this.Conversation = createTextBox(this, -70, 210, {wrapWidth: 500,});
    }
    update(time, delta){

        this.elevatorTime += delta;

        if(this.elevatorTime >= 2000 && !this.conversationDone && !this.dialogueSetUp){
            //if( this.elevatorScene.alpha > 0.2){
                //this.elevatorScene.alpha -= 0.1;
            //}
            if(this.dialogueBG.alpha < 0.7){
                this.dialogueBG.alpha += 0.1;
            }
            if(this.catDialogue.alpha < 1){
                this.catDialogue.alpha += 0.07;
            }
            if(this.dogDialogue.alpha < 1){
                this.dogDialogue.alpha += 0.07;
            }
            if(this.dogDialogue.alpha >= 1 && this.catDialogue.alpha >= 1 && this.dialogueBG.alpha >= 0.7){ //&& this.elevatorScene.alpha <= 0.2){
                this.dialogueSetUp = true;
            }
        }
        if(!this.dialogue_1_InProgress && this.elevatorTime >= 3000){
            this.dialogue_1_InProgress = true;
            this.Conversation.start(dialogue1, 50);
        }
        if(this.dialogue_1_InProgress && !this.dialogue_1_End){
            if(this.Conversation.pageIndex == 0 || this.Conversation.pageIndex == 1 || this.Conversation.pageIndex == 4 || this.Conversation.pageIndex == 9 || this.Conversation.pageIndex == 12 || this.Conversation.pageIndex == 15){
                this.catDialogue.alpha = 0.4;
                this.dogDialogue.alpha = 1;
            }
            if(this.Conversation.pageIndex == 2 || this.Conversation.pageIndex == 3 || this.Conversation.pageIndex == 5 || this.Conversation.pageIndex == 6 ||this.Conversation.pageIndex == 7 || this.Conversation.pageIndex == 8 ||this.Conversation.pageIndex == 10 || this.Conversation.pageIndex == 11 ||this.Conversation.pageIndex == 13 || this.Conversation.pageIndex == 14 ||this.Conversation.pageIndex == 15 || this.Conversation.pageIndex == 16 || this.Conversation.pageIndex == 17){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex >= 19){
                this.conversationDone = true;
                this.dialogue_1_End = true;
                this.endGame = true;
            }
        
        }
        if(this.conversationDone){
            //if( this.elevatorScene.alpha < 1){
                //this.elevatorScene.alpha += 0.1;
            //}
            if(this.dialogueBG.alpha > 0){
                this.dialogueBG.alpha -= 0.1;
            }
            if(this.catDialogue.alpha > 0){
                this.catDialogue.alpha -= 0.1;
            }
            if(this.dogDialogue.alpha > 0){
                this.dogDialogue.alpha -= 0.1;
            }
            if(this.dogDialogue.alpha <= 0 && this.catDialogue.alpha <= 0 && this.dialogueBG.alpha <= 0){// && this.elevatorScene.alpha >= 1 ){
                this.dialogueSetUp = false;
            }
        
        }

        if(this.endGame && !this.fadingOut){
            this.fadingOut = true;
            this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Credits', {findingTime: this.findingTime, password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList,
                playerX: this.player.x, playerY: this.player.y});
            });
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
        //this.regular_bgm.stop();
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

//const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({ // adding the text box function 
            x: x,
            y: y,

            background: null,

            icon: null,

            text: scene.add.bitmapText(0, 0, 'gothic').setFontSize(20).setMaxWidth(wrapWidth),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: -5,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 0,
                text: 10,
            },
      
            page: {
                maxLines: 3
            }
        })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true); // this is the arrow icon for going next. 
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}