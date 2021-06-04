class Attack extends ObjetPhysique{
    constructor(scene, x, y) {
        super(scene, x, y, "attack");

        this.setDisplaySize(80,30);
        this.setCollideWorldBounds(false);
        this.body.allowGravity=false;
        this.setDepth(1000);

    }
}