//**************************************************************
//
//
//              Powerup Handler for Brick Breaker: Bold
//
//
//**************************************************************
var powerUp = function () {
    var screen = display.screens["gameplay"];

    // to store all the power-ups
    var powerUps = [];

    var TOTAL_TYPES = 10;
    // namespace
    var Type = {
        LONGER: 0,
        SLOW: 1,
        SHORTER: 2,
        FAST: 3,
        MISSILE: 4,
        LIFE: 5,
        UFO: 6,
        FLIP: 7,
        WRAP: 8,
        SCORE: 9
    };

    // generic power up object
    var createPowerUp = function (type) {
        var count = 0;
        var add = type.add;
        var reduce = function () {
            count = Math.max(0, count - 1);
        };
        var timer = function () {
            type.timer(count);
        };
        var reset = function () {
            count = 0;
            timer();
        };
        return {
            count: function () { return count; },
            add: function () { count = add(count); },
            reduce: reduce,
            reset: reset,
            timer: timer
        };
    };

    // long paddle mode
    var longer = createPowerUp ({
        add: function (count) {
                 count += config.powerUp.LONGER;
                 board.paddle.width = board.paddle.width * 1.5;
                 return count;
             },
        timer: function (count) {
                   if (count == 0
                       && board.paddle.width >= board.paddle.WIDTH * 1.5)
                       board.paddle.width = board.paddle.WIDTH;
               }
    });

    // short paddle mode
    var shorter = createPowerUp ({
        add: function (count) {
                 count += config.powerUp.SHORTER;
                 board.paddle.width = board.paddle.width * 0.75;
                 return count;
             },
        timer: function (count) {
                   if (count == 0
                       && board.paddle.width <= board.paddle.WIDTH * 0.75)
                       board.paddle.width = board.paddle.WIDTH;
               }
    });

    // fast ball mode
    var fast = createPowerUp ({
        add: function (count) {
                 count += config.powerUp.FAST;
                 board.ball.dy = board.ball.dy * 1.5;
                 return count;
             },
        timer: function (count) {
                   if (count == 0
                       && board.ball.dy >= Math.abs(board.ball.DY * 1.5))
                       board.ball.dy = board.ball.dy;
               }
    });

    // slow ball mode
    var slow = createPowerUp ({
        add: function (count) {
                 count += config.powerUp.SLOW;
                 board.ball.dy = board.ball.dy * 0.75;
                 return count;
             },
        timer: function (count) {
                   if (count == 0
                       && board.ball.dy <= Math.abs(board.ball.DY * 0.75))
                       board.ball.dy = board.ball.dy;
               }
    });

    // flip mode
    var flip = createPowerUp ({
        add: function (count) {
                 count += config.powerUp.FLIP;
                 return count;
             },
        timer: function () {
               }
    });

    // wrap mode
    var wrap = createPowerUp ({
        add: function (count) {
                 count += config.powerUp.WRAP;
                 return count;
             },
        timer: function () {
               }
    });

    // add life
    var life = createPowerUp ({
        add: function (count) {
                 game.player.life.add();
                 return count;
             },
        timer: function () {}
    });

    // add score
    var score = createPowerUp ({
        add: function (count) {
                 game.player.score.add();
             },
        timer: function () {}
    });

    // missile
    var missile = function () {
        var count = 0;
        var add = function () {
            count += 1;
            screen.missileShow();
            screen.counters["missile"].text(count);
        };
        var create = function () {
            x = board.paddle.x + board.paddle.width / 2 - config.missile.WIDTH_INITIAL / 2;
            y = config.canvasHeight - 3 * board.paddle.height;
            dy = config.missile.DY_INITIAL;
            return { x: x, y: y, dy: dy };
        };
        var launch = function ()
        {
            if (!game.gameplay.launched) {
                // if ball is not launched
                // we cannot launch missile
                return;
            }
            if (count > 0) {
                missiles[missiles.length] = create();
                count -= 1;
                audio.play("missileLaunch");
            }
            if (count == 0) {
                // if no missile left then darken the launch button
                screen.missileHide();
            }
            screen.counters["missile"].text(count);
        };

        var reset = function () {
            count = 0;
        };

        return {
            add: add,
            launch: launch,
            reset: reset
        };
    }();

    var ufo = function () {
        var create = function () {
            var x = board.ufo.x;
            var y = board.ufo.y;
            var dx = board.ufo.dx;
            var dy = board.ufo.dy;
            var type;
            if (Math.random() * 3 > 1) {
                type = 0;
            } else {
                type = 1;
            }
            return {
                x: x,
                y: y,
                dx: dx,
                dy: dy,
                type: type
            };
        };

        var add = function () {
            ufos[ufos.length] = create();
        };

        return {
            add: add,
            reset: function () {}
        };
    }();

    var init = function () {
        with (Type) {
            powerUps[LONGER] = longer;
            powerUps[SLOW] = slow;
            powerUps[SHORTER] = shorter;
            powerUps[FAST] = fast;
            powerUps[MISSILE] = missile;
            powerUps[LIFE] = life;
            powerUps[UFO] = ufo;
            powerUps[FLIP] = flip;
            powerUps[WRAP] = wrap;
            powerUps[SCORE] = score;
        }
    };


    var add = function (type)
    {
        powerUps[type].add();
    };

    var reset = function () {
        for (i in powerUps)
            powerUps[i].reset();
    };

    var timer = function () {
        with (Type) {
            for (i in powerUps) {
                if (i == MISSILE || i == UFO)
                    continue;
                powerUps[i].reduce();
                powerUps[i].timer();
            }
        }
    };

    $(document).ready(init);

    return {
        Type: Type,
        TOTAL_TYPES: TOTAL_TYPES,
        powerUps: powerUps,
        missile: missile,
        ufo: ufo,
        add: add,
        reset: reset,
        timer: timer
    };

}();
