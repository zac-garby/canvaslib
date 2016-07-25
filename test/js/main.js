var stage;
var images;
var imageSources = {};

var menu = new clib.Scene('menu', {
    render: function(stage, dt) {
        if (stage.keys[68]) stage.setActiveScene('play');
        stage.rect(50, 50, 800, 500).fill().closePath();
    }
});

var play = new clib.Scene('play', {
    init: function(stage, dt) {
        this.x = 0;
    },
    update: function(stage, dt) {
        this.x += 100 * dt;
    },
    render: function(stage, dt) {
        if (stage.keys[65]) stage.setActiveScene('menu');
        stage.circle(this.x, 300, 100).fill().closePath();
    }
});

function load() {
    clib.loadImages(imageSources, function(imgs) { // Load the images
        images = imgs; // When the images are loaded, save them into the images object
        init(); // and call 'init()'
    });
}

function init() {
    stage = new clib.Stage('canvas', {}); // Create the stage

    stage.addScenes(menu, play);
    stage.setActiveScene('menu');

    stage.on('tick', function() { // Call 'tick()' every stage update
        tick();
    });
}

function tick() {
    stage.updateScene();
    render(); // Render stuff
}

function render() {
    stage.clear();
    stage.renderScene();
}
