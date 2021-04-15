class Attack{
    constructor(scene, x, y) {
        super(scene, x, y, "attack");

        this.setOrigin(0,0);
        this.setDisplaySize(30,140);
        this.setCollideWorldBounds(false);
        this.body.allowGravity=false;
        
        
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