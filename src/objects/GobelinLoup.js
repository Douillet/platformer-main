class GobelinLoup extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "GobelinLoup");

        this.setOrigin(0,0);
        this.setDisplaySize(68,63);
        this.setCollideWorldBounds(true);
        this.setBounceY(0.6);
        this.setBounceX(1);
        this.setVelocityX(70);
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
    }

    update(){
        //fait changer de sens notre oiseau
        if(this.body){
            if(this.body.velocity.x<0){
                this.flipX=true;
            }else{
                this.flipX=false;
            }
        }
    
    }


}