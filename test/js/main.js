var stage;
var images;
var imageSources = {};

var menu = new clib.Scene('menu', {
    enter: function(stage) {
        console.log('Entering menu scene');
    },
    exit: function(stage) {
        console.log('Exiting menu scene');
    },
    render: function(stage, dt) {
        if (stage.keys[68]) stage.setActiveScene('play');
        stage.rect(50, 50, 800, 500).fill().closePath();
    }
});

var play = new clib.Scene('play', {
    init: function(stage, dt) {
        this.x = 0;
    },
    enter: function(stage) {
        console.log('Entering play scene!');
    },
    exit: function(stage) {
        console.log('Exiting play scene!');
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

    stage.addScenes(menu, play).setActiveScene('menu');

    stage.on('tick', function() { // Call 'tick()' every stage update
        tick();
    });
}

function tick() {
    stage.updateScene();
    render(); // Render stuff
}

function render() {
    stage.clear().renderScene();
}
