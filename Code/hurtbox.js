class hurtBox {
    constructor(sprite) {
        this.sprite = sprite;
        this.height = this.sprite.height;
        this.width = this.sprite.width;
        this.x = sprite.x;
        this.y = sprite.y;
        this.immutable = false;
        this.vx = 0;
        this.vy = 0;
        this.rightEdge = 0;
        this.leftEdge = 0;
        this.topEdge = 0;
        this.bottomEdge = 0;
        this.downCollision = false;
    }

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

    calculateCharEdges(){
        this.x = this.sprite.x + 0.26 * this.sprite.width;
        this.y = this.sprite.y + 0.16 * this.sprite.height;

        this.rightEdge = this.sprite.x + 0.66 * this.sprite.width;
        this.leftEdge = this.sprite.x + 0.26 * this.sprite.width;
        this.topEdge = this.sprite.y + 0.16 * this.sprite.height;
        this.bottomEdge = this.sprite.y + 0.97 * this.sprite.height;

        this.x = this.leftEdge;
        this.width = 0.40 * this.sprite.width;
        this.height = 0.81 * this.sprite.height;

        

        console.log(this.topEdge);
        console.log(this.bottomEdge);
        

    }//yes redundant function but for now to compensate for the assets offset

    updateVelocity(controller){
        this.vx = controller.vx;
        this.vy = controller.vy;
    }

    updateHurtBox(controller){
        this.updateVelocity(controller);
        this.calculateCharEdges();
        
    }

    AABBCollision(rect1, rect2){
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    horiCollision(rect2){
        this.x += this.vx;
        let isCollide = this.AABBCollision(this, rect2);
        console.log('horizontal collision: ' + isCollide);
        console.log(this.vx);
        console.log(rect2);
        if(isCollide){
            if(this.vx >= 0){
                return rect2.x - (this.x + this.width)
            } else {
                return rect2.x + rect2.width - this.x;
            }
        }
        return 0;
    }


    vertCollision(rect2){
        this.y += this.vy;
        let isCollide = this.AABBCollision(this, rect2);
        console.log('vertical collision: ' + isCollide);
        if(isCollide){
            if(this.vy >= 0){
                return rect2.y - (this.y + this.height);
            } else {
                return rect2.y + rect2.height - this.y;
            }
        }
        return 0;
    }

    diagCollision(rect2){
        this.x += this.vx;
        this.y += this.vy;

        const NE = this.vx >= 0 && this.vy <= 0;
        const NW = this.vx <= 0 && this.vy <=0;
        const SE = this.vx >= 0 && this.vy >= 0;
        const SW = this.vx <= 0 && this.vy >= 0;

        if(this.AABBCollision(this, rect2)){
            if(NE) {
                return {
                    h: rect2.x - (this.x + this.width),
                    v: rect2.y + rect2.height - this.y,
                };
            } else if (NW){
                return {
                    h: rect2.x + rect2.width - this.x,
                    v: rect2.y + rect2.height - this.y
                };
            } else if(SE){
                return {
                    h: rect2.x - (this.x + this.width),
                    v: rect2.y - (this.y + this.height),
                };
            } else if (SW) {
                return {
                    h: rect2.x + rect2.width - this.x,
                    v: rect2.y - (this.y + this.height),
                };
            }
        } return {
            h: 0,
            v: 0,
        }
    }


    updateCollisionStatements(rect2, controller){
        console.log('update collision statements test');
        if(rect2.immutable == false){
            console.log('immutable test');
            if(this.horiCollision(rect2) > 0){
                controller.vx = -3;
            } else if(this.horiCollision <= 0){
                controller.vx = 3;
            } 
            return false;
        }
        let hori = this.horiCollision(rect2);
        let vert = this.vertCollision(rect2);
        let diagonal = this.diagCollision(rect2);
        if(hori != 0){
            //this.sprite.x += hori;
            controller.vx = 0;
        }
        if(vert != 0){
            //alert('collide');
            
            controller.vy = 0;
            if(vert < 0){
                this.downCollision = true;
            }
            //alert(controller.vy);

        }
        else if (diagonal.h != 0 && diagonal.v != 0){
            
            controller.vx = 0;
            if(diagonal.v < 0){
                controller.vy = 0;
            } else {
                controller.vy = 3;
            }
        }
        return hori != 0 || vert != 0|| diagonal.h != 0 || diagonal.y != 0;
        
    }


    collide(box, controller, Forward) {
        return this.updateCollisionStatements(box, controller);
    }


























    /*updateCollisionStatements(box, forward){
        

        let updatedXR;
        updatedXR = this.rightEdge + this.vx;
        let updatedXL;
        updatedXL = this.leftEdge + this.vx;
        let updatedYT;
        updatedYT = this.topEdge + this.vy;
        let updatedYD;
        updatedYD = this.bottomEdge + this.vy;

        /*console.log('new rightward edge ' + updatedXR);
        console.log('new leftward edge ' + updatedXL);
        console.log('new bottom edge ' + updatedYD);
        console.log('new top edge ' + updatedYT);

        if (box % 8 < 8) {
            return false;
        }

        /*this.downCollision = box.topEdge >= this.bottomEdge && box.topEdge <= updatedYD;
        this.upCollision = box.bottomEdge >= UpdatedYT && box.topEdge <= updatedYT;
        this.leftCollision = box.leftEdge >= this.rightEdge && box.rightEdge <= updatedXR && forward == -1;
        this.rightCollision = box.rightEdge <= this.leftEdge && box.bottomEdge >= this.topEdge && forward == 1
        && box.rightEdge >= updatedXL && box.letEdge <= updatedXL;
        
        return true;
    }

    isCollide(){
        return this.rightCollision || this.leftCollision || this.upCollision || this.downCollision;
    }

    isCollideHori(){
        return this.rightCollision || this.leftCollision;
    }

    collide(box, controller, Forward){
        this.updateCollisionStatements(box, controller);
        if(box == 0 || 1){
            this.upCollision = false;
            return this.isCollide();
        }
        if(box == 2 || 3){
            this.rightCollision = false;
            return this.isCollide();
        }
        if(box == 4 || 5){
            this.downCollision = false;
            return this.isCollide();
        }
        if(box == 6||7){
            this.leftCollision = false;
            return this.isCollide();
        }
        
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
        } else if(state == 'jumping'){
            controller.vy = -3;
            return this.isCollide();
        }
        else if(state != 'jumping'){
            controller.vy = 1;
        }
        return this.isCollide();
    }*/
}