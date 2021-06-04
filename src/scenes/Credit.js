class Credit extends Phaser.Scene {

    constructor(key) {
        super(key);
    }

    preload ()
    {
        this.load.image('credit', 'assets/credit.jpg');
    }

    create()
    {
        var cam = this.cameras.main;
        cam.zoomTo(0.55, 1);

        ui.uiActif = false;
        ui.cacherUI();

        this.EnterPressed = false;

        this.credit = this.add.sprite(game.config.width/2, game.config.height/2, 'credit');


        //On initialise les touches du clavier pour lancer le jeu, activer/desactiver des options, etc


        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function ()
        {
            if (!this.EnterPressed & !this.SpacePressed)
            {
                this.credit.destroy();
                this.EnterPressed = true;
                this.game.scene.stop()
                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
                {
                    this.game.scene.start(Start);
                    this.game.scene.stop()
                    this.scene.start("Démarrer");
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
                    this.credit.destroy();
                    this.EnterPressed = true;
                    this.game.scene.stop()
                    this.game.scene.start(Start);
                    this.scene.start("Démarrer");

                })
            }

        }, this);

        this.input.on('pointerdown', function(pointer){
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
            {
                this.credit.destroy();
                this.EnterPressed = true;
                this.game.scene.stop()
                this.game.scene.start(Start);
                this.scene.start("Démarrer");
            })

        },this);
    }

}