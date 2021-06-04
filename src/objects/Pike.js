class Pike extends ObjetPhysique {

    constructor(scene, x, y) {
        super(scene, x, y, "Pike");

        this.setBodySize(32,32);

        //pas de gravité
        this.body.allowGravity = false;

    }
}