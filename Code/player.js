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
            console.log('nice');

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
 
        let isOnGround = collisionDetection.find(box =>
            box.immutable == true && box.vyMod <= 0 && box.y >= spriteHurtBox.y
            && box.x <= spriteHurtBox.x && box.x + 16 >= spriteHurtBox.x
        );

        if (isOnGround == undefined) {
            onTheGround = false;
        } else {
            onTheGround = true;
        }
        console.log(amAttacking);
        
        if(onTheGround == false && state != 'jumping'){
            gameController.vy = 1;
        } 
        if(damageboost > 0) {
            damageboost -= app.ticker.deltaTime;
        }
        
        characterMovement();
        
        
        
        
        
        //console.log(Goomba);

        enemyArray.forEach(enemyHurt => {
            enemyHurt.calculateEdges();
            console.log(enemyHurt);
            if (spriteHurtBox.AABBCollision(spriteHurtBox, enemyHurt)) {

                if (enemyHurt.dead == false && hearts > 1) {
                    container.removeChild(heartArray[hearts - 1]);
                    hearts--;
                    alert('that enemy has taken your health.');
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
            console.log(time);
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
          



        if(sprite.x >= 800){
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
        
       
        if(gameController.vy > 1){
            alert('what?!');
        }

        
    });

   

}

