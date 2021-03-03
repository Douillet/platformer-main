class Zoo extends Tableau{
  
    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('Géant', 'assets/Géant.png');
        this.load.image('Zombie', 'assets/Zombie.jpg');
        this.load.image('Squig', 'assets/Squig.jpg');
        this.load.image('Soucoupe', 'assets/Soucoupe.png');
        this.load.image('Gobelin_basique', 'assets/Gobelin_basique.png');
        this.load.image('GobelinVolant', 'assets/GobelinVolant.jpg');
        this.load.image('GobelinLoup', 'assets/GobelinLoup.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');

    }
    create() {
        super.create();
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*1;posX+=largeur){
            this.stars.create(posX ,0,"star");
        }
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0, Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        this.platforms = this.physics.add.group();
        this.platforms.create(50, 100, 'ground')

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setBounceX(1);
            child.setCollideWorldBounds(true);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });

         //le joueur rebondit sur les plateformes
         this.physics.add.collider(this.player, this.platforms);
         //les étoiles rebondissent sur les plateformes
         this.physics.add.collider(this.platforms, this.stars);


        //nos monstres

        //monstre mangeur de joueur (pas ouf)
        
        
        //les Géants
        new Geant(this,400,100);
        new Geant(this,700,80);
       
        //les Gobbos
        new Gobelin_basique(this, 200, 360);
        new Gobelin_basique(this, 260, 375);
        new Gobelin_basique(this, 290, 365);
        new Gobelin_basique(this, 360, 370);

        //les Gobbos volants
        new GobelinVolant (this, 120, 150);

        //Zombies
        new Zombie (this, 600, 450);
        new Zombie (this, 50, 450);
        new Zombie (this, 350, 450);

        //Les Squigs
        new Squig (this, 700, 200);
        new Squig (this, 200, 200);

        //Les Gobelins Loups cassés à améliorer
        new GobelinLoup (this, 100, 400);
        new GobelinLoup (this, 160, 400);

    }

}
