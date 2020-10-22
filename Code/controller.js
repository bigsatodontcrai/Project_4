class controller {
    constructor(sprite){
        this.sprite = sprite;
        this.hori = sprite.x;
        this.vert = sprite.y;
        this.vx = 0;
        this.vy = 0;
        //this.time = 0;
    }

    movement (e) {
        
        if(e.key == 'a'){
            this.vx = -3;
        } else if (e.key == 'd'){
            this.vx = 3;
        } else if (e.key == 'w'){
            if (this.sprite.y > 160 - 50)
            {
                this.vy = -4;
            } else {
                this.vy = 4;
            }
        } 
        //this.time = amount;
        

         
    }

    move(){
        this.sprite.x += this.vx;
        
        if (this.sprite.y > 160 - 50) {
            this.sprite.y += this.vy
        } else {
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

//in 6 frames, i want him to go y = y + 24 meaning each frame he goes up 24/6
//meaning every frame, he goes up 4. his velocity is thus 4 px/frame
/*

frame 1: 4 px
frame 2: 8 px
frame 3: 12 px
frame 4: 16 px
frame 5: 20 px
frame 6: 24 px

the time each frame takes = 1 / 60 seconds

After 6 frames, i want him to fall down to the ground from gravity
in 6 frames going backwards from 24 down to 0. 
meaning his velocity is then -4 px/frame



*/
}

