function exists (arg) {
    return !(arg === undefined || arg === null);
}

function check (args, min = -1, max = Infinity, types = []) {
    if (args.length < min) {
        throw new Error(`You must have at least ${min} arguments! You only have ${args.length}`);
    } else if (args.length > max) {
        throw new Error(`You must have no more than ${max} arguments! You have ${args.length}`);
    }

    for (var arg in args) {
        if (!args.hasOwnProperty(arg)) {
            continue;
        }
        if (exists(types[arg])) {
            if (typeof args[arg] == types[arg]) {
                throw new Error(`Argument ${parseInt(arg) + 1} must be of type ${types[arg]}, not ${typeof args[arg]}!`);
            }
        }
    }
}

function validateObject (obj, defObj) {
    for (var prop in defObj) {
        if (defObj.hasOwnProperty(prop)) {
            if (!obj.hasOwnProperty(prop) || typeof(defObj[prop]) != typeof(obj[prop])) {
                obj[prop] = defObj[prop];
            }
        }
    }
    return obj;
}

function clamp (x, min, max) {
    return x < min ? min : x > max ? max : x;
}

function radToDeg (rad) {
    return rad * (180 / Math.PI);
}

function degToRad (deg) {
    return deg * (Math.PI / 180);
}

function vecLength (vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

function normalize (vec) {
    var len = vecLength(vec);
    return {
        x: vec.x / len,
        y: vec.y / len
    };
}

function degToVec (deg) {
    return {
        x: Math.cos(deg),
        y: Math.sin(deg)
    };
}

function radToVec (rad) {
    return degToVec(radToDeg(rad));
}

function vecToRad (vec) {
    return Math.atan2(vec.y, vec.x);
}

function vecToDeg (vec) {
    return radToDeg(vecToRad(vec));
}

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
