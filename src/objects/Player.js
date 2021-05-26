class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.world = scene;
        this.dirX = 1;
        this.vieJ = 3;

        this.seFaitTaclerParUnMonstre = false;
        this.estEnTrainDAttaquer = false; //bool pour infliger un dégât
        this.rechargeSonCoup = false; //bool pour le rechargement
        this.viensDeTuerUnMonstre = false; //bool pour empêcher de rebondir sur les monstres

        this.setCollideWorldBounds(true)
        this.setBounce(0, 0);
        this.setGravityY(850);
        this.setFriction(1, 1);
        this.setDepth(1000);

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
        this.anims.create({
            key: 'turn off',
            frames: [{key: 'hero', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'att_l',
            frames: this.anims.generateFrameNumbers('hero', {start: 23, end: 0}),
            frameRate: 48
        });
        this.anims.create({
            key: 'att_r',
            frames: this.anims.generateFrameNumbers('hero', {start: 25, end: 48}),
            frameRate: 48
        });

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
                this.setVelocityX(-150);
                this.anims.play('left', true);
                this.dirX = -1;
                break;
            case this._directionX > 0:

                this.setVelocityX(150);
                this.anims.play('right', true);
                this.dirX = 1;
                break;
            default:
                this.setVelocityX(0);
                this.anims.play(this.dirX === 1 ? 'turn' : 'turn off', true);

        }
        if(this.viensDeTuerUnMonstre === false) {
            if (this._directionY < 0) {
                if (this.body.blocked.down || this.body.touching.down) {
                    this.setVelocityY(-700);
                }
            }
        }


    }

    attaque() {

        if(this.rechargeSonCoup === false) { //on vérifie si on a recharger le coup
            Tableau.current.player.setTint(0x737373); //grise le joueur

            this.rechargeSonCoup = true; //lance la recharge
            //console.log("att 2 sec, je viens de frapper!");
            Tableau.current.epee.setPosition(this.x + (50 * this.dirX), this.y); //fait déplacer le collider d'attaque
            setTimeout(function () { //cooldown qui tp le collider d'attaque
                Tableau.current.player.estEnTrainDAttaquer = false;
                Tableau.current.epee.setPosition(-1000, -1000);
            }, 200);
            setTimeout(function () { //cooldown de rechargement qui retire le tint grisant
                Tableau.current.player.rechargeSonCoup = false;
                //console.log("j'ai fini maman");
                Tableau.current.player.setTint(0xffffff);
            }, 1500);
        }



    }


}