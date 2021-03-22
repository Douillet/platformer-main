class TestTiled extends Tableau{

    preload() {
        super.preload();
        //image
        this.load.image('tiles', 'assets/tiled/tableauTiledTileset.png');
        //tiled, enfin son JSON
        this.load.tilemapTiledJSON('map', 'assets/tiled/test3.json');

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

        console.log(this.plateformes)

        this.physics.add.collider(this.plateformes, this.player);

        this.plateformes.setDepth(10000);
        

    }

}

