var stage;
var images;
var imageSources = {};

var menu = new clib.Scene('menu', {
    init: function(stage) {
        stage.on('keydown', (function(evt) {
            if (this.active && evt.keyCode == 68)
                stage.setActiveScene('play');
        }).bind(this));
    },
    render: function(stage, dt) {
        stage.rect(50, 50, 800, 500).fill().closePath();
    }
});

var play = new clib.Scene('play', {
    init: function(stage, dt) {
        stage.on('keydown', (function(evt) {
            if (this.active && evt.keyCode == 65)
                stage.setActiveScene('menu');
        }).bind(this));
        this.x = 0;
    },
    update: function(stage, dt) {
        this.x += 100 * dt;
    },
    render: function(stage, dt) {
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
