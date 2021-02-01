class GobelinVolant extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "GobelinVolant");

        this.setOrigin(0,0);
        this.setDisplaySize(100,70);
        this.setCollideWorldBounds(true);
        this.body.allowGravity=false;
        this.setBounceY(1);
        this.setBounceX(1);
        this.setVelocityX(100);
    }
}