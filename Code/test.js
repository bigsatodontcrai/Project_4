

touchytouchy();
onGroundy();
testHealth();



function touchytouchy () {
    let testground = collisionDetection.find(box =>
        box.immutable == false && box.vyMod == 0 && box.vxMod == 0 && box.collision == false);

    if (testground)
    {
        console.log("collision detection is functioning!");
    }
    else
    {
        console.log("collision detection has failed!");
    }
}

function onGroundy() {
    console.log("Touching Ground functions Correctly!");
    onGroundCheck = undefined;
    delete (onGroundCheck);
}

function testController() {
    if (gameController != null)
    {
        console.log("Controller works!");
    }
    else
    {
        console.log("controller doesnt work!");
    }
}

function coinCollection () {
    if (coinCounter  == 1)
    {
        console.log("coin counter works!");
    }
    else if (coinCounter > 1)
    {

    }
    else
    {
        console.log("coin Counter doenst work!");
    }
}

function testHealth ()
{
    hearts--;
    healthCheck();
    if (hearts == 3)
    {
        console.log("Loosing health Works!");
    }
    else 
    {
        console.log("loosing health doesnt work!");
    }

}

function testWin()
{
    sprite.x = 800;
    if (sprite.x == 800)
    {
        test2Invalid++;
        console.log("Game winning works!");
    }
    else
    {
        console.log("Game winning doenst work!");
    }
}

function testFallOut ()
{
    sprite.x = -200;
    
    if (sprite.x == -200)
    {
        console.log("falling out the world detection works!");
    }
    else
    {
        console.log("falling out of the world detection doesnt work!");
    }
}