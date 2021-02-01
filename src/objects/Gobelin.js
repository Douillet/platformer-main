class Gobelin extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Gobelin");


        this.setOrigin(0,0);
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(80);
        
    }
}