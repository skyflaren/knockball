const ARROW_ORIGIN = new Vector2(0, 17);
const MAX_LENGTH = 300;

function Arrow (x, y){
    this.x = (typeof x !== 'undefined' ? x : 0);
    this.y = (typeof y !== 'undefined' ? y : 0);
    this.rotation = 0;
    this.length = 0;
}

Arrow.prototype.update = function (){
    let opposite = Mouse.position.y - this.y;
    let adjacent = Mouse.position.x - this.x;

    this.rotation = Math.atan2(opposite, adjacent);
    this.length = Math.sqrt(Math.pow(opposite, 2) + Math.pow(adjacent, 2));

    if(this.length > MAX_LENGTH) this.length = MAX_LENGTH;
}

Arrow.prototype.draw = function (){
    Canvas.drawImageWarp(sprites.arrow, new Vector2(this.x, this.y), ARROW_ORIGIN, this.rotation, this.length);
}