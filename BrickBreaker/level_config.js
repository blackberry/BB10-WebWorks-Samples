var brick = function () {
    var create = function (template) {
        var hits = template.hits ? template.hits : 0;
        var isVisibilitySwitchable = template.isVisibilitySwitchable ? true : false;
        var powerUp = template.powerUp ? template.powerUp : false;
        var switcher = template.switcher ? template.switcher : false;
        var isVisible;
        if (template.isVisible === false) {
            isVisible = false;
        } else {
            isVisible = true;
        }
        return {
            hits: hits,
            isVisibilitySwitchable: isVisibilitySwitchable,
            isVisible: isVisible,
            powerUp: powerUp,
            switcher: switcher
        };
    };

    return {
        create: create
    };
}();

var levelConfig = function () {
    var bricks = new Array();

    for (var i = 0; i < config.board.ROW * config.board.COL; i++)
        bricks[i] = brick.create({});

    var random = function () {
        return Math.floor(Math.random() * powerUp.TOTAL_TYPES);
    };

    with (powerUp.Type) {
        switch (game.gameplay.level.current()) {
            case (1):
                // level 1 (First level)
                bricks[9] = brick.create({ hits: 2 });
                bricks[10] = brick.create({ hits: 2 });
                bricks[16] = brick.create({ hits: 2 });
                bricks[18] = brick.create({ hits: 2 });
                bricks[23] = brick.create({ hits: 2 });
                bricks[25] = brick.create({ hits: 2 });
                bricks[30] = brick.create({ hits: 2 });
                bricks[31] = brick.create({ hits: 2 });
                bricks[37] = brick.create({ hits: 2 });
                bricks[39] = brick.create({ hits: 2 });
                bricks[44] = brick.create({ hits: 2 });
                bricks[46] = brick.create({ hits: 2 });
                bricks[51] = brick.create({ hits: 2 });
                bricks[52] = brick.create({ hits: 2 });
                break;
            case (2):
                // level 2
                bricks[0] = brick.create({ hits: 1 });
                bricks[6] = brick.create({ hits: 1 });
                bricks[8] = brick.create({ hits: 1, powerUp: random() });
                bricks[12] = brick.create({ hits: 1, powerUp: random() });
                bricks[16] = brick.create({ hits: 1 });
                bricks[18] = brick.create({ hits: 1 });
                bricks[24] = brick.create({ hits: 3 });
                bricks[30] = brick.create({ hits: 1 });
                bricks[32] = brick.create({ hits: 1 });
                bricks[38] = brick.create({ hits: 2 });
                break;
            case (3):
                // level 3
                bricks[9] = brick.create({ hits: 1, powerUp: random() });
                bricks[11] = brick.create({ hits: 1, powerUp: random() });
                bricks[15] = brick.create({ hits: 3 });
                bricks[19] = brick.create({ hits: 3 });
                bricks[23] = brick.create({ hits: 1 });
                bricks[25] = brick.create({ hits: 1 });
                bricks[17] = brick.create({ hits: 1, powerUp: random() });
                bricks[31] = brick.create({ hits: 3 });
                bricks[49] = brick.create({ hits: 1 });
                bricks[43] = brick.create({ hits: 1 });
                bricks[37] = brick.create({ hits: 2 });
                bricks[39] = brick.create({ hits: 2 });
                bricks[47] = brick.create({ hits: 1 });
                bricks[55] = brick.create({ hits: 3 });
                break;
            case (4):
                // level 4
                bricks[8] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[10] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[12] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[22] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[26] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[36] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[38] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[40] = brick.create({
                    hits: 2,
                    isVisible: true,
                    isVisibilitySwitchable: true
                });
                bricks[9] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[11] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[15] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[19] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[29] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[33] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[37] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[39] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[24] = brick.create({
                    hits: 3,
                    switcher: 1
                });
                break;
            case (5):
                // level 5
                bricks[10] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true,
                    powerUp: random()
                });
                bricks[16] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true,
                    powerUp: random()
                });
                bricks[18] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true,
                    powerUp: random()
                });
                bricks[22] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true,
                    powerUp: random()
                });
                bricks[24] = brick.create({
                    hits: 3,
                    switcher: 1
                });
                bricks[26] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true,
                    powerUp: random()
                });
                bricks[28] = brick.create({ hits: 3 });
                bricks[30] = brick.create({ hits: 3 });
                bricks[32] = brick.create({ hits: 3 });
                bricks[34] = brick.create({ hits: 3 });
                bricks[42] = brick.create({ hits: 2 });
                bricks[44] = brick.create({ hits: 2 });
                bricks[46] = brick.create({ hits: 2 });
                bricks[48] = brick.create({ hits: 2 });
                bricks[56] = brick.create({ hits: 1 });
                bricks[58] = brick.create({ hits: 1 });
                bricks[60] = brick.create({ hits: 1 });
                bricks[62] = brick.create({ hits: 1 });
                break;
            case (6):
                // level 6
                bricks[10] = brick.create({
                    hits: 3,
                    powerUp: UFO
                });
                bricks[24] = brick.create({
                    hits: 3,
                    powerUp: UFO
                });
                bricks[38] = brick.create({
                    hits: 3,
                    powerUp: UFO
                });
                bricks[44] = brick.create({ hits: 3 });
                bricks[46] = brick.create({ hits: 3 });
                bricks[50] = brick.create({ hits: 2 });
                bricks[52] = brick.create({
                    hits: 3,
                    powerUp: MISSILE
                });
                bricks[54] = brick.create({ hits: 2 });
                bricks[56] = brick.create({ hits: 2 });
                bricks[62] = brick.create({ hits: 2 });
                break;
            case (7):
                // level 7
                bricks[3] = brick.create({ hits: 1, powerUp: random() });
                bricks[9] = brick.create({ hits: 1, powerUp: random() });
                bricks[11] = brick.create({ hits: 1, powerUp: random() });
                bricks[17] = brick.create({ hits: 1, powerUp: random() });
                bricks[31] = brick.create({
                    hits: 1,
                    switcher: 1
                });
                bricks[15] = brick.create({ hits: 2 });
                bricks[23] = brick.create({ hits: 2 });
                bricks[25] = brick.create({ hits: 2 });
                bricks[19] = brick.create({ hits: 2 });
                bricks[49] = brick.create({ hits: 4 });
                bricks[51] = brick.create({ hits: 2 });
                bricks[53] = brick.create({ hits: 4 });
                bricks[55] = brick.create({ hits: 2 });
                bricks[63] = brick.create({ hits: 2 });
                bricks[65] = brick.create({ hits: 4 });
                bricks[67] = brick.create({ hits: 2 });
                bricks[69] = brick.create({ hits: 4 });
                bricks[57] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[59] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[61] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                break;
            case (8):
                // level 8
                bricks[0] = brick.create({ hits: 3 });
                bricks[2] = brick.create({ hits: 3 });
                bricks[4] = brick.create({ hits: 3 });
                bricks[6] = brick.create({ hits: 3 });
                bricks[14] = brick.create({ hits: 3 });
                bricks[20] = brick.create({ hits: 3 });
                bricks[28] = brick.create({ hits: 3 });
                bricks[34] = brick.create({ hits: 3 });
                bricks[42] = brick.create({ hits: 3 });
                bricks[48] = brick.create({ hits: 3 });
                bricks[56] = brick.create({ hits: 3 });
                bricks[58] = brick.create({ hits: 3 });
                bricks[60] = brick.create({ hits: 3 });
                bricks[62] = brick.create({ hits: 3 });
                bricks[8] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[10] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[12] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[22] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[26] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[36] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[40] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[50] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[52] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[54] = brick.create({
                    hits: 3,
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[16] = brick.create({ hits: 4 });
                bricks[18] = brick.create({ hits: 4 });
                bricks[30] = brick.create({ hits: 4 });
                bricks[32] = brick.create({ hits: 4 });
                bricks[44] = brick.create({ hits: 4 });
                bricks[46] = brick.create({ hits: 4 });
                bricks[23] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[24] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[25] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[37] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[38] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[39] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[31] = brick.create({
                    hits: 1,
                    switcher: 1
                });
                break;
            case (9):
                // level 9
                bricks[56] = brick.create({ hits: 2 });
                bricks[58] = brick.create({ hits: 2 });
                bricks[60] = brick.create({ hits: 2 });
                bricks[62] = brick.create({ hits: 2 });
                bricks[64] = brick.create({ hits: 3 });
                bricks[66] = brick.create({ hits: 3 });
                bricks[68] = brick.create({ hits: 3 });
                bricks[17] = brick.create({ hits: 4 });
                bricks[23] = brick.create({ hits: 4 });
                bricks[25] = brick.create({ hits: 4 });
                bricks[29] = brick.create({ hits: 4 });
                bricks[33] = brick.create({ hits: 4 });
                bricks[37] = brick.create({ hits: 4 });
                bricks[39] = brick.create({ hits: 4 });
                bricks[45] = brick.create({ hits: 4 });
                bricks[84] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[86] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[88] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[90] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[92] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[94] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[96] = brick.create({
                    hits: 1,
                    powerUp: random(),
                    isVisible: false,
                    isVisibilitySwitchable: true
                });
                bricks[31] = brick.create({
                    hits: 1,
                    switcher: 1
                });
        }
    }

    if (game.gameplay.difficulty == 3) {
        game.gameplay.setTilt(true);
    } else {
        game.gameplay.setTilt(false);
    }

    return bricks;

}
