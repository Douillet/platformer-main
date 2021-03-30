class Tableau00a extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/Plume.png');
        this.load.image('fond', 'assets/Fond.jpg');
        this.load.image('premierplan', 'assets/Arbres du premier Plan.png');
        this.load.image('secondplan', 'assets/Arbres du second plan.png');
        this.load.image('troisiemeplan', 'assets/3e plan darbres.png');
        this.load.image('herbe', 'assets/herbe1.png');
        this.load.image('Gobelin_basique', 'assets/Gobelin basique v2.png');
        this.load.image('halo', 'assets/Halo_lumineuxv2.png');
        this.load.image('luciole', 'assets/luciolev2.png');
        this.load.image('chauve-souris', 'assets/chauve-souris.png');
        this.load.image('ponton', 'assets/Ponton.jpg');
        this.load.image('passerelle', 'assets/Passerelle terrestre.png');
        this.load.image('passerelle2', 'assets/Passerelle terrestre 2.png');
        this.load.image('passerelle3', 'assets/Passerelle terrestre 3.png');
        this.load.image('passerelle4', 'assets/Passerelle terrestre 4.png');
        this.load.image('Squig', 'assets/Gobelin à la lance v2.png');
        this.load.image('GobelinLoup', 'assets/Gobelin à la hache v2.png');
        this.load.image('Géant', 'assets/GrandGars.png');
        this.load.image('yeux', 'assets/Yeux menaçants.png');
        this.load.image('feuille', 'assets/feuille.png');
    }
    create() {
        super.create();
        
        let largeurDuTableau=2600;
        let hauteurDuTableau=448; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.10, 0.10); //suis le joueur

        

        //étoiles
        this.stars=this.physics.add.group();
        //2 premières
        this.stars.create(120,350,"star");
        this.stars.create(250,350,"star");
        //2 des 1ères platformes
        this.stars.create(464,230,"star");
        this.stars.create(516,100,"star");
        //2 suivantes aériennes
        this.stars.create(844,220,"star");
        this.stars.create(952,80,"star");
        //Bosse de passerelle
        this.stars.create(1128,160,"star");
        this.stars.create(1320,220,"star");
        //fin
        this.stars.create(1768,290,"star");
        this.stars.create(1950,50,"star");
        //supplément info 2D
        this.stars.create(2500,50,"star");
        this.stars.create(2550,200,"star");

        this.stars.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setBounce(0);
            child.setDisplaySize(20,40);
        });

        
        
        //platformes volantes
        this.platforms = this.physics.add.group();
        //groupe1
        this.platforms.create(500, 150, 'ponton');
        this.platforms.create(532, 150, 'ponton');
        //groupe2
        this.platforms.create(600, 260, 'ponton');
        this.platforms.create(632, 260, 'ponton');
        //groupe3
        this.platforms.create(812, 260, 'ponton');
        this.platforms.create(844, 260, 'ponton');
        this.platforms.create(876, 260, 'ponton');
        //groupe4
        this.platforms.create(920, 120, 'ponton');
        this.platforms.create(952, 120, 'ponton');
        this.platforms.create(984, 120, 'ponton');
        //extension passerelle bosse
        this.platforms.create(1240, 132, 'ponton');
        //escalier
        this.platforms.create(1560, 270, 'ponton');
        this.platforms.create(1592, 280, 'ponton');
        this.platforms.create(1624, 290, 'ponton');
        this.platforms.create(1656, 300, 'ponton');
        this.platforms.create(1688, 310, 'ponton');
        this.platforms.create(1720, 320, 'ponton');
        //final platform
        this.platforms.create(1912, 132, 'ponton');
        this.platforms.create(1944, 132, 'ponton');
        this.platforms.create(1976, 132, 'ponton');
        this.platforms.create(2008, 132, 'ponton');
        this.platforms.create(2040, 132, 'ponton');
        this.platforms.create(2072, 132, 'ponton');
        this.platforms.create(2104, 132, 'ponton');
        this.platforms.create(2136, 132, 'ponton');
        this.platforms.create(2168, 132, 'ponton');
        this.platforms.create(2200, 132, 'ponton');
        this.platforms.create(2232, 132, 'ponton');
        //supllément info 2d
        this.platforms.create(2550, 250, 'ponton');
        

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });


        //passerelles au sol
        this.passerelle = this.physics.add.group();
        //début
        this.passerelle.create(400, 352, 'passerelle2');
        this.passerelle.create(464, 352, 'passerelle4');
        this.passerelle.create(464, 288, 'passerelle');
        //celle du gobosauteur
        this.passerelle.create(750, 352, 'passerelle2');
        //passerelle de la bosse
        //1ère couche
        this.passerelle.create(1000, 352, 'passerelle3');
        this.passerelle.create(1064, 352, 'passerelle4');
        this.passerelle.create(1128, 352, 'passerelle');
        this.passerelle.create(1192, 352, 'passerelle2');
        this.passerelle.create(1256, 352, 'passerelle');
        this.passerelle.create(1320, 352, 'passerelle4');
        this.passerelle.create(1384, 352, 'passerelle3');
        this.passerelle.create(1448, 352, 'passerelle');
        this.passerelle.create(1512, 352, 'passerelle2');
        //2eme couche
        this.passerelle.create(1064, 288, 'passerelle');
        this.passerelle.create(1128, 288, 'passerelle3');
        this.passerelle.create(1192, 288, 'passerelle');
        this.passerelle.create(1256, 288, 'passerelle4');
        this.passerelle.create(1320, 288, 'passerelle4');
        this.passerelle.create(1384, 288, 'passerelle3');
        this.passerelle.create(1448, 288, 'passerelle');
        this.passerelle.create(1512, 288, 'passerelle2');
        //3eme couche
        this.passerelle.create(1128, 224, 'passerelle');
        this.passerelle.create(1192, 224, 'passerelle3');
        this.passerelle.create(1448, 224, 'passerelle2');
        //4ème couche
        this.passerelle.create(1192, 160, 'passerelle4');
        //fin de la bosse
        //passerelle fin escalier
        this.passerelle.create(1768, 352, 'passerelle2');
        this.passerelle.create(1832, 352, 'passerelle4');
        this.passerelle.create(1832, 288, 'passerelle');
        //this.passerelle.create(1832, 224, 'passerelle3');
        this.passerelle.create(1896, 352, 'passerelle');
        this.passerelle.create(1960, 352, 'passerelle2');
        this.passerelle.create(2018, 352, 'passerelle4');

        this.passerelle.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });


        //créateur d'ennemis
        this.gobelin1 = new Gobelin_basique(this, 500, 310);
        this.gobelin2 = new Gobelin_basique(this, 1920, 220); //il est à la fin lui en fait
        this.gobelin3 = new Gobelin_basique(this, 1768, 200);

        this.gobosauteur1 = new Squig(this, 720, 230);
        this.gobosauteur2 = new Squig(this, 1480, 175);

        this.goborampant1 = new GobelinLoup(this, 1268, 150);
        this.goborampant2 = new GobelinLoup(this, 844, 310);

        this.grandgars = new Geant(this, 2200, 150);

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
        this.physics.add.collider(this.solherbe, this.goborampant1);
        this.physics.add.collider(this.solherbe, this.goborampant2);
        this.physics.add.collider(this.solherbe, this.grandgars);
        
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
        this.physics.add.collider(this.platforms, this.goborampant1);
        this.physics.add.collider(this.platforms, this.goborampant2);

        //collider ennemi/platforme au sol
        this.physics.add.collider(this.passerelle, this.gobelin1); 
        this.physics.add.collider(this.passerelle, this.gobelin2);
        this.physics.add.collider(this.passerelle, this.gobelin3);
        this.physics.add.collider(this.passerelle, this.gobosauteur1);
        this.physics.add.collider(this.passerelle, this.gobosauteur2);
        this.physics.add.collider(this.passerelle, this.goborampant1);
        this.physics.add.collider(this.passerelle, this.goborampant2);
        this.physics.add.collider(this.passerelle, this.grandgars);

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

        //yeux menaçants
        this.yeux=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'yeux'
        );
        this.yeux.setScrollFactor(0);
        this.yeux.setOrigin(0,0);
        
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
        
        //petit vent de feuilles
        var particles6 = this.add.particles('feuille');
        var emitter = particles6.createEmitter({
            x: -500, y: 200,
            speed: 10,
            moveToX: {min:2600,max:3500},
            moveToY: {min:0,max:700},
            rotate: {min:-10,max:360},
            lifespan: 12500,
            quantity: 1,
            frequency: 2000,
            delay: 100,
            scale: { start: 0.6, end: 0.6 },
            blendMode: 'NORMAL',
            
        });

        var emitter = particles6.createEmitter({
            x: -500, y: 50,
            speed: 10,
            moveToX: {min:2600,max:3500},
            moveToY: {min:-100,max:500},
            rotate: {min:-10,max:360},
            lifespan: 12500,
            quantity: 1,
            frequency: 1500,
            delay: 300,
            scale: { start: 0.7, end: 0.7 },
            blendMode: 'NORMAL',
            
            
            });
        var emitter = particles6.createEmitter({
            x: -500, y: 350,
            speed: 10,
            moveToX: {min:2600,max:3500},
            moveToY: {min:100,max:700},
            rotate: {min:-10,max:360},
            lifespan: 12500,
            quantity: 1,
            frequency: 2500,
            delay: 0,
            scale: { start: 0.65, end: 0.65 },
            blendMode: 'NORMAL',
        
        
        });


        //Halos lumineux
        this.halo1=this.add.tileSprite(400, 0, 700, 448, 'halo');
        this.halo1.setOrigin(0,0);
        this.halo1.blendMode= 'ADD';
        this.halo2=this.add.tileSprite(1200, 0, 700, 448, 'halo');
        this.halo2.setOrigin(0,0);
        this.halo2.blendMode= 'ADD';
        this.halo3=this.add.tileSprite(2100, 0, 700, 448, 'halo');
        this.halo3.setOrigin(0,0);
        this.halo3.blendMode= 'ADD';


        //lucioles
        //devant le plan de jeu
        this.luciole1=new Luciole (this, 200, 200);
        this.luciole2=new Luciole (this, 900, 350);
        this.luciole3=new Luciole2 (this, 600, 350);
        this.luciole4=new Luciole (this, 1500, 200);
        this.luciole5=new Luciole2 (this, 1700, 60);
        this.luciole6=new Luciole (this, 1880, 300);
        this.luciole7=new Luciole2 (this, 2150, 200);
    
        //derrière le plan de jeu
        this.lucioleP1=new Luciole2 (this, 400, 320);
        this.lucioleP2=new Luciole2 (this, 1000, 180);
        this.lucioleP3=new Luciole (this, 700, 60);
        this.lucioleP4=new Luciole (this, 1200, 250);
        this.lucioleP5=new Luciole (this, 2300, 80);

        //particules luciole
        var particles5 = this.add.particles('luciole');

        var emitterluciole = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole.startFollow(this.luciole1);

        var emitterluciole2 = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole2.startFollow(this.luciole2);
        

        var emitterluciole3 = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole3.startFollow(this.luciole3);

        var emitterluciole4 = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole4.startFollow(this.luciole4);

        var emitterluciole5 = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole5.startFollow(this.luciole5);

        var emitterluciole6 = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole6.startFollow(this.luciole6);

        var emitterluciole7 = particles5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterluciole7.startFollow(this.luciole7);


        //particules lucioles derrière les arbres
        var particlesP5 = this.add.particles('luciole');

        var emitterlucioleP1 = particlesP5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterlucioleP1.startFollow(this.lucioleP1);

        var emitterlucioleP2 = particlesP5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterlucioleP2.startFollow(this.lucioleP2);

        var emitterlucioleP3 = particlesP5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterlucioleP3.startFollow(this.lucioleP3);

        var emitterlucioleP4 = particlesP5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterlucioleP4.startFollow(this.lucioleP4);

        var emitterlucioleP5 = particlesP5.createEmitter({
            angle: { min: -20, max: 10 },
            speed: 2,
            quantity: 1,
            lifespan: 1000,
            frequence: 1000,
            scale: { start: 0.8, end: 0.7 },
            alpha: { start: 0.05, end: 0.00001},
            blendMode: 'ADD',
        });
        emitterlucioleP5.startFollow(this.lucioleP5);

        //émetteurs à chauve-souris
        var particles = this.add.particles('chauve-souris');
        
        var emitter = particles.createEmitter({
            x: -200,
            y: 200,
            angle: { min: -20, max: 10 },
            speed: 600,
            gravityY: -200,
            lifespan: 4000,
            quantity: 1,
            delay: 2000,
            
            maxParticles: 30,
            scale: { start: 0.1, end: 0.3 },
            blendMode: 'NORMAL',
        });

        var particles2 = this.add.particles('chauve-souris');
        
        var emitter = particles2.createEmitter({
            x: 2670,
            y: 250,
            angle: { min: 170, max: 200 },
            speed: 600,
            gravityY: -200,
            lifespan: 4000,
            quantity: 1,
            delay: 13000,
            
            maxParticles: 30,
            scale: { start: 0.1, end: 0.3 },
            blendMode: 'NORMAL',
        });
        
        var particles3 = this.add.particles('chauve-souris');
        
        var emitter = particles3.createEmitter({
            x: 800,
            y: 500,
            angle: { min: -70, max: -20 },
            speed: 400,
            gravityY: -200,
            lifespan: 4000,
            quantity: 1,
            delay: 10000,
            
            maxParticles: 30,
            scale: { start: 0.1, end: 0.3 },
            blendMode: 'NORMAL',
        });

        var particles4 = this.add.particles('chauve-souris');
        
        var emitter = particles4.createEmitter({
            x: 2670,
            y: 250,
            angle: { min: 170, max: 200 },
            speed: 600,
            gravityY: -200,
            lifespan: 4000,
            quantity: 1,
            delay: 25000,
            
            maxParticles: 30,
            scale: { start: 0.1, end: 0.3 },
            blendMode: 'NORMAL',
        });


        //profondeur des particules
        //chauves-souris
        particles.setDepth(12);
        particles2.setDepth(12);
        particles3.setDepth(12);
        particles4.setDepth(12);
        //lucioles
        particles5.setDepth(12);
        particlesP5.setDepth(8);
        //vent de feuilles
        particles6.setDepth(12);

        //profondeur à 10 pour tous les ennemis
        this.gobelin1.setDepth(10);
        this.gobelin2.setDepth(10);
        this.gobelin3.setDepth(10);
        this.gobosauteur1.setDepth(10);
        this.gobosauteur2.setDepth(10);
        this.goborampant1.setDepth(10);
        this.goborampant2.setDepth(10);
        this.grandgars.setDepth(10);

        //fait passer les éléments au 'plan de jeu'
        this.solherbe.setDepth(10);
        this.stars.setDepth(10);
        this.player.setDepth(10);
        this.platforms.setDepth(10);
        this.passerelle.setDepth(10);

        //éléments visuels

        //halo
        this.halo1.setDepth(11);
        this.halo2.setDepth(11);
        this.halo3.setDepth(11);

        //lucioles
        this.luciole1.setDepth(11);
        this.luciole2.setDepth(11);
        this.luciole3.setDepth(11);
        this.luciole4.setDepth(11);
        this.luciole5.setDepth(11);
        this.luciole6.setDepth(11);
        this.luciole7.setDepth(11);

        this.lucioleP1.setDepth(8);
        this.lucioleP2.setDepth(8);
        this.lucioleP3.setDepth(8);
        this.lucioleP4.setDepth(8);
        this.lucioleP5.setDepth(8);

        //depht décor
        this.arbre.setDepth(9);
        this.yeux.setDepth(8);
        this.arbre2.setDepth(7);
        this.arbre3.setDepth(6);
        this.fond.setDepth(1)
    
    }
    update() {
        super.update();

        //les éléments ont leur vitesse propre
        
        //les arbres se déplacent moins vite pour accentuer l'effet
        
        //rang1
        this.arbre.tilePositionX=this.cameras.main.scrollX*0.5+100;
        this.arbre.tilePositionY=this.cameras.main.scrollY*0;

        //yeux
        this.yeux.tilePositionX=this.cameras.main.scrollX*0.4+50;
        this.yeux.tilePositionY=this.cameras.main.scrollY*0.08+60;

        //rang2
        this.arbre2.tilePositionX=this.cameras.main.scrollX*0.2+250;
        this.arbre2.tilePositionY=this.cameras.main.scrollY*0.03+60;
        
        //rang3
        this.arbre3.tilePositionX=this.cameras.main.scrollX*0.03+250;
        this.arbre3.tilePositionY=this.cameras.main.scrollY*0+60;
    }

}