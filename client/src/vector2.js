function Vector2(x, y){
	this.x = (typeof x !== 'undefined' ? x : 0);
	this.y = (typeof y !== 'undefined' ? y : 0);
}

Vector2.prototype.copy = function (){
	return new Vector2(this.x, this.y);
}

Vector2.prototype.add = function (vector){
	return new Vector2(this.x + vector.x, this.y + vector.y);
}

Vector2.prototype.subtract = function (vector){
	return new Vector2(this.x - vector.x, this.y - vector.y);
}

Vector2.prototype.addTo = function (vector){
	this.x += vector.x;
	this.y += vector.y;
}

Vector2.prototype.mult = function (scalar){
	return new Vector2(scalar*this.x, scalar*this.y);
}

Vector2.prototype.dot = function (vector){
	return (this.x*vector.x + this.y*vector.y);
}

Vector2.prototype.length = function (){
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
}