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
                
                let index = platformArray[i] - 1;
                let loc = 'Assets' + index + '.png';
                
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
            gameController.movement(e);
            state = updateState(gameController.vx, gameController.vy, sprite);
            let currentTextures = newResource.spritesheet.animations[state];
            if (sprite.textures != currentTextures) {
                sprite.textures = currentTextures;
                sprite.play();
            }
            
            
        });
        document.addEventListener('keyup', (e) => {
            gameController.stopMovement(e, spriteHurtBox);
            state = updateState(gameController.vx, gameController.vy, sprite);
            sprite.textures = newResource.spritesheet.animations[state];
            sprite.play();
            
            
        });

        

        sprite.onFrameChange = function () {
            let thing = false;
            if(state != 'jumping')
            {
                gameController.vy = 3;
            }
            spriteHurtBox.updateHurtBox(gameController);
            arrayOfSprites = newSpriteArray(spriteHurtBox);
            console.log(spriteHurtBox);
            
            for (let i = 0; i < 8; i++) {

                if (arrayOfSprites[i] == 0){
                    console.log('haha');
                }
                else {
                    console.log('sup');
                    thing = spriteHurtBox.collide(arrayOfSprites[i], gameController, Forward);
                    console.log(arrayOfSprites[i]);
                    console.log(thing);
                } 
            }
            gameController.move();

            console.log(Forward);
            
            state = updateState(gameController.vx, gameController.vy, sprite);
            let currentTextures = newResource.spritesheet.animations[state];
            if (sprite.textures != currentTextures) {
                sprite.textures = currentTextures;
                sprite.play();
            }
            
            /*if(state == 'falling' && sprite.y == 176){
                state = 'idle';
                gameController.vy = 0;
                gameController.vx = 0;
                
                sprite.animationSpeed = 0.1;
                sprite.textures = newResource.spritesheet.animations[state];
                sprite.play();
                //time to play with fire
            }*/
        }
        
        
        container.addChild(sprite);
        app.stage.addChild(container);
        app.renderer.render(app.stage);
    
    });

    

    
});








