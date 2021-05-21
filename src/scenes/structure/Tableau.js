/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene {
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('attack', 'assets/attack.png');
        this.load.spritesheet('hero',
            'assets/hero.png',
            {frameWidth: 90, frameHeight: 123}
        );
    }

    create() {
        Tableau.current = this;
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur " + this.constructor.name + " / " + this.scene.key);
        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.sky.displayWidth = 14 * 64;
        this.sky.setScrollFactor(0, 0);

        this.epee = new Attack(this, -500, -500);
        /**
         * Le joueur
         * @type {Player}
         */


        //ATTENTION
        cursors = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, 30, 300);
        this.blood = this.add.sprite(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "attack")
        this.blood.displayWidth = 64;
        this.blood.displayHeight = 64;
        this.blood.visible = false;
        this.Boom = this.add.particles('attack');

    }

    update() {
        super.update();
        this.player.move();
        //this.attaque();
    }

    ramasserEtoile(player, star) {
        player.viensDeTuerUnMonstre = true; //Cette fonciton marche aussi sur les objets Physiques autre, le cd étant super court il ne gêne pas
        setTimeout(function () {      //On ne peut pas ressauter pendant 0.05 sec
            player.viensDeTuerUnMonstre = false;
        }, 10);
        star.disableBody(true, true);
        //player.setVelocityY(0);
        ui.gagne();

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        let totalActive = 0;
        for (let child of this.children.getChildren()) {
            if (child.texture && child.texture.key === "star") {
                if (child.active) {
                    totalActive++;
                }
            }
        }
        if (totalActive === 0) {
            this.win();
        }

    }

    finNiveau(player, objectif) {
        this.win();
    }

    /**
     *
     * @param Attack
     * @param {ObjetEnnemi} monster
     */
    etPaf(Attack, monster) {
        if (this.player.estEnTrainDAttaquer === false) //on vérifie si on n' est pas en train attaquer
            {
            this.player.estEnTrainDAttaquer = true; //on est en train d'attaquer
            monster.vie -= 10; //fait baisser la vie des monstres de 10
            this.cameras.main.shake(200, 0.004, true,);
            console.log("touche", monster.vie);
            if (monster.vie <= 0) //si la vie du monstre tombe a 0 ou en dessous
            {
                monster.isDead = true; //ok le monstre est mort
                monster.disableBody(true, true);//plus de collisions
                this.cameras.main.shake(200, 0.02, true,); //Screen Shaker
            }
        }
    }

    saigne(object,onComplete){
        let me=this;
        me.emitter = Tableau.current.Boom.createEmitter( {
            x: object.x+30,
            y: object.y+40,
            speed: 400,
            scaleY: { start: 0.15, end: 0.3},
            scaleX: { start: 0.05, end: 0.1},
            angle: { min: -115, max: -65},
            //frequence: 4000,
            lifespan: 150,
            blendMode: 'NORMAL',
            quantity: 2,
            maxParticles: 10,

        })
        /*me.blood.visible=true;
        me.blood.rotation = Phaser.Math.Between(0,6);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:200,
            displayHeight:{
                from:40,
                to:70,
            },
            displayWidth:{
                from:40,
                to:70,
            },
            onComplete: function () {
                me.blood.visible=false;
                onComplete();
            }
        })*/
    }

    hitMonster(player, monster) {
        let me = this;
        if (monster.isDead !== true) { //si notre monstre n'est pas déjà mort
            if (
                //si le bas du player est plus haut que le monstre
                player.getBounds().bottom < monster.getBounds().top + 30

            ) {
                //ui.gagne();
                player.viensDeTuerUnMonstre = true;
                setTimeout(function () {      //On ne peut pas ressauter pendant 0.05 sec
                    player.viensDeTuerUnMonstre = false;
                }, 10);
                monster.isDead = true; //ok le monstre est mort
                monster.disableBody(true, true); //plus de collisions
                this.cameras.main.shake(200, 0.004, true,); //Screen Shaker
                this.saigne(monster,function(){
                //à la fin de la petite anim...ben il se passe rien :)
                })
                //notre joueur rebondit sur le monstre
                player.setVelocityY(-300);
            } else {
                //le joueur est mort
                if (!me.player.isDead) {
                    this.cameras.main.shake(200, 0.01, true,);
                    me.player.isDead = true;
                    me.player.visible = false;
                    me.scene.restart();
                    ui.perd(); //reset le score de plumes
                    //ça saigne...
                    /* me.saigne(me.player,function(){
                         //à la fin de la petite anim, on relance le jeu
                         me.blood.visible=false;
                         me.player.anims.play('turn');
                         me.player.isDead=false;
                         me.scene.restart();
                     })*/

                }


            }
        }

    }

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike(player, spike) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();

    }

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy() {
        this.player.stop();
        this.scene.stop();
    }


    /**
     * Quand on a gagné
     */
    win() {
        Tableau.suivant();
    }

    /**
     * Va au tableau suivant
     */
    static suivant() {
        let ceSeraLaSuivante = false;
        let nextScene = null;
        if (Tableau.current) {
            for (let sc of game.scene.scenes) {
                if (sc.scene.key !== "ui") {
                    if (!nextScene) {
                        if (ceSeraLaSuivante) {
                            nextScene = sc;
                        }
                        if (sc.scene.key === Tableau.current.scene.key) {
                            ceSeraLaSuivante = true;
                        }
                    }
                }
            }
        }
        if (!nextScene) {
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau) {
        if (Tableau.current) {
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current = null;