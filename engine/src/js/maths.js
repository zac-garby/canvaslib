clib.Maths = {};

clib.Maths.clamp = function(x, min, max) {
    check(3, 3, Number, Number, Number);
    return x < min ? min : x > max ? max : x;
};

clib.Maths.radToDeg = function(rad) {
    check(1, 1, Number);
    return rad * (180 / Math.PI);
};

clib.Maths.degToRad = function(deg) {
    check(1, 1, Number);
    return deg * (Math.PI / 180);
};

clib.Maths.lerp = function(a, b, t, allowExtrapolation = false) {
    check(3, 4, Number, Number, Number, Boolean);
    if (!allowExtrapolation) {
        t = clib.Math.clamp(t, 0, 1);
    }
    return a + t * (b - a);
};
