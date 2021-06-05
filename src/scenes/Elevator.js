const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


// IMPORTANT NOTE: 3 lines = 1 page

//Cat Dialogue: hello my name is cat\nI'll be your guide this evening\nI hope you have a wonderful stay...
var dialogue1 = "hello my name is cat\nI'll be your guide this evening\nI hope you have a wonderful stay...\nUhmmmm... Thank you?\n\n\n";

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

        this.load.image('button1_hover', './assets/hoverButt01.png');
        this.load.image('button2_hover', './assets/hoverButt02.png');
        this.load.image('button3_hover', './assets/hoverButt03.png');
        this.load.image('button4_hover', './assets/hoverButt04.png');
        this.load.image('button5_hover', './assets/hoverButt05.png');
        this.load.image('button6_hover', './assets/hoverButt06.png');
        this.load.image('button7_hover', './assets/hoverButt07.png');
        this.load.image('button8_hover', './assets/hoverButt08.png');
        this.load.image('button9_hover', './assets/hoverButt09.png');
        this.load.image('button10_hover', './assets/hoverButt10.png');

        this.load.image('button1_good', './assets/correctButt01.png');
        this.load.image('button2_good', './assets/correctButt02.png');
        this.load.image('button3_good', './assets/correctButt03.png');
        this.load.image('button4_good', './assets/correctButt04.png');
        this.load.image('button5_good', './assets/correctButt05.png');
        this.load.image('button6_good', './assets/correctButt06.png');
        this.load.image('button7_good', './assets/correctButt07.png');
        this.load.image('button8_good', './assets/correctButt08.png');
        this.load.image('button9_good', './assets/correctButt09.png');
        this.load.image('button10_good', './assets/correctButt10.png');

        this.load.image('button1_bad', './assets/badButt01.png');
        this.load.image('button2_bad', './assets/badButt02.png');
        this.load.image('button3_bad', './assets/badButt03.png');
        this.load.image('button4_bad', './assets/badButt04.png');
        this.load.image('button5_bad', './assets/badButt05.png');
        this.load.image('button6_bad', './assets/badButt06.png');
        this.load.image('button7_bad', './assets/badButt07.png');
        this.load.image('button8_bad', './assets/badButt08.png');
        this.load.image('button9_bad', './assets/badButt09.png');
        this.load.image('button10_bad', './assets/badButt10.png');
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

        this.index = -1;
        this.failedPassword = false;
        this.correctPassword = false;
        this.resetGame = true;
        this.dialogueInProgress = false;

        this.button1_clicked = false;
        this.button2_clicked = false;
        this.button3_clicked = false;
        this.button4_clicked = false;
        this.button5_clicked = false;
        this.button6_clicked = false;
        this.button7_clicked = false;
        this.button8_clicked = false;
        this.button9_clicked = false;
        this.button10_clicked = false;


        this.elevator_bgm = this.sound.add('elevatorMusic', BGMConfig);
        this.musicplaying = false;


        this.elevatorTime = 50000;

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

        if(this.dialogueFinished1 && !this.dialogueFinished2){

        }

        console.log(this.password);

        if(this.passwordIndex < 4)
            this.passwordIndex++;

        this.fadingOut = false;
        this.cameras.main.fadeIn(1500, 0, 0, 0)


       this.inputPassword = [];
       this.confirmPassword = false;
        
        
        this.randFloor = Phaser.Math.Between(0, this.floorList.length - 1);
        this.nextFloor = this.floorList[this.randFloor];

        if(this.floorList.length > 0){
            this.floorList.splice(this.randFloor, 1);
        }
        
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        console.log(this.floorList);

        if(this.nextFloor != null){

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

            this.button1_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button1_hover');
            this.button1_hover.alpha = 0;
            this.button2_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button2_hover');
            this.button2_hover.alpha = 0;
            this.button3_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button3_hover');
            this.button3_hover.alpha = 0;
            this.button4_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button4_hover');
            this.button4_hover.alpha = 0;
            this.button5_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button5_hover');
            this.button5_hover.alpha = 0;
            this.button6_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button6_hover');
            this.button6_hover.alpha = 0;
            this.button7_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button7_hover');
            this.button7_hover.alpha = 0;
            this.button8_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button8_hover');
            this.button8_hover.alpha = 0;
            this.button9_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button9_hover');
            this.button9_hover.alpha = 0;
            this.button10_hover = this.add.sprite(game.config.width/2, game.config.height/2, 'button10_hover');
            this.button10_hover.alpha = 0;

            this.button1_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button1_good');
            this.button1_good.alpha = 0;
            this.button2_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button2_good');
            this.button2_good.alpha = 0;
            this.button3_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button3_good');
            this.button3_good.alpha = 0;
            this.button4_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button4_good');
            this.button4_good.alpha = 0;
            this.button5_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button5_good');
            this.button5_good.alpha = 0;
            this.button6_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button6_good');
            this.button6_good.alpha = 0;
            this.button7_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button7_good');
            this.button7_good.alpha = 0;
            this.button8_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button8_good');
            this.button8_good.alpha = 0;
            this.button9_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button9_good');
            this.button9_good.alpha = 0;
            this.button10_good = this.add.sprite(game.config.width/2, game.config.height/2, 'button10_good');
            this.button10_good.alpha = 0;

            this.button1_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button1_bad');
            this.button1_bad.alpha = 0;
            this.button2_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button2_bad');
            this.button2_bad.alpha = 0;
            this.button3_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button3_bad');
            this.button3_bad.alpha = 0;
            this.button4_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button4_bad');
            this.button4_bad.alpha = 0;
            this.button5_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button5_bad');
            this.button5_bad.alpha = 0;
            this.button6_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button6_bad');
            this.button6_bad.alpha = 0;
            this.button7_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button7_bad');
            this.button7_bad.alpha = 0;
            this.button8_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button8_bad');
            this.button8_bad.alpha = 0;
            this.button9_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button9_bad');
            this.button9_bad.alpha = 0;
            this.button10_bad = this.add.sprite(game.config.width/2, game.config.height/2, 'button10_bad');
            this.button10_bad.alpha = 0;

            this.button1.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button1_hover.alpha = 1;
            }, this);
            this.button2.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button2_hover.alpha = 1;
            }, this);
            this.button3.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button3_hover.alpha = 1;
            }, this);
            this.button4.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button4_hover.alpha = 1;
            }, this);
            this.button5.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button5_hover.alpha = 1;
            }, this);
            this.button6.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button6_hover.alpha = 1;
            }, this);
            this.button7.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button7_hover.alpha = 1;
            }, this);
            this.button8.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button8_hover.alpha = 1;
            }, this);
            this.button9.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button9_hover.alpha = 1;
            }, this);
            this.button10.on('pointerover', function (event) {
                if(!this.failedPassword && !this.correctPassword)
                this.button10_hover.alpha = 1;
            }, this);

            this.button1.on('pointerout', function (event) {
                this.button1_hover.alpha = 0;
            }, this);
            this.button2.on('pointerout', function (event) {
                this.button2_hover.alpha = 0;
            }, this);
            this.button3.on('pointerout', function (event) {
                this.button3_hover.alpha = 0;
            }, this);
            this.button4.on('pointerout', function (event) {
                this.button4_hover.alpha = 0;
            }, this);
            this.button5.on('pointerout', function (event) {
                this.button5_hover.alpha = 0;
            }, this);
            this.button6.on('pointerout', function (event) {
                this.button6_hover.alpha = 0;
            }, this);
            this.button7.on('pointerout', function (event) {
                this.button7_hover.alpha = 0;
            }, this);
            this.button8.on('pointerout', function (event) {
                this.button8_hover.alpha = 0;
            }, this);
            this.button9.on('pointerout', function (event) {
                this.button9_hover.alpha = 0;
            }, this);
            this.button10.on('pointerout', function (event) {
                this.button10_hover.alpha = 0;
            }, this);


            this.button1.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button1_clicked)
                        this.inputPassword.push(0);
                    this.button1_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button1_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button1_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button2.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button2_clicked)
                        this.inputPassword.push(1);
                    this.button2_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button2_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button2_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button3.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button3_clicked)
                        this.inputPassword.push(2);
                    this.button3_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button3_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button3_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button4.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button4_clicked)
                        this.inputPassword.push(3);
                    this.button4_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button4_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button4_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button5.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button5_clicked)
                        this.inputPassword.push(4);
                    this.button5_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button5_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button5_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button6.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button6_clicked)
                        this.inputPassword.push(5);
                    this.button6_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button6_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button6_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button7.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button7_clicked)
                        this.inputPassword.push(6);
                    this.button7_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button7_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button7_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button8.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button8_clicked)
                        this.inputPassword.push(7);
                    this.button8_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button8_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button9_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button9.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button9_clicked)
                        this.inputPassword.push(8);
                    this.button9_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button9_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button10_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);
            this.button10.on('pointerdown', function (event) {
                if(!this.failedPassword){
                    if(!this.button10_clicked)
                        this.inputPassword.push(9);
                    this.button10_clicked = true;
                    this.index++;
                    if(this.inputPassword[this.index] == this.password[this.index]){
                        if(!this.correctPassword)
                        this.button10_good.alpha = 1;
                    }else{
                        if(!this.correctPassword){
                            this.button10_bad.alpha = 1;
                            this.failedPassword = true;
                        }
                    }
                }
            },this);


        }

        this.createTextBoxes();
       
    }
    createTextBoxes(){
        this.firstConversation = createTextBox(this, 100, 100, {wrapWidth: 500,});
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


        if(this.inputPassword.length == 4){
            this.correctPassword = true;
        }

        //TESTING LEVEL ELEVATOR TRANSITION
        
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
        if(this.failedPassword && this.resetGame){
            this.resetGame = false;
            this.cameras.main.fadeOut(1500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Lobby');
            })
        }
        if(!this.dialogueFinished1 && !this.dialogueInProgress){
            this.dialogueInProgress = true;
            this.firstConversation.start(dialogue1, 100);
            
        }
        console.log(this.firstConversation.pageIndex)
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

            //background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
                //.setStrokeStyle(2, COLOR_LIGHT),

            //icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

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