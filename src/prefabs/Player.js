class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.body.collideWorldBounds = true;


        this.speed = 50;
    }
    update(){
        this.movement();
    }

    movement(){
        if(keyUP.isDown){
            this.setVelocity(0, -this.speed);
        }
        else if(keyDOWN.isDown){
            this.setVelocity(0, this.speed);
        }
        if(keyLEFT.isDown){
            this.setVelocity(-this.speed, 0);
        }
        else if(keyRIGHT.isDown){
            this.setVelocity(this.speed, 0);
        }
        if(!(keyRIGHT.isDown || keyLEFT.isDown || keyUP.isDown || keyDOWN.isDown)){
            this.setVelocity(0, 0);
        }
    }
}