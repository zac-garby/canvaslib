let stage;

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
}
