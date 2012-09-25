var fps = function () {
    var frameCount = 0;
    var startTime = new Date();
    var update = function () {
        if (frameCount > 20) {
            // update every 20 frames
            var currentTime = new Date();
            var diff = currentTime.getTime() - startTime.getTime();
            startTime = currentTime;
            $("#fps").text("FPS: " + Math.round(frameCount / diff * 1000));
            frameCount = 0;
        }
    };
    var addFrame = function () {
        frameCount += 1;
    };
    return {
        addFrame: addFrame,
        update: update
    };
}();

$(document).ready(function () {
    $("<p>")
        .attr('id', 'fps')
        .css('position', 'absolute')
        .css('right','5px')
        .css('color', 'white')
        .css('-webkit-transform', 'translateZ(0)')
        .appendTo("body").hide();
});
