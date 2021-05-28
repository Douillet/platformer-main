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

        this.setBodySize(this.body.width +17, this.body.height + 84);
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
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: 'att_r',
            frames: this.anims.generateFrameNumbers('AndrasAttack', {start: 5, end: 9}),
            frameRate: 4,
            repeat: 0
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
        if (this.body.velocity.y ===! 0){
            this.anims.play(this.dirX === -1 ? 'jump_l' : 'jump_r', true);
        }else{
            if(this.body.velocity.x < 0){
            this.anims.play('left', true);
        }
            if (this.body.velocity.x > 0){
                this.anims.play('right', true);
            }
            if (this.body.velocity.x === 0){
                this.anims.play(this.dirX === -1 ? 'turn' : 'turn off', true);
            }}


        switch (true) {
            case this._directionX < 0:
                this.setVelocityX(-150);
                //this.anims.play('left', true);
                this.dirX = -1;
                break;

            case this._directionX > 0:
                this.setVelocityX(150);
                //this.anims.play('right', true);
                this.dirX = 1;
                break;

            default:
                this.setVelocityX(0);
                //this.anims.play(this.dirX === -1 ? 'turn' : 'turn off', true);
                if(this.dirX === -1){
                    this.setOffset(17, 18);
                }else{
                    this.setOffset(23,18);
                }

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
            Tableau.current.player.setTint(0xb4b4b4); //grise le joueur

            this.rechargeSonCoup = true; //lance la recharge
            //console.log("att 2 sec, je viens de frapper!");
            Tableau.current.epee.setPosition(this.x + (50 * this.dirX), this.y); //fait déplacer le collider d'attaque
            this.anims.play(this.dirX === -1 ? 'att_r' : 'att_l', true); //Anim d'attaque
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