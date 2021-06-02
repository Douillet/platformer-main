class TestTiled extends Tableau{

    preload() {
        super.preload();
        //image
        this.load.image('tiles', 'assets/tiled/assetsTiledv2.png');
        this.load.image('star', 'assets/Plume.png');
        this.load.spritesheet('plume', 'assets/PlumeSS.png',
            {frameWidth: 32, frameHeight: 32}
        );
        this.load.image('GobelinLoup', 'assets/GnobblarBasique.png');
        this.load.image('Géant', 'assets/GrandGarsv2.png');
        this.load.image('Squig', 'assets/GnobblarLancier.png');
        this.load.image('Gobelin_basique', 'assets/GnobblarBasique.png');
        this.load.image('objectif', 'assets/star.png');
        this.load.image('feuille', 'assets/feuille.png');
        this.load.image('totem', 'assets/Totem.png');
        this.load.image('BouclierHaut', 'assets/BouclierHaut.png');
        this.load.image('BouclierCote', 'assets/BouclierCote.png');
        this.load.image('NuageJaune', 'assets/NuageJaune.png');
        this.load.image('NuageVert', 'assets/NuageVert.png');
        this.load.image('Pike', 'assets/attackNull.png');

        this.load.image('Fond', 'assets/FondFinal.jpg');
        this.load.image('P2', 'assets/dernierRang.png');
        this.load.image('P1', 'assets/premierRang.png');

        //tiled, enfin son JSON
        this.load.tilemapTiledJSON('map', 'assets/tiled/NewMap.json');

    }
    create() {
        super.create();
        console.log("create")

        //ajouter la fcking map
        this.map = this.make.tilemap({ key: 'map' });

        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 0.4, 0.1, -90, 0);


        //premier nom est le nom du kit d'image sur tiled et le deuxième nom celui dans le preload
        this.tileset = this.map.addTilesetImage('assetsTiledv2', 'tiles');

        this.plateformes = this.map.createLayer('blocs', this.tileset, 0, 0);
        //this.plateformes.setCollisionByProperty({collide: true});
        //this.physics.add.collider(this.plateformes, this.player);
        this.plateformes.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.plateformes, this.player);

        this.plateformes.setDepth(10000);

        //les non collide
        this.nonCollide = this.map.createLayer('nonCollide', this.tileset, 0, 0);
        this.nonCollide.setDepth(10001);
        //les arriere Plan
        this.arrierePlan = this.map.createLayer('arrierePlan', this.tileset, 0, 0);
        this.arrierePlan.setDepth(50);

        this.effetsLumineux = this.map.createLayer('effetsLumineux', this.tileset, 0, 0);
        this.effetsLumineux.setDepth(10001);

        this.pikes = this.map.createLayer('Pikes', this.tileset, 0, 0);
        this.pikes.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.pikes, this.player);
        this.pikes.setDepth(10000);


        this.plateformes.setDepth(10000);

        this.collideMonster = this.map.createLayer('collideMonster', this.tileset, 0, 0);
        this.collideMonster.setCollisionByExclusion(-1, true);
        this.collideMonster.setDepth(1);

        //layer des plumes
        let PlumesContainer=this.add.container();
        this.PlumesObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.PlumesObjects.forEach(PlumeObject => {
            let Plumes=new Plume(this,PlumeObject.x + 16,PlumeObject.y -16);
            PlumesContainer.add(Plumes);
            this.totalActive++;
            this.physics.add.overlap(this.player, Plumes, this.ramasserEtoile, null, this);

        });
        let PikeContainer=this.add.container();
        this.PikesObjects = this.map.getObjectLayer('Pike')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.PikesObjects.forEach(PikeObject => {
            let Pikes=new Pike(this,PikeObject.x + 16,PikeObject.y - 28);
            PikeContainer.add(Pikes);
            this.totalActive++;
            this.physics.add.overlap(this.player, Pikes, this.hitSpike, null, this);

        });

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
        this.checkPointsObjects = this.map.getObjectLayer('checkpoints')['objects'];
        //on crée des checkpoints pour chaque objet rencontré
        this.checkPointsObjects.forEach(checkPointObject =>
        {
            let totem = this.checkPoints.create(checkPointObject.x+32, checkPointObject.y-69 , 'totem');
        });

        this.restoreCheckPoint();

        //layer des gobos rampants
        let monstersContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('monstres')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new GobelinLoup(this,monsterObject.x,monsterObject.y-96,);
            monstersContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            this.physics.add.collider(this.collideMonster, monster);
            });


        //layer des Grand'Gars
        let BigaContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('bigga')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new Geant(this,monsterObject.x,monsterObject.y-300,);
            BigaContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            this.physics.add.collider(this.collideMonster, monster);
        });

        //layer des Jumpers
        let JumpContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('sauteurs')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new Squig(this,monsterObject.x,monsterObject.y-96,);
            JumpContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            this.physics.add.collider(this.collideMonster, monster);
        });

        //layer des Berserkers sautillants
        let BerserkContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('berserks')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new Gobelin_basique(this,monsterObject.x,monsterObject.y-96,);
            BerserkContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            this.physics.add.collider(this.collideMonster, monster);
        });

        let BouclarupContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('BouclierHaut')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new BouclierHaut(this,monsterObject.x+32,monsterObject.y-64,);
            BouclarupContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            this.physics.add.collider(this.collideMonster, monster);
        });

        let BouclarsideContainer=this.add.container();
        this.MonstersObjects = this.map.getObjectLayer('BouclierCote')['objects'];
        // On crée des montres pour chaque objet rencontré
        this.MonstersObjects.forEach(monsterObject => {
            let monster=new BouclierCote(this,monsterObject.x+32,monsterObject.y-64,);
            BouclarsideContainer.add(monster);
            this.physics.add.collider(this.plateformes, monster);
            this.physics.add.collider(this.collideMonster, monster);
        });

        let nuageContainer=this.add.container();
        this.nuagesObjects = this.map.getObjectLayer('NuageJaune')['objects'];
        //on crée des checkpoints pour chaque objet rencontré
        this.nuagesObjects.forEach(nuageObject =>
        {
            let Nuages = new NuageVert(this, nuageObject.x+100, nuageObject.y-79);
            nuageContainer.add(Nuages);
            //console.log("prout");
        });

        //Profondeur
        let z=1000;
        //debug.setDepth(z--);
        this.Boom.setDepth(z--);
        this.blood.setDepth(z--);
        //this.stars.setDepth(z--);
        this.objectif.setDepth(999);
        this.checkPoints.setDepth(z--);
        monstersContainer.setDepth(z--);
        BigaContainer.setDepth(z--);
        JumpContainer.setDepth(z--);
        BerserkContainer.setDepth(z--);
        BouclarupContainer.setDepth(z--);
        BouclarsideContainer.setDepth(z--);
        nuageContainer.setDepth(100000);
        PlumesContainer.setDepth(z--);
        PikeContainer.setDepth(z--);


        //DÉCOR
        this.fond=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width*2,
            this.sys.canvas.height*2,
            'Fond'
        );
        this.fond.setOrigin(0,0);
        this.fond.setScrollFactor(0);

        //1er rang d'arbre
        this.arbre=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width*2,
            this.sys.canvas.height*2,
            'P1'
        );
        this.arbre.setScrollFactor(0);
        this.arbre.setOrigin(0,0);

        //2ème rang d'arbre
        this.arbre2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width*2,
            this.sys.canvas.height*2,
            'P2'
        );
        this.arbre2.setScrollFactor(0);
        this.arbre2.setOrigin(0,0);

        //Profondeur du décor
        this.arbre.setDepth(9);
        this.arbre2.setDepth(7);
        this.fond.setDepth(2)

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
        this.arbre.tilePositionY=this.cameras.main.scrollY*0.3;

        //rang2
        this.arbre2.tilePositionX=this.cameras.main.scrollX*0.2;
        this.arbre2.tilePositionY=this.cameras.main.scrollY*0.1;
    }
    // Ne pas oublier de nommer chaques checkpoints sur Tiled

}