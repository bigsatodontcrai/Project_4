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
        this.height = this.sprite.height;
        this.width = this.sprite.width;
        this.x = sprite.x;
        this.y = sprite.y;
        this.nextX = sprite.x;
        this.nextY = sprite.y;
        this.immutable = false;
        this.vx = 0;
        this.vy = 0;
        this.rightEdge = 0;
        this.leftEdge = 0;
        this.topEdge = 0;
        this.bottomEdge = 0;
        this.downCollision = false;
        this.horizontalCollision = false;
        this.verticalCollision = false;
        this.diagonalCollision = false;
        this.upCollision = false;
        this.rightCollision = false;
        this.leftCollision = false;
    }

    /**
     * calculateEdges - calculates the edges of the hurtbox
     */
    calculateEdges(){
        this.rightEdge = this.sprite.x + this.sprite.width;
        this.leftEdge = this.sprite.x;
        this.topEdge = this.sprite.y;
        this.bottomEdge = this.sprite.y + this.sprite.height;

        this.y = this.sprite.y;
        this.x = this.sprite.x;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        
        //hurtbox is updated every frame for the character while it's constant
        //for the other objects
    }

    /**
     * calculateCharEdges - calcutlates the character's edges
     */
    calculateCharEdges(){
        //this.x = this.sprite.x + 0.26 * this.sprite.width;
        //this.y = this.sprite.y + 0.16 * this.sprite.height;

        this.width = 0.34 * this.sprite.width;
        this.height = 0.7837 * this.sprite.height;

        this.rightEdge = this.sprite.x + 0.5 * this.width;
        this.leftEdge = this.sprite.x - 0.5 * this.width;
        this.topEdge = this.sprite.y + (6/37) * this.sprite.height;
        this.bottomEdge = this.sprite.y + (36/37) * this.sprite.height;


        this.x = this.leftEdge;
        this.y = this.topEdge;

        this.nextX = this.x;
        this.nextY = this.y;
        

        

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
        this.calculateCharEdges();
        this.updateVelocity(controller);
        this.downCollision = false;
        
    }

    /**
     * AABBCollision - checks to see if any two rectables in the same axis collide
     * @param {hurtBox} rect1 
     * @param {element} rect2 - PIXI sprite element 
     * @return boolean
     */
    AABBCollision(rect1, rect2){
        return (
            rect1.nextX < rect2.x + rect2.width &&
            rect1.nextX + rect1.width > rect2.x &&
            rect1.nextY < rect2.y + rect2.height &&
            rect1.nextY + rect1.height > rect2.y
        );
    }

    /**
     * horiCollision - controlls collision on the horizontal part of the box
     * @param {element} rect2 - PIXI sprite element 
     * @return number
     */
    horiCollision(rect2){
        this.nextX = this.x + this.vx;
        let isCollide = this.AABBCollision(this, rect2);
        if(rect2.immutable == true)
        {
            console.log("horizontal collision: " + isCollide);
            console.log(rect2);
        }
        
        if(isCollide){
            this.horizontalCollision = true;
            if(this.vx >= 0){
                return rect2.x - (this.nextX + this.width)
            } else {
                return rect2.x + rect2.width - this.nextX;
            }
        }
        this.horizontalCollision = false;
        return 0;
    }

    /**
     * vertCollision - controlls collision on the vertical part of the box
     * @param {element} rect2 - PIXI sprite element 
     * @return number
     */
    vertCollision(rect2){
        this.nextY = this.y + this.vy;
        let isCollide = this.AABBCollision(this, rect2);
        
        if(isCollide){
            this.verticalCollision = true;
            if(this.vy >= 0){
                return rect2.y - (this.nextY + this.height);
            } else {
                
                return rect2.y + rect2.height - this.nextY;
            }
            
        }
        this.verticalCollision = false;
        return 0;
    }

      /**
     * diagCollision - controlls collision the occurs diagonally
     * @param {element} rect2 - PIXI sprite element 
     * @return number - horizontal number and vertical number
     */
    diagCollision(rect2){
        this.nextX = this.x + this.vx;
        this.nextY = this.y + this.vy;

        const NE = this.vx >= 0 && this.vy <= 0;
        const NW = this.vx <= 0 && this.vy <= 0;
        const SE = this.vx >= 0 && this.vy >= 0;
        const SW = this.vx <= 0 && this.vy >= 0;

        if(this.AABBCollision(this, rect2)){
            this.diagonalCollision = true;
            if(NE) {
                
                return {
                    h: rect2.x - (this.nextX + this.width),
                    v: rect2.y + rect2.height - this.nextY,
                };
            } else if (NW){
                return {
                    h: rect2.x + rect2.width - this.nextX,
                    v: rect2.y + rect2.height - this.nextY,
                };
            } else if(SE){
                return {
                    h: rect2.x - (this.nextX + this.width),
                    v: rect2.y - (this.nextY + this.height),
                };
            } else if (SW) {
                return {
                    h: rect2.x + rect2.width - this.nextX,
                    v: rect2.y - (this.nextY + this.height),
                };
            }
        } this.diagonalCollision = false;
        
        return {
            h: 0,
            v: 0,
        }
    }


    /**
     * checkImmutable - checks whether the hurtbox is air or a tile
     * @param {element} rect2 - PIXI sprite element
     * @param {number} hori 
     * @param {number} vert 
     * @param {number} diagonal 
     * @param {controller} controller 
     * @return boolean
     */
    checkImmutable(rect2, hori, vert, diagonal, controller){
        if(rect2.immutable){
            return false;
        } else {
            if(vert < 0){
                //this.downCollision = false;
                //controller.vy = 3;
            }
            if(vert > 0){
                //controller.vy = controller.vy;
            }
            if(hori < 0){
                //controller.vx = controller.vx;
            }
            if(diagonal.h > 0 && diagonal.v > 0){
                controller.vx = controller.vx;
                //controller.vy = 3;
            }
            if(diagonal.h < 0 && diagonal.v > 0){
                controller.vx = controller.vx;
                //controller.vy = 3;
            }
            return true;
        }
    }

    /**
     * updateCollisionStatements - updates the collison statements
     * @param {element} rect2 - PIXI sprite element
     * @param {controller} controller 
     * @return boolean
     */
    updateCollisionStatements(rect2, controller){
        //console.log('update collision statements test');
        
        let hori = this.horiCollision(rect2);
        let vert = this.vertCollision(rect2);
        let diagonal = this.diagCollision(rect2);
        console.log(hori);
        console.log(vert);
        console.log(diagonal);

        if(this.checkImmutable(rect2, hori, vert, diagonal, controller)){
            return false;
        }

        if(hori != 0){
            controller.vx = 0;
            this.vx = 0;
            hearts--;
        }
        
        
        if(vert != 0 && this.vx == 0){
            if(vert < 0) {
                this.downCollision = true;
                //alert('downCollision');
                controller.vy = 0;
            } else if (vert > 0){
                this.upCollision = true;
                controller.vy = 0;
            }
            hearts--;
            return true;
        }
        if (this.vx != 0 && this.vy != 0 && diagonal.h != 0 && diagonal.v != 0) {
            console.log('diagonal collision');
            //controller.vx = 0;
            if (diagonal.v < 0) {
                this.downCollision = true;
                controller.vy = -controller.vy;
                controller.vx = -controller.vx;
                //controller.vx = 0;

            } else {
                //controller.vx = 0;
                controller.vy = -controller.vy;
                controller.vx = -controller.vx;
                this.downCollision = true;
            }
            if (diagonal.v > 0 && diagonal.h < 0){
                this.rightCollision = true;
                controller.vy = -controller.vy;
                controller.vx = -controller.vx;
            } else if (diagonal.v < 0 && diagonal.h > 0){
                this.rightCollision = false;
                controller.vy = -controller.vy;
                controller.vx = -controller.vx;
                
            }
            hearts--;


        }
        


        /*if(rect2.immutable == false){
            if(hori != 0){
                gameController.vx = gameController.vx;
            }
            if(vert >= 0){
                gameController.vy = 3;
                return false;
            }
            if(diagonal.h > 0 && diagonal.v > 0){
                gameController.vx = gameController.vx;
                //gameController.vy = 3;
                return false;
            }
            if(diagonal.h < 0 && diagonal.v > 0){
            
                gameController.vx = gameController.vx;
                //gameController.vy = gameController.vy;
                return false;
            }
        }


        if(hori != 0 && this.vy == 0){
            //controller.vx = 0;
        }
        if(vert != 0 && this.vx == 0){
            //alert('collide');
            if(vert < 0){
                controller.vy = 0;
                this.downCollision = true;
                console.log('down collision');
            } else if (vert > 0){
                //alert('up collision');
                //controller.vy = -3;
            }
            //alert(controller.vy);

        }
        if (this.vx != 0 && this.vy != 0 && diagonal.h != 0 && diagonal.v != 0){
            console.log('diagonal collision');
            //controller.vx = 0;
            if(diagonal.v < 0){
                this.downCollision = true;
                controller.vy = 0;
                //controller.vx = 0;
                
            } else {
                //controller.vx = 0;
                controller.vy = 0;
                this.downCollision = true;
            }
            
            
        }*/
        return hori != 0 || vert != 0|| diagonal.h != 0 || diagonal.y != 0;
        
    }

   

    /**
     * collide - calculates if a collision happened
     * @param {element} box - PIXI sprite element
     * @param {controller} controller 
     * @param {number} Forward 
     * @return boolean
     */


    collide(box, controller, Forward) {
        return this.updateCollisionStatements(box, controller);
    }



}