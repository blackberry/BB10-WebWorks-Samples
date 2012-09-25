// generic animation object
var animation = function () {
    // animated object
    var createObject = function (object) {
        // animation progress [0, 1]
        var progress = 0;
        // animation duration
        var duration = object.duration;
        // jquery element
        var html = object.html;
        // position
        var pos = object.pos;
        // velocity
        var velocity = object.velocity;
        // keyframes
        var keyframes = object.keyframes;
        // if the images need swap
        var swappable = object.swappable;
        // the object may move up and down using a sine curve
        var wave = object.wave;
        var swap = function () {
            if (frame % 5 == 0) {
                for (var i = swappable.from; i <= swappable.to; i++) {
                    if (html[i].css("display") == "block") {
                        html[i].hide();
                        if (i == swappable.to) {
                            html[swappable.from].show();
                        } else {
                            html[i+1].show();
                        }
                        break;
                    } else if (i == swappable.to) {
                        html[swappable.to].show();
                    }
                }
            }
        };
        // update the object
        var update = function (time) {
            progress += time / duration;
            for (i in keyframes)
                if (progress > keyframes[i].start
                        && progress < keyframes[i].end) {
                    var res = keyframes[i].task(html);
                    if (res.swappable)
                        swappable = res.swappable;
                    if (res.velocity)
                        velocity = res.velocity;
                    break;
                } else {
                    velocity = object.velocity;
                }
            pos.x += velocity.x * time / 1000;
            if (wave) {
                pos.y = object.wave(frame);
            } else {
                pos.y += velocity.y * time / 1000;
            }
        };
        // draw object
        var draw = function (time) {
            if (progress <= 1) {
                update(time);
                for (i in html) {
                    html[i].css(object.positionMethod.x, pos.x + "%");
                    html[i].css(object.positionMethod.y, pos.y + "%");
                }
                if (swappable) {
                    swap();
                }
            }
        };
        return {
            draw: draw
        };
    };
    return {
        createObject: createObject
    };
}();
