class Tableau00a extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
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
    }
    create() {
        super.create();
        
        let largeurDuTableau=2000;
        let hauteurDuTableau=448; //la hauteur est identique au cadre du jeu
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);

        this.cameras.main.startFollow(this.player, false, 0.10, 0.10);

        

        //des étoiles
        this.stars=this.physics.add.group();
        this.stars.create(100,0,"star");
        this.stars.create(200,0,"star");
        this.stars.create(300,0,"star");
        this.stars.create(400,0,"star");
        this.stars.create(500,0,"star");
        this.stars.create(600,0,"star");
        this.stars.create(700,0,"star");
        this.stars.children.iterate(function (child) {
            child.setCollideWorldBounds(true);
            child.setBounce(0);
        });
        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        
        
        
        /*this.platforms = this.physics.add.group();
        this.platforms.create(200, 150, 'ground')
        this.platforms.create(400, 250, 'ground')
        this.platforms.create(600, 350, 'ground')

        this.platforms.children.iterate(function (child) {
            child.setDisplaySize(140,8);
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setVelocityY(100);
            child.setBounceY(1);
            child.setCollideWorldBounds(true);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });*/


        this.gobelin1=new Gobelin_basique(this, 500, 250);
        

        this.solherbe = this.physics.add.group();
        for(let posX=0;posX<largeurDuTableau;posX+=64){
            let plate=this.solherbe.create(posX ,416,"herbe");
            plate.setImmovable(true);
            plate.body.allowGravity=false;
            plate.setFriction(1);
        }
        /*this.solherbe.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setBounceX(1);
            child.setCollideWorldBounds(true);
            child.setFriction(1); //les éléments ne glissent pas dessus cette plateforme
        });*/
        
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        this.physics.add.collider(this.solherbe, this.player);
        this.physics.add.collider(this.solherbe, this.stars);

        this.physics.add.collider(this.solherbe, this.gobelin1);
        
        //le joueur rebondit sur les plateformes
        //this.physics.add.collider(this.player, this.platforms);
        //les étoiles rebondissent sur les plateformes
        //this.physics.add.collider(this.platforms, this.stars);
        
        //test physique entre plateformes

        //test rebond étoiles sur le joueur
        this.physics.add.collider(this.stars, this.player);
        //this.physics.add.collider(this.platforms);    
        

        //fond
        this.fond=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'fond'
        );

        this.fond.setOrigin(0,0);
        this.fond.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        
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
        this.luciole2=new Luciole2 (this, 400, 320);
        
        //émetteur à chauve-souris
     

        var particles = this.add.particles('luciole');

        var emitter = particles.createEmitter({
            x: 400,
            y: 300,
            angle: { min: -92, max: -88 },
            speed: 100,
            //gravityY: 35,
            lifespan: 300,
            quantity: 1,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
        });


        particles.setDepth(12);


        //profondeur à 10 pour tous les ennemis
        this.gobelin1.setDepth(10);


        //fait passer les éléments devant le ciel
        this.solherbe.setDepth(10);
        this.stars.setDepth(10);
        this.player.setDepth(10);

        //éléments visuels premier plan
        this.halo1.setDepth(9);
        this.halo2.setDepth(9);

        this.luciole1.setDepth(11);
        this.luciole2.setDepth(8);


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
        this.arbre.tilePositionX=this.cameras.main.scrollX*0.5+100;
        this.arbre.tilePositionY=this.cameras.main.scrollY*0.1+60;

        this.arbre2.tilePositionX=this.cameras.main.scrollX*0.2+250;
        this.arbre2.tilePositionY=this.cameras.main.scrollY*0.03+60;

        this.arbre3.tilePositionX=this.cameras.main.scrollX*0.03+250;
        this.arbre3.tilePositionY=this.cameras.main.scrollY*0+60;
    }

}