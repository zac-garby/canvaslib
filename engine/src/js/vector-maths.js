function validateVector(vec, throwError = false) {
    var x = vec.hasOwnProperty('x');
    var y = vec.hasOwnProperty('y');
    var valid = x && y;
    if (throwError && !valid) {
        if (!x && !y) throw new Error('Your vector must have an X and Y component!');
        if (!x) throw new Error('Your vector must have an X component!');
        if (!y) throw new Error('Your vector must have a Y component!');
    } else {
        return valid;
    }
}

function addVec (a, b) {
    check(2, 2, Object, Object);
    validateVector(a, true);
    validateVector(b, true);
    return {x: a.x + b.x, y: a.y + b.y};
}

function scaleVec (vec, scale) {
    check(2, 2, Object, Number);
    validateVector(vec, true);
    return {x: vec.x * scale, y: vec.y * scale};
}

function divideVec (vec, divisor) {
    check(2, 2, Object, Number);
    validateVector(vec, true);
    return scaleVec(vec, 1 / scale);
}

function lengthVec (vec) {
    check(1, 1, Object);
    validateVector(vec, true);
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

function dist (a, b) {
    check(2, 2, Object, Object);
    validateVector(a, true);
    validateVector(b, true);
    var dist = {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y)
    };
    return lengthVec(dist);
}

function normalizeVec (vec) {
    check(1, 1, Object);
    validateVector(vec, true);
    var len = lengthVec(vec);
    return {
        x: vec.x / len,
        y: vec.y / len
    };
}

function lerpVec (vec, targetVec, t, allowExtrapolation = false) {
    check(3, 4, Object, Object, Number, Boolean);
    validateVector(vec, true);
    validateVector(targetVec, true);
    return {
        x: clib.Maths.lerp(vec.x, targetVec.x, t, allowExtrapolation),
        y: clib.Maths.lerp(vec.y, targetVec.y, t, allowExtrapolation)
    };
}

function degToVec (deg) {
    check(1, 1, Number);
    return radToVec(clib.Maths.degToRad(deg));
}

function radToVec (rad) {
    check(1, 1, Number);
    return {
        x: Math.cos(rad),
        y: Math.sin(rad)
    };
}

function vecToRad (vec) {
    check(1, 1, Object);
    validateVector(vec, true);
    return Math.atan2(vec.y, vec.x);
}

function vecToDeg (vec) {
    check(1, 1, Object);
    validateVector(vec, true);
    return clib.Maths.radToDeg(vecToRad(vec));
}
