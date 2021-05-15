//https://phaser.io/examples/v3/view/game-objects/shapes/draw
class Drawing extends Phaser.Scene{

    constructor() {
        super("Drawing");          
        
    }

    preload(){
        this.load.image('BG1', './assets/floor1BG.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
    }
    
    create ()
    {
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'BG1');
        this.rt = this.add.renderTexture(0,0,960,720);

        //the 32's depend on the sprite size
        this.input.on('pointermove', function (pointer) {
            if (pointer.isDown)
            {
                this.rt.draw('player', pointer.x - 32, pointer.y - 32);
            }
        }, this);
        //https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.RenderTexture.html#clear__anchor   graphics stuff
        this.createKeys();
    }
    createKeys(){
        eraseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }
    update(){
        if(eraseKey.isDown){
            this.rt.clear();
            console.log("clear");
        }
    }

}
