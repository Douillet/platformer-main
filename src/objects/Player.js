class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.world = scene;
        this.dirX = 1; //détecte la direction du joueur
        this.vieJ = 3; //pv de base du joueur

        this.agiteSonStickEnAcier = false; //bool qui détecte quand on attaque
        this.seFaitTaclerParUnMonstre = false; //bool qui détecte quand on prend un coup
        this.estEnTrainDAttaquer = false; //bool pour infliger un dégât
        this.rechargeSonCoup = false; //bool pour le rechargement
        this.viensDeTuerUnMonstre = false; //bool pour empêcher de rebondir sur les monstres

        this.setCollideWorldBounds(true);
        this.setBounce(0, 0);
        this.setGravityY(850);
        this.setFriction(1, 1);
        this.setDepth(1000);

        this.setBodySize(this.body.width + 5, this.body.height + 84);
        this.setOffset(23, 18);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('Andras', {start: 7, end: 0}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('Andras', {start: 10, end: 17}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('Andras', {start: 28, end: 18}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'turn off',
            frames: this.anims.generateFrameNumbers('Andras', {start: 29, end: 39}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'att_l',
            frames: this.anims.generateFrameNumbers('AndrasAttack', {start: 4, end: 0}),
            frameRate: 16
        });
        this.anims.create({
            key: 'att_r',
            frames: this.anims.generateFrameNumbers('AndrasAttack', {start: 5, end: 9}),
            frameRate: 16
        });
        this.anims.create({
            key: 'jump_l',
            frames: this.anims.generateFrameNumbers('Andras', {start: 40, end: 40}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'jump_r',
            frames: this.anims.generateFrameNumbers('Andras', {start: 41, end: 41}),
            frameRate: 4,
            repeat: -1
        });
        this.on('animationcomplete', function () {
            if (this.anims.currentAnim.key === 'att_r') {
                this.agiteSonStickEnAcier = false;
            }
        });
        this.on('animationcomplete', function () {
            if (this.anims.currentAnim.key === 'att_l') {
                this.agiteSonStickEnAcier = false;
            }
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

    /**
     * Déplace le joueur en fonction des directions données
     */
    move() {
        //cap les vitesses verticales
        this.body.velocity.y = Math.min(800, Math.max(-800, this.body.velocity.y));

        if (this.agiteSonStickEnAcier === true) {
            this.anims.play(this.dirX === -1 ? 'att_l' : 'att_r', true);
            if (this.dirX=== -1) {
                this.setOffset(87, 18);
            }else{
                this.setOffset(110,18);
            }

            //console.log("JHABITE");
        }
        if (this.agiteSonStickEnAcier === false) {

            if (this.body.velocity.y !== 0) {
                this.anims.play(this.dirX === -1 ? 'jump_l' : 'jump_r', true);
                if (this.dirX=== -1) {
                    this.setOffset(17, 18);
                }else{
                    this.setOffset(33,18);
                }
            } else {
                if (this.body.velocity.x < 0) {
                    this.anims.play('left', true);
                    this.setOffset(17, 18);
                }
                if (this.body.velocity.x > 0) {
                    this.anims.play('right', true);
                    this.setOffset(33, 18);
                }
                if (this.body.velocity.x === 0) {
                    this.anims.play(this.dirX === -1 ? 'turn' : 'turn off', true);
                }
            }
        }


        //pour donner les vitesses de déplacements
        switch (true) {
            case this._directionX < 0:
                this.setVelocityX(-180);
                this.dirX = -1;
                break;

            case this._directionX > 0:
                this.setVelocityX(180);
                this.dirX = 1;
                break;

            default:
                this.setVelocityX(0);


        }
        //fonction saut qui peut-être bloquer par le booléen
        if (this.viensDeTuerUnMonstre === false) {
            if (this._directionY < 0) {
                if (this.body.blocked.down || this.body.touching.down) {
                    this.setVelocityY(-700);
                }
            }
        }


    }

    attaque() {

        if (this.rechargeSonCoup === false) { //on vérifie si on a rechargé le coup
            this.agiteSonStickEnAcier = true;

            Tableau.current.player.setTint(0xb4b4b4); //grise le joueur
            this.rechargeSonCoup = true; //lance la recharge
            //console.warn("att 2 sec, je viens de frapper!");
            Tableau.current.epee.setPosition(this.x + (80 * this.dirX), this.y); //fait déplacer le collider d'attaque
            setTimeout(function () { //cooldown qui tp le collider d'attaque
                this.agiteSonStickEnAcier = false;
            }, 500);
            setTimeout(function () { //cooldown qui tp le collider d'attaque
                //document.title = "attaque plus "
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