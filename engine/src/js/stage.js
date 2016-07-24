clib.Stage = function(id = 'canvas', options = {}) {
    check(arguments, 1, 2);
    this.canvas = document.getElementById(id);
    if (this.canvas === null || this.canvas.nodeName != 'CANVAS') {
        throw new Error(`No canvas was found with the id: ${id}!`);
    }

    this.context = this.canvas.getContext('2d');

    this.is = {
        pathing: false
    };

    this.deltaTime = 0;
    this.fps = 0;

    this._mouse = {
        x: 0,
        y: 0,
        down: {}
    };

    this.keys = {};

    this.translated = {
        x: 0,
        y: 0
    };

    this._eventDispatcher = document.createElement('DIV');
    this._tickEvent = new Event('tick');
    this._lastTick = undefined;

    this._scenes = [];
    this._activeSceneName = undefined;

    this.options = validateObject(options, {
        background: 'white',
        focusable: true,
        focusedOutline: false,
        imageSmoothing: true,
        autoRound: true
    });

    this.canvas.style.background = options.background;
    if (options.focusable) {
        this.canvas.tabIndex = 1;
        if (!options.focusedOutline) {
            this.canvas.style.outline = 0;
        }
    }

    this.context.imageSmoothingEnabled = options.imageSmoothing;

    window.requestAnimationFrame(this._tick.bind(this));

    this.canvas.addEventListener('mousemove', (function(evt) {
        this._mouse = {
            x: evt.layerX,
            y: evt.layerY,
            down: this._mouse.down
        };
    }).bind(this));

    this.canvas.addEventListener('mousedown', (function(evt) {
        this._mouse.down[evt.button] = true;
    }).bind(this));

    this.canvas.addEventListener('mouseup', (function(evt) {
        this._mouse.down[evt.button] = false;
    }).bind(this));

    this.canvas.addEventListener('keydown', (function(evt) {
        this.keys[evt.keyCode] = true;
    }).bind(this));

    this.canvas.addEventListener('keyup', (function(evt) {
        this.keys[evt.keyCode] = false;
    }).bind(this));
};

clib.Stage.prototype.addScene = function(scene) {
    check(1, 1, clib.Scene);
    this._scenes.push(scene);
    scene.init(this);
    return this;
};

clib.Stage.prototype.addScenes = function(...scenes) {
    check(1, Infinity);
    for (var scene of scenes) {
        if (scene.constructor !== clib.Scene) {
            throw new Error('All the scenes must be of type clib.Scene');
        }
    }
    for (scene of scenes) {
        this.addScene(scene);
    }
    return this;
};

clib.Stage.prototype.setActiveScene = function(name) {
    check(1, 1, String);
    for (var scene of this._scenes) {
        if (scene.name === name) {
            this._activeSceneName = scene.name;
            scene.enter(this);
            requestAnimationFrame(function() { // jshint ignore: line
                scene.active = true;
            });
        } else {
            if (scene.active) scene.exit(this);
            scene.active = false;
        }
    }
    return this;
};

clib.Stage.prototype.getActiveScene = function() {
    for (var scene of this._scenes) {
        if (scene.name === this._activeSceneName) {
            return scene;
        }
    }
    return undefined;
};

clib.Stage.prototype.updateScene = function() {
    var scene = this.getActiveScene();
    if (exists(scene)) {
        scene.update(this, this.deltaTime);
    }
    return this;
};

clib.Stage.prototype.renderScene = function() {
    var scene = this.getActiveScene();
    if (exists(scene)) {
        scene.render(this, this.deltaTime);
    }
    return this;
};

clib.Stage.prototype.addEventListener = function(evt, callback) {
    check(2, 2, String, Function);
    if ((['mousedown', 'mousemove', 'mouseup', 'keydown', 'keyup']).indexOf(evt) != -1) {
        this.canvas.addEventListener(evt, callback, false);
    }
    this._eventDispatcher.addEventListener(evt, callback, false);
    return this;
};

clib.Stage.prototype.on = function(evt, callback) {
    this.addEventListener(evt, callback);
    return this;
};

clib.Stage.prototype._dispatch = function(evt) {
    check(1, 1, Object);
    this._eventDispatcher.dispatchEvent(evt);
};

clib.Stage.prototype._tick = function() {
    if (exists(this._lastTick)) {
        var now = Date.now();
        this.deltaTime = (now - this._lastTick) / 1000;
        this._lastTick = now;
        this.fps = 1 / this.deltaTime;
    } else {
        this._lastTick = Date.now();
    }

    this._dispatch(this._tickEvent);
    window.requestAnimationFrame(this._tick.bind(this));
};

clib.Stage.prototype.getMouse = function() {
    return {
        x: this._mouse.x - this.translated.x,
        y: this._mouse.y - this.translated.y,
        down: this._down
    };
};

clib.Stage.prototype.getDimensions = function() {
    return {
        width: this.canvas.width,
        height: this.canvas.height,
        half: {
            width: this.canvas.width / 2,
            height: this.canvas.height / 2
        }
    };
};

clib.Stage.prototype.clear = function() {
    var dim = this.getDimensions();
    this.context.save();
    this.context.resetTransform();
    this.context.clearRect(0, 0, dim.width, dim.height);
    this.context.restore();
    return this;
};

clib.Stage.prototype.translate = function(x, y) {
    check(2, 2, Number, Number);
    this.context.translate(x, y);
    this.translated.x += x;
    this.translated.y += y;
    return this;
};

clib.Stage.prototype.translateX = function(dist) {
    check(1, 1, Number);
    this.translate(dist, 0);
    return this;
};

clib.Stage.prototype.translateY = function(dist) {
    check(1, 1, Number);
    this.translate(0, dist);
    return this;
};

clib.Stage.prototype.beginPath = function() {
    this.context.beginPath();
    this.is.pathing = true;
    return this;
};

clib.Stage.prototype.closePath = function() {
    this.context.closePath();
    this.is.pathing = false;
    return this;
};

clib.Stage.prototype.moveTo = function(x, y) {
    check(2, 2, Number, Number);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.moveTo(x, y);
    return this;
};

clib.Stage.prototype.lineTo = function(x, y) {
    check(2, 2, Number, Number);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.lineTo(x, y);
    return this;
};

clib.Stage.prototype.arc = function(x, y, radius, start, end, counterclockwise = false) {
    check(5, 6, Number, Number, Number, Number, Number, Boolean);
    if (radius < 0) throw new Error('The radius can be no less than 0!');
    if (!this.is.pathing) {
        this.beginPath().moveTo(x, y);
    }
    this.context.arc(x, y, radius, start, end, counterclockwise);
    return this;
};

clib.Stage.prototype.circle = function(x, y, radius) {
    check(3, 3, Number, Number, Number);
    if (radius < 0) throw new Error('The radius can be no less than 0!');
    if (!this.is.pathing) {
        this.beginPath().moveTo(x, y);
    }
    this.context.arc(x, y, radius, -Math.PI, Math.PI);
    return this;
};

clib.Stage.prototype.arcTo = function(x1, y1, x2, y2, radius) {
    check(5, 5, Number, Number, Number, Number, Number);
    if (radius < 0) throw new Error('The radius can be no less than 0!');
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.arcTo(x1, y1, x2, y2, radius);
    return this;
};

clib.Stage.prototype.bezierCurveTo = function(c1x, c1y, c2x, x2y, x, y) {
    check(6, 6, Number, Number, Number, Number, Number, Number);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
    return this;
};

clib.Stage.prototype.quadraticCurveTo = function(cx, cy, x, y) {
    check(4, 4, Number, Number, Number, Number);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.quadraticCurveTo(cx, cy, x, y);
    return this;
};

clib.Stage.prototype.rect = function(x, y, width, height) {
    check(4, 4, Number, Number, Number, Number);
    if (!this.is.pathing) {
        this.beginPath().moveTo(x, y);
    }
    this.context.rect(x, y, width, height);
    return this;
};

clib.Stage.prototype.polyline = function(verts) {
    check(1, 1, Array);
    if (verts.lenth < 2) {
        throw new Error('You must have at least 2 vertices!');
    }
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.moveTo(verts[0].x, verts[0].y);
    for (var vert in verts) {
        if (verts.hasOwnProperty(vert)) {
            var pos = {
                x: verts[vert].x,
                y: verts[vert].y
            };
            if (this.options.autoRound) {
                pos.x = Math.round(pos.x) + 0.5;
                pos.y = Math.round(pos.y) + 0.5;
            }
            this.lineTo(pos.x, pos.y);
        }
    }
    return this;
};

clib.Stage.prototype.poly = function(verts) {
    check(1, 1, Array);
    if (verts.length < 3) {
        throw new Error('You must have at least 3 vertices!');
    }
    this.polyline(verts);
    this.lineTo(verts[0].x, verts[0].y);
    return this;
};

clib.Stage.prototype.stroke = function(options = {}, shadow = {}) {
    check(0, 2, Object, Object);

    options = validateObject(options, {
        style: 'black',
        width: 0.5,
        join: 'miter',
        cap: 'butt'
    });

    shadow = validateObject(shadow, {
        colour: 'black',
        blur: 0,
        offsetX: 0,
        offsetY: 0
    });

    this.context.shadowColor = shadow.colour;
    this.context.shadowBlur = shadow.blur;
    this.context.shadowOffsetX = shadow.offsetX;
    this.context.shadowOffsetY = shadow.offsetY;

    this.context.strokeStyle = options.style;
    this.context.lineWidth = options.width;
    this.context.lineJoin = options.join;
    this.context.lineCap = options.cap;
    this.context.save();
    this.context.translate(0.5, 0.5);
    this.context.stroke();
    this.context.restore();
    return this;
};

clib.Stage.prototype.fill = function(options = {}, shadow = {}) {
    check(0, 2, Object, Object);

    options = validateObject(options, {
        style: 'black'
    });

    shadow = validateObject(shadow, {
        colour: 'black',
        blur: 0,
        offsetX: 0,
        offsetY: 0
    });

    this.context.shadowColor = shadow.colour;
    this.context.shadowBlur = shadow.blur;
    this.context.shadowOffsetX = shadow.offsetX;
    this.context.shadowOffsetY = shadow.offsetY;

    this.context.fillStyle = options.style;
    this.context.fill();
    return this;
};

clib.Stage.prototype.drawImage = function(image, x, y, width = image.width, height = image.height) {
    check(3, 5, Image, Number, Number, Number, Number);
    this.context.drawImage(image, x, y, width, height);
    return this;
};
