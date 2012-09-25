// this object handles splash animation
var splash = function() {
    // if the animation is playing
    playing = true;
    // frame count
    frame = 0;
    // time count
    time =  0;
    // total duration
    totalDuration = 16000;

    // man
    var man = animation.createObject({
        duration: 20000,
        html: [
        $("#man1"),
        $("#man2").hide(),
        $("#man3").hide(),
        $("#man4").hide()
        ],
        velocity: { x: 2, y: 0 },
        pos: { x: 0, y: 15 },
        swappable: false,
        keyframes: [
    {
        start: 0.2,
        end: 0.6,
        task: function(html) {
            html[0].hide();
            html[1].show();
            return {
                velocity: { x: 0, y: 0 }
            } ;
        }
    },
    {
        start: 0.5,
        end: 1.0,
        task: function(html) {
            html[1].hide();
            return {
                velocity: { x: 25, y: 0 },
                swappable: { from: 2, to: 3 }
            };
        }
    }
    ],
        positionMethod: {
            x: "left",
            y: "bottom"
        }
    });

    // dog
    var dog = animation.createObject({
        duration: 20000,
        html: [
        $("#dog")
        ],
        velocity: { x: 2, y: 0 },
        pos: { x: 5, y: 15 },
        keyframes: [
    {
        start: 0.2,
        end: 0.4,
        task: function(html) {
            return {
                velocity: { x: 0, y: 0 }
            } ;
        }
    },
    {
        start: 0.4,
        end: 0.4125,
        task: function(html) {
            return {
                velocity: { x: -35, y: 0 },
            };
        }
    },
    {
        start: 0.4125,
        end: 0.6,
        task: function(html) {
            return {
                velocity: { x: 0, y: 0 },
            };
        }
    },
    {
        start: 0.55,
        end: 1.0,
        task: function(html) {
            return {
                velocity: { x: 35, y: 0 },
            };
        }
    }
    ],
        positionMethod: {
            x: "left",
            y: "bottom"
        }
    });

    // people
    var people = animation.createObject({
        duration: 8000,
        html: [
        $("#people1"),
        $("#people2").hide(),
        ],
        velocity: { x: -20, y: 0 },
        pos: { x: 100, y: 15 },
        swappable: { from: 0, to: 1 },
        keyframes: [],
        positionMethod: {
            x: "left",
        y: "bottom"
        }
    });

    // ufo
    var ufo = animation.createObject({
        duration: 20000,
        html: [
        $("#ufo1"),
        $("#ufo2").hide(),
        ],
        velocity: { x: -15, y: 0 },
        pos: { x: 100, y: 15 },
        wave: function (frame) {
            return 2 * Math.sin(frame / 10);
        },
        keyframes: [
    {
        start: 0.3,
        end: 0.5,
        task: function(html) {
            return {
                velocity: { x: 0, y: 0 }
            } ;
        }
    },
    {
        start: 0.5,
        end: 1,
        task: function(html) {
            html[0].hide();
            html[1].show();
            return {
                velocity: { x: 50, y: 0 }
            } ;
        }
    }
        ],
        positionMethod: {
            x: "left",
            y: "top"
        }
    });

    // bricks
    var bricks = new Array();
    for (var i = 0; i < 4; i++) {
        bricks[i] = animation.createObject({
            duration: 20000,
            html: [
            $("#brick" + (i + 1)).hide()
            ],
            velocity: { x: 0, y: 0 },
            pos: { x: function (i) {
                switch (i) {
                    case 0:
                        return 75;
                    case 1:
                        return 50;
                    case 2:
                        return 30;
                    case 3:
                        return 15;
                }
            }(i),
                y: 25 },
            keyframes: [
        {
            start: function (i) {
                       switch (i) {
                           case 0:
                               return 0.1;
                           case 1:
                               return 0.18;
                           case 2:
                               return 0.25;
                           case 3:
                               return 0.4;
                       }
                   }(i),
            end: function (i) {
                     switch (i) {
                         case 0:
                             return 0.1;
                         case 1:
                             return 0.18;
                         case 2:
                             return 0.25;
                         case 3:
                             return 0.4;
                     }
                 }(i) + 0.028,
            task: function(html) {
                      html[0].show();
                      return {
                          velocity: { x: 0, y: 100 }
                      };
                  }
        }],
            positionMethod: {
                                x: "left",
                                y: "top"
                            }
        });
    }

    // end the animtion
    var end = function () {
        playing = false;
        display.screens["splash"].html.fadeOut("slow");
    };

    // draw all the animated objects
    var draw = function (interval) {
        // if splash is over
        if (time > totalDuration) {
            end();
            setTimeout(function() { display.show("welcome"); }, 1500);
        }
        frame += 1;
        time += interval;
        man.draw(interval);
        dog.draw(interval);
        people.draw(interval);
        ufo.draw(interval);
        for (i in bricks)
            bricks[i].draw(interval);
    };

    return {
        playing: function() { return playing; },
        draw: draw,
        end: end
    };

}();
