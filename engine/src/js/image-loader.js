function loadImages(sources, finishCallback, singleCallback = (img) => undefined) {
    var images = {};
    var loadedImages = 0;
    var numImages = Object.keys(sources).length;

    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function() { // jshint ignore: line
            singleCallback(images[src]);
            if (++loadedImages >= numImages) {
                finishCallback(images);
            }
        };
        images[src].src = sources[src];
    }
}
