class GobelinVolant extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "GobelinVolant");

        this.setOrigin(0,0);
        this.setDisplaySize(100,70);
        this.setCollideWorldBounds(true);
        this.body.allowGravity=false;
        this.setBounceY(1);
        this.setBounceX(1);
        this.setVelocityX(100);
        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
    }

    update(){
        //fait changer de sens notre oiseau
        if(this.body){
            if(this.body.velocity.x<0){
                this.flipX=false;
            }else{
                this.flipX=true;
            }
        }
    
    }
}