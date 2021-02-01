class Geant extends ObjetEnnemi{

    constructor(scene, x, y) {
        super(scene, x, y, "Géant");

        
        this.setOrigin(0,0);
        this.setDisplaySize(120,200);
        this.setCollideWorldBounds(true);
        this.setBounceY(0.2);
        this.setBounceX(1);
        this.setVelocityX(20);
        //this.physics.add.overlap(this.player, this.Geant, this.hitSpike, null, this);
    }
}