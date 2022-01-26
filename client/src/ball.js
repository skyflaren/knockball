const BALL_ORIGIN = new Vector2(17.5, 25);
const BALL_DIAMETER = 34;
const BALL_RADIUS = BALL_DIAMETER/2;
const FRICTION = 0.97
const POWER_CONSTANT = 10;


function Ball (id, position, color){
    this.id = id;
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.selected = false;
    this.arrow = new Arrow(this.position.x, this.position.y);
    this.valid = 0;
}


Ball.prototype.pending = function (delta){
    if(Mouse.left.down){
        if(!Game.selected & this.clicked()){
            this.arrow = new Arrow(this.position.x, this.position.y);
            Game.selected = true;
            this.selected = true;
            this.arrow.draw();
        }
        else if(Game.selected && this.selected){
            this.arrow.update();
            this.arrow.draw();
        }
    }
    else if(this.selected){
        onSendMove(this.id, this.arrow.length, this.arrow.rotation);
        // this.shoot(this.arrow.length*100, this.arrow.rotation);
        this.shoot(this.arrow.length*POWER_CONSTANT, this.arrow.rotation);
        
        this.selected = false;
        Game.selected = false;
        // GameWorld.turn = (GameWorld.turn == 1 ? 0 : 1);
        // console.log(GameWorld.turn);
    }
    this.arrow.update();
}


Ball.prototype.update = function (delta){
    this.position.addTo(this.velocity.mult(delta));
    this.velocity = this.velocity.mult(FRICTION);

    if(this.velocity.length() < 5){
        this.velocity = new Vector2();
        this.moving = false;
    }
}


Ball.prototype.draw = function (){
    if(Math.ceil(this.valid) == 0) Canvas.drawImage(this.sprite[Math.ceil(this.valid)], this.position, BALL_ORIGIN);
    else if(Math.ceil(this.valid) <= 3){
        Canvas.drawImage(this.sprite[Math.ceil(this.valid)], this.position, BALL_ORIGIN);
    }
}

Ball.prototype.shoot = function (power, rotation){
    this.velocity = new Vector2(Math.cos(rotation)*power, Math.sin(rotation)*power);
    this.moving = true;
}

Ball.prototype.collideWith = function (object){
    if(object instanceof Ball){
        this.collideWithBall(object);
    }
    else{
        this.collideWithBoundary(object);
    }
}

Ball.prototype.clicked = function (){
    let mx = Mouse.position.x, tx = this.position.x, my = Mouse.position.y, ty = this.position.y;
    return (mx <= tx+BALL_RADIUS && mx >= tx-BALL_RADIUS && my <= ty+BALL_RADIUS && my >= ty-BALL_RADIUS);
}



Ball.prototype.collideWithBoundary = function (table){
    if(!this.moving){
        return;
    }
    let collided = false, tx = this.position.x, ty = this.position.y;
    if(ty <= table.TopY + BALL_RADIUS && tx > 75+table.LeftX && tx < 445+table.LeftX){
        this.velocity = new Vector2(this.velocity.x, Math.abs(this.velocity.y));
        collided = true;
    }
    if(this.position.x >= table.RightX - BALL_RADIUS && ty>75+table.TopY && ty<445+table.TopY){
        this.velocity = new Vector2(-Math.abs(this.velocity.x), this.velocity.y);
        collided = true;
    }
    if(this.position.y >= table.BottomY - BALL_RADIUS && tx > 75+table.LeftX && tx < 445+table.LeftX){
        this.velocity = new Vector2(this.velocity.x, -Math.abs(this.velocity.y));
        collided = true;
    }
    if(this.position.x <= table.LeftX + BALL_RADIUS && ty>75+table.TopY && ty<445+table.TopY){
        this.velocity = new Vector2(Math.abs(this.velocity.x), this.velocity.y);
        collided = true;
    }
}



Ball.prototype.collideWithBall = function (ball){
    const tmp = ball.position;
    const n = this.position.subtract(tmp);    // Normal vector
    const dist = n.length();

    if(dist > BALL_DIAMETER){
        return;
    }

    const mtd = n.mult((BALL_DIAMETER - dist)/dist);    //Minimum translation distance
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.subtract(mtd.mult(1/2));


    const un = n.mult(1/n.length());    // Find unit normal vector
    const ut = new Vector2(-un.y, un.x);    // Find unit tangent vector

    const v1n = un.dot(this.velocity);  // Project velocities onto the unit normal & tangent vectors
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    let v1nTag = v2n;   // New normal velocities
    let v2nTag = v1n;

    v1nTag = un.mult(v1nTag);   // Convert scalar normal and tangential velocities into vectors
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    this.velocity = v1nTag.add(v1tTag); // Update velocities
    ball.velocity = v2nTag.add(v2tTag);
    this.moving = true;
    ball.moving = true;
}