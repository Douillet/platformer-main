class Plume extends ObjetPhysique {


    constructor(scene, x, y) {
        super(scene, x, y, "Plume");

        //pas de gravité
        this.body.allowGravity = false;

        //anim grâce au SpriteSHeet dans Tableau.js
        this.anims.create({
            key: 'animPlume',
            frames: this.anims.generateFrameNumbers('plume', {start: 0, end: 11}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.play('animPlume', true);

    }
}
