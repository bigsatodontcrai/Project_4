class hurtBox {
    constructor(sprite) {
        this.sprite = sprite;
        this.height = sprite.height;
        this.width = sprite.width;
        this.xLoc = sprite.x;
        this.yLoc = sprite.y;
        this.immutable = false;
        this.vx = 0;
        this.vy = 0;
        this.rightEdge = 0;
        this.leftEdge = 0;
        this.topEdge = 0;
        this.bottomEdge = 0;
        this.rightCollision = false;
        this.leftCollision = false;
        this.upCollision = false;
        this.downCollision = false;
    }

    calculateEdges(){
        this.rightEdge = this.sprite.x + this.sprite.width;
        this.leftEdge = this.sprite.x;
        this.topEdge = this.sprite.y + this.sprite.height;
        this.bottomEdge = this.sprite.y;
        //hurtbox is updated every frame for the character while it's constant
        //for the other objects
    }

    calculateCharEdges(){
        this.rightEdge = this.sprite.x + 2 * this.sprite.width/3;
        this.leftEdge = this.sprite.x + this.sprite.width/3;
        this.topEdge = this.sprite.y + 3 * this.sprite.height/4;
        this.bottomEdge = this.sprite.y + this.sprite.height/4;
        console.log('right edge: ' + this.rightEdge);
        console.log(this.leftEdge);
        console.log(this.topEdge);
        console.log(this.bottomEdge);

    }//yes redundant function but for now to compensate for the assets offset

    updateVelocity(controller){
        this.vx = controller.vx;
        this.vy = controller.vy;
    }

    updateHurtBox(controller){
        this.calculateCharEdges();
        this.updateVelocity(controller);
    }

    updateCollisionStatements(box){
        let updatedXR = this.rightEdge + this.vx;
        let updatedXL = this.leftEdge + this.vx;
        let updatedYT = this.topEdge + this.vy;
        let updatedYD = this.bottomEdge + this.vy;

        console.log(updatedXR);
        console.log(updatedXL);
        console.log(updatedYT);
        console.log(updatedYD);

        this.rightCollision = updatedXR > box.leftEdge && updatedXR < box.rightEdge;
        this.leftCollision = updatedXL < box.rightEdge && updatedXR > box.leftEdge;
        this.upCollision = updatedYT < box.bottomEdge && updatedYT > box.topEdge;
        this.downCollision = updatedYD > box.topEdge && updatedYD < box.bottomEdge;
    }

    collide(box, controller){
        this.updateCollisionStatements(box);
        if(this.rightCollision || this.leftCollision) {
            controller.vx = 0;
        }
        if(this.upCollision){
            controller.vy = 6;
        } if (this.downCollision){
            controller.vy = 0;
        }
        return this.rightCollision || this.leftCollision || this.upCollision || this.downCollision;
    }
}