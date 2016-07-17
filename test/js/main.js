var stage;

function init() {
    stage = new Stage('canvas', {});
    stage.on('tick', function() {
        tick();
    });
}

function tick() {
    render();
}

function render() {
    stage.clear();

    var mouse = stage.getMouse();
    var dim = stage.getDimensions();

    var collides = Collisions.circle.aabb({
        x: mouse.x,
        y: mouse.y,
        radius: 40
    }, {
        x: dim.half.width - 100,
        y: dim.half.height - 50,
        width: 200,
        height: 100
    });

    stage
        .moveTo(dim.half.width - 100, dim.half.height - 50)
        .rect(dim.half.width - 100, dim.half.height - 50, 200, 100)
        .fill()
        .closePath();

    stage
        .moveTo(mouse.x, mouse.y)
        .circle(mouse.x, mouse.y, 40)
        .fill({style: collides ? 'red' : 'black'})
        .closePath();
}
