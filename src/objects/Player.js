class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width+30,this.body.height+70);
        this.setOffset(15, 20);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('hero', { start: 23, end: 0 }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('hero', { start: 25, end: 48 }),
            frameRate: 24,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'hero', frame: 24 } ],
            frameRate: 20
        });

        this._directionX=0;
        this._directionY=0;


    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /**
     * arrête le joueur
     */
    stop(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /**
     * Déplace le joueur en fonction des directions données
     */
    move(){

        switch (true){
            case this._directionX<0:
                this.setVelocityX(-125);
                this.anims.play('left', true);
                break;
            case this._directionX>0:

                this.setVelocityX(125);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn');
        }

        if(this._directionY<0){
            if(this.body.blocked.down || this.body.touching.down){
                this.setVelocityY(-650);
            }
        }


    }


}