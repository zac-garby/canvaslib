# canvaslib
A JavaScript library which simplifies the use of a drawing on a HTML canvas, as well as handling input.

## Usage
Here's a simple example which creates a canvas, loads an image and draws it.

```javascript
var stage;
var images;
var imageSources = {
    duck: 'assets/duck.png'
};

function init() {
    stage = new Stage('canvas', {}); // Create the stage

    loadImages(imageSources, function(imgs) { // Begin loading the images
        images = imgs;
        // Once the images are loaded, start calling 'tick' every stage tick
        stage.on('tick', function() {
            tick();
        });
    });
}

function tick() {
    render(); // Render stuff
}

function render() {
    stage.clear() // Clear the stage, ready for drawing
        .drawImage(images.duck, 50, 50) // Draw the image
        .closePath(); // Close the path
}

```

It's all commented, so you can see how it works, but I haven't made a tutorial yet, so if you want to use canvaslib then either have to look through the source or just wait for a tutorial. I'll probably make one soon, probably.

## Contributing
If you want to something to be done, either create an issue or contribute it yourself; if you're going to do the latter then make sure that jshint allows it using the `.jshintrc` file found in `engine/src/js`, then submit a pull request.
