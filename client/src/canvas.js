
function Canvas2D(){
    this._canvas = document.getElementById('screen');
    this._canvasContext = this._canvas.getContext('2d');
}

Canvas2D.prototype.clear = function(){
    this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
}

Canvas2D.prototype.drawImage = function(image, position, origin, rotation = 0){
    if(!position){
        position = new Vector2();
    }
    if(!origin){
        origin = new Vector2();
    }
    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -origin.x, -origin.y);
    this._canvasContext.restore();
}

Canvas2D.prototype.drawImageWarp = function(image, position, origin, rotation = 0, warp){
    if(!position){
        position = new Vector2();
    }
    if(!origin){
        origin = new Vector2();
    }
    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image, -origin.x, -origin.y, warp, image.height);
    this._canvasContext.restore();
}

let Canvas = new Canvas2D();