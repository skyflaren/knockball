let sprites = {};
let assetsStillLoading = 0;

function assetsLoadingLoop(callback){
    if(assetsStillLoading){
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else{
        callback();
    }
}

function loadAssets(callback){
    function loadSprite(fileName){
        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = "../assets/sprites/" + fileName;

        spriteImage.onload = function(){
          assetsStillLoading--;
        }
        return spriteImage;
    }
    sprites.background = loadSprite('spr_background.png');
    sprites.platform = loadSprite('spr_platform2.png');
    sprites.arrow = loadSprite('spr_arrow.png');

    sprites.redBall = [];
    sprites.redBall[0] = loadSprite('spr_elfRed.png');
    sprites.redBall[1] = loadSprite('spr_elfRed1.png');
    sprites.redBall[2] = loadSprite('spr_elfRed2.png');
    sprites.redBall[3] = loadSprite('spr_elfRed3.png');
    sprites.blueBall = [];
    sprites.blueBall[0] = loadSprite('spr_elfBlue.png');
    sprites.blueBall[1] = loadSprite('spr_elfBlue1.png');
    sprites.blueBall[2] = loadSprite('spr_elfBlue2.png');
    sprites.blueBall[3] = loadSprite('spr_elfBlue3.png');

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color){
    switch(color){
        case COLOR.RED:
            return sprites.redBall;
        case COLOR.BLUE:
            return sprites.blueBall;
    }
}