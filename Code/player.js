function setupCharacter(){
    resource = PIXI.Loader.shared.resources["./Assets/adventurer-Sheet.json"].spritesheet;
    sprite = new PIXI.AnimatedSprite(resource.animations.idle);
    console.log('its lit');

    sprite = sprite;

    sprite.height = 35;
    sprite.width = 47;
    sprite.anchor.set(0.5, 0);
    sprite.x = 16;
    sprite.y = 192 - (16);
    console.log(sprite.x);
    console.log(sprite.y);
    sprite.play();
    sprite.animationSpeed = 0.1;

    spriteHurtBox = new hurtBox(sprite);
    spriteHurtBox.calculateCharEdges();
    gameController = new controller(sprite);
    

}

function test(box){
    let thing = false;
    thing = spriteHurtBox.collide(box, gameController, Forward);
    
}


function characterMovement(){
    console.log(state);
    if(state != 'jumping'){
        gameController.vy = 3;
    }
    spriteHurtBox.updateHurtBox(gameController);
    try {
        arrayOfSprites = newSpriteArray(spriteHurtBox);
    } catch(error) {
        console.log('no');
    }
    console.log(spriteHurtBox);
    console.log(arrayOfSprites);
    arrayOfSprites.forEach(box => test(box));
    /*
    try {
        arrayOfSprites.forEach(box => console.log(box));
        arrayOfSprites.forEach(box => test(box));
    } catch (error) {
        console.log('you died');
        sprite.x = -16;
        sprite.y = 140;
        sprite.animationSpeed = 0.1;
    }*/
        
    

        
    
}

function playCharacter(){
    const newResource = PIXI.Loader.shared.resources['./Assets/adventurer-Sheet.json'];
    setupCharacter();

    document.addEventListener('keydown', (e) => {

        //gameController.movement(e);

    });
    document.addEventListener('keypress', (e) => {

        //gameController.keyP(e);
        isKeyDown = true;
        gameController.movement(e, spriteHurtBox);
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

    
    app.ticker.add(() => {
        characterMovement();
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
        gameController.move();
    });

    /*sprite.onFrameChange = function () {
        gameController.move();
    }*/
    

}

