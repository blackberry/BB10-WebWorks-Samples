//*****************************************************************
//
//                          dialog handler
//
//*****************************************************************

// show dialog
function showDialog(kind)
{
    // pause the game
    game.gameplay.pause();
    $("#dialog_container").show();
    // show message
    $("#message").attr('src', "imgs/message_" + kind + ".png").show();
    $("#"+kind).show();
}

// hide dialog
function hideDialog()
{
    $("#dialog_container").hide();
    $("#dialog_container").children().hide();
    game.gameplay.pause();
}

$(document).ready(function () {
    hideDialog();
    $("#exit_to_main").bind("click", function () {
        hideDialog();
        game.gameplay.pause();
        display.screens['gameplay'].clear();
        display.show('welcome');
    });
    $("#resume_game").bind("click", function () {
        hideDialog();
    });
});
