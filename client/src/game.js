function Game(){
    this.selected = false;
    // this.turn = 0;
}

Game.prototype.init = function(){
    this.gameWorld = new GameWorld();
}

Game.prototype.start = function(){
    Knockball.init();
    Knockball.mainLoop();
}

Game.prototype.mainLoop = function(){
    // if(Knockball.winner == ""){
        Canvas.clear();
        Knockball.gameWorld.update();
        Knockball.gameWorld.draw();
        Mouse.reset();

        requestAnimationFrame(Knockball.mainLoop);
    // }
}

let Knockball = new Game();