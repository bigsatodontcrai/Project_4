
app.view.setAttribute('tabindex', 0);
const tileSize = 16;
const SCALE = 2;





class Keyboard {
    constructor() {
        this.pressed = {};
    }

    watch(element) {
        element.addEventListener('keydown', (e) => {
            this.pressed[e.key] = true;
            console.log(e.key);
        });

        element.addEventListener('keyup', (e) => {
            this.pressed[e.key] = false;
        });
    }

}

let kb = new Keyboard();
kb.watch(app.view);

let collisionMap = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1]

let map = { height: 15, width: 50 };

function testCollision(worldX, worldY) {
    let mapX = Math.floor(worldX / tileSize);
    let mapY = Math.floor(worldY / tileSize);

    return collisionMap[mapY * map.width + mapX];
}

let Goomba = new PIXI.Sprite.from("./Assets/GoombaSquare.png");
app.stage.addChild(Goomba)

let goombaStat = {
    x: 0, y: 0,
    vx: 0, vy: 0,
    direction: 0,
    jumped: false,
}

let inAir = true;


app.ticker.add((time) => {
    Goomba.x = goombaStat.x;
    Goomba.y = goombaStat.y + 16;

    goombaStat.vy = Math.min(5, goombaStat.vy + 1)

    if (goombaStat.vx > 0) {
        goombaStat.vx -= 1;
    }
    if (goombaStat.vx < 0) {
        goombaStat.vx += 1;
    }

    let touchingGround = testCollision(
        goombaStat.x + 2,
        goombaStat.y + 1)
        ||
        testCollision(goombaStat.x + tileSize - 3,
            goombaStat.y + 1);

    if (goombaStat.vy > 0) {
        for (let i = 0; i < goombaStat.vy; i++) {
            let testX1 = goombaStat.x + 2;
            let testX2 = goombaStat.x + tileSize - 3;
            let testY = goombaStat.y + tileSize * 2;
            // console.log(Goomba.y + 80)
            if (testY > map.height * tileSize || testCollision(testX1, testY) || testCollision(testX2, testY)) {
                goombaStat.vy = 0;
                break;
            }
            goombaStat.y = goombaStat.y + 1;
        }
    }

    if (goombaStat.vy < 0) {
        for (let i = goombaStat.vy; i < 0; i++) {
            let testX1 = goombaStat.x + 2;
            let testX2 = goombaStat.x + tileSize - 3;
            let testY = goombaStat.y + tileSize - 16;
            if (testCollision(testX1, testY) || testCollision(testX2, testY)) {
                goombaStat.vy = 0;
                break;
            }
            goombaStat.y = goombaStat.y - 1;
        }
    }


    if (goombaStat.vx > 0) {
        for (let i = 0; i < goombaStat.vx; i++) {
            let testX = goombaStat.x + tileSize - 2;
            let testY1 = goombaStat.y + 5;
            let testY2 = goombaStat.y + tileSize;
            let testY3 = goombaStat.y + tileSize * 2 - 1; //
            if (testX >= map.width * tileSize || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
                goombaStat.vx = 0;
                break;
            }
            goombaStat.x = goombaStat.x + 1;
        }
    }

    //console.log(Goomba.y)

    if (goombaStat.vx < 0) {
        goombaStat.direction = 1;
        for (let i = goombaStat.vx; i < 0; i++) {
            let testX = goombaStat.x + 1;
            let testY1 = goombaStat.y + 5;
            let testY2 = goombaStat.y + tileSize;
            let testY3 = goombaStat.y + tileSize * 2 - 1; //
            if (testX < 0 || testCollision(testX, testY1) || testCollision(testX, testY2) || testCollision(testX, testY3)) {
                goombaStat.vx = 0;
                break;
            }
            goombaStat.x = goombaStat.x - 1;
        }
    }

    //console.log(Goomba.x)

    if (kb.pressed.ArrowRight) {
        goombaStat.vx = 2;
    }
    if (kb.pressed.ArrowLeft) {
        goombaStat.vx = -2;
    }


    if (kb.pressed.ArrowUp) {
        goombaStat.vy = -5;

    }
});

