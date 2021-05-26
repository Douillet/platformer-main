class BouclierCote extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "BouclierCote");

        this.vie = 100;

        this.setOrigin(0,0);
        this.setDisplaySize(64,64);
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