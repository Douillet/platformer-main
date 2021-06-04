class ObjetEnnemi extends ObjetPhysique{
    /**
     * Quand Player touche cet objet, il a perdu
     * @param {Tableau} scene
     * @param {Number} x
     * @param {Number} y
     * @param {string} image
     */
    constructor(scene, x, y,image) {
        super(scene, x, y,image);

        this.vie = 10;       //vie par coup d'épée (10 = 1 coup)

        this.tete = 10;      //vie par saut de sur la tête (10 = 1 saut)

        this.isDead = false; //bool de mort

        //fonctions d'attaque qui s'appliquent à tous les monstres

        //ici saut
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitMonster,
            null,
            scene

        );

        //ici coup d'épée
        scene.physics.add.overlap(
            scene.epee,
            this,
            scene.etPaf,
            null,
            scene

        );
    }
}