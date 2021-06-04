class Squig extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Squig");
        
        this.setOrigin(0,0);
        this.setCollideWorldBounds(true);
        this.setBounceY(1);
        this.setBounceX(0.2);
        this.setVelocityY(200);


        this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
    }

    update(){
        //fait changer de sens
        if(this.body){
            if(this.body.velocity.x<0){
                this.flipX=true;
            }else{
                this.flipX=false;
            }
        }
    
    }
}