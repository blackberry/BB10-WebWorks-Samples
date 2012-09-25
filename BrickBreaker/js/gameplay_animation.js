var gameplayAnimation = function () {
    var time = 0;
    var man = function() {
        var imgs = new Array();
        for (var i = 0; i < 7; i++)
            imgs[i] = new Image();
        var gender = Math.random() > 0.5 ? "man" : "woman";
        imgs[0].src = "./imgs/" + gender + "_left1.png";
        imgs[1].src = "./imgs/" + gender + "_left2.png";
        imgs[2].src = "./imgs/" + gender + "_left3.png";
        imgs[3].src = "./imgs/" + gender + "_right1.png";
        imgs[4].src = "./imgs/" + gender + "_right2.png";
        imgs[5].src = "./imgs/" + gender + "_right3.png";
        imgs[6].src = "./imgs/" + gender + "_lose.png";

        var currentImage = imgs[0];
        // position of the man
        var position;
        var getPosition = function() {
            var y = board.paddle.y + board.paddle.height / 2;
            var x = board.paddle.x + board.paddle.width * 0.28;
            return {
                x: x,
                y: y
            };
        };

        var updateImage = function() {
            if (currentImage == imgs[6]
                    && !game.gameplay.isGameover())
                currentImage = imgs[0];
            if (leftDown) {
                currentImage = shuffle(imgs[0], imgs[1], imgs[2]) || currentImage;
            } else if (rightDown) {
                currentImage = shuffle(imgs[3], imgs[4], imgs[5]) || currentImage;
            }
        };

        var draw = function () {
            // if the game is playing
            if (!game.gameplay.playing)
                return;

            // get the position of the man
            if (!game.gameplay.isGameover()) {
                position = getPosition();
                updateImage();
            }

            // this is a css animation
            context.drawImage(currentImage, position.x, position.y,
                    board.paddle.width / 2, board.paddle.width / 2);

        };

        function lose (callback) {
            currentImage = imgs[6];
            callback();
        }

        // swap animation between three images
        function shuffle(img1, img2, img3)
        {
            if (time % 16 == 0) {
                return img1;
            } else if (time % 16 == 4 || time % 16 == 12) {
                return img2;
            } else if (time % 16 == 8) {
                return img3;
            }
        }

        return {
            draw: draw,
            lose: lose
        };
    }();

    var breakingBrick = function () {
        var breakingBricks = [];
        var img = new Image();
        img.src = "./imgs/breakingBrick.png";

        var add = function (breakingBrick) {
            breakingBricks[breakingBricks.length] = breakingBrick;
        };

        var draw = function () {
            for (var i = 0; i < breakingBricks.length; i++) {
                var b = breakingBricks[i];
                if (b.opacity <= 0) {
                    breakingBricks.splice(i, 1);
                    continue;
                }
                context.globalAlpha = b.opacity;
                b.opacity -= 0.1;
                context.drawImage(img, b.x, b.y,
                        board.brick.width, board.brick.height);
            }
            context.globalAlpha = 1.0;
        };

        var reset = function () {
            breakingBricks = [];
        };

        return {
            empty: function () { return !breakingBricks.length; },
            add: add,
            draw: draw,
            reset: reset
        };
    }();

    var powerUp = function () {
        var powerUps = [];
        var imgs = [];
        imgs[0] = new Image();
        imgs[1] = new Image();
        imgs[0].src = "./imgs/powerdown.png";
        imgs[1].src = "./imgs/powerup.png";

        var add = function(powerUp) {
            powerUps[powerUps.length] = powerUp;
        };

        var draw = function ()
        {
            for (var i = 0; i < powerUps.length; i++) {
                var p = powerUps[i];
                if (p.opacity <= 0) {
                    powerUps.splice(i, 1);
                    continue;
                }
                context.globalAlpha = p.opacity;
                p.opacity -= 0.1;
                p.y -= config.canvasHeight / 200 ;
                if (p.kind == "powerUp") {
                    context.drawImage(imgs[1], p.x, p.y,
                            board.item.width, 3.5 * board.item.height);
                } else {
                    context.drawImage(imgs[0], p.x, p.y,
                            board.item.width, 3.5 * board.item.height);
                }
            }
            context.globalAlpha = 1.0;
        };

        var reset = function () {
            powerUps = [];
        };

        return {
            add: add,
            draw: draw,
            reset: reset
        };

    }();

    var paddle = function () {
        var lose = function () {
            context.save();
            context.translate(board.paddle.x + board.paddle.width / 2, board.paddle.y);
            context.rotate(4 * Math.PI * Math.sin(time / 100));
            context.translate(-board.paddle.x - board.paddle.width / 2, -board.paddle.y)
            context.drawImage(board.paddle.img, board.paddle.x, board.paddle.y,
            board.paddle.width, board.paddle.height);
            context.restore();
            board.paddle.y += config.canvasHeight / 200;
        };
        return {
            lose: lose
        };
    }();

    // draw lose animation
    function drawGameover ()
    {
        // if game is over
        man.lose(paddle.lose);
    }

    function isDrawGameOverEnd () {
        return board.paddle.y > config.canvasHeight
    }


    function bounce()
    {
        if (board.paddle.bounce) {
            board.paddle.y += config.canvasHeight / 200;
            board.paddle.bounce = false;
        } else {
            board.paddle.y = config.paddle.Y_INITIAL;
        }
    }

    // check if there is any unfinished animations
    function empty()
    {
        if (!breakingBrick.empty()) {
            // if any breaking animation is left
            return false;
        } else {
            // if any game over animation is left
            return isDrawGameOverEnd () || !game.gameplay.isGameover();
        }
    }

    function reset ()
    {
        breakingBrick.reset();
        powerUp.reset();
    }

    function draw() {
        time += 1;
        // FIXME
        // bounce();
        powerUp.draw();
        breakingBrick.draw();
        if (game.gameplay.isGameover()) {
            drawGameover();
        }
        man.draw();
    }
    return {
        draw: draw,
        empty: empty,
        powerUp: powerUp,
        breakingBrick: breakingBrick,
        reset: reset
    };

}();

