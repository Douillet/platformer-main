class Ui extends Phaser.Scene {
    constructor() {
        super({key: 'ui', active: true});
        window.ui = this;
    }

    preload() {
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('vie', 'assets/vieJ.png');
        this.load.spritesheet('scorePlume', 'assets/PlumeSS.png',
            {frameWidth: 32, frameHeight: 32}
        );
    }

    create() {
        //console.log("create Ui")

        this.score = 0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(55, 52, '...', {
            font: '18px "Hanalei Fill"',
            fill: '#fff'
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width - 16, 16, '...', {
            font: '18px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        /*this._tableauTextClass = this.add.text(this.sys.canvas.width - 16, 16 + 32, '...', {
            font: '18px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)*/

        this._tableauText.originX = 1;


        /*this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })*/

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me = this;
        setTimeout(function () {
            me.tableau = "Hello World";
            me.gagne(0)
        }, 100)


        //let pad=new GamePad(this,0,0);
        let buttons = new GameButton(this, 0, 0);
        buttons.x = this.sys.canvas.width - buttons.size - 32;
        buttons.y = this.sys.canvas.height - buttons.size - 32;


        let btFs = this.add.image(0, 0, 'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1, 1);
        btFs.setDisplaySize(48, 48);
        btFs.x = this.sys.canvas.width;
        btFs.y = this.sys.canvas.height;

        this.vieP1 = this.add.image(50, 40, 'vie');
        this.vieP1.setDisplaySize(40, 30);
        this.vieP1.setOrigin(1, 1);
        //this.vieP1.setAlpha(0);

        this.vieP2 = this.add.image(94, 40, 'vie');
        this.vieP2.setDisplaySize(40, 30);
        this.vieP2.setOrigin(1, 1);
        //this.vieP2.setAlpha(0);

        this.vieP3 = this.add.image(138, 40, 'vie');
        this.vieP3.setDisplaySize(40, 30);
        this.vieP3.setOrigin(1, 1);
        //this.vieP3.setAlpha(0);

        this.anims.create({
            key: 'animPlume',
            frames: this.anims.generateFrameNumbers('scorePlume', {start: 0, end: 11}),
            frameRate: 4,
            repeat: -1
        });

        this.plumeScore = this.add.sprite(42, 62, 'scorePlume')



    }

    //affiche les vies selon la vieJ du player
    PV() {
        if (Tableau.current.player.vieJ === 3) {
            this.vieP1.setAlpha(2);
            this.vieP2.setAlpha(2);
            this.vieP3.setAlpha(2);
        } else if (Tableau.current.player.vieJ === 2) {
            this.vieP1.setAlpha(1);
            this.vieP2.setAlpha(1);

            this.vieP3.setAlpha(0);
        } else if (Tableau.current.player.vieJ === 1) {
            this.vieP1.setAlpha(1);

            this.vieP2.setAlpha(0);
            this.vieP3.setAlpha(0);
        } else { //à 0
            this.vieP1.setAlpha(0);
            this.vieP2.setAlpha(0);
            this.vieP3.setAlpha(0);
        }

    }

    //rajoute une vie avec 10 plumes
    vieSupp() {
        this._scoreText.setText('x  ' + this.score);
        if (Tableau.current.player.vieJ < 3) {
            if (this.score === 10) {
                Tableau.current.player.vieJ += 1;
                this.score = 0;

            }
        }
        //3 vieJ et 10 plumes donne un bouclier représenté par un tint doré
        if (Tableau.current.player.vieJ === 3) {
            if (this.score === 10) {
                Tableau.current.player.setTint(0xfef995);
                this.vieP1.setTint(0xece77b);
                this.vieP2.setTint(0xece77b);
                this.vieP3.setTint(0xece77b);
                this._scoreText.setTint(0xece77b);
                this.plumeScore.setTint(0xece77b);
            } else {
                //pas besoin de régler le tint du player car hitMonsters le fait déjà
                this.vieP1.setTint(0xffffff);
                this.vieP2.setTint(0xffffff);
                this.vieP3.setTint(0xffffff);
                this._scoreText.setTint(0xffffff);
                this.plumeScore.setTint(0xffffff);
            }
        }
    }

    gagne(points = 1) {
        this.score += points;
        this._scoreText.setText('x  ' + this.score);
    }

    perd(points = 0) {
        this.score = 0;
        this._scoreText.setText('x  ' + this.score);
        ;
    }

    cacherUI(){

        if (this.uiActif === false) {
            this.vieP1.setAlpha(0);
            this.vieP2.setAlpha(0);
            this.vieP3.setAlpha(0);
            this._scoreText.setAlpha(0);
            this.plumeScore.setAlpha(0);
            this._tableauText.setAlpha(0);
        }else{
            this.vieP1.setAlpha(1);
            this.vieP2.setAlpha(1);
            this.vieP3.setAlpha(1);
            this._scoreText.setAlpha(1);
            this.plumeScore.setAlpha(1);
            this._tableauText.setAlpha(1);
        }
    }
    update() {
        if (Tableau.current) {
            this._tableauText.setText(Tableau.current.scene.key);
            //this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
