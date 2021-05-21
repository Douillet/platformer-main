class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.world = scene;
        this.dirX = 1;

        this.estEnTrainDAttaquer = false;
        this.rechargeSonCoup = false;

        this.setCollideWorldBounds(true)
        this.setBounce(0);
        this.setGravityY(850);
        this.setFriction(1, 1);

        this.setBodySize(this.body.width + 30, this.body.height + 70);
        this.setOffset(15, 20);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', {start: 23, end: 0}),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', {start: 25, end: 48}),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [{key: 'hero', frame: 24}],
            frameRate: 20
        });
        //tentative coup d'épée
        /*this.anims.create({
            key: 'SHIFT',
            frames: [ { key: 'hero', frame: 30 } ],
            frameRate: 20
        });*/
        this.anims.create({
            key: 'SHIFT',
            frames: this.anims.generateFrameNumbers('hero', {start: 21, end: 22}),
            frameRate: 30,
            repeat: -1
        });

        this.shiftKey = scene.input.keyboard.addKey('Shift');

        this._directionX = 0;
        this._directionY = 0;


    }

    set directionX(value) {
        this._directionX = value;
    }

    set directionY(value) {
        this._directionY = value;
    }

    /**
     * arrête le joueur
     */
    stop() {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY = 0;
        this.directionX = 0;
    }


    //attack(){}

    /**
     * Déplace le joueur en fonction des directions données
     */
    move() {

        //cap les vitesses verticales
        this.body.velocity.y = Math.min(800, Math.max(-800, this.body.velocity.y));

        switch (true) {
            case this._directionX < 0:
                this.setVelocityX(-125);
                this.anims.play('left', true);
                this.dirX = -1;
                break;
            case this._directionX > 0:

                this.setVelocityX(125);
                this.anims.play('right', true);
                this.dirX = 1;
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if (this._directionY < 0) {
            if (this.body.blocked.down || this.body.touching.down) {
                this.setVelocityY(-700);
            }
        }


    }

    attaque() {

        if(this.rechargeSonCoup === false) {
            this.rechargeSonCoup = true;
            console.log("att 2 sec, je viens de frapper!");
            Tableau.current.epee.setPosition(this.x + (50 * this.dirX), this.y);
            setTimeout(function () {
                Tableau.current.player.estEnTrainDAttaquer = false;
                Tableau.current.epee.setPosition(-1000, -1000);
            }, 200);
            setTimeout(function () {
                Tableau.current.player.rechargeSonCoup = false;
                console.log("j'ai fini maman");
            }, 1500);
        }



    }


}