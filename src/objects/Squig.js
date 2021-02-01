class Squig extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Squig");
        
        this.setOrigin(0,0);
        this.setDisplaySize(100,80);
        this.setCollideWorldBounds(true);
        this.setBounceY(1);
        this.setBounceX(0.2);
        this.setVelocityY(200);

    }
}