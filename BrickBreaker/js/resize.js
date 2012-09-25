
// This function optimizes the interface to adapt the browser window size automatically.
function resizeGame()
{
    game.gameplay.pause();
    var gameArea = document.getElementById('game_area');
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;

    // landscape layout by default
    var widthToHeight = 10 / 6;

    if (screen.width < 800) {
        // if the width of window is less than 800 then switch to portrait layout
        var widthToHeight = 8 / 10;
    }

    // screen Ratio
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }

    // Adjust the margin to keep the gameArea in the center of the screeen
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';

    // resize game canvas
    var gameCanvas = document.getElementById('game_canvas');
    if (screen.width < 800) {
        $("#game_canvas").width(newWidth * 0.9);
        $("#game_canvas").height(newHeight * 0.65);
        context.canvas.width = newWidth * 0.9;
        context.canvas.height = newHeight * 0.65;
        gameCanvas.style.marginTop = (-newHeight * 0.45) + 'px';
        gameCanvas.style.marginLeft =  (-newWidth * 0.45) + 'px';
    } else {
        $("#game_canvas").width(newWidth * 0.6);
        $("#game_canvas").height(newHeight * 0.9);
        context.canvas.width = newWidth * 0.6;
        context.canvas.height = newHeight * 0.9;
        gameCanvas.style.marginTop = (-newHeight * 0.45) + 'px';
        gameCanvas.style.marginLeft =  (-newWidth * 0.3) + 'px';
    }
    
    var gs = document.getElementById('gameplay_screen');
    gs.style.fontSize = Math.max(newWidth / 1000, 0.6) * 28 + 'px';


    // re-calculate image object/parameters for drawing
    board.resize();
}

$(document).ready(function () {
    resizeGame();
    board.reset();
    game.reset();
    window.addEventListener('resize', resizeGame, false);
    window.addEventListener('orientationchange', resizeGame, false);
});



