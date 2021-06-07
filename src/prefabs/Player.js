class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(20, 15, true);
        //this.body.offset.x = 0;
        this.body.offset.y = 17.5;


        this.speed = 400;
        this.direction = '';
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
        

        if(!keyUP.isDown && !keyDOWN.isDown && !keyLEFT.isDown && !keyRIGHT.isDown){
            this.direction = 'IDLE';
        }

        if(keyUP.isDown && !this.onUP){
            this.moveList.push('UP');
            this.onUP = true;
        }else if(keyUP.isUp){
            this.index = this.moveList.indexOf('UP');
            if(this.index > -1){
                this.moveList.splice(this.index, 1);
            }
            this.onUP = false;
        }
        if(keyDOWN.isDown && !this.onDOWN){
            this.moveList.push('DOWN');
            this.onDOWN = true;
        }else if(keyDOWN.isUp){
            this.index = this.moveList.indexOf('DOWN');
            if(this.index > -1){
                this.moveList.splice(this.index, 1);
            }
            this.onDOWN = false;
        }
        if(keyLEFT.isDown && !this.onLEFT){
            this.moveList.push('LEFT');
            this.onLEFT = true;
        }else if(keyLEFT.isUp){
            this.index = this.moveList.indexOf('LEFT');
            if(this.index > -1){
                this.moveList.splice(this.index, 1);
            }
            this.onLEFT = false;
        }
        if(keyRIGHT.isDown && !this.onRIGHT){
            this.moveList.push('RIGHT');
            this.onRIGHT = true;
        }else if(keyRIGHT.isUp){
            this.index = this.moveList.indexOf('RIGHT');
            if(this.index > -1){
                this.moveList.splice(this.index, 1);
            }
            this.onRIGHT = false;
        }

        if(this.moveList.length >= 1){
            this.direction = this.moveList[this.moveList.length - 1];
        }

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

    }
}