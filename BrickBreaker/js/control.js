
// move left or right
var rightDown = false;
var leftDown = false;

// keybord
function onKeyDown(evt)
{
    // right arrow
    if (evt.keyCode == 39) {
        if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
            rightDown = true;
        } else {
            // if in revert mode then the control is reverted
            leftDown = true;
        }
        // left arrow
    } else if (evt.keyCode == 37) {
        if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
            leftDown = true;
        } else {
            rightDown = true;
        }
    }
}

function onKeyUp(evt)
{
    switch (evt.keyCode) {
        // right arrow
        case 39:
            if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
                rightDown = false;
            } else {
                leftDown = false;
            }
            break;
        // left arrow
        case 37:
            if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
                leftDown = false;
            } else {
                rightDown = false;
            }
            break;
        // 'esc' -> pause
        case 27:
            if (game.gameplay.playing() && game.gameplay.launched() ) {showDialog('pause_menu');}
            else {hideDialog('pause_menu');}
            break;
        // 'd' -> debug mode
        case 68:
            if (game.debug) {
                $("#fps").hide();
            } else {
                $("#fps").show();
            }
            game.debug = !game.debug;
            break;
        // 'space' -> launch ball/missile
        case 32:
            if (!game.gameplay.launched()) {
                game.gameplay.launch();
            } else {
                powerUp.powerUps[powerUp.Type.MISSILE].launch();
            }
            break;
        // 'enter' -> start game
        case 13:
            if ($("#game_area").css('display') == 'none') {
                display.show('difficulty');
            } else if (levelClear()) {
                game.gameplay.level.next();
            }
            break;
        // 'shift' -> launch missile
        case 16:
            powerUp.powerUps[powerUp.Type.MISSILE].launch();
            break;
        // 'a' -> music [audio] mode
        case 65:
            if (!audio.musicEnabled) {
                audio.background.play();
                $("#button_music_off").hide();
                $("#button_music_on").show();
            } else {
                audio.background.pause();
                $("#button_music_off").show();
                $("#button_music_on").hide();
            }
            audio.musicEnabled = !audio.musicEnabled;
            break;
        // 's' -> sound effect mode
        case 83:
            if (!audio.sfxEnabled) {
                $("#button_sfx_off").hide();
                $("#button_sfx_on").show();
            } else {
                $("#button_sfx_off").show();
                $("#button_sfx_on").hide();
            }
            audio.sfxEnabled = !audio.sfxEnabled;
            break;
        // 'r' -> oscillating light
        case 82:
            draw.light();
            break;
    }
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);


// Touch buttons
// get touch elements
var buttonLeft = document.getElementById('button_left');
var buttonRight = document.getElementById('button_right');
var buttonMissile = document.getElementById('button_missile');
var buttonReplay = document.getElementById('button_replay');
var buttonPlay = document.getElementById('button_play');
var buttonAbout = document.getElementById('about');
var buttonReturn = document.getElementById('button_return');
var gameArea = document.getElementById('game_area');
var buttonNext = document.getElementById('button_next')

function leftButtonDown(evt)
{
    evt.preventDefault();
    buttonLeft.style.opacity = 1;
    if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
        leftDown = true;
    } else {
        rightDown = true;
    }

}
function leftButtonUp(evt)
{
    evt.preventDefault();
    buttonLeft.style.opacity = 0.7;
    if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
        leftDown = false;
    } else {
        rightDown = false;
    }
}
function rightButtonDown(evt)
{
    evt.preventDefault();
    buttonRight.style.opacity = 1;
    if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
        rightDown = true;
    } else {
        leftDown = true;
    }
}

function rightButtonUp(evt)
{
    buttonRight.style.opacity = 0.7;
    if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
        rightDown = false;
    } else {
        leftDown = false;
    }
}

function launchHandler(evt)
{
    evt.preventDefault();
    if (game.gameplay.isGameover()) {
        return;
    }else if ($('#button_next').css('display') != 'none') {
        display.screens["gamepley"].nextLevel();
    } else if (!game.gameplay.launched()) {
        game.gameplay.launch();
    } 
}

// touch move
var touchOnDude = false;
function isTouchOnDude (touch) {
      return touch.x < board.paddle.x + 2 * board.paddle.width
             && touch.x > board.paddle.x - board.paddle.width
             && touch.y > board.paddle.y
}

function touchHandler (event) {
    var touch = event.touches[0];
    var touchPosition = {
        x: touch.pageX - parseInt($("#game_canvas").offset().left),
        y: touch.pageY - parseInt($("#game_canvas").offset().top)
    }
    if (isTouchOnDude(touchPosition) && game.gameplay.drag() ) {
        touchOnDude = true;
    } else {
        launchHandler(event);
    }
}

// assign functions to touch element
gameArea.addEventListener('touchstart', touchHandler);
gameArea.addEventListener('touchmove', function(event) {
    if (!touchOnDude)
        return;
    var touch = event.touches[0];
    var touchPosition = {
        x: touch.pageX - parseInt($("#game_canvas").offset().left),
        y: touch.pageY - parseInt($("#game_canvas").offset().top)
    }

    if (touchPosition.x > 0) {
        board.paddle.x = Math.max(
            Math.min(touchPosition.x,
                config.canvasWidth - board.paddle.width / 2) - board.paddle.width / 2,
            0);
    } else {
        board.paddle.x = 0;
    }

}, false);
gameArea.addEventListener('touchend', function () { touchOnDude = false; });
buttonLeft.addEventListener('touchstart', leftButtonDown);
buttonLeft.addEventListener('touchend', leftButtonUp);
buttonRight.addEventListener('touchstart', rightButtonDown);
buttonRight.addEventListener('touchend', rightButtonUp);
buttonReplay.addEventListener('touchstart', board.reset);
buttonPlay.addEventListener('show_game', true);
buttonPlay.addEventListener('show_about', true);
buttonReturn.addEventListener('show_welcome', true);
buttonMissile.addEventListener('touchstart', function(evt) { 
    if (powerUp.missile.count > 0) {buttonMissile.style.opacity = 1;}
    });
buttonMissile.addEventListener('touchend', function(evt) { 
    buttonMissile.style.opacity = 0.7;
    powerUp.missile.launch(); 
    });


function resetControl() {
    leftDown = false;
    rightDown = false;
}

function deviceMotionHandler(eventData)
{
    if (!game.gameplay.tilt()) {
        // if the level does not need tilt then block tilt
        return;
    }

    // grab the acceleration data
    var acceleration = eventData.accelerationIncludingGravity;
    var tilt;
    if (window.orientation == 0 || window.orientation == 180) {
        // left or right
        tilt = Math.round(((acceleration.x) / 9.81) * -90);
        if (acceleration.y > 0) {
            // if the device is up side down
            tilt = -tilt;
        }
    } else {
        // front or back
        tilt = Math.round(((acceleration.y + 9.81) / 9.81) * -90) + 90;
        if (acceleration.x < 0) {
            // if the device is up side down
            tilt = -tilt;
        }
    }
    if (tilt > 0) {
        if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
            leftDown = true;
            rightDown = false;
        } else {
            // if in revert mode
            // then the control is reverted
            rightDown = true;
            leftDown = false;
        }
    } else if (tilt < 0) {
        if (powerUp.powerUps[powerUp.Type.FLIP].count() == 0) {
            rightDown = true;
            leftDown = false;
        } else {
            leftDown = true;
            rightDown = false;
        }
    }

    // calculate the speed of the paddle
    var scale = config.canvasWidth / 100;
    board.paddle.dx = Math.min(1, Math.abs(tilt / 20))
                          * config.paddle.DX_INITIAL * scale * 0.7;
}
