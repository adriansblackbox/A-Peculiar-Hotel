class Floor_2_OTHER extends Phaser.Scene{

    // Pt. 2 of transfering state to a different scene
    ////////////////////////////
    init(data){
        this.findingTime = data.findingTime
        this.password = data.password;
        this.floorList = data.floorList;
        this.passwordIndex = data.passwordIndex;
        this.finishedLevel = data.finishedLevel;
        this.playerX = data.playerX;
        this.playerY = data.playerY;
    }
    ///////////////////////////
 
    constructor() {
        super("Floor_2_OTHER");    
    }
    

    preload(){
        this.load.image('monster','./assets/GhostSprite.png' );
        this.load.tilemapTiledJSON('floor2OTHER','./assets/Floor_2_OTHER.json' );
        this.load.image('spirittiles', './assets/Spirit_Tiles.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('elevator', './assets/ElevatorDoor.png');
        this.load.spritesheet('playerDOWN', 'assets/DetDogForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerUP', 'assets/DetDogBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
        this.load.spritesheet('playerLEFT', 'assets/DetDogLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerRIGHT', 'assets/DetDogRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 13});
        this.load.spritesheet('playerIdleDOWN', 'assets/idleForward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleUP', 'assets/idleBackward.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleLEFT', 'assets/idleLeft.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.spritesheet('playerIdleRIGHT', 'assets/idleRight.png', {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 0});
        this.load.audio('otherworldBGM', './assets/sounds/Otherworld_2.wav');
        this.load.audio('notebookOpen','./assets/sounds/Notebook_open.wav');
        this.load.audio('otherworldExit', './assets/sounds/fromOtherworld2.wav');
    }
    create(){
        let otherworldBGMConfig = {
            mute: false,
            volume: 0.75,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0,
            pan: 0
        }
        this.otherworld_bgm = this.sound.add('otherworldBGM', otherworldBGMConfig);
        this.musicplaying = false;

        this.timeOut = false;

        this.speedLow = 25;
        this.speedHigh = 100;

        this.cameras.main.fadeIn(1500, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
        this.createKeys();
        const map = this.make.tilemap({key: 'floor2OTHER'});
        const tileset = map.addTilesetImage('Spirit_Tiles', 'spirittiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);
        this.createKeys();

        // section 1
        this.player = new Player(this, this.playerX, this.playerY, 'player', 0);
        this.monster = new Monster(this, game.config.width/2 + 115, game.config.height/6, 'monster', 0, 55, 1);
        this.monster.alpha = 0;
        this.monster2 = new Monster(this, game.config.width/2 + 115, game.config.height/6 + 32, 'monster',0,  55, 1);
        this.monster2.alpha = 0;
        this.monster3 = new Monster(this, game.config.width/2 + 115, game.config.height/6 + 64, 'monster', 0, 55, 1);
        this.monster3.alpha = 0;
        this.monster4 = new Monster(this, game.config.width/2 + 115, game.config.height/6 + 96, 'monster', 0, 55, 1);
        this.monster4.alpha = 0;
        this.monster5 = new Monster(this, game.config.width/2 + 115, game.config.height/6 + 96 + 32, 'monster',0,  55, 1);
        this.monster5.alpha = 0;

        // section 2
        this.monster6 = new Monster(this, game.config.width/2 + 275, game.config.height/6, 'monster', 0, 55, 1);
        this.monster6.alpha = 0;
        this.monster7 = new Monster(this, game.config.width/2 + 275, game.config.height/6 + 32, 'monster', 0, 55, 1);
        this.monster7.alpha = 0;
        this.monster8 = new Monster(this, game.config.width/2 + 275, game.config.height/6 + 64, 'monster', 0, 55, 1);
        this.monster8.alpha = 0;
        this.monster9 = new Monster(this, game.config.width/2 + 275, game.config.height/6 + 96, 'monster', 0, 55, 1);
        this.monster9.alpha = 0;
        this.monster10 = new Monster(this, game.config.width/2 + 275, game.config.height/6 + 96 + 32, 'monster', 0, 55, 1);
        this.monster10.alpha = 0;

        // section 3
        this.monster11 = new Monster(this, game.config.width/2 + 435, game.config.height/6, 'monster', 0, 55, 1);
        this.monster11.alpha = 0;
        this.monster12 = new Monster(this, game.config.width/2 + 435, game.config.height/6 + 32, 'monster', 0, 55, 1);
        this.monster12.alpha = 0;
        this.monster13 = new Monster(this, game.config.width/2 + 435, game.config.height/6 + 64, 'monster', 0, 55, 1);
        this.monster13.alpha = 0;
        this.monster14 = new Monster(this, game.config.width/2 + 435, game.config.height/6 + 96, 'monster', 0, 55, 1);
        this.monster14.alpha = 0;
        this.monster15 = new Monster(this, game.config.width/2 + 435, game.config.height/6 + 96 + 32, 'monster', 0, 55, 1);
        this.monster15.alpha = 0;

        // section 4
        this.monster16 = new Monster(this, game.config.width/2 + 595, game.config.height/6, 'monster', 0, 55, 1);
        this.monster16.alpha = 0;
        this.monster17 = new Monster(this, game.config.width/2 + 595, game.config.height/6 + 32, 'monster', 0, 55, 1);
        this.monster17.alpha = 0;
        this.monster18 = new Monster(this, game.config.width/2 + 595, game.config.height/6 + 64, 'monster', 0, 55, 1);
        this.monster18.alpha = 0;
        this.monster19 = new Monster(this, game.config.width/2 + 595, game.config.height/6 + 96, 'monster', 0, 55, 1);
        this.monster19.alpha = 0;
        this.monster20 = new Monster(this, game.config.width/2 + 595, game.config.height/6 + 96 + 32, 'monster', 0, 55, 1);
        this.monster20.alpha = 0;

        // section 5
        this.monster21 = new Monster(this, game.config.width/2 + 755, game.config.height/6, 'monster', 0, 55, 1);
        this.monster21.alpha = 0;
        this.monster22 = new Monster(this, game.config.width/2 + 755, game.config.height/6 + 32, 'monster', 0, 55, 1);
        this.monster22.alpha = 0;
        this.monster23 = new Monster(this, game.config.width/2 + 755, game.config.height/6 + 64, 'monster', 0, 55, 1);
        this.monster23.alpha = 0;
        this.monster24 = new Monster(this, game.config.width/2 + 755, game.config.height/6 + 96, 'monster', 0, 55, 1);
        this.monster24.alpha = 0;
        this.monster25 = new Monster(this, game.config.width/2 + 755, game.config.height/6 + 96 + 32, 'monster', 0, 55, 1);
        this.monster25.alpha = 0;

        // section 6
        this.monster26 = new Monster(this, game.config.width/2 + 915, game.config.height/6, 'monster', 0, 55, 1);
        this.monster26.alpha = 0;
        this.monster27 = new Monster(this, game.config.width/2 + 915, game.config.height/6 + 32, 'monster', 0, 55, 1);
        this.monster27.alpha = 0;
        this.monster28 = new Monster(this, game.config.width/2 + 915, game.config.height/6 + 64, 'monster', 0, 55, 1);
        this.monster28.alpha = 0;
        this.monster29 = new Monster(this, game.config.width/2 + 915, game.config.height/6 + 96, 'monster', 0, 55, 1);
        this.monster29.alpha = 0;
        this.monster30 = new Monster(this, game.config.width/2 + 915, game.config.height/6 + 96 + 32, 'monster', 0, 55, 1);
        this.monster30.alpha = 0;

        this.physics.add.collider(this.player, walls);


        this.cameras.main.startFollow(this.player);
        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;
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
    }
    update(time, delta){
        if(this.findingTime > 0){
            if(!(this.musicplaying)){
                this.musicplaying = true;
                this.otherworld_bgm.play();
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
        }else if(!this.timeOut && this.findingTime <= 0){
            this.timeOut = true;
            this.player.anims.stop();
            this.exitLevel();
        }
        this.monster.update(this.player.x, this.player.y);
        this.monster2.update(this.player.x, this.player.y);
        this.monster3.update(this.player.x, this.player.y);
        this.monster4.update(this.player.x, this.player.y);
        this.monster5.update(this.player.x, this.player.y);
        this.monster6.update(this.player.x, this.player.y);
        this.monster7.update(this.player.x, this.player.y);
        this.monster8.update(this.player.x, this.player.y);
        this.monster9.update(this.player.x, this.player.y);
        this.monster10.update(this.player.x, this.player.y);
        this.monster11.update(this.player.x, this.player.y);
        this.monster12.update(this.player.x, this.player.y);
        this.monster13.update(this.player.x, this.player.y);
        this.monster14.update(this.player.x, this.player.y);
        this.monster15.update(this.player.x, this.player.y);
        this.monster16.update(this.player.x, this.player.y);
        this.monster17.update(this.player.x, this.player.y);
        this.monster18.update(this.player.x, this.player.y);
        this.monster19.update(this.player.x, this.player.y);
        this.monster20.update(this.player.x, this.player.y);
        this.monster21.update(this.player.x, this.player.y);
        this.monster22.update(this.player.x, this.player.y);
        this.monster23.update(this.player.x, this.player.y);
        this.monster24.update(this.player.x, this.player.y);
        this.monster25.update(this.player.x, this.player.y);
        this.monster26.update(this.player.x, this.player.y);
        this.monster27.update(this.player.x, this.player.y);
        this.monster28.update(this.player.x, this.player.y);
        this.monster29.update(this.player.x, this.player.y);
        this.monster30.update(this.player.x, this.player.y);
        this.findingTime -= delta;

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
            this.elevator_bgm.stop();
            this.musicplaying = false;
            game.config.prevScene = 'Floor_2_OTHER';
            this.scene.switch('Drawing');
        }
    }
    collisions(){
        
    }

    exitLevel(){
        this.musicplaying = false;
        this.otherworld_bgm.stop();
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
        this.sound.play('otherworldExit', SFXConfig);
        this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
        this.player.body.setVelocity(0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start('Floor_2', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, finishedLevel: true
            , playerX: this.player.x, playerY: this.player.y});
        })
    }
}