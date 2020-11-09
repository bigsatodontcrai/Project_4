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
    testController();
    hearts = 3;
    bottom = spriteHurtBox.bottomEdge;
    maxHeight = bottom - 16*5;
    

}

/**
 * destructFromArray - destruct array
 * @param {Array} platformSprites 
 */
function destructFromArray(platformSprites) {
    platformSprites.forEach(platform => {
        container.removeChild(platform);
    })
    constantHurtBox = [];
}

/**
 * nextLevel - move to the next level
 */
function nextLevel() {
    destructFromArray(spriteHolder[levelIndex]);
    levelIndex++;
    try {
        constructFromArray(platformArrayContainer[levelIndex]);
    } catch(error){
        alert('No More levels left! Back to square one, I guess.');
        levelIndex = 0;
        constructFromArray(platformArrayContainer[levelIndex]);
    }
    coinCounter = 0;
    
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
    
    
    if(onTheGround && state != 'jumping'){
        bottom = spriteHurtBox.bottomEdge;
        maxHeight = bottom - 16*4;
    }
    spriteHurtBox.updateHurtBox(gameController);
    if (state == 'jumping') {
        if (bottom > spriteHurtBox.bottomEdge - 2 && spriteHurtBox.bottomEdge - 2 < maxHeight) {
            gameController.vy = 1;
        }
        if(spriteHurtBox.topEdge <= 56){
            

        }
    }
    try {
        arrayOfSprites = newSpriteArray(spriteHurtBox);

    } catch(error) {
        console.log('no');
    }
    collisionDetection = [];
    arrayOfSprites.forEach(box => {
        
        let collide;
        try {
            collide = test(box)

            if (collide.collision == true && box.immutable == true) {
                gameController.vx += collide.vxMod;
                gameController.vy += collide.vyMod;
                testing++;
            }
            else if (box.immutable == false) {
                collide.collision = false;

            }
            else if (gameController.vy == 0) {

            }
            collisionDetection.push(collide);
        } catch(error){
            

        }
        
        
    });
    
      
}

/**
 * playCharacter - Allows the user to move the character
 * @return void
 */
function playCharacter(){
    const newResource = PIXI.Loader.shared.resources['./Assets/adventurer-Sheet.json'];
    setupCharacter();
        testWin();

    document.addEventListener('keydown', (e) => {
       

    });
    document.addEventListener('keypress', (e) => {

 
        isKeyDown = true;
        gameController.movement(e, spriteHurtBox);
        if((e.key = 'd' || e.key == 'a') && time <= 5/32 * app.ticker.deltaMS){
            //time += 1/32 * app.ticker.deltaMS;
        }
        
        state = updateState(gameController.vx, gameController.vy, sprite);
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
        if (e.key == 'm') {
            amAttacking = true;
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
        
         isOnGround = collisionDetection.find(box =>
            box.immutable == true && box.vyMod <= 0 && box.y >= spriteHurtBox.y
            && box.x <= spriteHurtBox.x && box.x + 16 >= spriteHurtBox.x
        );

        if (isOnGround == undefined) {
            onTheGround = false;
        } else {
            onTheGround = true;
            onGroundCheck++;
            if (onGroundCheck == 2)
            {
                onGroundy();
            }
        }
       // console.log(amAttacking);
        
        if(onTheGround == false && state != 'jumping'){
            gameController.vy = 1;
        } 
        if(damageboost > 0) {
            damageboost -= app.ticker.deltaTime;
        }
        
        characterMovement();
        
        
        if(coinCounter >= 100){
            
            let piece = constantHurtBox.findIndex(box => box.gate == true);
            let truth = enemyArray.find(enemyBox => enemyBox.dead == false);
            
            if(piece != 0 && truth == undefined){
                constantHurtBox[piece] = {
                    x: (piece % 50) * 16,
                    y: (Math.floor(piece / 50) + 1) * 16,
                    height: 16,
                    width: 16
                } 
                container.removeChild(platformSprites[piece]);
                
            } 
            
        }
        
        
        
        //console.log(Goomba);

        enemyArray.forEach(enemyHurt => {
            enemyHurt.calculateEdges();
           // console.log(enemyHurt);
            if (spriteHurtBox.AABBCollision(spriteHurtBox, enemyHurt)) {

                if (enemyHurt.dead == false && hearts > 1) {
                    container.removeChild(heartArray[hearts - 1]);
                    hearts--;

                    healthCheck();
                    gameController.vx = 0;
                    gameController.vy = 0;
                    sprite.x -= 20;

                } else if (enemyHurt.dead == false && hearts == 1) {
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

            spriteHurtBox.calculateEdges();
            if (amAttacking) {
                time += 1;
            }
           // console.log(time);
            if (enemyHurt.dead == false && spriteHurtBox.AABBCollision(spriteHurtBox, enemyHurt) && amAttacking && Forward == 1) {
                if (time >= 20) {
                    enemyHurt.dead = true;
                    container.removeChild(enemyHurt.sprite);
                    time = 0;
                }

            }
            spriteHurtBox.calculateCharEdges();
        })
        
        
        state = updateState(gameController.vx, gameController.vy, sprite)
        
        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            sprite.textures = currentTextures;
            sprite.play();
        }
        
        gameController.move();
          



        if(sprite.x >= 810){
            //alert('On to the next level!');
            if (test2Invalid == 1)
            {
                testFallOut();
                test2Invalid++;
            }
            else if (test2Invalid > 1)
            {
                sprite.x = 16;
                sprite.y = 192 - (16 * 8);
                console.log('done'); 
                let truth = enemyArray.find(enemyBox => enemyBox.dead == false);
                if(coinCounter >= 100 && truth == undefined){
                    alert('On to the next level!');
                    nextLevel();
                }
            }

            
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
        
       
        /*if(gameController.vy > 1){
            gameController.vy = gameController.vy/Math.abs(gameController.vy);
        }
        if(Math.abs(gameController.vx) > 3){
            gameController.vx = 3 * (gameController.vx / Math.abs(gameController.vx));
        }
        if(gameController.vy < -2){
            gameController.vy = 2 * gameController.vy / Math.abs(gameController.vy);
        }*/
    });

   

}

