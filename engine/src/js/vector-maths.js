function vecLength (vec) {
    return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
}

function dist (a, b) {
    var dist = {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y)
    };
    return vecLength(dist);
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
