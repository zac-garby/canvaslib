function clamp (x, min, max) {
    return x < min ? min : x > max ? max : x;
}

function radToDeg (rad) {
    return rad * (180 / Math.PI);
}

function degToRad (deg) {
    return deg * (Math.PI / 180);
}
