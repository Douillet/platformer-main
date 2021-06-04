class Gobelin_basique extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Gobelin_basique");

        this.setOrigin(0,0);
        this.setCollideWorldBounds(true);
        this.setBounceX(1);
        this.setBounceY(1);
        this.setVelocityX(-50);
        
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