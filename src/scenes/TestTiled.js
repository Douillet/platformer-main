class TestTiled extends Tableau{

    preload() {
        super.preload();
        //image
        this.load.image('tiles', 'assets/tiled/tableauTiledTileset.png');
        //tiled, enfin son JSON
        this.load.tilemapTiledJSON('map', 'assets/tiled/level_tiled.json');

    }
    create() {
        super.create();

        //ajouter la fcking map
        const map = this.make.tilemap({ key: 'map' });
        

        //premier nom est le nom du kit d'image sur tiled et le deuxième nom celui dans le preload
        const tileset = map.addTilesetImage('base', 'tiles');
        
        const platforms = map.createStaticLayer('plateformes', tileset, 0, 200);

        /*//des étoiles
        this.star1=this.physics.add.sprite(300,150,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0.8);

        this.star2=this.physics.add.sprite(400,100,"star");
        this.star2.setCollideWorldBounds(true);
        this.star2.setBounce(0.8);

        this.star3=this.physics.add.sprite(600,100,"star");
        this.star3.setCollideWorldBounds(true);
        this.star3.setBounce(0.8);

        //quand le joueur touche une étoile on appelle la fonction ramasserEtoile
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star2, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);*/

    }

}

