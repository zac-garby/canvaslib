var Random = {
    vector: function (len = 1) {
        var angle = Math.random(-Math.PI, Math.PI);
        var vec = radToVec(angle);
        return {
            x: vec.x * len,
            y: vec.y * len
        };
    },
    range: function (min, max) {
        if (arguments.length == 1) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min;
    },
    intRange: function (min, max) {
        if (arguments.length == 1) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min) + min);
    },
    angle: function (unit = 'deg') {
        if (unit == 'deg' || unit == 'degrees' || unit == 'd') {
            return Random.range(0, 360);
        } else if (unit == 'rad' || unit == 'radians' || unit == 'r') {
            return Random.range(-Math.PI, Math.PI);
        } else {
            throw new Error('You must specify the unit as either d, deg, degrees, r, rad, or radians!');
        }
    }
};
