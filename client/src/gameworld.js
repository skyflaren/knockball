// Contains all physical objects in the game
// Update and draw items

const DELTA = 1/177;

function GameWorld(){
    this.balls = [];
    this.winner = "";
    // this.turn = 0;

    for(let i = 0; i<8; i++){
        let x = Math.random()*460+520, y = Math.random()*460+180;
        if(x>590 && x<710 && y>260 && y<375|| x>790 && x<910 && y>260 && y<375 || x>590 && x<710 && y>460 && y<575
            || x>790 && x<910 && y>460 && y<575){
            i--;
            continue;
        }
        let flag = true;
        for(let j = 0; j<i; j++){
            if(this.overlap(new Ball(i, new Vector2(x, y), COLOR.RED), this.balls[j])){
                flag = false;
                break;
            }
        }
        if(!flag){
            i--;
            continue;
        }
        if(i%2==0){
            this.balls.push(new Ball(i, new Vector2(x, y), COLOR.RED));
        }
        else{
            this.balls.push(new Ball(i, new Vector2(x, y), COLOR.BLUE));
        }
    }

	this.holes = [
	    [610, 280, 690, 355], //top left - topleftx, toplefty, bottomrightx, bottomrighty
	    [810, 280, 890, 355], //top right
	    [610, 480, 690, 555], //bottom left
	    [810, 480, 890, 555] //bottom right
	];

	this.table = {
		TopY: 160,
		RightX: 1010,
		BottomY: 680,
		LeftX: 490,
	}
}

GameWorld.prototype.overlap = function(a, b){
    let val = Math.sqrt(Math.pow(a.position.x-b.position.x, 2) + Math.pow(a.position.y-b.position.y, 2));
    return(val<150);
}

GameWorld.prototype.handleCollisions = function (){
	for(let i = 0; i < this.balls.length; i++){
		this.balls[i].collideWith(this.table);
		for(let j = i+1; j < this.balls.length; j++){
			const firstBall = this.balls[i];
			const secondBall = this.balls[j];
			if(Math.ceil(firstBall.valid) == 0 && Math.ceil(secondBall.valid) == 0)
				firstBall.collideWith(secondBall);
		}
	}
}

GameWorld.prototype.update = function (){
	if(this.winner == ""){
		this.handleCollisions();
		let red = 0, blue = 0;

		for(let i = 0; i < this.balls.length; i++){
			if(Math.ceil(this.balls[i].valid) == 0){
				if(!this.ballsMoving()){
				// if(i % 2 == this.turn && !this.ballsMoving()){
					// console.log(this.turn);
					this.balls[i].pending(DELTA);
				}
				this.balls[i].update(DELTA);
				if(i % 2==0) red++;
				else blue++;
			}
			else if(Math.ceil(this.balls[i].valid) <= 3){
				this.balls[i].valid += 0.2;
				let vx = this.balls[i].velocity.x, vy = this.balls[i].velocity.y;
				this.balls[i].velocity = new Vector2(Math.sqrt(vx), Math.sqrt(vy));
				this.balls[i].update(DELTA);

				if(i % 2==0) red++;
				else blue++;
			}
			else{
				this.balls[i].moving = false;
			}
		}
		if(red == 0){
			this.winner = "Blue";
			log("== Blue wins! ==");
		}
		else if(blue == 0){
			this.winner = "Red";
			log("== Red wins! ==");
		}

		if(this.ballsMoving()){
			for(let i = 0; i < this.balls.length; i++){
				if(Math.ceil(this.balls[i].valid) == 0){
					let b = this.balls[i], bx = b.position.x, by = b.position.y;
					if(bx < this.table.LeftX || bx > this.table.RightX|| by < this.table.TopY || by > this.table.BottomY ){
						b.valid = 1;
					}
					for(let i = 0; i < this.holes.length; i++){
						let th = this.holes[i];
						if(bx > th[0] && by > th[1] && bx < th[2] && by < th[3]){
							b.valid = 1;
						}
					}
				}
			}
		}
	}
}

GameWorld.prototype.draw = function (){
	Canvas.drawImage(sprites.background, {x:0, y:0});
	Canvas.drawImage(sprites.platform, {x:450, y:112.5});

	for(let i = 0; i < this.balls.length; i++){
		if(!this.balls[i].selected){
			this.balls[i].draw();
		}
		else{
			this.balls[i].arrow.draw();
			this.balls[i].draw();
		}
	}
}

GameWorld.prototype.ballsMoving = function (){
	for(let i = 0; i < this.balls.length; i++)
		if(this.balls[i].moving)
			return true;
	return false;
}