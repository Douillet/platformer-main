
let width=14*64; //896; 14
let height=7*64; //448;

let config = {
    type: Phaser.AUTO,
    pixelArt: false,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100*3 },
            debug: false,
        }
    },
    scene: [


        new Start("Démarrer"),
        new Ui(),
        new Niveau1("Retrouvez votre Bien-Aimée"),



    ],
    width: width,
    height: height,
    scale: {
        mode: Phaser.Scale.FIT,
        orientation:Phaser.Scale.LANDSCAPE,
        parent: 'game',
        width: width,
        height: height,
        min: {
            width: 0,
            height: 0
        },
        max: {
            width: width*1.5,
            height: height*1.5
        },
        autoCenter:Phaser.Scale.Center.CENTER_BOTH

    },
    autoRound: false
};

//ATTENTION
var cursors;


let game;
function resize() {
}
window.onload = function() {
    game=new Phaser.Game(config);
    window.addEventListener("resize", resize, false);
    window.addEventListener("scroll", resize, false);
}