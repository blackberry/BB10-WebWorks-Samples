//***************************************************************************
//
//
//                      Physics Effect Library v0.7
//
//
//
//
//***************************************************************************

var physics = function () {

    var paddle = function () {

        var bounce = function () {
            var reflection = function () {
                return (board.ball.x - board.paddle.x - board.paddle.width / 2) / 200;
            };
            board.ball.y = board.paddle.y - board.ball.radius;
            board.ball.dy = -Math.abs(board.ball.dy);
            board.ball.dx = reflection();
            powerUp.timer();
            board.paddle.bounce = true;
            audio.play("bounce");
        };

        var getSpeed = function () {
            if (rightDown) {
                return Math.abs(board.paddle.dx);
            } else if (leftDown) {
                return -Math.abs(board.paddle.dx);
            } else {
                return 0;
            }
        };

        var move = function (interval) {
            var rightBound = config.canvasWidth - board.paddle.width;
            var leftBound = 0;
            var distance = getSpeed() * interval;
            if (powerUp.powerUps[powerUp.Type.WRAP].count() == 0) {
                if (rightDown)
                    board.paddle.x = Math.min(board.paddle.x + distance, rightBound);
                if(leftDown) {
                    board.paddle.x = Math.max(board.paddle.x + distance, leftBound);
                }
            } else {
                // if in wrap mode
                if (board.paddle.x <= rightBound + board.paddle.width
                        && board.paddle.x >= leftBound - board.paddle.width) {
                    board.paddle.x += distance;
                } else if (rightDown && board.paddle.x > config.canvasWidth) {
                    board.paddle.x = -board.paddle.width;
                } else if (leftDown && board.paddle.x < -board.paddle.width) {
                    board.paddle.x = config.canvasWidth;
                }
            }
        };
        return {
            bounce: bounce,
            move: move
        };
    }();

    var brick = function () {

        var addAnimation = function (row, col) {
            var newAnimation = {
                x: col * board.brick.width,
                y: row * board.brick.height,
                opacity: 1.0
            };
            gameplayAnimation.breakingBrick.add(newAnimation);
        };

        var hit = function (row, col)
        {
            // get the index of the brick
            var index = row * config.board.COL + col;
            if (bricks[index].hits < 1)
                return;
            if (bricks[index].powerUp) {
                // check if the brick is an item brick
                var item = {
                    // start position of item
                    x: col * board.brick.width + 0.15 * board.brick.width,
                    y: row * board.brick.height,
                    dy: board.item.dy,
                    powerUp: bricks[index].powerUp,
                    height: board.item.height,
                    width: board.item.width
                };
                items[items.length] = item;
                bricks[index] = window.brick.create({});
            } else if (bricks[index].switcher) {
                // if the brick is switch
                //  status: 1 <-> 2
                if (bricks[index].switcher == 1) {
                    bricks[index].switcher = 2;
                } else {
                    bricks[index].switcher = 1;
                }
                // show and hide the bricks
                board.toggleSwitch();
            } else {
                // for other bricks just minus hit times by one
                bricks[index].hits -= 1;
            }

            // add the animation
            addAnimation(row, col);
            // check if the level is clear
            game.gameplay.level.clear();
            // check power up timer
            powerUp.timer();
            // score
            game.player.score.add();
        };

        return {
            hit: hit,
            addAnimation: addAnimation
        };
    }();

    var ball = function () {
        var lastPosition = {};
        var detectArea = {};
        // hit detection
        var nextHit = function (interval)
        {
            // get the next hit point
            var nextHit = hitDetection();

            // if no points found then return
            if (!nextHit) {
                return false;
            }

            // if the ball will hit the brick in next frame
            if (nextHit.vertical == false) {
                // horizontally
                if (board.ball.dy < 0) {
                    // bottom side
                    brick.hit(nextHit.row - 1,  nextHit.col);
                } else {
                    // top side
                    brick.hit(nextHit.row, nextHit.col);
                }
                board.ball.dy = -board.ball.dy;
            } else if (nextHit.vertical == true) {
                // vertically
                if (board.ball.dx > 0 ) {
                    // left side
                    brick.hit(nextHit.row, nextHit.col);
                } else {
                    // right side
                    brick.hit(nextHit.row, nextHit.col - 1);
                }
                board.ball.dx = -board.ball.dx;
            }
            audio.play("hit");
            return nextHit;

        };

        var hitDetection = function () {
            var hitCandidates = getCandidates(detectArea);
            hitCandidates.sort(function(pos1, pos2)
                    {
                        return (pos1.dis - pos2.dis);
                    });

            var isHitFirstRow = function (candidate) {
                return (candidate.vertical == false
                        && candidate.row == config.board.ROW
                        && candidate.col < config.board.COL
                        && bricks[(candidate.row - 1) * config.board.COL + candidate.col].isVisible
                        && bricks[(candidate.row - 1) * config.board.COL + candidate.col].hits > 0);
            };

            var isHitInsideTravelArea = function (candidate) {
                return candidate.y < Math.max(lastPosition.y, detectArea.y)
                        && candidate.y > Math.min(lastPosition.y, detectArea.y)
            };

            var isVerticallyHit = function (candidate) {
                return (candidate.vertical == true
                        && ((bricks[candidate.row * config.board.COL + candidate.col].hits > 0
                                && bricks[candidate.row * config.board.COL + candidate.col].isVisible
                                && board.ball.dx > 0)
                            || (bricks[candidate.row * config.board.COL + candidate.col - 1].hits > 0
                                && bricks[candidate.row * config.board.COL + candidate.col - 1].isVisible
                                && board.ball.dx < 0)));
            };

            var isHorizontallyHit = function (candidate) {
                return (
                        candidate.vertical == false
                        && candidate.row != config.board.ROW
                        && ((bricks[candidate.row * config.board.COL + candidate.col].hits > 0
                                && bricks[candidate.row * config.board.COL + candidate.col].isVisible
                                && board.ball.dy > 0)
                            || (bricks[(candidate.row - 1) * config.board.COL + candidate.col].hits > 0
                                && bricks[(candidate.row - 1)* config.board.COL + candidate.col].isVisible
                                && board.ball.dy < 0))
                       );
            };
            var isHitInsideCanvas = function (candidate) {
                return !(candidate.x < 0
                        || candidate.y < 0
                        || candidate.y > board.brick.height * config.board.ROW
                        || candidate.x > board.brick.width * config.board.COL);
            };

            for(var index = 0; index < hitCandidates.length; index++) {
                var hitCandidate = hitCandidates[index];
                if (!isHitInsideCanvas(hitCandidate)
                        || !isHitInsideTravelArea(hitCandidate)) {
                    continue;
                }
                if (isHitFirstRow(hitCandidate)
                        || isVerticallyHit(hitCandidate)
                        || isHorizontallyHit(hitCandidate)) {
                    return hitCandidate;
                }
            }
            return false;
        };

        // Returns all the possible hitting points
        var getCandidates = function ()
        {
            var x = detectArea.x;
            var y = detectArea.y;
            var candidates = [];

            // calculate the movement function
            var a = board.ball.dy / board.ball.dx;
            var b = y - a * x;

            // calculate the possible hit points
            // here we estimate the ball as a single point
            for (var i = 1; i < config.board.COL; i++) {
                // check vertical lines
                var candidate = {
                    x: i * board.brick.width,
                    y: a * i * board.brick.width + b,
                    row: parseInt((a * i * board.brick.width + b) / board.brick.height),
                    col: i,
                    vertical: true
                }
                candidates[i - 1] = candidate;
            }

            for (var j = 1;j <= config.board.ROW; j++) {
                // check horizontal lines
                var candidate = {
                    x: (j * board.brick.height - b) / a,
                    y: j * board.brick.height,
                    row: j,
                    col: parseInt((j * board.brick.height - b) / (a * board.brick.width)),
                    vertical: false
                };
                candidates[config.board.COL + j - 2] = candidate;
            }

            // calculate the distance
            // between points and current position of the ball
            candidates = candidates.map(function (pos)
                    {
                        pos.dis = Math.sqrt((pos.x -x) * (pos.x - x)
                            + (pos.y - y) * (pos.y - y));
                        return pos;
                    });

            return candidates;
        };

        var move = function (interval)
        {
            // update last position of the ball
            lastPosition.x = detectArea.x;
            lastPosition.y = detectArea.y;

            // make sure the ball moves inside the canvas
            if (board.ball.dx < 0) {
                // left edge
                board.ball.x = Math.max(board.ball.x + board.ball.dx * interval, 0);
            } else {
                // right edge
                board.ball.x = Math.min(board.ball.x + board.ball.dx * interval, config.canvasWidth - board.ball.radius);
            }
            if (board.ball.dy < 0) {
                // top edge
                board.ball.y = Math.max(board.ball.y + board.ball.dy * interval, 0);
            } else {
                // bottom edge (The ball can go cross the bottom edge -> game over)
                board.ball.y += board.ball.dy * interval;
            }

            // bounce on edges
            if (board.ball.x == config.canvasWidth - board.ball.radius || board.ball.x == 0) {
                board.ball.dx = -board.ball.dx;
            } else if (board.ball.y < board.paddle.y + board.paddle.height + board.ball.radius
                    && board.ball.y > board.paddle.y - board.ball.radius
                    && board.ball.x > board.paddle.x
                    && board.ball.x < board.paddle.x + board.paddle.width) {
                if(board.ball.dy > 0) {
                    paddle.bounce();
                }
            } else if (board.ball.y == 0) {
                board.ball.dy = -board.ball.dy;
            } else if (board.ball.y > config.canvasHeight) {
                // if the paddle misses catching the ball then lose life.
                game.gameplay.miss();
            }

            if (board.ball.dx > 0) {
                detectArea.x = board.ball.x + board.ball.radius;
            } else {
                detectArea.x = board.ball.x;
            }
            if (board.ball.dy > 0) {
                detectArea.y = board.ball.y + board.ball.radius;
            } else {
                detectArea.y = board.ball.y;
            }
        }

        return {
            hit: nextHit,
            move: move
        };
    }();

    var item = function () {
        var isCaught = function (it) {
            return (it.y > board.paddle.y - it.height
                    && it.y < board.paddle.y
                    && it.x + it.width > board.paddle.x
                    && it.x < board.paddle.x + board.paddle.width);
        };

        with (powerUp.Type) {
            var addAnimation = function (it) {
                var newAnimation = {
                    x: it.x,
                    y: board.paddle.y - 3.5 * board.item.height,
                    opacity: 1.0
                };
                if (it.index == SHORTER || it.index == FAST || it.index == FLIP) {
                    // distinguish between powerup or powerdown
                    newAnimation.kind = "powerDown";
                } else {
                    newAnimation.kind = "powerUp";
                }
                gameplayAnimation.powerUp.add(newAnimation);
            }
        }

        var move = function () {
            for (var i = 0; i < items.length; i++) {
                var it = items[i];
                if (it) {
                    it.y += it.dy;
                    if (isCaught(it)) {
                        powerUp.add(it.powerUp);
                        addAnimation(it);
                        items.splice(i, 1);
                    } else if (it.y > config.canvasHeight) {
                        // miss catching
                        items.splice(i, 1);
                    }
                }
            }
        };
        return {
            move: move
        };
    }();

    var missile = function () {
        var move = function () {
            for (var i = 0; i < missiles.length; i++) {
                var m = missiles[i];
                if (m) {
                    m.dy += board.missile.dy / 2;
                    m.y -= m.dy;
                    if (m.y < 0) {
                        // if the missile is out of the canvas
                        // then remove it
                        missiles.splice(i, 1);
                    }
                }
            }
        };

        var hit = function () {
            for (var i = 0; i < missiles.length; i++) {

                var m = missiles[i];
                var row = parseInt(m.y / board.brick.height);
                var col = parseInt((m.x + board.missile.width / 2) / board.brick.width);
                var index = row * config.board.COL + col;

                if (index < config.board.ROW * config.board.COL
                        && bricks[index].switcher) {
                    // if hit the switch
                    if (bricks[index].switcher == 1) {
                        bricks[index].switcher = 2;
                    } else {
                        bricks[index].switcher = 1;
                    }
                    board.toggleSwitch();
                    missiles.splice(i, 1);
                } else if (index < config.board.ROW * config.board.COL
                        && bricks[index].hits > 0
                        && bricks[index].isVisible) {
                    // if hit other bricks
                    game.player.score.add();
                    bricks[index] = window.brick.create({});
                    missiles.splice(i, 1);
                }
            }
            // check if the level is clear
            game.gameplay.level.clear();
        };
        return {
            move: move,
            hit: hit
        }
    }();

    var ufo = function () {
        var move = function () {
            for (var i = 0; i < ufos.length; i++) {
                var u = ufos[i];
                if (u) {
                    // move forward
                    u.x += u.dx;
                    if (u.x > config.canvasWidth)
                        ufos.splice(i, 1);
                    u.y += u.dy;
                    if (u.y > board.ufo.y + config.canvasHeight / 5 || u.y < board.ufo.y) {
                        u.dy = -u.dy;
                    }
                }
                var last_col= parseInt((u.x - u.dx) / board.brick.width);
                var cur_col = parseInt(u.x / board.brick.width);
                var cur_row = parseInt(u.y / board.brick.height);
                if (last_col != cur_col) {
                    // if the ufo moves to a new colume then drop the bricks
                    drop(u, cur_row, cur_col);
                }
            }
        };

        var drop = function (ufo, row, col) {
            if (col < 0 && col > config.board.COL) {
                // the ufo is outside the canvas
                return;
            }
            for (var r = row; r < row + 2; r++) {
                if (r * config.board.COL + col > config.board.COL * config.board.ROW)
                    continue;
                if (bricks[r * config.board.COL + col].hits < 1 && Math.random() * 2 > 1) {
                    // for each spare brick space there is 50% probability to drop a brick
                    do {
                        if (ufo.type == 0) {
                            // if it is the normal ufo then drop any bricks randomly
                            brick.addAnimation(r, col);
                            bricks[r * config.board.COL + col] = window.brick.create({
                                hits: 1,
                                powerUp: Math.floor(Math.random() * 10)
                            });
                        } else {
                            // if it is the bad ufo then only drop non-item bricks
                            brick.addAnimation(r, col);
                            bricks[r * config.board.COL + col] = window.brick.create({
                                hits: Math.ceil(Math.random() * 4)
                            });
                        }
                        // repeat if it drops switch bricks
                    } while (bricks[r * config.board.COL + col] == 5)
                }
            }
        };
        return {
            move: move
        };
    }();

    return {
        ball: ball,
        brick: brick,
        paddle: paddle,
        item: item,
        ufo: ufo,
        missile: missile
    };

}();
