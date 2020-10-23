class controller {
    constructor(sprite){
        this.sprite = sprite;
        this.hori = sprite.x;
        this.vert = sprite.y;
        this.vx = 0;
        this.vy = 0;
        this.curr = [];
        //this.time = 0;
    }

    movement (e) {
        this.curr.push(e.key);
        if(e.key == 'a'){
            this.vx = -3;
            return false;
        } if (e.key == 'd'){
            this.vx = 3;
            return false;
        } if (e.key == 'w'){
            if (this.sprite.y > this.vert - 100)
            {
                console.log('WHATUP');
                this.vy = -6;
                return false;
            } 
            this.vy = 6;
            return true;
        } 
        return true;
         
    }

    move(){
        this.sprite.x += this.vx;
        
        if (this.sprite.y > 160 - 100) {
            this.sprite.y += this.vy
        } else if (this.sprite.y == 160 - 100) {
            this.sprite.y += this.vy;
        } if (this.sprite.y == 176) {
            this.vy = 0;
        }
        return true;
    }

    moveLeft(){
        this.sprite.x -= this.vx;
        return true;
    }

    Jump(){
        this.sprite.y -= this.vy;
        //this.sprite.y += this.vy;
        return true;
    }

    keyP(e){
        if (e.key == 'a') {
            Forward = -1;
            state = 'running';
            this.sprite.animationSpeed = 0.7;
        } if (e.key == 'd') {
            Forward = 1;

            state = 'running';
            this.sprite.animationSpeed = 0.7;

        } if (e.key == 'w') {
            this.sprite.animationSpeed = 0.7;
            state = 'jumping';
        }

        let currentTextures = newResource.spritesheet.animations[state];
        if (sprite.textures != currentTextures) {
            this.sprite.textures = currentTextures;
            sprite.play();
        }
        this.movement(e);
    }

    keyU(e){

    }

    clearList(){
        this.curr = [];
    }
}

function keypress(e) {
    controller.keyP(e);
}

function keydown(e) {

}

function keyup(e) {

}



