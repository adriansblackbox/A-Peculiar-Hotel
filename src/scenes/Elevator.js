class Elevator extends Phaser.Scene{

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
        this.floorList = ['Floor_1', 'Floor_2'];
        this.randFloor = Phaser.Math.Between(0, 1);
        this.startBtn.on('pointerdown', function (event) {this.scene.start(this.floorList[this.randFloor], {test: this.test}); },this); // Start game on click.
    }
    update(){

    }
}