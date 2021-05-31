class Monster extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame, speedP, levelP){
        super(scene,x,y,texture,frame, speedP, levelP);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(20, 15, true);
        //this.body.offset.x = 0;
        this.body.offset.y = 17.5;

        this.startingX = this.x;
        this.startingY = this.y;
        this.level = levelP;
        this.speed = speedP; //58
        this.direction = false;
        this.moveList = [];
        this.index = 0;
    }
    create(){
        this.onDOWN = false;
        this.onUP = false;
        this.onLEFT = false;
        this.onRIGHT = false;
    }
    update(playerX, playerY){
        console.log("thisX: " , this.x);
        //console.log("playerX: ",playerX);
        this.movement(playerX, playerY);
    }

    movement(pX, pY){
        if(this.levelP == 1){
            //back and fourth movement based on starting position
            if(this.x < this.startingX + 100 && this.direction == false){
                this.setVelocity(this.speed, 0);
                console.log("if statement");
                if(this.x > this.startingX + 90){
                    this.direction = true;
                }
            }
            else if(this.x > this.startingX - 100 && this.direction == true){
                this.setVelocity(-this.speed,0);
                if(this.x < this.startingX - 90){
                    this.direction = false;
                }
            }
        }
        
        if(this.levelP == 4){
            if(this.x > pX - 1 && this.x < pX + 1)
            {
                this.setVelocityX(0);
            }
            else if(this.x > pX){
                this.setVelocityX(-this.speed);
            }
            else if(this.x < pX){
                this.setVelocityX(this.speed);
            }
            if(this.y > pY - 1 && this.y < pY + 1)
            {
                this.setVelocityY(0);
            }
            else if(this.y > pY){
                this.setVelocityY(-this.speed);
            }
            else if(this.y < pY){
                this.setVelocityY(this.speed);
            }
        }
        
        
    }
}