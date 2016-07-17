var stage;
var images;
var imageSources = {};

function init() {
    stage = new Stage('canvas', {});

    loadImages(imageSources, function(imgs) {
        images = imgs;
        stage.on('tick', function() { // Begin ticking the game, once the images are loaded
            tick();
        });
    });
}

function tick() {
    render();
}

function render() {
    stage.clear();
}
