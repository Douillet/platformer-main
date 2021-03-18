class Geant extends ObjetEnnemi{

    constructor(scene, x, y) {
        super(scene, x, y, "Géant");

        
        this.setOrigin(0,0);
        this.setDisplaySize(120,200);
        this.setCollideWorldBounds(true);
        this.setBounceY(0.2);
        this.setBounceX(1);
        this.setVelocityX(40);
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