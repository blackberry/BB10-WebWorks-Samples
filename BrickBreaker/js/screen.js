var display = function () {
    var screens = {};
    // initialize screeens
    var init = function () {
        // splash screen
        screens['splash'] = function () {
            var html = $("#splash_screen");
            // skip button
            $("#skip").bind("click", function () {
                show("welcome");
                splash.end();
                    });
            return {
                html: html
            };
        }();

        // welcome screen
        screens['welcome'] = function () {
            var html = $("#welcome_screen");
            // show about screen
            var showAbout = function () {
                $("#about_screen").show();
                $("#menu").hide();
            }
            // back to menu
            var back = function () {
                $("#about_screen").hide();
                $("#menu").show();
            }
            $("#about_screen").hide();
            $("#button_play").bind("click",
                    function () { show("difficulty"); });
            $("#button_about").bind("click", showAbout);
            $("#button_return").bind("click", back);
            return {
                html: html,
                showAbout: showAbout,
                back: back
            };
        }();

        // difficulty selection screen
        screens['difficulty'] = function () {
            var html = $("#difficulty_screen");
            // set difficulty [1-3]
            var setDifficulty = function (i)
            {
                game.difficulty = i;
            };
            $("#beginner").bind("click", function () {
                game.gameplay.setDifficulty(1);
                show("gameplay");
                game.reset();
                board.reset();
                display.screens['gameplay'].instructions['drag'].show();
            });
            $("#intermediate").bind("click", function () {
                game.gameplay.setDifficulty(2);
                show("gameplay");
                game.reset();
                board.reset();
                display.screens['gameplay'].instructions['launch'].show();
            });
            // tilt
            if (window.DeviceMotionEvent) {
                // check if the device support tilt
                $("#hardcore").bind("click", function(evt) {
                    game.gameplay.setDifficulty(3);
                    display.show("gameplay");
                    game.reset();
                    board.reset();
                    window.addEventListener('devicemotion',
                        deviceMotionHandler, false);
                    display.screens['gameplay'].instructions['tilt'].show();
                });
            } else {
                $("#hardcore").css("opacity", 0.2);
            }
            return {
                html: html
            };
        }();

        // game play screen
        screens['gameplay'] = function () {
            var html = $("#gameplay_screen");

            // init feedbacks on game screen
            var feedbacks = {};
            feedbacks["gameover"] = $("#gameover").hide();
            feedbacks["win"] = $("#win").hide();
            feedbacks["levelclear"] = $("#level_clear").hide();
            feedbacks["pause"] = $("#pause").hide();
            feedbacks["miss"] = $("#miss").hide();
            var clearFeedbacks = function () {
                for (kind in feedbacks)
                    feedbacks[kind].hide();
                buttons["replay"].hide();
                buttons["next"].hide();
            };

            // init instructions on game screen
            var instructions = {};
            instructions["launch"] = $("#launch_instruction").hide();
            instructions["tilt"] = $("#tilt_instruction").hide();
            instructions["drag"] = $("#drag_instruction").hide();
            var clearInstructions = function () {
                for (kind in instructions)
                    instructions[kind].hide();
            }

            // buttons on game play screen
            var buttonMenu = document.getElementById('button_menu');
            var buttons = {};
            buttons["menu"] = $("#button_menu");
            buttons["missile"] = $("#button_missile");
            buttons["movement"] = $("#movement_control");
            buttons["replay"] = $("#button_replay").hide()
            buttons["next"] = $("#button_next").hide();

            var replay = function () {
                game.reset();
                board.reset();
                clearFeedbacks();
            };

            var nextLevel = function () {
                game.gameplay.level.next();
                board.reset();
                clearFeedbacks();
                game.gameplay.pause();
            };

            $(document).ready(function () {
                buttons["replay"].bind("click", replay);
                buttons["menu"].bind("touchstart", function () {
                    buttonMenu.style.opacity = 1;
                });
                buttons["menu"].bind("touchend", function () {
                    buttonMenu.style.opacity = 0.7;
                    if (game.gameplay.playing() && game.gameplay.launched()) {showDialog('pause_menu');}
                    else {hideDialog('pause_menu');}
                });
                buttons["next"].bind("click", nextLevel);
            });

            // indicators
            var counters = {};
            counters["missile"] = $("#missile_count");
            counters["score"] = $("#score");
            counters["life"] = $("#life");
            counters["level"] = $("#level");
            
            var missilesStat = document.getElementById("missiles_stat");

            var missileShow = function () {
                this.buttons["missile"].css('opacity', 0.7);
                this.counters["missile"].css('opacity', 1);
                missilesStat.style.opacity = 1
            }

            var missileHide = function () {
                this.buttons["missile"].css('opacity', 0.1);
                this.counters["missile"].css('opacity', 0.1);
                missilesStat.style.opacity = 0.1;
            }

            return {
                buttons: buttons,
                instructions: instructions,
                feedbacks: feedbacks,
                counters: counters,
                html: html,
                nextLevel: nextLevel,
                replay: replay,
                missileShow: missileShow,
                missileHide: missileHide,
                clear: function () {
                    clearInstructions();
                    clearFeedbacks();
                }
            };
        }();

        // hide all screens by default
        for (i in screens) {
            screens[i].html.hide();
        }
    }();

    // show screen
    var show = function(name)
    {
        for (i in screens)
            screens[i].html.hide();
        $("#" + name + "_screen").fadeIn('fast');

    };

    return {
        init: init,
        show: show,
        screens: screens
    };
}();

$(document).ready(function () {
    display.show("splash");
});
