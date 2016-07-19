clib.Collisions = {};

clib.Collisions.circle = {
    contains: {}
};

clib.Collisions.aabb = {
    contains: {}
};

/* Circle clib.Collisions */
clib.Collisions.circle.circle = function (a, b) {
    var distance = dist(a, b);
    return distance <= a.radius + b.radius;
};

clib.Collisions.circle.aabb = function (circle, aabb) {
    return clib.Collisions.aabb.circle(aabb, circle);
};

clib.Collisions.circle.contains.point = function (circle, point) {
    var distance = dist(circle, point);
    return distance <= circle.radius;
};

/* AABB clib.Collisions */
clib.Collisions.aabb.aabb = function (a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
};

clib.Collisions.aabb.circle = function (aabb, circle) {
    var rects = [
        { x: aabb.x - circle.radius, y: aabb.y,
            width: aabb.width + (circle.radius * 2), height: aabb.height },
        { x: aabb.x, y: aabb.y - circle.radius,
            width: aabb.width, height: aabb.height + (circle.radius * 2) }
    ];

    var circles = [
        { x: aabb.x, y: aabb.y, radius: circle.radius },
        { x: aabb.x + aabb.width, y: aabb.y, radius: circle.radius },
        { x: aabb.x + aabb.width, y: aabb.y + aabb.height, radius: circle.radius },
        { x: aabb.x, y: aabb.y + aabb.height, radius: circle.radius },
    ];

    var collides = false;

    for (var c = 0; c < circles.length; c++)
        if (clib.Collisions.circle.contains.point(circles[c], circle)) collides = true;

    for (var i = 0; i < rects.length; i++)
        if (clib.Collisions.aabb.contains.point(rects[i], circle)) collides = true;

    return collides;
};

clib.Collisions.aabb.contains.point = function (aabb, point) {
    return point.x > aabb.x &&
        point.x < aabb.x + aabb.width &&
        point.y > aabb.y &&
        point.y < aabb.y + aabb.height;
};
