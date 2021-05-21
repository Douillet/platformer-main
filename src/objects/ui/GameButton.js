/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GameButton extends GamePad{
    constructor(scene, x, y,size=100) {
        super(scene, x, y)
        scene.add.existing(this);

        this.size=size;
        let w=this.size/2;
        //let pad2=scene.add.container();

        let btnUP=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnLEFT=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();
        let btnRIGHT=scene.add.circle(0,0,w/2,0xffffff,0.3).setInteractive();


        let btnA=scene.add.circle(0,0,w/2,0xe34343,0.8).setInteractive();
        let btnB=scene.add.circle(0,0,w/2,0x434343,0.6).setInteractive();

        this.add(btnUP);
        this.add(btnLEFT);
        this.add(btnRIGHT);

        this.add(btnA);
        this.add(btnB);

        btnUP.x=w;
        btnLEFT.x=0;
        btnRIGHT.x=w*2;
        btnLEFT.y=w;
        btnRIGHT.y=w;

        btnA.x=scene.sys.canvas.width * -1 + w * 4;
        btnA.y=w*1.5 + 20;

        btnB.x=scene.sys.canvas.width * -1 + w * 4;
        btnB.y=w*0.5;


        btnLEFT.on('pointerdown',function(){
            Tableau.current.player.directionX=-1;
        });
        btnRIGHT.on('pointerdown',function(){
            Tableau.current.player.directionX=1;
        });
        btnUP.on('pointerdown',function(){
            Tableau.current.player.directionY=-1;
        });


        btnLEFT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnRIGHT.on('pointerup',function(){
            Tableau.current.player.directionX=0;
        });
        btnUP.on('pointerup',function(){
            Tableau.current.player.directionY=-0;
        });


        btnA.on('pointerdown',function(){
            Tableau.current.player.attaque();
            console.log("GROS BOUTTON");
        });


        btnB.on('pointerdown',function(){
            Tableau.current.player.directionY=-1;
        });
        btnB.on('pointerup',function(){
            Tableau.current.player.directionY=0;
        });




    }


}