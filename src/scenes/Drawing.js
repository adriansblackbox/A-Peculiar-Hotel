//https://phaser.io/examples/v3/view/game-objects/shapes/draw
class Drawing extends Phaser.Scene{


    constructor() {
        super("Drawing");          

    }

    preload(){
        this.load.image('Notepad', './assets/Notepad.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('brush', './assets/testBrush.png');
        this.load.image('pencil', './assets/BiggerPencil.png');
        this.load.audio('notebookClose', './assets/sounds/Notebook_close.wav');
        this.load.audio('notebookOpen', './assets/sounds/Notebook_open.wav');
        this.load.audio('notebookErase', './assets/sounds/Erase3.wav');
        this.load.audio('floorMusic', './assets/sounds/floorbgm.wav');
    }
    
    create ()
    {
        this.sound.stopAll();
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
        this.antiSpamKey = true;
        this.style = { fontFamily: "IndieFlower", fontSize: '16px', fill: "#000000", align: "center" };

        this.sound.play('notebookOpen', this.SFXConfig);
        this.canvas = this.sys.canvas;
        this.canvas.style.cursor = 'none';
        
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'Notepad');
        this.rt = this.add.renderTexture(0,0,960,720);
        this.text = this.add.text(420, 290, "T-Key to clear notebook", this.style);
        this.text = this.add.text(game.config.width/1.68 + 38, 270, "R-Key to close notebook", this.style);
        this.text = this.add.text(game.config.width/1.68 + 38, 250, "ESC-Key to restart game", this.style);
        //the 32's depend on the sprite size and screen size
        this.input.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                this.rt.draw('brush', pointer.x-48, pointer.y+16);      //to change the ink, change this 'brush' to some other sprite
            }
        }, this);
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.RenderTexture.html#clear__anchor   graphics stuff
        this.createKeys();

        this.newCursor = this.add.image(game.config.width/2, game.config.height/2, 'pencil');
    }
    createKeys(){
        eraseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        goBack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        restartGame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    }
    update(){
        
        if(Phaser.Input.Keyboard.JustDown(eraseKey)){
            this.sound.play('notebookErase', this.SFXConfig);
            this.rt.clear();
            //console.log(this.game.config.prevScene);
            //this.scene.switch(this.game.config.prevScene);
        }
        if(Phaser.Input.Keyboard.JustDown(goBack)){
            this.canvas.style.cursor = 'default';
            this.sound.play('notebookClose', this.SFXConfig);
            console.log(this.game.config.prevScene);
            this.scene.switch(this.game.config.prevScene);
        }
        if(Phaser.Input.Keyboard.JustDown(restartGame) && this.antiSpamKey == true){
            this.antiSpamKey = false;
            console.log("restart");
            this.cameras.main.fadeOut(3000, 0xFFFFFF, 0xFFFFFF, 0xFFFFFF)
            //this.player.body.setVelocity(0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('Lobby');
            })
        }

        this.newCursor.x = game.input.mousePointer.x;
        this.newCursor.y = game.input.mousePointer.y;
    }

}
