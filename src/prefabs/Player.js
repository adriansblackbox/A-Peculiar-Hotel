class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.body.collideWorldBounds = true;


        this.speed = 1.5;
    }
    update(){
        this.movement();
    }

    movement(){
        if(keyUP.isDown){
            this.y -= this.speed;
        }
        else if(keyDOWN.isDown){
            this.y += this.speed;
        }
        else if(keyLEFT.isDown){
            this.x -= this.speed;
        }
        else if(keyRIGHT.isDown){
            this.x += this.speed;
        }
    }
}