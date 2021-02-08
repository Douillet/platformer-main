class Gobelin extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Gobelin");


        this.setOrigin(0,0);
        this.setDisplaySize(64,64);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        this.setVelocityX(80);
        
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