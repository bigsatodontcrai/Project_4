/**
 * @file hurtbox.js sets up the class hurtBox and its functions
 */
class hurtBox {
    /**
     * class contructor
     * @param {element} sprite - PIXI sprite element
     */
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

    /**
     * calculateEdges - calculates the edges of the hurtbox
     */
    calculateEdges(){
        this.rightEdge = this.sprite.x + this.sprite.width;
        this.leftEdge = this.sprite.x;
        this.topEdge = this.sprite.y;
        this.bottomEdge = this.sprite.y + this.sprite.height;
        
        //hurtbox is updated every frame for the character while it's constant
        //for the other objects
    }

    /**
     * calculateCharEdges - calcutlates the character's edges
     */
    calculateCharEdges(){
        this.rightEdge = this.sprite.x + 0.66 * sprite.width;
        this.leftEdge = this.sprite.x + 0.26 * sprite.width;
        this.topEdge = this.sprite.y + 0.16 * sprite.height;
        this.bottomEdge = this.sprite.y + 0.97 * sprite.height;

        this.width = this.rightEdge - this.leftEdge;
        this.height = this.topEdge - this.bottomEdge;

        console.log(this.topEdge);
        console.log(this.bottomEdge);
        

    }//yes redundant function but for now to compensate for the assets offset

    /**
     * updateVelocity - updates the velocity of the controller object
     * @param {controller} controller 
     */
    updateVelocity(controller){
        this.vx = controller.vx;
        this.vy = controller.vy;
    }

    /**
     * updateHurtBox - updates the hurtbox
     * @param {controller} controller 
     */
    updateHurtBox(controller){
        this.updateVelocity(controller);
        this.calculateCharEdges();
        
    }

    /**
     * updateCollisionStatement - updates the collison statement 
     * @param {element} box - PIXI sprite element
     * @param {number} foward 
     */
    updateCollisionStatements(box, forward){

        let updatedXR;
        updatedXR = this.rightEdge + this.vx;
        let updatedXL;
        updatedXL = this.leftEdge + this.vx;
        let updatedYT;
        updatedYT = this.topEdge + this.vy;
        let updatedYD;
        updatedYD = this.bottomEdge + this.vy;

        if (box.topEdge >= this.bottomEdge) {
            if(box.topEdge <= updatedYD){
                this.downCollision = true;
            }
        } else {
            this.downCollision = false;
        }
            if(box.bottomEdge >= updatedYT && box.topEdge <= updatedYT){
                this.upCollision = true
            }
         else {
            this.upCollision = false;
        }

        if (box.leftEdge >= this.rightEdge && box.bottomEdge >= this.topEdge && forward == 1){
            if(box.leftEdge <= updatedXR && box.rightEdge <= updatedXR){
                this.leftCollision = true;
            }
        } else {
            this.leftCollision = false;
        }
        if (box.rightEdge <= this.leftEdge && box.bottomEdge >= this.topEdge && forward == -1){
            if(box.rightEdge >= updatedXL && box.leftEdge <= updatedXL){
                this.rightCollision = true;
            }
        } else {
            this.rightCollision = false;
        }
    }

    /**
     * isCollide - returns if true if there was a collision
     * @return boolean
     */
    isCollide(){
        return this.rightCollision || this.leftCollision || this.upCollision || this.downCollision;
    }

    /**
     * isCollideHori - returns true if there was a collision on the right or left side of a box
     * @return boolean
     */
    isCollideHori(){
        return this.rightCollision || this.leftCollision;
    }

    /**
     * collide - calculates if a collision happened
     * @param {element} box - PIXI sprite element
     * @param {controller} controller 
     * @param {number} Forward 
     * @return boolean
     */
    collide(box, controller, Forward){
        this.updateCollisionStatements(box, Forward);
        if(this.rightCollision && Forward == 1) {
            console.log(box);
            console.log('RIGHT');
            box.sprite.height = 13;
            controller.vx = 0;
        }
        if(this.leftCollision && Forward == -1){
            console.log(box);
            console.log('LEFT');
            box.sprite.height = 13;
            controller.vx = 0;
        }
        if(this.upCollision){
            console.log('UP');
            box.sprite.height = 13;
            controller.vy = 0;
        } 
        if (this.downCollision) {
            console.log('DOWN');
            box.sprite.height = 13;
            if(state != 'jumping') {
                controller.vy = 0;
            }
        }
        return this.isCollide();
    }
}