/**
 * @file globalvars.js holds all of our global variables that are used throughout the game
 */
const Textures = {
    Platform: "./Assets/Assets.json",
    Character: "./Assets/adventurer-Sheet.json",
    Background: "./Assets/background.json"
};

const game = document.getElementById('game');

game.height = 500;
game.width = 500;

const app = new PIXI.Application(
    {
        view: game,
        width: 16*50,
        height: 16*16,
        backgroundColor: 0x410000
    }
);

const BG = PIXI.Sprite.from('./Assets/Background_1.png');
BG.scale.x = 2

let bottom;
let maxHeight;
let gravity = false;
let hearts = 3;
let heartArray = new Array(3);
let enemyHurtBox;
let reset = 0;
let damageboost = 0;
let testing = 0;
let jumpspeed = -0.5;
let fallspeed = 0.5;
let sprite;
let state = 'idle';
let time = 0;
let collisionDetection = new Array(12);
let onTheGround = false;
let coinCounter = 0;

let resource;
let container;
let background;
let Forward = 1;
let arrayOfIndex = new Array(8);
let arrayOfSprites = new Array(8);

let platformSprites = new Array(50 * 15);
let constantHurtBox = new Array(50 * 15);

let platformArray = [ 0, 0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 138,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
                        0, 0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 138,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   63, 64,   65,  0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   78, 79,   80,  0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   92, 93,   94,  0,   0,   0, 0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   66,   0,   0,   0,   0,   0,   0,    0,  0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   66,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   66, 66,  66, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 144, 144, 144,   0,   0, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   0,   0,   66,   66,   0,   0,   0, 144, 144, 144,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 114, 115, 116,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 130, 128, 129, 130,   0,   0,   0,   0,   0,   0,   0,   0,   0, 187, 187, 
                        0,   0,   0,   14,   14,   14,   14,   14,   0,   0,   0,   0,   0,   0,   0,   0,   14,   14,   14,   14,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 143, 144, 142, 143, 144,   0,   0,   0,   0, 187, 187,   0,   0,   0, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 14, 144, 144, 144,   0,   0,   0,   0,   0,   0,   0, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187,   0,   0, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187, 187, 187, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187, 187, 187, 187, 187];




let text;
let spriteHurtBox;
let gameController;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

let coinSound;
coinSound = new sound('coineff.mp3');