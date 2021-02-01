class GobelinLoup extends ObjetEnnemi{
    constructor(scene, x, y) {
        super(scene, x, y, "GobelinLoup");

        this.setOrigin(0,0);
        this.setDisplaySize(70,60);
        this.setCollideWorldBounds(true);
        this.setVelocityX(330)
        this.setBounceY(0.6);
        this.setBounceX(1);
        this.setVelocityX(500);
        //this.flipX(true);

    }
}