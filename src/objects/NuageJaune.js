class NuageJaune extends ObjetPhysique{

    constructor(scene, x, y) {
        super(scene, x, y, "NuageJaune");
        //pas de gravité
        this.body.allowGravity=false;

        //gestion de la taille
        this.setDisplaySize(200,138);
        //blendmode
        this.blendMode='NORMAL';

        //on réduit un peu la zone de hit
        /*this.setBodySize(this.body.width-60,this.body.height-60);
        this.setOffset(30, 30);*/

        this.plusoumoins =  2*(0.5 - Math.random());

        //définir les propriétés que l'on va utiliser dans notre animation

        // X
        this.originalX=x;
        this.minX= x - (Math.random() * 90 - 15) * this.plusoumoins + 200;
        this.maxX= x + (Math.random() * 90 + 15) + this.plusoumoins;

        // Y
        this.originalY=y;
        this.minY= y - (Math.random() * 45 - 15) * this.plusoumoins + 200;
        this.maxY= y + (Math.random() * 45 - 15) * this.plusoumoins ;

        // on applique les propriétés du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0.4;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add({
            targets: this,
            //delay:Math.random()*1000,
            //alpha: 0.4,
            //me.start();
            function () {
                me.start();
            }
        })
    }

    start(){
        this.scene.tweens.add({
            targets: this,
            //pas un cercle mais bon
            x: {
                from: this.maxX  * Math.random() - 20,
                to: this.minX * Math.random() + 20,
                duration: Math.random()*30000 + 50000,
                //ease: 'Circ.easeInOut',
                yoyo: 1,
                repeat:-1,
                //flipX:true,
            }//,
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