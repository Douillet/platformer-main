class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
        this.load.image('vie', 'assets/monster-violet.png');
    }
    create (){
        console.log("create Ui")

        this.score=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(10, 40, '...', {
            font:'18px "Hanalei Fill"',
            fill: '#fff'
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '...', {
            font:'24px "Hanalei Fill"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '...', {
            font:'18px "Hanalei Fill"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)



        //let pad=new GamePad(this,0,0);
        let buttons=new GameButton(this, 0, 0);
        buttons.x=this.sys.canvas.width-buttons.size-32;
        buttons.y=this.sys.canvas.height-buttons.size-32;




        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1);
        btFs.setDisplaySize(48,48);
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;

        this.vieP1=this.add.image(40,40,'vie');
        this.vieP1.setDisplaySize(30, 30);
        this.vieP1.setOrigin(1,1);
        //this.vieP1.setAlpha(0);

        this.vieP2=this.add.image(74,40,'vie');
        this.vieP2.setDisplaySize(30, 30);
        this.vieP2.setOrigin(1,1);
        //this.vieP2.setAlpha(0);

        this.vieP3=this.add.image(108,40,'vie');
        this.vieP3.setDisplaySize(30, 30);
        this.vieP3.setOrigin(1,1);
        //this.vieP3.setAlpha(0);


    }

    PV(){
        if(Tableau.current.player.vieJ === 3){
            this.vieP1.setAlpha(2);
            this.vieP2.setAlpha(2);
            this.vieP3.setAlpha(2);
        }
        else if(Tableau.current.player.vieJ === 2){
            this.vieP1.setAlpha(1);
            this.vieP2.setAlpha(1);
            /*this.vieP3.setTint(0xa2a2a2);
            setTimeout(function () {      //On ne peut pas ressauter pendant 0.05 sec
                this.vieP3.setAlpha(0);
            }, 300);*/
            this.vieP3.setAlpha(0);
        }
        else if(Tableau.current.player.vieJ === 1){
            this.vieP1.setAlpha(1);
            /*this.vieP2.setTint(0xa2a2a2);
            setTimeout(function () {      //On ne peut pas ressauter pendant 0.05 sec
                this.vieP2.setAlpha(0);
            }, 300);*/
            this.vieP2.setAlpha(0);
            this.vieP3.setAlpha(0);
        }
        else{
            /*this.vieP1.setTint(0xa2a2a2);
            setTimeout(function () {      //On ne peut pas ressauter pendant 0.05 sec
                this.vieP1.setAlpha(0);
            }, 300);*/
            this.vieP1.setAlpha(0);
            this.vieP2.setAlpha(0);
            this.vieP3.setAlpha(0);
        }

    }

    gagne(points=1)
    {
        this.score+=points;
        this._scoreText.setText('Plumes ramassées: ' + this.score);
    }
    perd(points=0)
    {
        this.score=0;
    }
    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
