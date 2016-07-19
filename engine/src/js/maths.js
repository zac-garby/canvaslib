clib.Maths = {};

clib.Maths.clamp = function(x, min, max) {
    return x < min ? min : x > max ? max : x;
};

clib.Maths.radToDeg = function(rad) {
    return rad * (180 / Math.PI);
};

clib.Maths.degToRad = function(deg) {
    return deg * (Math.PI / 180);
};
