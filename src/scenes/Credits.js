class Credits extends Phaser.Scene{

    constructor() {
        super("Credits");    
    }

    preload(){
        //this.load.atlas('particle', './assets/particle.png','./assets/particleJSON.json');
        this.load.spritesheet('creditsScene', './assets/creditsScene.png', {frameWidth: 640, frameHeight: 320, startFrame: 0, endFrame: 1});
        this.load.image('return_button', './assets/returnButton.png');
        this.load.image('return_button_Lit', './assets/returnButtonHover.png');
        this.load.image('rain', './assets/Rain.png');
        this.load.image('start', './assets/Start.png');
    }
    create(){
        this.anims.create({
            key: 'creditsScene',
            frames: this.anims.generateFrameNumbers('creditsScene', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1
        });

        const textures = this.textures;
        this.background = this.add.sprite(game.config.width/2, game.config.height/2, 'creditsScene', 0);
        this.background.anims.play('creditsScene', true);
        this.backBtn = this.physics.add.sprite(60, 60, 'return_button').setInteractive();

        this.backBtn.setSize(130,110);

        
       
        this.backBtn.on('pointerover', function (event) {
            this.backBtn.setTexture('return_button_Lit',0)
        }, this);
        this.backBtn.on('pointerout', function (event) {
            this.backBtn.setTexture('return_button',0)
        }, this);

        this.backBtn.on('pointerdown', function (event) {this.scene.start('Menu', {test: this.test}); },this); // Start Menu on click.
    }
    update(){
        
    }
}