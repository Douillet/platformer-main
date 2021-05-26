class Geant extends ObjetEnnemi{

    constructor(scene, x, y) {
        super(scene, x, y, "Géant");
        this.vie = 150;
        this.tete = 30;
        
        this.setOrigin(0,0);
        this.setDisplaySize(120,250);
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
                this.flipX=false;
            }else{
                this.flipX=true;
            }
        }
    
    }
}