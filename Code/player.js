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
 //   console.log('its lit');

    sprite = sprite;

    sprite.height = 35;
    sprite.width = 47;
    sprite.anchor.set(0.5, 0);
    sprite.x = 16;
    sprite.y = 192 - (16*8);
    sprite.play();
    sprite.animationSpeed = 0.1;

    spriteHurtBox = new hurtBox(sprite);
    spriteHurtBox.calculateCharEdges();
    gameController = new controller(sprite);
    

}

/**
 * test - tests the collision
 * @param {elemet} box - PIXI sprite element
 */
function test(box){
    let thing = false;
    thing = spriteHurtBox.collide(box, gameController, Forward);
    
}

/**
 * characterMovement - Controls charcters movement
 * @return void
 */
function characterMovement(){
    //console.log(state);
    console.log(spriteHurtBox);
    if (state != 'jumping') {
        gameController.vy = 3;
    }
    spriteHurtBox.updateHurtBox(gameController);
    try {
        arrayOfSprites = newSpriteArray(spriteHurtBox);

    } catch(error) {
        console.log('no');
    }

    
    arrayOfSprites.forEach(box => test(box));
    
      
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

    
    app.ticker.add(() => {
        characterMovement();
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
        gameController.move();


        if(sprite.x + spriteHurtBox.width/2 == 800){
            alert('congratulations! you beat the demo');
        }

        if(spriteHurtBox.bottomEdge >= 240 || hearts == 0){
            alert('you died.');
            sprite.x = 16;
            sprite.y = 192 - (16*8);
        }
        
        if(3 > hearts > 0){
            container.removeChild(heartArray[hearts - 1]);
        }
        

        
    });

    /*sprite.onFrameChange = function () {
        gameController.move();
    }*/
    

}

