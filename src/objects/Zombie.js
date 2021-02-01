class Zombie extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Zombie");

        this.setOrigin(0,0);
        this.setDisplaySize(100,40);
        this.setCollideWorldBounds(true);
        this.setBounceY(0.1);
        this.setBounceX(1);
        this.setVelocityX(50);

    }
}