class NuageVert extends ObjetPhysique{

    constructor(scene, x, y) {
        super(scene, x, y, "NuageVert");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(200,138);
        //blendmode
        if(scene.sys.game.device.os.desktop !== true && scene.sys.game.device.os.linux !== true && scene.sys.game.device.os.macOS !== true) {
            this.blendMode='ADD';
        }else {
            this.blendMode = 'NORMAL';
        };

        //------------------------------------------------------------------------------------------------------
        //----------------PROBLEME CONNU DE CARRE NOIR SUR TEL QUAND BLENDMODE ACTIVE---------------------------
        //--------------------------------------------------------------------------------------------------------------

        //random
        this.plusoumoins =  2*(0.5 - Math.random());

        // X encore plus random
        this.originalX=x;
        this.minX= x - (Math.random() * 90 - 15) * this.plusoumoins + 400;
        this.maxX= x + (Math.random() * 90 + 15) + this.plusoumoins;

        /*
        // Y encore plus random
        this.originalY=y;
        this.minY= y - (Math.random() * 45 - 15) * this.plusoumoins + 200;
        this.maxY= y + (Math.random() * 45 - 15) * this.plusoumoins ;*/

        // on applique les propriétés du début de l'animation
        this.x=this.minX;
        //this.y=this.minY;
        this.alpha=0.8;
        let me=this;


        //Ceci décale les animations pour ce même objet
        scene.tweens.add({
            targets: this,
            function () {
                me.start();
            }
        })
    }

    start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.maxX  * Math.random() - 20,
                to: this.minX * Math.random() + 20,
                duration: Math.random()*30000 + 50000,
                yoyo: 1,
                repeat:-1,
            }
            /*y: {
                from: this.maxY * Math.random() - 20,
                to:this.minY * Math.random() + 20,
                duration: Math.random()*20000 + 10000,
                //ease: 'Circ.easeInOut',
                yoyo: 1,
                repeat:-1
            }*/
        });
    }

}