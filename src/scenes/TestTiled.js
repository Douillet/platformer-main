class TestTiled extends Tableau{

    preload() {
        super.preload();
        //image
        this.load.image('tiles', 'assets/tiled/tableauTiledTileset.png');
        //tiled, enfin son JSON
        this.load.tilemapTiledJSON('map', 'assets/tiled/test.json');

    }
    create() {
        super.create();

        //ajouter la fcking map
        this.map = this.make.tilemap({ key: 'map' });
        

        //premier nom est le nom du kit d'image sur tiled et le deuxième nom celui dans le preload
        this.tileset = this.map.addTilesetImage('base', 'tiles');
        
        this.plateformes = this.map.createStaticLayer('plateformes', tileset, 0, 200);
        this.plateformes.setCollisionByExclusion(-1,true);
        

    }

}

