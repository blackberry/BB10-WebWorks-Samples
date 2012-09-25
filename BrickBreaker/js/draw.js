//*************************************************************************
//
//
//                              draw.js
//                      Brick Breaker: Bold
//
//
//
//*************************************************************************

var draw = function () {
    var bricks = function () {
        for (var row = 0; row < config.board.ROW; row++) {
            for (var col = 0; col < config.board.COL; col++) {
                var positionIndex = row * config.board.COL + col;
                var brick = this.bricks[positionIndex];
                if (brick.hits > 0) {
                    if (!brick.isVisible) {
                        context.globalAlpha = 0.3;
                    }
                    var img = board.brick.getImage(brick);
                    board.brick.draw(img, row, col);
                }
                // reset the tranparency
                context.globalAlpha = 1.0;
            }
        }
    };

    var ball = function (interval) {
        if (game.gameplay.launched() == 0) {
            // if the ball is not launched yet
            // then it is always move with paddle
            board.ball.standby();
        }
        if (!game.gameplay.isGameover())
            board.ball.draw();
    };

    var paddle = function (interval) {
        if (!game.gameplay.isGameover())
            board.paddle.draw();
    };

    var items = function () {
        for (var i = 0; i < this.items.length; i++) {
            var it = this.items[i];
            if (it != 0) {
                board.item.draw(it);
            }
        }
    };

    var missiles = function () {
        for (var i = 0; i < this.missiles.length; i++) {
            var missile = this.missiles[i];
            if (missile != 0) {
                board.missile.draw(missile);
            }
        }
    };

    var ufos = function () {
        for (var i = 0; i < this.ufos.length; i++) {
            var u = this.ufos[i];
            if (u != 0)
                board.ufo.draw(u);
        }
    };

    // clear the canvas
    var clear = function () {
        context.clearRect(0, 0, config.canvasWidth + 5, config.canvasHeight + 5);
    };

    // get current time
    var currentTime = new Date();

    // get the interval of frame
    var getInterval = function () {
        var lastTime = currentTime;
        currentTime = new Date();
        return currentTime.getTime() - lastTime.getTime();
    };

    var all = function () {
        // set the maximum interval to 40 mileseconds (25fps)
        // so that the movement will not skip
        var interval = Math.min(40, getInterval());
        // draw splash screen
        // if the splash is playing
        if(splash.playing()) {
            splash.draw(interval);
        }

        // clear the canvas
        clear();
        // if the game is paused
        // then nothing is drew
        if ((!game.gameplay.playing() || splash.playing())
                && gameplayAnimation.empty())
            return;

        // draw elements on the board
        ball(interval);
        paddle(interval);
        bricks();
        items();
        ufos();
        missiles();

        // draw animation
        gameplayAnimation.draw();

        // update the board
        board.update(interval)

        if (game.debug) {
            fps.addFrame();
            fps.update();
        }
    };

    // draw the rotating light on background
    // for debug only
    var light = function() {
        if ($("#light").css("display") == "none") {
            $("#light").show();
            $("#building").show();
            var a = alice.init();
            a.dance("light",45,"3000ms",
                "ease-in-out","0ms","infinite","alternate","running");
        } else {
            var a = alice.init();
            a.dance("light",45,"3000ms",
                "ease-in-out","0ms","infinite","alternate","paused");
            $("#light").hide();
            $("#building").hide();
        }
    };

    return {
        light: light,
        all: all
    };

}();

window.requestAnimFrame = function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
}();

function animloop(){
  requestAnimFrame(animloop);
  draw.all();
};
