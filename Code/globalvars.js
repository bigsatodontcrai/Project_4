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
        width: 800,
        height: 256,
        backgroundColor: 0xAAAAAA
    }
);




let sprite;
let state = 'idle';

let resource;
let container;
let background;
let Forward = 1;
let arrayOfIndex = new Array(8);
let arrayOfSprites = new Array(8);

let platformSprites = new Array(50 * 15);
let constantHurtBox = new Array(50 * 15);

let platformArray = [ 163, 163,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0, 138,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
                        0, 163,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0, 138,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   63, 64,   65,  0,   0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   163, 0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   78, 79,   80,  0,   0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   92, 93,   94,  0,   0,   0, 163,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,    0,  0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   66, 66,  66, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 144, 144, 144,   0,   0, 163,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 144, 144, 144,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 114, 115, 116,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,  66,  66,  66,   0,   0,   0,   0,   0,   0,   0, 130, 128, 129, 130,   0,   0,   0,   0,   0,   0,   0,   0,   0, 187, 187, 
                        0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 143, 144, 142, 143, 144,   0,   0,   0,   0, 187, 187,   0,   0,   0, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187,   0,   0, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187, 187, 187, 187, 187, 
                      144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144,   0,   0, 144, 144, 144, 144, 144, 144,   0,   0, 187, 187, 187, 187, 187, 187, 187, 187, 187];

let spriteHurtBox;
let gameController;