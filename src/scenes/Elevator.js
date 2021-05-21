class Elevator extends Phaser.Scene{

    init(data){
        this.test = data.test;
        this.floorList = data.floorList;
    }
    constructor() {
        super("Elevator");    
    }

    preload(){
        this.load.image('button', './assets/ElevatorButton.png');

    }
    create(){

        this.startBtn = this.add.sprite(game.config.width/2, game.config.height/2, 'button').setInteractive();
        
        //States for state machine will be declared here. 
        this.test = 5;

        //this.startBtn.on('pointerover', function (event) {}, this);
        //this.startBtn.on('pointerout', function (event) {}, this);
        
        this.randFloor = Phaser.Math.Between(0, this.floorList.length - 1);
        this.nextFloor = this.floorList[this.randFloor];

        if(this.floorList.length > 0){
            this.floorList.splice(this.randFloor, 1);
        }
        
        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        console.log(this.floorList);
        this.startBtn.on('pointerdown', function (event) {
            this.scene.start(this.nextFloor, {test: this.test, floorList: this.floorList});
        },this); // Start game on click.
    }
    update(){
        if(noteBookKey.isDown){
            game.config.prevScene = 'Elevator';
            this.scene.switch('Drawing');
        }
    }
}