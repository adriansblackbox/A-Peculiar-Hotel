//https://phaser.io/examples/v3/view/game-objects/shapes/draw
class Drawing extends Phaser.Scene{


    constructor() {
        super("Drawing");          
        
    }

    preload(){
        this.load.image('BG1', './assets/Notepad.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('brush', './assets/testBrush.png');
        this.load.image('pencil', './assets/BiggerPencil.png');
    }
    
    create ()
    {
        this.canvas = this.sys.canvas;
        this.canvas.style.cursor = 'none';
        
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'BG1');
        this.rt = this.add.renderTexture(0,0,960,720);
        this.text = this.add.text(game.config.width/1.6, game.config.height/1.1, "T-Key to clear notebook", this.style);
        this.text = this.add.text(game.config.width/1.68, game.config.height/1.2, "Y-Key to go back to level", this.style);
        //the 32's depend on the sprite size and screen size
        this.input.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                this.rt.draw('brush', pointer.x-48, pointer.y+16);
            }
        }, this);
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.RenderTexture.html#clear__anchor   graphics stuff
        this.createKeys();

        this.newCursor = this.add.image(game.config.width/2, game.config.height/2, 'pencil');
    }
    createKeys(){
        eraseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        goBack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    }
    update(){
        if(eraseKey.isDown){
            this.rt.clear();
            //console.log(this.game.config.prevScene);
            //this.scene.switch(this.game.config.prevScene);
        }
        if(goBack.isDown){
            console.log(this.game.config.prevScene);
            this.scene.switch(this.game.config.prevScene);
        }
        this.newCursor.x = game.input.mousePointer.x;
        this.newCursor.y = game.input.mousePointer.y;
    }

}
