class TestTiled extends Tableau{

    preload() {
        super.preload();
        //image
        this.load.image('tiles', 'assets/tiled/tableauTiledTileset.png');
        this.load.image('star', 'assets/Plume.png');
        this.load.image('GobelinLoup', 'assets/Gobelin à la hache v2.png');
        this.load.image('Géant', 'assets/GrandGars.png');
        this.load.image('Squig', 'assets/Gobelin à la lance v2.png');
        this.load.image('Gobelin_basique', 'assets/Gobelin basique v2.png');
        this.load.image('objectif', 'assets/star.png');
        this.load.image('feuille', 'assets/feuille.png');
        this.load.image('totem', 'assets/Totem.png');
        this.load.image('BouclierHaut', 'assets/BouclierHaut.png');
        this.load.image('BouclierCote', 'assets/BouclierCote.png');

        this.load.image('Fond', 'assets/Fond-Test.jpg');
        this.load.image('P2', 'assets/Plan_2.png');
        this.load.image('P1', 'assets/Plan_1.png');

        //tiled, enfin son JSON
        this.load.tilemapTiledJSON('map', 'assets/tiled/test4.json');

    }
    create() {
        super.create();

        //ajouter la fcking map
        this.map = this.make.tilemap({ key: 'map' });

        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1, -90, 0);
        /*if (this.player.dirX = 1)
        {
            this.cameras.main.stopFollow();
            this.cameras.main.startFollow(this.player, true, 0.4, 0.6, -150, 0);
        }else{
            this.cameras.main.stopFollow();
            this.cameras.main.startFollow(this.player, true, 0.4, 0.6, +150, 0);
        };*/


        //premier nom est le nom du kit d'image sur tiled et le deuxième nom celui dans le preload
        this.tileset = this.map.addTilesetImage('base2', 'tiles');

        this.plateformes = this.map.createLayer('blocs', this.tileset, 0, 0);
        this.plateformes.setCollisionByProperty({collide: true});

        this.physics.add.collider(this.plateformes, this.player);

        this.plateformes.setDepth(10000);


        //layer des étoiles
        this.stars = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starsObject => {
            // Pour chaque plume, on la positionne pour que ça colle bien car les plumes ne font pas 64x64
            let stars = this.stars.create(starsObject.x, starsObject.y-17 , 'star');
        });
        this.physics.add.collider(this.plateformes, this.stars);
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);


        //layer de la fin d'objectif
        this.objectif = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0
        });
        this.objectifsObjects = this.map.getObjectLayer('fin')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.objectifsObjects.forEach(objectifsObjects => {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let objectif = this.objectif.create(objectifsObjects.x+32, objectifsObjects.y-32 , 'objectif');
        });
        this.physics.add.overlap(this.player, this.objectif, this.finNiveau, null, this);


        this.checkPoints = this.physics.add.staticGroup();
        this.checkPointsObjects = this.map.getObjectLayer('Checkpoints')['objects'];
        //on crée des checkpoints pour chaque objet rencontré
        this.checkPointsObjects.forEach(checkPointObject =>
        {
            let totem = this.checkPoints.create(checkPointObject.x+32, checkPointObject.y-69 , 'totem');
        });


        //layer des gobos rampants
        let monstersContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('monstres')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new GobelinLoup(this,monsterObject.x,monsterObject.y-96,);
            monstersContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            });


        //layer des Grand'Gars
        let BigaContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('bigga')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new Geant(this,monsterObject.x,monsterObject.y-300,);
            BigaContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
        });

        //layer des Jumpers
        let JumpContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('sauteurs')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new Squig(this,monsterObject.x,monsterObject.y-96,);
            JumpContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
        });

        //layer des Berserkers sautillants
        let BerserkContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('berserks')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new Gobelin_basique(this,monsterObject.x,monsterObject.y-96,);
            BerserkContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
        });

        let BouclarupContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('BouclierHaut')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new BouclierHaut(this,monsterObject.x+32,monsterObject.y-64,);
            BouclarupContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
        });

        let BouclarsideContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('BouclierCote')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new BouclierCote(this,monsterObject.x+32,monsterObject.y-64,);
            BouclarsideContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
        });

        //Profondeur
        let z=1000;
        //debug.setDepth(z--);
        this.Boom.setDepth(z--);
        this.blood.setDepth(z--);
        this.stars.setDepth(z--);
        this.objectif.setDepth(z--);
        this.checkPoints.setDepth(z--);
        monstersContainer.setDepth(z--);
        BigaContainer.setDepth(z--);
        JumpContainer.setDepth(z--);
        BerserkContainer.setDepth(z--);
        BouclarupContainer.setDepth(z--);
        BouclarsideContainer.setDepth(z--);



        //DÉCOR
        this.fond=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'Fond'
        );
        this.fond.setOrigin(0,0);
        this.fond.setScrollFactor(0);

        //1er rang d'arbre
        this.arbre=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'P1'
        );
        this.arbre.setScrollFactor(0);
        this.arbre.setOrigin(0,0);

        //2ème rang d'arbre
        this.arbre2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'P2'
        );
        this.arbre2.setScrollFactor(0);
        this.arbre2.setOrigin(0,0);

        //Profondeur du décor
        this.arbre.setDepth(9);
        this.arbre2.setDepth(7);
        this.fond.setDepth(1)

        //pour save les positions
        this.physics.add.overlap(this.player, this.checkPoints, function(player, checkPoint)
        {
            this.saveCheckPoint(checkPoint);
            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
                //console.log("jumpStop = true");
            }
            else
            {
                Tableau.current.jumpStop = false;
                //console.log("jumpStop = false");
            }
        }, null, this);
    }


    update() {
        super.update();

        //les éléments ont leur vitesse propre
        //les arbres se déplacent moins vite pour accentuer l'effet

        //rang1
        this.arbre.tilePositionX=this.cameras.main.scrollX*0.5;
        this.arbre.tilePositionY=this.cameras.main.scrollY*0.5;

        //rang2
        this.arbre2.tilePositionX=this.cameras.main.scrollX*0.2;
        this.arbre2.tilePositionY=this.cameras.main.scrollY*0.2;
    }
    // Ne pas oublier de nommer chaques checkpoints sur Tiled

}


