class Tableau00 extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
    }
    create() {
        super.create();

        //des étoiles
        this.star1=this.physics.add.sprite(300,150,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0.8);

        this.star2=this.physics.add.sprite(400,100,"star");
        this.star2.setCollideWorldBounds(true);
        this.star2.setBounce(0.8);

        this.star3=this.physics.add.sprite(600,100,"star");
        this.star3.setCollideWorldBounds(true);
        this.star3.setBounce(0.8);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star2, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);

    }

}

