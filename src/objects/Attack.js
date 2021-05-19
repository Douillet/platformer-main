class Attack extends ObjetPhysique{
    constructor(scene, x, y) {
        super(scene, x, y, "attack");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //this.setOrigin(0,0);
        this.setDisplaySize(70,30);
        this.setCollideWorldBounds(false);
        this.body.allowGravity=false;
        this.body.duration = 200;

        this.setDepth(1000);
        
        //this.scene.events.on('update', (time, delta) => { this.update(time, delta)} );
        //this.physics.add.overlap(this, monstersContainer, etPaf, null, this);
        /*this.MonstersObjects.iterate(monster=>{
            this.physics.add.overlap(this, monster, function(){monster.mort()}, null, scene);
        });*/

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