const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


// IMPORTANT NOTE: 3 lines = 1 page

/* Floor 1 dialogue:
 * Cat: We are now arriving at the first floor,\n home to our hotel's common rooms.\n\n
 * Dog: Common rooms? \n I didn't think you provide normal rooms\n considering the standards I've seen so far.\n 
 * Cat: We pride ourselves on providing luxury to all\n our guests, regardless of their own status.\n\n
 * Cat: So despite these rooms being called common, \n they adhere to our standards of excellence.\n\n
 * Cat: As a result of being both affordable and lavish,\n hordes of people book rooms on this floor, \n even if it's only to be a guest for one night\n
 * Cat: We're here. \n\n\n
 * Cat: May you find what you're looking for, dear guest.\n\n\n
*/ 
var floor1 = "We are now arriving at the first floor,\nhome to our hotel's common rooms.\n\nCommon rooms?\n I didn't think you provide normal rooms\n considering the standards I've seen so far.\nWe pride ourselves on providing luxury to all\nour guests, regardless of their own status.\n\nSo despite these rooms being called common, \nthey adhere to our standards of excellence.\n\nAs a result of being both affordable and lavish,\nhordes of people book rooms on this floor, \neven if it's only to be a guest for one night.\nWe're here.\n\n\nMay you find what you're looking for, dear guest.\n\n\n\n\n";

/* Floor 2 dialogue:
 * Cat: We are now arriving at the second floor,\n home to our hotel's staff residence and lounge.\n\n
 * Dog: Staff residence?\n I feel like I'm intruding by being here.\n
 * Cat: Don't worry, I assure you that the rest of the \n staff are busy moving around other guests.\n\n
 * Cat: However, do be cordial to the other guests\n even if they are in a rush.\n\n
 * Cat: We're here. \n\n\n
 * Cat: May you find what you're looking for, dear guest.\n\n\n
*/
var floor2 = "We are now arriving at the second floor,\nhome to our hotel's staff residence and lounge.\n\nStaff residence?\nI feel like I'm intruding by being here.\n\nDon't worry, I assure you that the rest of the\nstaff are busy moving around other guests.\n\nHowever, do be cordial to the other guests\neven if they are in a rush.\n\nWe're here.\n\n\nMay you find what you're looking for, dear guest.\n\n\n\n\n";

/* Floor 3 dialogue: 
 * Cat: We are now arriving at the third floor,\n home to our hotel's grand ballroom.\n\n
 * Dog: A ballroom?\n From the outside, I would never expected\n something like that fitting in here\n.
 * Cat: Yes, well our hotel is more than what it\n appears to be to some people.\n\n
 * Cat: But I digress, this ballroom has held many \n extravagant dances and events throughout the\n history of this hotel.\n
 * Cat: Some guests say that on certain nights, they\n can see dancers from the past twirling away.\n\n
 * Cat: But that's just a rumor...\n\n\n
 * Cat: We're here. \n\n\n
 * Cat: May you find what you are looking for, dear guest.\n\n\n
 */
var floor3 = "We are now arriving at the third floor,\nhome to our hotel's grand ballroom.\n\nA ballroom?\nFrom the outside, I would have never expected\nsomething like that fitting in here.\nYes, well our hotel is more than what it\nappears to be to some people.\n\nBut I digress, this ballroom has held many \nextravagant dances and events throughout the\nhistory of this hotel.\nSome guests say that on certain nights, they\ncan see dancers from the past twirling away.\n\nBut that's just a rumor...\n\n\nWe're here.\n\n\nMay you find what you are looking for, dear guest.\n\n\n\n\n";
/* Floor 4 dialogue:
 * Cat: We are now arriving at the fourth floor,\n home to our hotel's royal suites.\n\n
 * Dog: The pinnacle of luxury on the highest floor.\n The people that get these suites must\n eat that stuff up, huh?\n
 * Cat: I'm glad you recognize that it is intentional.\n However, there is a story about this floor.\n\n
 * Cat: Once, we had a famous composer come and lock\n themselves away in the best suite of this floor\n so they could compose their best work yet.\n
 * Cat: Day and night, music poured out of that room.\n None of the staff bothered the composer\n as they were deathly shy and the music flowed.\n
 * Cat: But then one day, the music stopped and no one\n could find the composer in the room or \n anywhere in the hotel.\n
 * Cat: Because of that incident, the room remains \n locked away from the guests.\n\n
 * Cat: We're here. \n\n\n
 * Cat: May you find what you are looking for, dear guest.\n\n\n
 */
var floor4 = "We are now arriving at the fourth floor,\nhome to our hotel's royal suites.\n\nThe pinnacle of luxury on the highest floor.\nThe people that get these suites must\neat that stuff up, huh?\nI'm glad you recognize that it is intentional.\nHowever, there is a story about this floor.\n\nOnce, we had a famous composer come and lock\nhimself away in the best suite of this floor\nso he could compose his best work yet.\nDay and night, music poured out of that room.\nNone of the staff bothered the composer\nas he was deathly shy and the music flowed.\nBut then one day, the music stopped and no one\ncould find the composer in the room or\nanywhere in the hotel.\nBecause of that incident, the room remains \nlocked away from the guests.\n\nWe're here.\n\n\nMay you find what you are looking for, dear guest.\n\n\n\n\n";

/* Password sequence begin:
 * Cat: Well, it seems we've visited every floor already\n which means that we've provided you with all\n the assistance the hotel can offer.\n
 * Cat: With that being said, allow us to be the staff\n that will conduct your checkout process\n\n.
 * Cat: Remember, an incorrect signatures makes a guest\n liable to corrective actions as stated\n in the rules of this hotel.\n
 */
var passwordStart = "Well, it seems we've visited every floor already\n which means that we've provided you with all\n the assistance the hotel can offer.\nWith that being said, allow us to be the staff\n that will conduct your checkout process.\n\nRemember, an incorrect signatures makes a guest\n liable to corrective actions as stated\n in the rules of this hotel.\n";

/* Password wrong:
 * Dog: So is this correct?\n\n\n
 * Cat: Well...\n\n\n
 * Cat: I regret to inform you, detective, that it's not.\n\n\n
 * Cat: And also, I apologize for what occurs next.\n\n\n
 */
var passwordWrong = "So is this correct?\n\n\nWell...\n\n\nI regret to inform you, detective, that it's not.\n\n\nAnd also, I apologize for what occurs next.\n\n\n";

/* Password correct:
 * Dog: So is this correct?\n\n\n
 * Cat: Well...\n\n\n
 * Cat: It appears to be so, detective.\n\n\n
 * Cat: Now let us escort you to the exit of this place
 */
var passwordRight ="So is this correct?\n\n\nWell...\n\n\nIt appears to be so, detective.\n\n\nNow, let us escort you to the exit of this place.\n\n\n";

class Elevator extends Phaser.Scene{

    init(data){
        this.password = data.password;
        this.passwordIndex = data.passwordIndex;
        this.floorList = data.floorList;
        this.restartElevator = data.restartElevator
    }
    constructor() {
        super("Elevator");    
    }

    preload(){
        this.load.image('button', './assets/');
        this.load.image('keypad', './assets/keypadBase.png');
        this.load.image('dialogueBG', './assets/elevatorScreen.png');
        this.load.image('dogDialogue', './assets/dogdialogue.png');
        this.load.image('catDialogue', './assets/catDialogue.png');
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
        if(this.restartElevator){
            console.log('works');
            this.scene.restart({password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, restartElevator: false});
        }
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
        //
        statusKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        //
        this.index = -1;
        this.failedPassword = false;
        this.correctPassword = false;
        this.resetGame = true;
        this.conversationDone = false;
        this.keySequenceSetUp = false; 
        this.dialogueSetUp = false;
        this.refresh = false; 

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

        this.dialogue_1_InProgress = false;
        this.dialogue_1_End = false;
        this.dialogue_2_InProgress = false;
        this.dialogue_2_End = false;
        this.dialogue_3_InProgress = false;
        this.dialogue_3_End = false;
        this.dialogue_4_InProgress = false;
        this.dialogue_4_End = false;
        this.dialogue_5_InProgress = false;
        this.dialogue_5_End = false;

        this.password_inProgress = false;


        this.elevator_bgm = this.sound.add('elevatorMusic', BGMConfig);
        this.musicplaying = false;


        this.elevatorTime = 0;

        this.anims.create({
            key: 'elevatorScene',
            frames: this.anims.generateFrameNumbers('elevatorScene', { start: 0, end: 11, first: 0}),
            frameRate: 8,
            repeat: -1
        });

        this.elevatorScene = this.add.sprite(game.config.width/2, game.config.height/2, 'elevatorScene', 0);
        this.elevatorScene.anims.play('elevatorScene', true);

        this.dialogueBG = this.add.sprite(game.config.width/2, game.config.height/2, 'dialogueBG', 0);
        this.dogDialogue = this.add.sprite(game.config.width/2, game.config.height/2, 'dogDialogue', 0);
        this.catDialogue = this.add.sprite(game.config.width/2, game.config.height/2, 'catDialogue', 0);
        this.dialogueBG.alpha = 0;
        this.dogDialogue.alpha = 0;
        this.catDialogue.alpha = 0;


        if(this.passwordIndex < 4 && !this.restartElevator)
            this.passwordIndex++;

        this.fadingOut = false;
        this.cameras.main.fadeIn(1500, 0, 0, 0)


       this.inputPassword = [];
       this.confirmPassword = false;

        if(!this.restartElevator){
        
            this.randFloor = Phaser.Math.Between(0, this.floorList.length - 1);

            // Returns the next floor that will be visited
            // "floor_1, floor_2, floor_3, floor_4"
            this.nextFloor = this.floorList[this.randFloor];

            if(this.floorList.length > 0){
                this.floorList.splice(this.randFloor, 1);
            }
            
            noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        }

        this.createTextBoxes();
       
    }
    createTextBoxes(){
        this.Conversation = createTextBox(this, 100, 210, {wrapWidth: 500,});
    }
    update(time, delta){
        if(Phaser.Input.Keyboard.JustDown(statusKey)){
            console.log("===============================");
            console.log("Is conversation done? ");
            console.log(this.conversationDone);
            console.log("dialogue 1 started?");
            console.log(this.dialogue_1_InProgress);
            console.log("dialogue 1 finished?");
            console.log(this.dialogue_1_End);
            console.log("dialogue 2 started?");
            console.log(this.dialogue_2_InProgress);
            console.log("dialogue 2 finished?");
            console.log(this.dialogue_2_End);
            console.log("dialogue 3 started?");
            console.log(this.dialogue_3_InProgress);
            console.log("dialogue 3 finished?");
            console.log(this.dialogue_3_End);
            console.log("dialogue 4 started?");
            console.log(this.dialogue_4_InProgress);
            console.log("dialogue 4 finished?");
            console.log(this.dialogue_4_End);
            console.log("dialogue 5 started?");
            console.log(this.dialogue_5_InProgress);
            console.log("dialogue 5 finished?");
            console.log(this.dialogue_5_End);
            console.log("===============================");
        }

        
        if(!(this.musicplaying) && !this.fadingOut && !this.failedPassword){
            this.musicplaying = true;
            this.elevator_bgm.play();
        }
        this.elevatorTime += delta;
        this.elevatorScene.anims.play('elevatorScene', true);


        if(this.conversationDone && this.dialogue_5_End && !this.keySequenceSetUp){
            this.password_inProgress = true;
            this.dialogue_5_End = false;
            this.keySequenceSetUp = true;
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

        if(this.inputPassword.length > 4){
            this.inputPassword.pop();
        }


        if(this.inputPassword.length == 4){
            this.correctPassword = true;
        }
        
        //TESTING LEVEL ELEVATOR TRANSITION
        if(this.conversationDone && !this.fadingOut && !this.password_inProgress && !this.correctPassword){
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
            this.refresh = false;
            this.cameras.main.fadeOut(1500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.musicplaying = false;
                this.elevator_bgm.stop();
                this.scene.start('Lobby');
            })
        }

        if(this.correctPassword){
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
                this.scene.start('Floor_0');
            })
        }

        /////////////////////////////////////////
        //Dialogue
        ////////////////////////////////////////

        //Fade In
        if(this.elevatorTime >= 2000 && !this.conversationDone && !this.dialogueSetUp){
            if( this.elevatorScene.alpha > 0.2){
                this.elevatorScene.alpha -= 0.1;
            }
            if(this.dialogueBG.alpha < 0.7){
                this.dialogueBG.alpha += 0.1;
            }
            if(this.catDialogue.alpha < 1){
                this.catDialogue.alpha += 0.07;
            }
            if(this.dogDialogue.alpha < 1){
                this.dogDialogue.alpha += 0.07;
            }
            if(this.dogDialogue.alpha >= 1 && this.catDialogue.alpha >= 1 && this.dialogueBG.alpha >= 0.7 && this.elevatorScene.alpha <= 0.2){
                this.dialogueSetUp = true;
            }
        }
        if(!this.dialogue_1_InProgress && this.nextFloor == "Floor_1" && this.elevatorTime >= 3000){
            this.dialogue_1_InProgress = true;
            this.Conversation.start(floor1, 50);
        }
        if(!this.dialogue_2_InProgress && this.nextFloor == "Floor_2" && this.elevatorTime >= 3000){
            this.dialogue_2_InProgress = true;
            this.Conversation.start(floor2, 50);
        }
        if(!this.dialogue_3_InProgress && this.nextFloor == "Floor_3" && this.elevatorTime >= 3000){
            this.dialogue_3_InProgress = true;
            this.Conversation.start(floor3, 50);
        }
        if(!this.dialogue_4_InProgress && this.nextFloor == "Floor_4" && this.elevatorTime >= 3000){
            this.dialogue_4_InProgress = true;
            this.Conversation.start(floor4, 50);
        }
        if(!this.dialogue_5_InProgress && this.nextFloor == null && this.elevatorTime >= 3000){
            this.dialogue_5_InProgress = true;
            this.Conversation.start(passwordStart, 50);
        }
        //Conversation
        if(this.dialogue_1_InProgress && !this.dialogue_1_End){
            if(this.Conversation.pageIndex == 0){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex == 1){
                this.catDialogue.alpha = 0.4;
                this.dogDialogue.alpha = 1;
            }
            if((this.Conversation.pageIndex >= 2) && (this.Conversation.pageIndex < 7) ){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex >= 7){
                this.conversationDone = true;
                this.dialogue_1_End = true;
            }

        }
        if(this.dialogue_2_InProgress && !this.dialogue_2_End){
            if(this.Conversation.pageIndex == 0){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex == 1){
                this.catDialogue.alpha = 0.4;
                this.dogDialogue.alpha = 1;
            }
            if((this.Conversation.pageIndex >= 2) && (this.Conversation.pageIndex < 6) ){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex >= 6){
                this.conversationDone = true;
                this.dialogue_2_End = true;
            }

        }
        if(this.dialogue_3_InProgress && !this.dialogue_3_End){
            if(this.Conversation.pageIndex == 0){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex == 1){
                this.catDialogue.alpha = 0.4;
                this.dogDialogue.alpha = 1;
            }
            if((this.Conversation.pageIndex >= 2) && (this.Conversation.pageIndex < 8) ){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex >= 8){
                this.conversationDone = true;
                this.dialogue_3_End = true;
            }

        }
        if(this.dialogue_4_InProgress && !this.dialogue_4_End){
            if(this.Conversation.pageIndex == 0){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex == 1){
                this.catDialogue.alpha = 0.4;
                this.dogDialogue.alpha = 1;
            }
            if((this.Conversation.pageIndex >= 2) && (this.Conversation.pageIndex < 9) ){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex >= 9){
                this.conversationDone = true;
                this.dialogue_4_End = true;
            }

        }
        if(this.dialogue_5_InProgress&& !this.dialogue_5_End){
            if(this.Conversation.pageIndex  < 3){
                this.catDialogue.alpha = 1;
                this.dogDialogue.alpha = 0.4;
            }
            if(this.Conversation.pageIndex >= 3){
                this.conversationDone = true;
                this.dialogue_5_End = true;
            }

        }
        //Fade Out
        if(this.conversationDone){
            if( this.elevatorScene.alpha < 1){
                this.elevatorScene.alpha += 0.1;
            }
            if(this.dialogueBG.alpha > 0){
                this.dialogueBG.alpha -= 0.1;
            }
            if(this.catDialogue.alpha > 0){
                this.catDialogue.alpha -= 0.1;
            }
            if(this.dogDialogue.alpha > 0){
                this.dogDialogue.alpha -= 0.1;
            }
            if(this.dogDialogue.alpha <= 0 && this.catDialogue.alpha <= 0 && this.dialogueBG.alpha <= 0 && this.elevatorScene.alpha >= 1 ){
                this.dialogueSetUp = false;
            }

        }
        /////////////////////////////////////////
        //Dialogue^^^
        ////////////////////////////////////////
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