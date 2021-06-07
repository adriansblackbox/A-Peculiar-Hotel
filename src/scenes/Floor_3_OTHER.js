class Floor_3_OTHER extends Phaser.Scene{

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
        super("Floor_3_OTHER");    
    }
    

    preload(){
        this.load.image('monster','./assets/GhostSprite.png' );
        this.load.tilemapTiledJSON('floor3OTHER','./assets/Floor_3_OTHER.json' );
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
        this.load.image('symbol_0','./assets/symbol01.png' );
        this.load.image('symbol_1','./assets/symbol02.png' );
        this.load.image('symbol_2','./assets/symbol03.png' );
        this.load.image('symbol_3','./assets/symbol04.png' );
        this.load.image('symbol_4','./assets/symbol05.png' );
        this.load.image('symbol_5','./assets/symbol06.png' );
        this.load.image('symbol_6','./assets/symbol07.png' );
        this.load.image('symbol_7','./assets/symbol08.png' );
        this.load.image('symbol_8','./assets/symbol09.png' );
        this.load.image('symbol_9','./assets/symbol10.png' );
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
        this.ghostHit = false;

        this.timeOut = false;
        this.speedLow = 50;
        this.speedHigh = 100;

        this.createMap();

        this.cameras.main.fadeIn(1500, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF);
        this.createKeys();

        this.monster = new Monster(this, game.config.width/2, game.config.height, 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster2 = new Monster(this, game.config.width/2, game.config.height*2, 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster3 = new Monster(this, game.config.width/1.5, game.config.height, 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster4 = new Monster(this, game.config.width/1.5, game.config.height*2, 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster5 = new Monster(this, game.config.width, game.config.height*1.5, 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster6 = new Monster(this, game.config.width/1.5, game.config.height*1.5, 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster7 = new Monster(this, game.config.width/Phaser.Math.Between(1,1.7), game.config.height*Phaser.Math.Between(1,1.7), 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster8 = new Monster(this, game.config.width/Phaser.Math.Between(1,1.7), game.config.height*Phaser.Math.Between(1,1.7), 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster9 = new Monster(this, game.config.width/Phaser.Math.Between(1,1.7), game.config.height*Phaser.Math.Between(1,1.7), 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster10 = new Monster(this, game.config.width/Phaser.Math.Between(1.8,2.5), game.config.height*Phaser.Math.Between(1.8,2.2), 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster11 = new Monster(this, game.config.width/Phaser.Math.Between(1.8,2.5), game.config.height*Phaser.Math.Between(1.6,2.4), 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.monster12 = new Monster(this, game.config.width/Phaser.Math.Between(1.8,2.5), game.config.height*Phaser.Math.Between(1.6,2.4), 'monster',0, Phaser.Math.Between(this.speedLow,this.speedHigh), 3);
        this.cameras.main.startFollow(this.player);

        this.createAnims();
        this.playerisRight = false;
        this.playerisLeft = false;
        this.playerisUp = false;
        this.playerisDown = false;

        //this.createSymbol();

        this.style = { font: "15px Arial", fill: "#FFFFFF", align: "center" };

        this.timer = this.add.text(0,0, "", this.style);


        var graphics = this.add.graphics().lineStyle(1,0xffffff, .5);
        let path = new Phaser.Curves.Path(600,300).circleTo(200);
        path.draw(graphics, 128);
        let testMonster = this.add.follower(path, 600, 300, 'monster').setAlpha(.5);
        this.physics.add.existing(testMonster);
        testMonster.body.setImmovable(true);
        testMonster.moves = false;

        
        testMonster.startFollow({
            duration: 10000,
            yoyo: true,
            loop: -1,
            onStart: function() { path.getPoint(0,testMonster.pathVector);},
            onUpdate: function (tween){testMonster.body.velocity.copy(testMonster.pathDelta).scale(1000/tween.parent.systems.game.loop.delta);},
            onLoop: function(){},
            onComplete: function() {testMonster.body.stop();}
        });

        this.physics.world.collide(this.player, testMonster, this.onGhostCollision, null, this);
        this.update(0,0,testMonster)
        
    }
    createMap(){
        const map = this.make.tilemap({key: 'floor3OTHER'});
        const tileset = map.addTilesetImage('Spirit_Tiles', 'spirittiles');

        map.createLayer('Ground', tileset);
        const walls = map.createLayer('Walls', tileset);
        walls.setCollisionByProperty({collides: true});
        const props = map.createLayer('props', tileset);
        props.setCollisionByProperty({collides: true});
        map.createLayer('extra', tileset);        

        this.player = new Player(this, this.playerX, this.playerY, 'player', 0);

        this.physics.add.collider(this.player, walls);
        this.physics.add.collider(this.player, props);
    }
    createSymbol(){
        this.symbolArray = ['symbol_0', 'symbol_1', 'symbol_2', 'symbol_3', 'symbol_4', 'symbol_5', 'symbol_6', 'symbol_7', 'symbol_8', 'symbol_9'];
        this.symbolTexture = this.symbolArray[this.password[this.passwordIndex]];
        this.symbol = this.add.sprite(game.config.width - 272, 80, this.symbolTexture, 0);
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
    update(time, delta, testMonster){
        if(!(this.musicplaying)){
            this.musicplaying = true;
            this.otherworld_bgm.play();
        }
        if(this.findingTime > 0){
            this.timer.setX(this.player.x - 50);
            this.timer.setY(this.player.y - 150);
            this.timer.setText("Time left: " + Math.round(this.findingTime*.001));
            if(!this.ghostHit){
                this.player.update();
            }else{
                this.player.anims.stop();
                this.player.setVelocity(0,0);
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
        }else if(!this.timeOut && this.findingTime <= 0){
            this.timeOut = true;
            this.player.anims.stop();
            this.exitLevel();
        }

        this.findingTime -= delta;

        /*
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
        */

        console.log(testMonster.x, testMonster.y);+
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
            //this.elevator_bgm.stop();
            this.musicplaying = false;
            game.config.prevScene = 'Floor_3_OTHER';
            this.scene.switch('Drawing');
        }
    }
    collisions(){
        this.physics.world.collide(this.player, this.monster, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster2, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster3, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster4, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster5, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster6, this.onGhostCollision, null, this);

        this.physics.world.collide(this.player, this.monster7, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster8, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster9, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster10, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster11, this.onGhostCollision, null, this);
        this.physics.world.collide(this.player, this.monster12, this.onGhostCollision, null, this);
    }
    onGhostCollision(){
        if(!this.ghostHit){
            this.ghostHit = true;
            this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
            this.player.body.setVelocity(0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Lobby');
            })
        }   
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
            this.scene.start('Floor_3', {password: this.password, passwordIndex: this.passwordIndex, floorList: this.floorList, finishedLevel: true
            , playerX: this.player.x, playerY: this.player.y});
        })
    }
}