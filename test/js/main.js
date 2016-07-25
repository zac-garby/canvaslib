var stage;
var images;
var imageSources = {};

var menu = new clib.Scene('menu', {
    init: function(stage) {
        stage.addEventListener('keydown', (function(evt) {
            if (this.active) {
                stage.setActiveScene('play');
            }
        }).bind(this));
    },
    render: function(stage, dt) {
        var dim = stage.getDimensions();
        stage.fillText('Press any key to begin...', dim.width / 2, dim.height / 2, {
            align: 'center',
            baseline: 'middle',
            font: '60px sans-serif'
        });
    }
});

var play = new clib.Scene('play', {
    render: function(stage, dt) {
        var dim = stage.getDimensions();
        stage.fillText('Play scene', dim.width / 2, dim.height / 2, {
            align: 'center',
            baseline: 'middle',
            font: '60px sans-serif'
        });
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
    stage.clear().renderScene();
}
