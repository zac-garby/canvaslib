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

clib.Maths.lerp = function(a, b, t, allowExtrapolation = false) {
    if (!allowExtrapolation) {
        t = clib.Math.clamp(t, 0, 1);
    }
    return a + t * (b - a);
};
