// ***************************************************************************
//
//
//                              Game Configuration
//
//                           Brick Breaker Bold
//
//
// ***************************************************************************

// canvas context
var context = $("#game_canvas")[0].getContext("2d");

// initialize configuration
var initConfig = function () {

    // canvas size
    var canvasWidth = $("#game_canvas").width();
    var canvasHeight = $("#game_canvas").height();

    // unit length
    // this is a public global variable
    this.scale = {
            y: canvasHeight / 100,
            x: canvasWidth / 100
    };

    // board size
    var board = {
        ROW: 14,
        COL: 7
    };

    // size of elements on the board
    // paddle, ball, bricks, items, missiles, ufos
    var paddle = {
        X_INITIAL: 40,
        Y_INITIAL: 86,
        WIDTH_INITIAL: 20,
        HEIGHT_INITIAL: 1.2,
        DX_INITIAL: 0.12
    };

    var ball = {
        RADIUS_INITIAL: 1.8,
        X_INITIAL: 29,
        Y_INITIAL: 41,
        DY_INITIAL: 0.04,
        DX_INITIAL: 0.02

    };

    var brick = {
        HEIGHT_INITIAL: 5,
        WIDTH_INITIAL: 100 / board.COL
    };

    var item = {
        WIDTH_INITIAL: 100 / board.COL,
        HEIGHT_INITIAL: 4,
        DY_INITIAL: 1
    };

    var missile = {
        HEIGHT_INITIAL: 10,
        WIDTH_INITIAL: (59 / 83) * 10,
        DY_INITIAL: 0.1
    };

    var ufo = {
        HEIGHT_INITIAL: 30,
        WIDTH_INITIAL: 30,
        DX_INITIAL: 0.75,
        DY_INITIAL: 0.5,
        X_INITIAL: - 50,
        Y_INITIAL: 0
    };

    // powerup mode timer
    var powerUp = {
        FAST: 25,
        SLOW: 5,
        SHORTER: 15,
        LONGER: 15,
        REVERT: 30,
        WRAP: 30,
        MISSILE: 0
    };

    var player = {
        LIFE_NORMAL_INITIAL: 2,
        LIFE_EASY_INITIAL: 5
    }

    // fps rate
    var INTERVAL = 25;

    var LEVEL_INITIAL = 1;
    return {
        canvasHeight: canvasHeight,
        canvasWidth: canvasWidth,
        board: board,
        ball: ball,
        paddle: paddle,
        brick: brick,
        item: item,
        powerUp: powerUp,
        missile: missile,
        ufo: ufo,
        player: player,
        INTERVAL: INTERVAL,
        LEVEL_INITIAL: LEVEL_INITIAL
    };
};

var config = initConfig();
