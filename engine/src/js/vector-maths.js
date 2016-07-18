function vecLength (vec) {
    check(1, 1, Object);
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

function dist (a, b) {
    check(2, 2, Object, Object);
    var dist = {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y)
    };
    return vecLength(dist);
}

function normalize (vec) {
    check(1, 1, Object);
    var len = vecLength(vec);
    return {
        x: vec.x / len,
        y: vec.y / len
    };
}

function degToVec (deg) {
    check(1, 1, Number);
    return {
        x: Math.cos(deg),
        y: Math.sin(deg)
    };
}

function radToVec (rad) {
    check(1, 1, Number);
    return degToVec(radToDeg(rad));
}

function vecToRad (vec) {
    check(1, 1, Object);
    return Math.atan2(vec.y, vec.x);
}

function vecToDeg (vec) {
    check(1, 1, Object);
    return radToDeg(vecToRad(vec));
}
