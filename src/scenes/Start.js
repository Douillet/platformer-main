class Start extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    preload ()
    {
        this.load.image('ecran', 'assets/artwork.jpg');
        this.load.image('bouton', 'assets/Continue.png');
    }

    create()
    {
        var cam = this.cameras.main;
        cam.zoomTo(0.5);

        this.EnterPressed = false;

        this.add.sprite(game.config.width/2, game.config.height/2, 'ecran');

        let startB1 = this.add.sprite(game.config.width/2-8, game.config.height -150, 'bouton');

        //---------- on affiche les textes que l'on veut faire apparaître (boutons, titre...) ----------

        //let startBText1 = this.add.text(game.config.width/2-72, game.config.height -265, "Play",{font: "28px visitor", fill:"#000000"}); //375,560,FFF

        //tweens permet de donner un petit effet à la cible voulue (target)
        this.tweens.add(
            {
                targets:[startB1],
                duration:2000,
                yoyo: true,
                repeat:-1,
                delay:Math.random()*1000,
                alpha:
                    {
                        startDelay:Math.random()*5000,
                        from:0,
                        to:1,
                    }
            })

        //---------- on initialise les touches du clavier pour lancer le jeu, activer/desactiver des options, etc ----------

        /*if(Tableau.current){
            Tableau.current._destroy();
        }
        this.game.scene.start(tableau);
        this.scene.start("aventureBegining");*/

        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function ()
        {
            if (!this.EnterPressed & !this.SpacePressed)
            {

                this.EnterPressed = true;
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(Niveau1);
                    this.scene.start("Retrouvez votre Bien-Aimée");
                })
            }

        }, this);


        this.input.keyboard.on('keydown-SPACE', function () //'keydown-SPACE', function ()
        {
            if (!this.SpacePressed & !this.EnterPressed)
            {

                this.SpacePressed = true;
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.EnterPressed = true;
                    this.game.scene.start(Niveau1);
                    this.scene.start("Retrouvez votre Bien-Aimée");
                })
            }

        }, this);

        this.input.on('pointerdown', function(pointer){
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);
                this.scene.start("aventureBegining");*/
                this.EnterPressed = true;
                this.game.scene.start(Niveau1);
                this.scene.start("Retrouvez votre Bien-Aimée");
            })

        },this);
    }

}