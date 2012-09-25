// audio control object
var audio =  function() {
    var max_hits = 3;
    var next_hit = 0;
    // use an array of html5 audio elements for simulataneous hit.m4a playback
    var hit = new Array(max_hits);
    for (i = 0; i < max_hits; i++) {
        hit[i] = new Audio("audio/hit.m4a");
        hit[i].load();
    }
    var powerUp = new Audio("audio/catch.m4a");
    var missileLaunch = new Audio("audio/missile_launch.m4a");
    var bounce = new Audio("audio/bounce.m4a");
    var background = new Audio("audio/background.mp3");
    bounce.load();
    missileLaunch.load();
    powerUp.load();
    background.load();

    // muted
    var musicEnabled = false;
    var sfxEnabled = true;

    // the background music is looped
    background.loop = true;

    // play audio helper function
    function playSound (sound) {
        sound.play();
    }

    // play the different audios
    var play = function (kind) {
        if (!this.sfxEnabled)
            return;
        if ($("#game_area").css("display") == "none")
            return;
        if (kind == "hit") {
            playSound(hit[next_hit]);
            next_hit = (next_hit + 1) % max_hits;
        } else if (kind == "powerUp") {
            playSound(powerUp);
        } else if (kind == "missileLaunch") {
            playSound(missileLaunch);
        } else if (kind == "bounce") {
            playSound(bounce);
        }
    }

    return {
            musicEnabled: musicEnabled,
            sfxEnabled: sfxEnabled,
            background: background,
            play: play,
            };
}();

// play background music when the page is finish loading
var buttonMusicOn = document.getElementById('button_music_on');
var buttonMusicOff = document.getElementById('button_music_off');
var buttonSfxOn = document.getElementById('button_sfx_on');
var buttonSfxOff = document.getElementById('button_sfx_off');

$(document).ready( function () {
        $("#button_music_on").bind("touchstart", function () {
            buttonMusicOn.style.opacity = 1;
        });
        $("#button_music_on").bind("touchend", function () {
            buttonMusicOn.style.opacity = 0.7;
            $(this).hide();
            $("#button_music_off").show();
            audio.background.pause();
            audio.musicEnabled = !audio.musicEnabled;
        });
        $("#button_music_off").bind("touchstart", function () {
            buttonMusicOff.style.opacity = 1;
        });
        $("#button_music_off").bind("touchend", function () {
            buttonMusicOff.style.opacity = 0.7;
            $(this).hide();
            $("#button_music_on").show();
            audio.background.play();
            audio.musicEnabled = !audio.musicEnabled;
        });
        $("#button_sfx_on").bind("touchstart", function () {
            buttonSfxOn.style.opacity = 1;
        });
        $("#button_sfx_on").bind("touchend", function () {
            buttonSfxOn.style.opacity = 0.7;
            $(this).hide();
            $("#button_sfx_off").show();
            audio.sfxEnabled = !audio.sfxEnabled;
        });
        $("#button_sfx_off").bind("touchstart", function () {
            buttonSfxOff.style.opacity = 1;
        });
        $("#button_sfx_off").bind("touchend", function () {
            buttonSfxOff.style.opacity = 0.7;
            $(this).hide();
            $("#button_sfx_on").show();
            audio.sfxEnabled = !audio.sfxEnabled;
        });
        if (audio.musicEnabled) {
            audio.background.play();
            $("#button_music_off").hide();
            $("#button_music_on").show();
        } else {
            $("#button_music_off").show();
            $("#button_music_on").hide();
        }
        if (audio.sfxEnabled) {
            $("#button_sfx_off").hide();
            $("#button_sfx_on").show();
        } else {
            $("#button_sfx_off").show();
            $("#button_sfx_on").hide();
        }
});
