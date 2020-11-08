/**
 * @file main.js sets up the beginning of the game.
 */

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;


document.addEventListener('DOMContentLoaded', () => {
    let myMusic;
    myMusic = new sound("448_beat.mp3");
    myMusic.play();
    
    document.body.appendChild(app.view);

    //const level = import('./Assets/Platforms.json');
    container = new PIXI.Container();
    text = new PIXI.Text('Coins: ' + coinCounter, { fontFamily: 'Helvetica', fontSize: 12, fill: 0xF00000, align: 'center' });
    text.x = 16*4;
    
    
    //makePlatforms(level);

    let loadScene = PIXI.Loader.shared.add('./Assets/AssetsOrig.json');
    let loadPlayer = PIXI.Loader.shared.add('./Assets/adventurer-Sheet.json');
    let loadEnemy = PIXI.Loader.shared.add('./Assets/Walk.json');
    
    loadScene.load(() => {
        let newResource = PIXI.Loader.shared.resources['./Assets/AssetsOrig.json'].spritesheet;
        
        
        for (let i = 0; i < 50*15; i++) {
            if (platformArray[i] != 0 && platformArray[i] != 14) {
                
                let index = platformArray[i] - 1;
                let loc = 'Assets' + index + '.png';
                
                platformSprites[i] = new PIXI.Sprite(newResource.textures[loc]);
                platformSprites[i].x = (i % 50) * 16;
                let yloc = Math.floor(i/50);
                platformSprites[i].y = (yloc + 1) * 16;
                platformSprites[i].width = 16;
                platformSprites[i].height = 16;
                platformSprites[i].interactive = true;


                constantHurtBox[i] = new hurtBox(platformSprites[i]);
                constantHurtBox[i].immutable = true;
                constantHurtBox[i].calculateEdges();
                container.addChild(platformSprites[i]);
            } else if(platformArray[i] == 14){
                platformSprites[i] = new PIXI.AnimatedSprite(newResource.animations.coins);
                platformSprites[i].x = (i % 50) * 16;
                let yloc = Math.floor(i / 50);
                platformSprites[i].y = (yloc + 1) * 16;
                platformSprites[i].width = 16;
                platformSprites[i].height = 16;
                platformSprites[i].interactive = true;
                platformSprites[i].animationSpeed = 0.3;
                
                constantHurtBox[i] = new hurtBox(platformSprites[i]);
                constantHurtBox[i].immutable = false;
                constantHurtBox[i].coins = true;
                constantHurtBox[i].calculateEdges();
                platformSprites[i].play();
                container.addChild(platformSprites[i]);

            }
            else {
                /*let loc = 'Assets' + 84 + '.png';
                platformSprites[i] = new PIXI.Sprite(newResource.textures[loc]);
                platformSprites[i].x = (i % 50) * 16;
                let yloc = Math.floor(i / 50);
                platformSprites[i].y = (yloc + 1) * 16;
                platformSprites[i].width = 16;
                platformSprites[i].height = 16;
                platformSprites[i].interactive = true;*/

                platformSprites[i] = {
                    x: (i % 50) * 16,
                    y: (Math.floor(i/50) + 1) * 16,
                    height: 16,
                    width: 16,
                };
                constantHurtBox[i] = new hurtBox(platformSprites[i]);
                constantHurtBox[i].height = platformSprites[i].height;
                constantHurtBox[i].width = platformSprites[i].width;
                //constantHurtBox[i].immutable = false;
                constantHurtBox[i].calculateEdges();
                constantHurtBox[i].coins = false;
                //container.addChild(platformSprites[i]);
            }
        }
        for(let i = 0; i < 3; i++){
            heartArray[i] = new PIXI.Sprite.from('./Assets/heart.png');
            heartArray[i].height = 8;
            heartArray[i].width = 8;
            heartArray[i].x = 16 * i + 3;
            heartArray[i].y = 4;
            container.addChild(heartArray[i]);
        }

        container.addChild(text);

        //console.log(platformSprites);
        //console.log(constantHurtBox);
        
    });

    loadEnemy.load(() => {

    });

    loadPlayer.load(() => {
        
        playCharacter();
        
        
        container.addChild(sprite);
        app.stage.addChild(container);
        app.renderer.render(app.stage);
    
    });

    

    
});








