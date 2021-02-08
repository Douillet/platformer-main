class Zombie extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "Zombie");

        this.setOrigin(0,0);
        this.setDisplaySize(100,40);
        this.setCollideWorldBounds(true);
        this.setBounceY(0.1);
        this.setBounceX(1);
        this.setVelocityX(50);
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