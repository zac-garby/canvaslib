var stage;
var images;
var imageSources = {};

function load() {
    clib.loadImages(imageSources, function(imgs) { // Load the images
        images = imgs; // When the images are loaded, save them into the images object
        init(); // and call 'init()'
    });
}

function init() {
    stage = new clib.Stage('canvas', {}); // Create the stage

    stage.on('tick', function() { // Call 'tick()' every stage update
        tick();
    });
}

function tick() {
    render(); // Render stuff
}

function render() {
    
}
