class Zoo extends Tableau{
  
    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('ground', 'assets/platform.png');

    }
    create() {
        super.create();
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*7;posX+=largeur){
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
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-90,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        //monstre rampant
        this.monstrerampant=this.physics.add.sprite(200,this.sys.canvas.height-200,"monster-violet");
        this.monstrerampant.setOrigin(0,0);
        this.monstrerampant.setDisplaySize(64,64);
        this.monstrerampant.setCollideWorldBounds(true);
        this.monstrerampant.setBounceY(0);
        this.monstrerampant.setBounceX(1);
        this.monstrerampant.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstrerampant, this.hitSpike, null, this);

        //monstre fonceur
        this.monstrefonceur=this.physics.add.sprite(400,this.sys.canvas.height-80,"monster-violet");
        this.monstrefonceur.setOrigin(0,0);
        this.monstrefonceur.setDisplaySize(64,64);
        this.monstrefonceur.setCollideWorldBounds(true);
        this.physics.accelerateTo(this.monstrefonceur, 550, -550, 200, 500, 500);
        this.monstrefonceur.setBounceY(0.6);
        this.monstrefonceur.setBounceX(0.2);
        this.monstrefonceur.setVelocityX(500);
        this.physics.add.overlap(this.player, this.monstrefonceur, this.hitSpike, null, this);

        //monstre fonceur
        this.monstremangeurdejoueur=this.physics.add.sprite(600,this.sys.canvas.height-80,"monster-violet");
        this.monstremangeurdejoueur.setOrigin(0,0);
        this.monstremangeurdejoueur.setDisplaySize(64,64);
        this.monstremangeurdejoueur.setCollideWorldBounds(true);
        this.physics.accelerateTo(this.monstremangeurdejoueur, this.player.x, this.player.y, 200, 500, 500);
        this.monstremangeurdejoueur.setBounceY(0.6);
        this.monstremangeurdejoueur.setBounceX(0.2);
        this.monstremangeurdejoueur.setVelocityX(500);
        this.physics.add.overlap(this.player, this.monstremangeurdejoueur, this.hitSpike, null, this);
        
        //monstre sauteur
        this.monstremangeurdejoueur=this.physics.add.sprite(800,this.sys.canvas.height-200,"monster-violet");
        this.monstremangeurdejoueur.setOrigin(0,0);
        this.monstremangeurdejoueur.setDisplaySize(64,64);
        this.monstremangeurdejoueur.setCollideWorldBounds(true);
        this.physics.accelerateTo(this.monstremangeurdejoueur, this.player.x, this.player.y, 200, 500, 500);
        this.monstremangeurdejoueur.setBounceY(0.6);
        this.monstremangeurdejoueur.setBounceX(0.2);
        this.monstremangeurdejoueur.setVelocityX(500);
        this.physics.add.overlap(this.player, this.monstremangeurdejoueur, this.hitSpike, null, this);
    }

}