class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;


        this.speed = 1.5;
    }
    update(){
        this.movement();
    }

    movement(){
        if(keyUP.isDown){
            this.y -= this.speed;
        }
        if(keyDOWN.isDown){
            this.y += this.speed;
        }
        if(keyLEFT.isDown){
            this.x -= this.speed;
        }
        if(keyRIGHT.isDown){
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