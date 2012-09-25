//***************************************************************
//
//                      Gameplay Setup
//
//***************************************************************

// general gameplay
var game = function () {
    // gameplay screen
    var screen = display.screens['gameplay'];
    // debug mode
    var debug = false;
    var gameplay;
    // player object
    var player = function () {
        // score
        var score = function () {
            // current score
            var current = 0;
            var html = document.getElementById("score");
            var add = function () {
                current += 10;
                html.innerText = current;
            };
            var get = function() {
                return current;
            };
            var reset = function () {
                current = 0;
                html.innerText = current;
            };
            return {
                add: add,
                get: get,
                reset: reset
            };
        }();

        // life
        var life = function () {
            // current life
            var current;

            var html = document.getElementById("life");
            var add = function () {
                current += 1;
                html.innerText = current;
            };
            var lose = function () {
                current -= 1;
                html.innerText = current;
            };
            var get = function () {
                return current;
            };
            var reset = function () {
                if (gameplay.difficulty == 1) {
                    current = config.player.LIFE_EASY_INITIAL;
                } else {
                    current = config.player.LIFE_NORMAL_INITIAL;
                }
                html.innerText = current;
            };
            return {
                add: add,
                lose: lose,
                get: get,
                reset: reset
            };
        }();

        var reset = function () {
            life.reset();
            score.reset();
        };

        return {
            score: score,
            life: life,
            reset: reset
        };
    }();

    // gameplay
    var gameplay = function () {
        // if the ball is launched
        var launched = false;
        var standby = function () {
            playing = true;
            launched = false;
        }
        // if the game is playing
        var playing = true;
        // if tilt control enabled
        var tilt = false;
        var setTilt = function (isTilt) {
            tilt = isTilt;
        }
        // if drag control enabled
        var drag = false;
        var setDrag = function (isDrag) {
            drag = isDrag;
        }

        // difficulty
        var difficulty;
        var setDifficulty = function (i) {
            this.difficulty = i;
            if (i == 1) {
                drag = true;
                tilt = false;
                $("#button_right").hide();
                $("#button_left").hide();
            } else if (i == 2) {
                drag = false;
                tilt = false;
                $("#button_right").show();
                $("#button_left").show();
            } else if (i == 3) {
                drag = false;
                tilt = true;
                $("#button_right").hide();
                $("#button_left").hide();
            }
        };

        // is gameover
        var gameover = false;
        var isGameover = function () {
            return gameover;
        }

        // launch the ball
        var launch = function () {
            if (!launched) {
                // check if the ball is already launched
                launched = true;
                // speed along X-axis is randomly generated
                board.ball.dx = (config.ball.DX_INITIAL - 2 * Math.random() * config.ball.DX_INITIAL) * scale.x;
                // spped along Y-axis is constant
                board.ball.dy = -config.ball.DY_INITIAL * scale.y;
            }
            screen.clear();
        };
        // level
        var level = function () {
            var current = config.LEVEL_INITIAL;
            var total = 9;
            var html = screen.counters["level"];
            var next = function () {
                current += 1;
                html.text(current);
            }
            var reset = function () {
                current = config.LEVEL_INITIAL;
                html.text(current);
                powerUp.reset();
                gameplayAnimation.reset();
            }
            var clear = function () {
                for (var i = 0; i < config.board.ROW * config.board.COL; i++)
                    if (bricks[i].hits > 0 && !bricks[i].switcher)
                        return false;
                if (current == total) {
                    clearAll();
                } else {
                    screen.feedbacks["levelclear"].show();
                    screen.buttons["next"].show();
                    playing = false;
                }
                board.ball.dx = 0;
                board.ball.dy = 0;
                playing = false;
                return true;
            };
            var clearAll = function () {
                screen.feedbacks["win"].show();
            };
            return {
                current: function () { return current; },
                next: next,
                reset: reset,
                clear: clear
            };
        }();

        // miss
        var miss = function () {
            launched = false;
            powerUp.reset();
            if (player.life.get() == 0) {
                gameover = true;
                over();
                return;
            } else {
                player.life.lose();
                screen.feedbacks["miss"].show();
            }
        };

        // game over
        var over = function () {
            playing = false;
            screen.feedbacks["gameover"].show();
            screen.buttons["replay"].show();
        };

        // pause or unpause
        var pause = function () {
            if (launched) {
                playing = !playing;
            }
        };

        var reset = function () {
            standby();
            level.reset();
            gameover = false;
        };

        return {
            standby: standby,
            playing: function () { return playing; },
            launched: function () { return launched; },
            launch: launch,
            pause: pause,
            miss: miss,
            reset: reset,
            level: level,
            difficulty: difficulty,
            setDifficulty: setDifficulty,
            tilt: function () { return tilt; },
            setTilt: setTilt,
            drag: function () { return drag; },
            setDrag: setDrag,
            isGameover: isGameover
        };
    }();

    var reset = function () {
        player.reset();
        gameplay.reset();
        resetControl();
    };

    return {
        player: player,
        gameplay: gameplay,
        reset: reset,
        debug: debug
    };
}();
