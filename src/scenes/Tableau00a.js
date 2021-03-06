class Tableau00a extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/rose.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('arbretest', 'assets/Arbretest.png');
        this.load.image('fond', 'assets/Fond.jpg');
        this.load.image('premierplan', 'assets/arbrepremierplan.png');
        this.load.image('secondplan', 'assets/Arbres du second plan.png');
        this.load.image('troisiemeplan', 'assets/3e plan darbres.png');
        this.load.image('herbe', 'assets/herbe1.png');
        this.load.image('Gobelin_basique', 'assets/Gobelin_basique.png');
        this.load.image('halo', 'assets/Halo_lumineuxv2.png');
        this.load.image('luciole', 'assets/luciolev2.png');
        this.load.image('chauve-souris', 'assets/chauve-souris.png');
        this.load.image('ponton', 'assets/Ponton.jpg');
        this.load.image('passerelle', 'assets/Passerelle terrestre.png');
        this.load.image('Squig', 'assets/Gobelin à la lance.png');
    }
    create() {
        super.create();
        
        let largeurDuTableau=2000;
        let hauteurDuTableau=448; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.10, 0.10); //suis le joueur

        

        //étoiles
        this.stars=this.physics.add.group();
        this.stars.create(100,350,"star");
        this.stars.create(200,350,"star");
        this.stars.create(300,350,"star");
        this.stars.create(516,100,"star");
        this.stars.create(844,220,"star");
        this.stars.create(1950,350,"star");
        this.stars.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setBounce(0);
            child.setDisplaySize(20,40);
        });
        
        
        //platformes volantes
        this.platforms = this.physics.add.group();
        this.platforms.create(500, 150, 'ponton');
        this.platforms.create(532, 150, 'ponton');
        this.platforms.create(600, 260, 'ponton');
        this.platforms.create(632, 260, 'ponton');
        this.platforms.create(812, 260, 'ponton');
        this.platforms.create(844, 260, 'ponton');
        this.platforms.create(876, 260, 'ponton');

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(true);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });


        //passerelles au sol
        this.passerelle = this.physics.add.group();
        this.passerelle.create(400, 352, 'passerelle');
        this.passerelle.create(464, 352, 'passerelle');
        this.passerelle.create(464, 288, 'passerelle');
        this.passerelle.create(750, 352, 'passerelle');
        this.passerelle.create(1000, 352, 'passerelle');
        this.passerelle.create(1064, 352, 'passerelle');
        this.passerelle.create(1118, 352, 'passerelle');

        this.passerelle.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(true);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });


        //créateur d'ennemis
        this.gobelin1 = new Gobelin_basique(this, 500, 310);
        this.gobelin2 = new Gobelin_basique(this, 844, 310);
        this.gobelin3 = new Gobelin_basique(this, 1500, 310);

        this.gobosauteur1 = new Squig(this, 720, 230);

        //sol
        this.solherbe = this.physics.add.group();
        for(let posX=0;posX<largeurDuTableau;posX+=64){
            let plate=this.solherbe.create(posX ,416,"herbe");
            plate.setImmovable(true);
            plate.body.allowGravity=false;
            plate.setFriction(1);
        }
        
        //rammasseur d'étoiles
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //collider sol
        this.physics.add.collider(this.solherbe, this.player);
        this.physics.add.collider(this.solherbe, this.stars);
        this.physics.add.collider(this.solherbe, this.gobelin1);
        this.physics.add.collider(this.solherbe, this.gobelin2);
        this.physics.add.collider(this.solherbe, this.gobelin3);
        
        //collider player
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.passerelle);

        //collider étoile
        this.physics.add.collider(this.platforms, this.stars);
        this.physics.add.collider(this.passerelle, this.stars);

        //collider ennemi/platforme
        this.physics.add.collider(this.platforms, this.gobelin1);
        this.physics.add.collider(this.platforms, this.gobelin2);
        this.physics.add.collider(this.platforms, this.gobelin3);
        this.physics.add.collider(this.platforms, this.gobosauteur1);
        //collider ennemi/platforme au sol
        this.physics.add.collider(this.passerelle, this.gobelin1); 
        this.physics.add.collider(this.passerelle, this.gobelin2);
        this.physics.add.collider(this.passerelle, this.gobelin3);
        this.physics.add.collider(this.passerelle, this.gobosauteur1);

        //fond
        this.fond=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'fond'
        );

        this.fond.setOrigin(0,0);
        this.fond.setScrollFactor(0);
        
        //1er rang d'arbre
        this.arbre=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'premierplan'
        );
        this.arbre.setScrollFactor(0);
        this.arbre.setOrigin(0,0);
        
        //2ème rang d'arbre
        this.arbre2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'secondplan'
        );
        this.arbre2.setScrollFactor(0);
        this.arbre2.setOrigin(0,0);
        
        //3eme rang d'arbre
        this.arbre3=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'troisiemeplan'
        );
        this.arbre3.setScrollFactor(0);
        this.arbre3.setOrigin(0,0);
        
        //Halos lumineux
        this.halo1=this.add.tileSprite(400, 0, 700, 448, 'halo');
        this.halo1.setOrigin(0,0);
        this.halo1.blendMode= 'ADD';
        this.halo2=this.add.tileSprite(1200, 0, 700, 448, 'halo');
        this.halo2.setOrigin(0,0);


        //lucioles
        this.luciole1=new Luciole (this, 200, 200);
        this.luciole2=new Luciole (this, 900, 350);
        this.luciole3=new Luciole2 (this, 600, 60);

        this.lucioleP1=new Luciole2 (this, 400, 320);
        this.lucioleP2=new Luciole2 (this, 1000, 180);
        
        //émetteurs à chauve-souris
        var particles = this.add.particles('chauve-souris');
        
        var emitter = particles.createEmitter({
            x: 400,
            y: 500,
            angle: { min: -150, max: -90 },
            speed: 100,
            gravityY: -250,
            lifespan: 4000,
            quantity: 1,
            delay: 2000,
            
            maxParticles: 10,
            scale: { start: 0.03, end: 0.3 },
            blendMode: 'NORMAL',
        });

        var particles2 = this.add.particles('chauve-souris');
        
        var emitter = particles2.createEmitter({
            x: 1200,
            y: 500,
            angle: { min: -150, max: -90 },
            speed: 100,
            gravityY: -250,
            lifespan: 4000,
            quantity: 1,
            delay: 20000,
            
            maxParticles: 10,
            scale: { start: 0.03, end: 0.3 },
            blendMode: 'NORMAL',
        });

        this.maxParticles = 20;

        //profondeur des particules
        particles.setDepth(12);
        particles2.setDepth(12);

        //profondeur à 10 pour tous les ennemis
        this.gobelin1.setDepth(10);
        this.gobelin2.setDepth(10);
        this.gobelin3.setDepth(10);
        this.gobosauteur1.setDepth(10);

        //fait passer les éléments au 'plan de jeu'
        this.solherbe.setDepth(10);
        this.stars.setDepth(10);
        this.player.setDepth(10);
        this.platforms.setDepth(10);
        this.passerelle.setDepth(10);

        //éléments visuels

        //halo
        this.halo1.setDepth(9);
        this.halo2.setDepth(9);

        //lucioles
        this.luciole1.setDepth(11);
        this.luciole2.setDepth(11);
        this.luciole3.setDepth(11);

        this.lucioleP1.setDepth(8);
        this.lucioleP2.setDepth(8);


        //depht décor
        this.arbre.setDepth(9);
        this.arbre2.setDepth(8);
        this.arbre3.setDepth(7);
        this.fond.setDepth(1)
    
    }
    update() {
        super.update();

        //les éléments ont leur vitesse propre
        
        //les arbres se déplacent moins vite pour accentuer l'effet
        
        //rang1
        this.arbre.tilePositionX=this.cameras.main.scrollX*0.5+100;
        this.arbre.tilePositionY=this.cameras.main.scrollY*0.1+60;

        //rang2
        this.arbre2.tilePositionX=this.cameras.main.scrollX*0.2+250;
        this.arbre2.tilePositionY=this.cameras.main.scrollY*0.03+60;
        
        //rang3
        this.arbre3.tilePositionX=this.cameras.main.scrollX*0.03+250;
        this.arbre3.tilePositionY=this.cameras.main.scrollY*0+60;
    }

}