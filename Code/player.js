/**
 * @file player.js manages the character and how it responds to the player's commands
 */

 /**
  * setupCharacter - Sets up the character
  * @return void
  */
function setupCharacter(){
    resource = PIXI.Loader.shared.resources["./Assets/adventurer-Sheet.json"].spritesheet;
    sprite = new PIXI.AnimatedSprite(resource.animations.idle);
    console.log('its lit');

    sprite = sprite;

    sprite.height = 35;
    sprite.width = 47;
    sprite.x = 16;
    sprite.y = 192 - (16*6);
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

/**
 * characterMovement - Controls charcters movement
 * @return void
 */
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
        
    gameController.move();

        
    
}

/**
 * playCharacter - Allows the user to move the character
 * @return void
 */
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

    
    sprite.onFrameChange = function () {
        characterMovement();
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
    }
    

}

