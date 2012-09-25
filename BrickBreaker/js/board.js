var board = function () {

    // elements on the board
    // paddle
    var paddle = function () {
        // basic attribution
        var height, width, x, y, dx;
        var img = new Image();
        img.src = "./imgs/paddle.png";
        var reset = function () {
            this.height = config.paddle.HEIGHT_INITIAL * scale.y;
            this.width = config.paddle.WIDTH_INITIAL * scale.x;
            this.x = config.paddle.X_INITIAL * scale.x;
            this.y = config.paddle.Y_INITIAL * scale.y;
            this.dx = config.paddle.DX_INITIAL * scale.x;
        };
        var draw = function () {
            context.drawImage(img, this.x, this.y, this.width, this.height);
        };

        var update = function (interval) {
            physics.paddle.move(interval);
        };

        return {
            height: height,
            width: width,
            x: x,
            y: y,
            dx: dx,
            img: img,
            reset: reset,
            draw: draw,
            update: update
        };
    }();

    // ball
    var ball = function () {
        // basic attribution
        var radius, x, y, dx;
        var img = new Image();
        img.src = "./imgs/ball.png";
        var reset = function () {
            this.radius = config.ball.RADIUS_INITIAL * scale.x;
            this.x = config.ball.X_INITIAL * scale.x;
            this.y = config.ball.Y_INITIAL * scale.y;
            this.dx = 0;
            this.dy = 0;
        };
        var standby = function () {
            this.x = paddle.x + paddle.width / 2 - this.radius / 2;
            this.y = paddle.y - this.radius;
        };
        var draw = function () {
            context.drawImage(img, this.x, this.y, this.radius, this.radius);
        };
        var update = function (interval) {
            if (game.gameplay.launched)
                physics.ball.move(interval);
        }
        return {
            radius: radius,
            x: x,
            y: y,
            dx: dx,
            img: img,
            draw: draw,
            standby: standby,
            reset: reset,
            update: update
        };
    }();

    // brick
    var brick = function () {
        // basic attribution
        var height, width;
        var imgs = new Array();
        for (var i = 0; i < 7; i++) {
            imgs[i] = new Image();
            imgs[i].src = "./imgs/brick" + (i + 1) + ".png";
        }
        var reset = function () {
            this.height = config.brick.HEIGHT_INITIAL * scale.y;
            this.width = config.brick.WIDTH_INITIAL * scale.x;
        }
        var draw = function (img, row, col) {
            context.drawImage(
                    img,
                    col * this.width,
                    row * this.height,
                    this.width,
                    this.height
                    );
        }
        var getImage = function (b) {
            if (!b.isVisible) {
                // transparent brick
                context.globalAlpha = 0.1;
            }
            if (b.hits == 0) {
                // no brick
                return false;
            } else if (b.switcher == 2) {
                // switcher brick
                return imgs[6];
            } else if (b.switcher == 1) {
                return imgs[4];
            } else if (b.powerUp) {
                // powerUps
                return imgs[5];
            } else if (b.hits < 5) {
                // normal bricks
                return imgs[b.hits - 1];
            }
        };
        var update = function (interval) {
            if (game.gameplay.launched())
                physics.ball.hit(interval);
        };
        return {
            height: height,
            width: width,
            imgs: imgs,
            reset: reset,
            draw: draw,
            getImage: getImage,
            update: update
        };
    }();

    // missile
    var missile = function () {
        // basic attribution
        var height, width, dy;
        var img = new Image();
        img.src = "./imgs/missile.png";
        var reset = function () {
            this.height = config.missile.HEIGHT_INITIAL * scale.y;
            this.width = config.missile.WIDTH_INITIAL * scale.x;
            this.dy = config.missile.DY_INITIAL * scale.y;
        };
        var draw = function (missile) {
            context.drawImage(this.img, missile.x, missile.y,
                        this.width, this.height);
        }
        var update = function () {
            physics.missile.move();
            physics.missile.hit();
        }
        return {
            height: height,
            width: width,
            dy: dy,
            img: img,
            reset: reset,
            draw: draw,
            update: update
        };
    }();

    // item
    var item = function () {
        // basic attribution
        var height, width, dy;
        var imgs = new Array();
        for (var i = 0; i < 10; i++) {
            imgs[i] = new Image();
            imgs[i].src = "./imgs/item" + (i + 1) + ".png";
        }
        var reset = function () {
            this.height = config.item.HEIGHT_INITIAL * scale.y;
            this.width = config.item.WIDTH_INITIAL * scale.x;
            this.dy = config.item.DY_INITIAL * scale.y;
        };
        var draw = function (it) {
            context.drawImage(imgs[it.powerUp], it.x, it.y, this.width, this.height);
        }
        var update = function () {
            physics.item.move();
        }
        return {
            height: height,
            width: width,
            draw: draw,
            dy: dy,
            imgs: imgs,
            reset: reset,
            update: update
        };
    }();

    // ufo
    var ufo = function () {
        // basic attribution
        var height, width, dy, dx, x, y;
        var imgs = new Array();
        imgs[0] = new Image();
        imgs[1] = new Image();
        imgs[0].src = "./imgs/ufo.png";
        imgs[1].src = "./imgs/ufo2.png";

        var reset = function () {
            this.height = config.ufo.HEIGHT_INITIAL * scale.y;
            this.width = config.ufo.WIDTH_INITIAL * scale.x;
            this.dy = config.ufo.DY_INITIAL * scale.y;
            this.dx = config.ufo.DX_INITIAL * scale.x;
            this.x = config.ufo.X_INITIAL * scale.x;
            this.y = config.ufo.Y_INITIAL * scale.y;
        };

        var draw = function (u) {
            context.drawImage(imgs[u.type], u.x, u.y, this.width, this.width);
        };
        var update = function () {
            physics.ufo.move();
        }
        return {
            height: height,
            width: width,
            dy: dy,
            dx: dx,
            x: x,
            y:y,
            imgs: imgs,
            reset: reset,
            draw: draw,
            update: update
        };
    }();

    // store elements on board in an array
    var elements = [ball, paddle, brick, ufo, item, missile];

    // recalculate when the screen is rotated or resized
    var resize = function ()
    {
        config.canvasHeight = $("#game_canvas").height();
        config.canvasWidth = $("#game_canvas").width();

        var scaleOld = scale;
        scale = {
            y: config.canvasHeight / 100,
            x: config.canvasWidth / 100
        };

        // get resize ratio
        var ratio = scale.y / scaleOld.y

        // update elements on the board
        for (i in elements) {
            var element = elements[i];
            for (member in element) {
                if (member == "x" || member == "y"
                    || member == "dx" || member == "dy"
                    || member == "width" || member == "height"
                    || member == "radius")
                    element[member] = element[member] * ratio;
            }
        }
    };

    // global variables
    window.bricks = [];
    window.items = [];
    window.missiles = [];
    window.ufos = [];

    // initialize bricks
    var initBricks = function () {
        bricks = levelConfig();
    };
    // reset the game
    var reset = function () {
        // reset config
        config = initConfig();
        // reset each element
        for (i in elements) {
            elements[i].reset();
        }
        // init bricks board
        initBricks();
        game.gameplay.standby();
    };
    // update the elements
    // position, speed, bricks etc.
    var update = function (interval) {
        for (i in elements)
            elements[i].update(interval);
    };
    // switch the visibility of bricks
    var toggleSwitch = function () {
        for (var i = 0; i < config.board.ROW * config.board.COL; i++) {
            if (bricks[i].hits > 0 && bricks[i].isVisibilitySwitchable)
                bricks[i].isVisible = !bricks[i].isVisible;
        }
    };
    return {
        ball: ball,
        paddle: paddle,
        brick: brick,
        init: initBricks,
        missile: missile,
        ufo: ufo,
        item: item,
        reset: reset,
        resize: resize,
        update: update,
        toggleSwitch: toggleSwitch
    };
}();
