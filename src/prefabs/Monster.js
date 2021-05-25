class Monster extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(20, 15, true);
        //this.body.offset.x = 0;
        this.body.offset.y = 17.5;

        this.startingX = this.x;
        this.startingY = this.y;
        this.speed = 100; //58
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
    update(){
        this.movement();
    }

    movement(){
        if(this.x < this.startingX + 100 && this.direction == false){
            this.setVelocity(this.speed, 0);
            console.log("if statement");
            if(this.x > this.startingX + 90){
                this.direction = true;
            }
        }
        else if(this.x > this.startingX - 100 && this.direction == true){
            this.setVelocity(-this.speed,0);
            if(this,this.x < this.startingX - 90){
                this.direction = false;
            }
        }
        /*
        if(this.direction == 'UP'){
            this.setVelocity(0, -this.speed);
        }
        if(this.direction == 'DOWN'){
            this.setVelocity(0, this.speed);
        }
        if(this.direction == 'LEFT'){
            this.setVelocity(-this.speed, 0);
        }
        if(this.direction == 'RIGHT'){
            this.setVelocity(this.speed, 0);
        }

        if(this.direction == 'IDLE'){
            this.setVelocity(0, 0);
        }
        */

    }
}