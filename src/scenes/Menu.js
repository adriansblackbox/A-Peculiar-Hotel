class Menu extends Phaser.Scene{

    constructor() {
        super("Menu");    
    }

    preload(){
        //this.load.atlas('particle', './assets/particle.png','./assets/particleJSON.json');
        this.load.image('BG', './assets/titleScene.png');
        this.load.image('BG_start', './assets/titleSceneEnterHover.png');
        this.load.image('player', './assets/Detective Doggert 001.png');
        this.load.image('button', './assets/ElevatorButton.png');
        this.load.image('rain', './assets/Rain.png');
        this.load.image('start', './assets/Start.png');
    }
    create(){
        const textures = this.textures;
        this.background = this.add.image(game.config.width/2, game.config.height/2, 'BG');
        this.startBtn = this.physics.add.sprite(320, 240).setInteractive();
        this.startBtn.setSize(130,110);
        
        this.imageSource = {
            getRandomPoint: function(vec){
                //do
                //{
                    this.x = Phaser.Math.Between(0,game.config.width/2);
                    this.y = Phaser.Math.Between(0,game.config.height/1.5);
                    this.pixel = textures.getPixel(this.x,this.y,'button');
                //} while(this.pixel.alpha < 255);

                //return vec.setTo(this.x - 150, this.y - 150);
                return vec.setTo(this.x - 150, this.y - 150);
            }
        };
        //https://phaser.io/examples/v3/view/game-objects/particle-emitter/emit-from-texture
        const particles = this.add.particles('rain');
        particles.createEmitter({
            /*
            x:0,
            y:0,
            lifespan: 1000,
            gravityY: 10,
            scale: { start: 0, end: .25, ease: 'Quad.easeOut'},
            scale: { start: 1, end: 0, ease: 'Quad.easIn'},
            blendMode: 'ADD',
            emitZone: {type: 'random', source: this.imageSource}
            */
           quantity: 10,
           //x: this.startBtn.x,
           //y: this.startBtn.y,
           y: 0,
           x: {min: 0, max: 800},
           //speedY: {min: 20, max: 50},
           //speedX: {min: 20, max: 50},
           //accelerationY: 1000,
           speedY: {min:200, max: 400},
           lifespan: {min: 100, max: 700},
           alpha: {start: 1, end: 0, ease: 'Sine.easeIn'},
           scale: {start: .2, end: 0},
           //rotate: {min: 30, max: 110},
           //angle: {min: 30, max: 110},
           blendMode: 'ADD',
           frequency: 15,
           //emitZone: { type: 'random', source: this.imageSource }
           //follow: this.startBtn
        });

        //States for state machine will be declared here. 
        this.test = 5;

        this.startBtn.on('pointerover', function (event) {
            this.background.setTexture('BG_start',0)
        }, this);
        this.startBtn.on('pointerout', function (event) {
            this.background.setTexture('BG',0)
        }, this);

        noteBookKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.startBtn.on('pointerdown', function (event) {this.scene.start('Lobby', {test: this.test}); },this); // Start game on click.

        this.style = { font: "15px Arial", fill: "#ffff00", align: "center" };
    }
    update(){
        
    }
}