class Pike extends ObjetPhysique {


    constructor(scene, x, y) {


        super(scene, x, y, "Pike");
        //pas de gravité
        this.setBodySize(32,32);
        this.body.allowGravity = false;

    }
}