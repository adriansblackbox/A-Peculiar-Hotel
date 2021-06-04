const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
var dialogue1 = "this is the first dialogue with cat";

class Elevator extends Phaser.Scene{

    init(data){
        this.password = data.password;
        this.passwordIndex = data.passwordIndex;
        this.floorList = data.floorList;
    }
    constructor() {
        super("Elevator");    
    }

    preload(){
        this.load.image('button', './assets/');
        this.load.image('keypad', './assets/keypadBase.png');
        this.load.image('dogDialogue', './assets/catDialogue.png');
        this.load.image('catDialogue', './assets/dogdialogue.png');
        this.load.spritesheet('elevatorScene', 'assets/elevatorWaiting.png', {frameWidth: 480, frameHeight: 360, startFrame: 0, endFrame: 11});
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.audio('elevatorMusic', './assets/sounds/Elevator_bgm.wav');
        this.load.audio('elevatorOpen', './assets/sounds/Elevator_open.wav');
        this.load.audio('notebookOpen','./assets/sounds/Notebook_open.wav');
    }

    create(){
        let BGMConfig = {
            mute: false,
            volume: 0.75,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        //TESTING PASSSWORD!!!///////////
        this.floorList = []
         //TESTING PASSSWORD!!!///////////


        this.elevator_bgm = this.sound.add('elevatorMusic', BGMConfig);
        this.musicplaying = false;


        this.elevatorTime = 5000;

        this.anims.create({
            key: 'elevatorScene',
            frames: this.anims.generateFrameNumbers('elevatorScene', { start: 0, end: 11, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        this.elevatorScene = this.add.sprite(game.config.width/2, game.config.height/2, 'elevatorScene', 0);
        this.elevatorScene.anims.play('elevatorScene', true);

        this.elevatorScene.alpha = 0.1;

        this.dogDialogue = this.add.sprite(game.config.width/2, game.config.height/2, 'dogDialogue', 0);
        this.catDialogue = this.add.sprite(game.config.width/2, game.config.height/2, 'catDialogue', 0);
        this.dialogueFinished1 = false;
        this.dialogueFinished2 = false;
        this.dialogueFinished3 = false;
        this.dialogueFinished4 = false;

        if(!this.dialogueFinished1){
            createTextBox(this, 100, 100, {wrapWidth: 500,}).start(dialogue1, 100);
        }
        if(this.dialogueFinished1 && !this.dialogueFinished2){

        }

        console.log(this.password);
        this.nextFloorPressed = false;

        if(this.passwordIndex < 4)
            this.passwordIndex++;

        this.fadingOut = false;
        this.cameras.main.fadeIn(1500, 0, 0, 0)


       this.inputPassword = [];
       this.confirmPassword = false;
        

        //this.startBtn.on('pointerover', function (event) {}, this);
        //this.startBtn.on('pointerout', function (event) {}, this);
        
        this.randFloor = Phaser.Math.Between(0, this.floorList.length - 1);
        this.nextFloor = this.floorList[this.randFloor];

        if(this.floorList.length > 0){
            this.floorList.splice(this.randFloor, 1);
        }
        
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        console.log(this.floorList);

        if(this.nextFloor != null){
            //this.startBtn = this.add.sprite(game.config.width/2, game.config.height/2, 'button').setInteractive();

            //this.startBtn.on('pointerdown', function (event) {
                this.nextFloorPressed = true;
            //},this);
        }else{
            this.keypad = this.add.image(game.config.width/2, game.config.height/2, 'keypad');
            this.button1 = this.physics.add.sprite(256, 78).setInteractive();
            this.button1.setSize(30, 30);
            this.button2 = this.physics.add.sprite(384, 78).setInteractive();
            this.button2.setSize(30, 30);
            this.button3 = this.physics.add.sprite(256, 120).setInteractive();
            this.button3.setSize(30, 30);
            this.button4 = this.physics.add.sprite(384, 120).setInteractive();
            this.button4.setSize(30, 30);
            this.button5 = this.physics.add.sprite(256, 162).setInteractive();
            this.button5.setSize(30, 30);
            this.button6 = this.physics.add.sprite(384, 162).setInteractive();
            this.button6.setSize(30, 30);
            this.button7 = this.physics.add.sprite(256, 204).setInteractive();
            this.button7.setSize(30, 30);
            this.button8 = this.physics.add.sprite(384, 204).setInteractive();
            this.button8.setSize(30, 30);
            this.button9 = this.physics.add.sprite(256, 246).setInteractive();
            this.button9.setSize(30, 30);
            this.button10 = this.physics.add.sprite(384, 246).setInteractive();
            this.button10.setSize(30, 30);


            this.button1.on('pointerdown', function (event) {
                this.inputPassword.push(0);
            },this);
            this.button2.on('pointerdown', function (event) {
                this.inputPassword.push(1);
            },this);
            this.button3.on('pointerdown', function (event) {
                this.inputPassword.push(2);
            },this);
            this.button4.on('pointerdown', function (event) {
                this.inputPassword.push(3);
            },this);
            this.button5.on('pointerdown', function (event) {
                this.inputPassword.push(4);
            },this);
            this.button6.on('pointerdown', function (event) {
                this.inputPassword.push(5);
            },this);

        }
       
    }
    update(time, delta){
        if(!(this.musicplaying) && !this.fadingOut){
            this.musicplaying = true;
            this.elevator_bgm.play();
        }
        this.elevatorTime -= delta;
        this.elevatorScene.anims.play('elevatorScene', true);
        if(this.inputPassword.length > 4){
            this.inputPassword.pop();
        }

        if(this.confirmPassword){
            if(this.inputPassword == this.password){
                this.scene.start('Lobby');
            }
        }

        //TESTING LEVEL ELEVATOR TRANSITION
        /*
        if(this.elevatorTime <= 0 && !this.fadingOut){
            this.fadingOut = true;
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
            this.elevator_bgm.stop();
            this.musicplaying = false;
            this.sound.play('elevatorOpen',SFXConfig);

            this.cameras.main.fadeOut(1500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start(this.nextFloor, {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, finishedLevel: false, playerX: 0, playerY: 0});
            })
        }
        */

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
            this.elevator_bgm.stop();
            this.musicplaying = false;
            this.sound.play('notebookOpen',SFXConfig);

            game.config.prevScene = 'Elevator';
            this.scene.switch('Drawing');
        }
    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({ // adding the text box function 
            x: x,
            y: y,

            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                .setStrokeStyle(2, COLOR_LIGHT),

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            text: scene.add.bitmapText(0, 0, 'gothic').setFontSize(20).setMaxWidth(wrapWidth),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
                icon: 10,
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

            var icon = this.getElement('action').setVisible(true);
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