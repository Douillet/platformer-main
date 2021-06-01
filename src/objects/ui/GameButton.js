/**
 * Un objet qui écoute les boutons sur téléphone
 */
class GameButton extends GamePad{
    constructor(scene, x, y,size=100) {
        super(scene, x, y)
        scene.add.existing(this);

        //s'applique uniquement sur téléphone
        if(this.scene.sys.game.device.os.desktop !== true && this.scene.sys.game.device.os.linux !== true && this.scene.sys.game.device.os.macOS !== true) {
            this.size = size;
            let w = this.size / 2;

            //création des boutons
            let btnUP = scene.add.circle(0, 0, w, 0xffffff, 0.3).setInteractive();
            let btnLEFT = scene.add.circle(0, 0, w, 0xffffff, 0.3).setInteractive();
            let btnRIGHT = scene.add.circle(0, 0, w, 0xffffff, 0.3).setInteractive();


            let btnA = scene.add.circle(0, 0, w, 0xe34343, 0.8).setInteractive();
            let btnB = scene.add.circle(0, 0, w, 0x434343, 0.6).setInteractive();

            this.add(btnUP);
            this.add(btnLEFT);
            this.add(btnRIGHT);

            this.add(btnA);
            this.add(btnB);

            //positions
            btnUP.x = -w;
            btnLEFT.x = -w * 3;
            btnRIGHT.x = w;
            btnUP.y = -w;
            btnLEFT.y = w;
            btnRIGHT.y = w;

            btnA.x = scene.sys.canvas.width * -1 + w * 4;
            btnA.y = w * 1.5;

            btnB.x = scene.sys.canvas.width * -1 + w * 4;
            btnB.y = -w;


            //fonctions
            btnLEFT.on('pointerdown', function () {
                Tableau.current.player.directionX = -1;
            });
            btnRIGHT.on('pointerdown', function () {
                Tableau.current.player.directionX = 1;
            });
            btnUP.on('pointerdown', function () {
                Tableau.current.player.directionY = -1;
            });


            btnLEFT.on('pointerup', function () {
                Tableau.current.player.directionX = 0;
            });
            btnRIGHT.on('pointerup', function () {
                Tableau.current.player.directionX = 0;
            });
            btnUP.on('pointerup', function () {
                Tableau.current.player.directionY = -0;
            });


            btnA.on('pointerdown', function () {
                Tableau.current.player.attaque();
                //console.log("GROS BOUTTON");
            });


            btnB.on('pointerdown', function () {
                Tableau.current.player.directionY = -1;
            });
            btnB.on('pointerup', function () {
                Tableau.current.player.directionY = 0;
            });
        }



    }


}