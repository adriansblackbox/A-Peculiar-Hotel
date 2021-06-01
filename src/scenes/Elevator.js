const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

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
        this.load.image('keypad', './assets/keypad.png');
        this.load.image('dogDialogue', './assets/catDialogue.png');
        this.load.image('catDialogue', './assets/dogDialogue.png');
        this.load.spritesheet('elevatorScene', 'assets/elevatorWaiting.png', {frameWidth: 480, frameHeight: 360, startFrame: 0, endFrame: 11});
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

        this.load.bitmapFont('gothic', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.png', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/fonts/gothic.xml');
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
        this.load.audio('elevatorMusic', './assets/Elevator_bgm.wav');
    }

    create(){
        let BGMConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.sound.play('elevatorMusic', BGMConfig);

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
        
        this.randFloor = Phaser.Math.Between(0, this.floorList.length() - 1);
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
            this.button1 = this.physics.add.sprite(game.config.width/2 - 60, game.config.height/2 - 30).setInteractive();
            this.button1.setSize(60, 60);
            this.button2 = this.physics.add.sprite(game.config.width/2, game.config.height/2 - 30).setInteractive();
            this.button2.setSize(60, 60);
            this.button3 = this.physics.add.sprite(game.config.width/2 + 60, game.config.height/2 - 30).setInteractive();
            this.button3.setSize(60, 60);
            this.button4 = this.physics.add.sprite(game.config.width/2 - 60, game.config.height/2 + 30).setInteractive();
            this.button4.setSize(60, 60);
            this.button5 = this.physics.add.sprite(game.config.width/2, game.config.height/2 + 30).setInteractive();
            this.button5.setSize(60, 60);
            this.button6 = this.physics.add.sprite(game.config.width/2 + 60, game.config.height/2 + 30).setInteractive();
            this.button6.setSize(60, 60);

            this.deleteButton = this.physics.add.sprite(game.config.width/2 + 120, game.config.height/2 + 30).setInteractive();
            this.deleteButton.setSize(60, 60);
            this.confirmButton = this.physics.add.sprite(game.config.width/2 + 120, game.config.height/2 - 30).setInteractive();
            this.confirmButton.setSize(60, 60);

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
            this.deleteButton.on('pointerdown', function (event) {
                if(this.inputPassword.length > 0)
                    this.inputPassword.pop();
            },this);
            this.confirmButton.on('pointerdown', function (event) {
                console.log(this.inputPassword);
                console.log(this.password);
                if(this.inputPassword.length == 4){
                    const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
                    if(equals(this.inputPassword, this.password)){
                        this.scene.start('Floor_0');
                    }else{
                        this.scene.start('Lobby');
                    }
                }
            },this);
        }
       
    }
    update(time, delta){
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

        if(this.elevatorTime <= 0 && !this.fadingOut){
            this.fadingOut = true;
            this.cameras.main.fadeOut(1500, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start(this.nextFloor, {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, finishedLevel: false, playerX: 0, playerY: 0});
            })
        }

        if(noteBookKey.isDown){
            game.config.prevScene = 'Elevator';
            this.scene.switch('Drawing');
        }
    }
}