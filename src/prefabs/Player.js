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
        //diagonal movement (the down is slower)
        if(keyUP.isDown && keyRIGHT.isDown){
            this.y -= this.speed;
            this.x += this.speed;
        }
        if(keyUP.isDown && keyLEFT.isDown){
            this.y -= this.speed;
            this.x -= this.speed;
        }
        if(keyDOWN.isDown && keyRIGHT.isDown){
            this.y += this.speed;
            this.x += this.speed;
        }
        if(keyDOWN.isDown && keyLEFT.isDown){
            this.y += this.speed;
            this.x -= this.speed;
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