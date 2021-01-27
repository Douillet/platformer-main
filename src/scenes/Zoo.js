class Zoo extends Tableau{
  
    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('Géant', 'assets/Géant.png');
        this.load.image('Serpent', 'assets/Serpent.png');
        this.load.image('Ressort', 'assets/Ressort.png');
        this.load.image('Soucoupe', 'assets/Soucoupe.png');
        this.load.image('Lapin', 'assets/Lapin.png');
        this.load.image('QuaterBack', 'assets/QuaterBack.png')

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
        //monstre sautillant
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-90,"Lapin");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(80);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //monstre rampant
        this.monstrerampant=this.physics.add.sprite(200,this.sys.canvas.height-200,"Serpent");
        this.monstrerampant.setOrigin(0,0);
        this.monstrerampant.setDisplaySize(100,40);
        this.monstrerampant.setCollideWorldBounds(true);
        this.monstrerampant.setBounceY(0.1);
        this.monstrerampant.setBounceX(1);
        this.monstrerampant.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstrerampant, this.hitSpike, null, this);

        //monstre flottant
        this.monstreflottant=this.physics.add.sprite(30,this.sys.canvas.height-250,"Soucoupe");
        this.monstreflottant.setOrigin(0,0);
        this.monstreflottant.setDisplaySize(70,40);
        this.monstreflottant.setCollideWorldBounds(true);
        this.monstreflottant.body.allowGravity=false;
        this.monstreflottant.setBounceY(1);
        this.monstreflottant.setBounceX(1);
        this.monstreflottant.setVelocityX(100);
        this.physics.add.overlap(this.player, this.monstreflottant, this.hitSpike, null, this);

        //monstre mangeur de joueur (pas ouf)
        this.monstremangeurdejoueur=this.physics.add.sprite(600,this.sys.canvas.height-80,"QuaterBack");
        this.monstremangeurdejoueur.setOrigin(0,0);
        this.monstremangeurdejoueur.setDisplaySize(70,60);
        this.monstremangeurdejoueur.setCollideWorldBounds(true);
        this.physics.accelerateTo(this.monstremangeurdejoueur, this.player.x, this.player.y, 200, 500, 500);
        this.monstremangeurdejoueur.setBounceY(0.6);
        this.monstremangeurdejoueur.setBounceX(0.2);
        this.monstremangeurdejoueur.setVelocityX(500);
        this.physics.add.overlap(this.player, this.monstremangeurdejoueur, this.hitSpike, null, this);
        
        //monstre sauteur
        this.monstresauteur=this.physics.add.sprite(800,this.sys.canvas.height-200,"Ressort");
        this.monstresauteur.setOrigin(0,0);
        this.monstresauteur.setDisplaySize(20,80);
        this.monstresauteur.setCollideWorldBounds(true);
        this.monstresauteur.setBounceY(1);
        this.monstresauteur.setBounceX(0.2);
        this.monstresauteur.setVelocityY(200);
        this.physics.add.overlap(this.player, this.monstresauteur, this.hitSpike, null, this);

        //monstre Géant
        this.monstrerampant=this.physics.add.sprite(400,this.sys.canvas.height-400,"Géant");
        this.monstrerampant.setOrigin(0,0);
        this.monstrerampant.setDisplaySize(120,200);
        this.monstrerampant.setCollideWorldBounds(true);
        this.monstrerampant.setBounceY(0.2);
        this.monstrerampant.setBounceX(1);
        this.monstrerampant.setVelocityX(20);
        this.physics.add.overlap(this.player, this.monstrerampant, this.hitSpike, null, this);
    }

}