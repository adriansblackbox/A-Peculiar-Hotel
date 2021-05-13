class Player extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);

        this.speed = 1.5;
    }
    update(){
        this.movement();
    }

    movement(){
        if(keyUP.isDown && this.y > 0){
            this.y -= this.speed;
        }
        if(keyDOWN.isDown && this.y < game.config.height){
            this.y += this.speed;
        }
        if(keyLEFT.isDown && this.x > 0){
            this.x -= this.speed;
        }
        if(keyRIGHT.isDown && this.x < game.config.width){
            this.x += this.speed;
        }
        
        //Diagonal movent
        if(keyUP.isDown && keyLEFT.isDown){
            
        }
        if(keyUP.isDown && keyRIGHT.isDown){
        }
            
        if(keyDOWN.isDown && keyLEFT.isDown){
            
        }
        if(keyDOWN.isDown && keyRIGHT.isDown){
            
        }
    }
}