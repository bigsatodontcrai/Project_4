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

    sprite = sprite;

    sprite.height = 35;
    sprite.width = 47;
    sprite.anchor.set(0.5, 0);
    sprite.x = 32;
    sprite.y = 192 - (16*4);
    sprite.play();
    sprite.animationSpeed = 0.1;

    spriteHurtBox = new hurtBox(sprite);
    spriteHurtBox.calculateCharEdges();
    gameController = new controller(sprite);
    hearts = 3;

    bottom = spriteHurtBox.bottomEdge;
    maxHeight = bottom - 16*5;
    

}

/**
 * test - tests the collision
 * @param {elemet} box - PIXI sprite element
 */
function test(box){
    return box.collide(spriteHurtBox, gameController, Forward);
    
}

/**
 * characterMovement - Controls charcters movement
 * @return void
 */
function characterMovement(){
    
    if(state == 'jumping' && spriteHurtBox.downCollision == true){
        spriteHurtBox.downCollision = false;
    }
    if(spriteHurtBox.downCollision && state != 'jumping'){
        bottom = spriteHurtBox.bottomEdge;
        maxHeight = bottom - 16*5;
    }
   if (gameController.vy <= 0 && state != 'jumping'){
        gravity = false;
    } else if (state != 'jumping'){
        gravity = true;
    } 
    spriteHurtBox.updateHurtBox(gameController);
    if (state == 'jumping') {
        if (bottom > spriteHurtBox.bottomEdge - 2 && spriteHurtBox.bottomEdge - 2 < maxHeight) {

        }
        if(spriteHurtBox.topEdge <= 56){
            

        }
    }
    try {
        arrayOfSprites = newSpriteArray(spriteHurtBox);

    } catch(error) {
        console.log('no');
    }

    arrayOfSprites.forEach(box => {
        let collide = test(box);
        //console.log(collide);
        if (collide.collision == true) {
            gameController.vx += collide.vxMod;
            gameController.vy += collide.vyMod;
            if (collide.vxMod || collide.vyMod != 0) {
                //alert('alert');
            }
            //console.log('list');
            //console.log(collide);
            //console.log(gameController.vx);
            console.log(gameController.vy);
            testing++;

        }
    });
    
    collisionDetection = [];
    testing = 0;
      
}

/**
 * playCharacter - Allows the user to move the character
 * @return void
 */
function playCharacter(){
    const newResource = PIXI.Loader.shared.resources['./Assets/adventurer-Sheet.json'];
    setupCharacter();

    document.addEventListener('keydown', (e) => {
       

    });
    document.addEventListener('keypress', (e) => {

 
        isKeyDown = true;
        gameController.movement(e, spriteHurtBox);
        if((e.key = 'd' || e.key == 'a') && time <= 5/32 * app.ticker.deltaMS){
            time += 1/32 * app.ticker.deltaMS;
        }
        
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
        if (e.key == 'k') {
            currentTextures = newResource.spritesheet.animations['running'];
            
            if (sprite.textures != currentTextures) {
                sprite.textures = currentTextures;
                console.log(sprite.textures);
                sprite.animationSpeed = 0.5;
                sprite.play();
                console.log('done');
            }
        }


    });
    document.addEventListener('keyup', (e) => {
        if(time != 0){
            time = 0;
            gameController.vxmax = 0;
        }
        gameController.stopMovement(e, spriteHurtBox);
        state = updateState(gameController.vx, gameController.vy, sprite);
        sprite.textures = newResource.spritesheet.animations[state];
        sprite.play();

    });

   

    
    app.ticker.add(() => {
        console.log(gameController.vy);
        console.log(spriteHurtBox.touchingGround);
        if(spriteHurtBox.touchingGround == false){
            gameController.vy = 2;
        }
        if(damageboost > 0) {
            damageboost -= app.deltaTime;
        }
        console.log(gameController.vy);
        characterMovement();

        
        enemyHurtBox.calculateEdges();
        

        if(damageboost <= 0 && spriteHurtBox.AABBCollision(spriteHurtBox, enemyHurtBox)){
            if(hearts > 1)
            {
                container.removeChild(heartArray[hearts - 1]);
                hearts--;
                alert('that enemy has taken your health.');
                gameController.vx = 0;
                gameController.vy = 0;
                sprite.x += (10 * spriteHurtBox.horiCollision(enemyHurtBox));
                
            } else if(hearts == 1){
                alert('you died.');
                gameController.vx = 0;
                gameController.vy = 0;
                sprite.x = 16;
                sprite.y = 192 - (16 * 8);
                hearts = 3;
                for (let i = 0; i < 3; i++) {
                    heartArray[i] = new PIXI.Sprite.from('./Assets/heart.png');
                    heartArray[i].height = 8;
                    heartArray[i].width = 8;
                    heartArray[i].x = 16 * i + 3;
                    heartArray[i].y = 4;
                    container.addChild(heartArray[i]);
                }
                reset++;
            }
        }

        
        state = updateState(gameController.vx, gameController.vy, sprite)
        
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
        
        gameController.move();
        console.log(gameController.vy);    



        if(sprite.x + spriteHurtBox.width/2 >= 800){
            alert('congratulations! you beat the demo');
            if (hearts == 3 && reset == 0) {
                alert('All hearts and 0 resets! You got an A+!')
            } else if (hearts == 3 && 2 > reset > 0 || (hearts == 2 && reset < 2)) {
                alert('All hearts and ' + reset + ' resets! You get a B')
            } else if (hearts == 2 && reset == 3 || reset == 4) {
                alert('2 hearts and ' + reset + ' resets! You get a C');
            } else if (hearts == 1 && reset == 0) {
                alert('You barely got it in one try. You can have a B+');
            } else if (hearts == 1 && 2 > reset > 0){
                alert('hmmm a few resets and a missing heart. You get a C');
            } else if (hearts == 1 && reset == 3){
                alert('You barely deserve the congratulations. You get a D!');
            } else if (hearts == 1 && reset > 3){
                alert('Sike. You get an F! 1 heart left and ' + reset + 'resets?! That is more than 3!');
            } else {
                alert('You get an F idk');
            }
            sprite.x = 16;
            sprite.y = 192 - (16 * 8);
            
        }

        if(spriteHurtBox.bottomEdge >= 16*15){
            alert('you died.');
            sprite.x = 16;
            sprite.y = 192 - (16*8);
            reset++;
            if(hearts == 0){
                for (let i = 0; i < 3; i++) {
                    heartArray[i] = new PIXI.Sprite.from('./Assets/heart.png');
                    heartArray[i].height = 8;
                    heartArray[i].width = 8;
                    heartArray[i].x = 16 * i + 3;
                    heartArray[i].y = 4;
                    container.addChild(heartArray[i]);
                }
            }
        }
        
       
        

        
    });

   

}

