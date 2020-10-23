

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

let platformSprites = new Array(50*15);
let constantHurtBox = new Array(50*15);

let platformArray = [163, 163, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 63, 64, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 78, 79, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 92, 93, 94, 0, 0, 0, 163, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 144, 144, 0, 0, 163, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 144, 144, 144, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 115, 116, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 66, 66, 66, 0, 0, 0, 0, 0, 0, 0, 130, 128, 129, 130, 0, 0, 0, 0, 0, 0, 0, 0, 0, 187, 187, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 143, 144, 142, 143, 144, 0, 0, 0, 0, 187, 187, 0, 0, 0, 187, 187, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 0, 0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 0, 0, 144, 144, 144, 144, 144, 144, 0, 0, 187, 187, 187, 187, 187, 0, 0, 187, 187, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 0, 0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 0, 0, 144, 144, 144, 144, 144, 144, 0, 0, 187, 187, 187, 187, 187, 187, 187, 187, 187, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 0, 0, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 144, 0, 0, 144, 144, 144, 144, 144, 144, 0, 0, 187, 187, 187, 187, 187, 187, 187, 187, 187];


document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(app.view);

    //const level = import('./Assets/Platforms.json');
    container = new PIXI.Container();
    //makePlatforms(level);

    let loadScene = PIXI.Loader.shared.add('./Assets/AssetsOrig.json');
    let loadPlayer = PIXI.Loader.shared.add('./Assets/adventurer-Sheet.json');
    
    loadScene.load(() => {
        let newResource = PIXI.Loader.shared.resources['./Assets/AssetsOrig.json'].spritesheet;
        

        for (let i = 0; i < 50*15; i++) {
            if (platformArray[i] != 0) {
                console.log(i);
                let index = platformArray[i] - 1;
                let loc = 'Assets' + index + '.png';
                console.log(loc);
                platformSprites[i] = new PIXI.Sprite(newResource.textures[loc]);
                platformSprites[i].x = (i % 50) * 16;
                let yloc = Math.floor(i/50);
                platformSprites[i].y = (yloc + 1) * 16;
                platformSprites[i].width = 16;
                platformSprites[i].height = 16;
                constantHurtBox[i] = new hurtBox(platformSprites[i]);
                constantHurtBox[i].calculateEdges();
                container.addChild(platformSprites[i]);
            } else {
                platformSprites[i] = 0;
                constantHurtBox[i] = 0;
            }
        }
        console.log(platformArray[617]);
    });

    loadPlayer.load(() => {
        
        resource = PIXI.Loader.shared.resources["./Assets/adventurer-Sheet.json"].spritesheet;
        const newResource = PIXI.Loader.shared.resources['./Assets/adventurer-Sheet.json'];
        sprite = new PIXI.AnimatedSprite(resource.animations.idle);
        console.log('its lit');

        sprite = sprite;
       
        sprite.height = 32;
        sprite.width = 16*4;
        sprite.x = -16;
        sprite.y = 176;
        sprite.play();
        sprite.animationSpeed = 0.1;

        
        let spriteHurtBox = new hurtBox(sprite);

        let gameController = new controller(sprite);
        //gameController.vy = 6;
        let isRun = false;
        let isKeyDown = false;
        

        document.addEventListener('keydown', (e) => {

            //gameController.movement(e);
            
        });
        document.addEventListener('keypress', (e) => {
            
            //gameController.keyP(e);
            isKeyDown = true;
            if(e.key == 'a') {
                Forward = -1;
                state = 'running';
                sprite.animationSpeed = 0.7;
            } if (e.key == 'd') {
                Forward = 1;

                state = 'running';
                sprite.animationSpeed = 0.7;

            } if (e.key == 'w') {
                sprite.animationSpeed = 0.7;
                state = 'jumping';
            }
                 
            let currentTextures = newResource.spritesheet.animations[state];
            if(sprite.textures != currentTextures) {
                sprite.textures = currentTextures;
                sprite.play();
            }
            gameController.movement(e);
            
            
        });
        document.addEventListener('keyup', (e) => {
            if(e.key == 'd' || e.key == 'a'){
                
                if(sprite.y == 176) {
                    gameController.vx = 0;
                    sprite.animationSpeed = 0.1;
                    state = 'idle';
                }
            } if (sprite.y < 176) {
                gameController.vy = 6;
                sprite.animationSpeed = 0.5;
                state = 'falling';
                
            } else if (sprite.y == 176) {
                gameController.vy = 0;
                state = 'idle';
            }
            sprite.textures = newResource.spritesheet.animations[state];
            sprite.play();
            
            
        });

        

        sprite.onFrameChange = function () {
            sprite.scale.x = Math.abs(sprite.scale.x) * Forward;
            gameController.move();

            arrayOfSprites = newSpriteArray(spriteHurtBox);
            spriteHurtBox.updateHurtBox(gameController);
            for(let i = 0; i < 8; i++){
                console.log(arrayOfSprites);
                if(!isNaN(arrayOfSprites[i])){
                    console.log('sup');
                    console.log(spriteHurtBox.collide(arrayOfSprites[i], gameController));
                }
            }
            
            if(state == 'falling' && sprite.y == 176){
                state = 'idle';
                gameController.vy = 0;
                gameController.vx = 0;
                
                sprite.animationSpeed = 0.1;
                sprite.textures = newResource.spritesheet.animations[state];
                sprite.play();
            }


            /*console.log(sprite.x);
            console.log(sprite.y);
            console.log('height ' + sprite.height);
            console.log('width ' + sprite.width);
            console.log(sprite.x + sprite.width);
            console.log(sprite.y + sprite.height);
            console.log(gameController.vx);
            console.log(platformSprites);*/
        }
        
        
        container.addChild(sprite);
        app.stage.addChild(container);
        app.renderer.render(app.stage);
    
    });

    

    
});

function findIndexFromCoordinate(x, y, numTiles, size){
    let temp1 = 50 * ((y / 16)) - 1;
    let temp2 = x / 16;
    return temp1 + temp2;

}

function thePosition(num, px){
    return Math.floor(num / px) * px;
}

function getPos(box){
    let boxArray = [[], [], [], [], [], [], [], [], []];
    console.log('left edge: ' + box.leftEdge);
    console.log('bottom edge: ' + box.bottomEdge);
    let pos = thePosition(box.leftEdge, 16);
    let mos = thePosition(box.bottomEdge, 16);
    console.log(pos)
    console.log(pos + 16);
    console.log(pos + 32);
    console.log(pos - 16);

    console.log(mos);
    console.log(mos - 16);
    console.log(mos - 32);
    console.log(mos + 16);


    boxArray[0] = [pos, mos - 32];
    boxArray[1] = [pos + 16, mos - 32];
    boxArray[2] = [pos + 32, mos - 16];
    boxArray[3] = [pos + 32, mos];
    boxArray[4] = [pos + 16, mos + 16];
    boxArray[5] = [pos, mos + 16];
    boxArray[6] = [pos - 16, mos];
    boxArray[7] = [pos - 16, mos - 16];
    

    return boxArray;
}



function indexArray(box) {
    let thisArray = getPos(box);
    let temp1; 
    let temp2; 
    for (let i = 0; i < 8; i++){
        temp1 = thisArray[i][0];
        temp2 = thisArray[i][1];
        arrayOfIndex[i] = findIndexFromCoordinate(
            temp1, temp2, 50, 16
        );
    }
    return arrayOfIndex;
}


//this newSpriteArray returns an array with all of the hurt boxes of neighboring tiles
function newSpriteArray(box){
    let spriteArray = new Array(8);
    let ind = indexArray(box);
    console.log(ind);
    for (let i = 0; i < 8; i++){
        let index = ind[i];
        spriteArray[i] = constantHurtBox[index];
    }
    console.log(spriteArray);
    console.log(constantHurtBox);
    return spriteArray;
}






