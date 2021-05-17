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
        this.cameras.main.startFollow(this.player, true, 1, 1);


        //premier nom est le nom du kit d'image sur tiled et le deuxième nom celui dans le preload
        this.tileset = this.map.addTilesetImage('base2', 'tiles');
        
        this.plateformes = this.map.createLayer('blocs', this.tileset, 0, 0);
        this.plateformes.setCollisionByProperty({collide: true});

        //console.log(this.plateformes)

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
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
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


        //layer des gobos rampants
        let monstersContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('monstres')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new GobelinLoup(this,monsterObject.x,monsterObject.y-96,);
            monstersContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            //tentative particule
            /*var particles6 = this.add.particles('feuille');
                var emitter = particles6.createEmitter({
                x: monster, y: monster,
                speed: 10,
                lifespan: 12500,
                quantity: 1,
                frequency: 2000,
                delay: 100,
                scale: { start: 0.6, end: 0.6 },
                blendMode: 'NORMAL',

            });*/
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
    }

}

