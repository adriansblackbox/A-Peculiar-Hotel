class Monster extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture, speedP, levelP){
        super(scene,x,y,texture, speedP, levelP);
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
        this.circleSpeedX = 2;
        this.circleSpeedY = 2;
        this.danceMove = 2; //Phaser.Math.Between(1,2)
        this.vec = new Phaser.Math.Vector2();
        this.whichCorner = 1;
    }
    create(){
        this.onDOWN = false;
        this.onUP = false;
        this.onLEFT = false;
        this.onRIGHT = false;
        console.log("ghost created");
        
        this.pivot.x = 100;
        this.anchor.set(.5);
    }
    update(playerX, playerY){
        //console.log("thisX: " , this.x);
        //console.log("playerX: ",playerX);
        this.movement(playerX, playerY);
    }

    movement(pX, pY){
        if(this.level == 1){
            //back and fourth movement based on starting position
            if(this.y < (this.startingY + 100) && this.direction == false){
                this.setVelocity(0,this.speed);
                if(this.y > this.startingY + 90){
                    this.direction = true;
                }
            }
            else if(this.y > this.startingY - 100 && this.direction == true){
                this.setVelocity(0,-this.speed);
                if(this.y < this.startingY - 90){
                    this.direction = false;
                }
            }
        }

        if(this.level == 2){
            console.log("this x: " + this.x + " this y: " + this.y);
            //square room
            if(this.whichCorner == 1){
                this.setVelocity(this.speed,0);
                if(this.x > 900){
                    this.whichCorner = 2;
                }
            }
            if(this.whichCorner == 2){
                this.setVelocity(0,this.speed);
                if(this.y > 850){
                    this.whichCorner = 3;
                }
            }
            if(this.whichCorner == 3){
                this.setVelocity(-this.speed,0);
                if(this.x < 459){
                    this.whichCorner = 4;
                }
            }
            if(this.whichCorner == 4){
                this.setVelocity(0,-this.speed);
                if(this.y < 450){
                    this.whichCorner = 1;
                }
            }
            
        }

        if(this.level == 3){
            //ballroom
            if(this.danceMove == 1){
                //diagonall
                if(this.circleSpeedX > -2 && this.direction == false){
                    this.circleSpeedX -= .1;
                    this.circleSpeedY -= .1;
                    if(this.circleSpeedX < -1.9){
                        this.direction = true;
                    }
                }
                if(this.circleSpeedX < 2 && this.direction == true){
                    this.circleSpeedX += .1;
                    this.circleSpeedY += .1;
                    if(this.circleSpeedX > 1.9){
                        this.direction = false;
                    }
                }
                this.setVelocity(this.speed*this.circleSpeedX, this.speed*this.circleSpeedY);
            }
            if(this.danceMove == 2){
                this.vec.setToPolar(this.rotation, 50);
                this.vx = this.vec.x * 1;
                this.vy = this.vec.y * 1;
                this.setVelocity(this.vx,this.vy);
                this.rotation += .1; 
            }
        }
        
        if(this.level == 4){
            //console.log(this.y);
            if(this.x > pX - 2 && this.x < pX + 2)
            {
                this.setVelocityX(0);
            }
            else if(this.x >= pX){
                this.setVelocityX(-this.speed);
            }
            else if(this.x < pX){
                this.setVelocityX(this.speed);
            }
            if(this.y > pY - 2 && this.y < pY + 2)
            {
                this.setVelocityY(0);
            }
            else if(this.y >= pY){
                this.setVelocityY(-this.speed);
            }
            else if(this.y < pY){
                this.setVelocityY(this.speed);
            }
        }
        
        
    }
}