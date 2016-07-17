var Stage = function (id = 'canvas', options = {}) {
    check(arguments, 1, 2);
    this.canvas = document.getElementById (id);
    if (this.canvas === null || this.canvas.nodeName != 'CANVAS') {
        throw new Error(`No canvas was found with the id: ${id}!`);
    }

    this.context = this.canvas.getContext ('2d');

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

    this.translated = {x: 0, y: 0};

    this._eventDispatcher = document.createElement('DIV');
    this._tickEvent = new Event('tick');
    this._lastTick = undefined;

    options = validateObject(options, {
        background: 'white',
        focusable: true,
        focusedOutline: false
    });

    this.canvas.style.background = options.background;
    if (options.focusable) {
        this.canvas.tabIndex = 1;
        if (!options.focusedOutline) {
            this.canvas.style.outline = 0;
        }
    }

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

Stage.prototype.addEventListener = function (evt, callback) {
    check(2, 2, ['string', 'function']);
    if ((['mousedown', 'mousemove', 'mouseup', 'keydown', 'keyup']).indexOf(evt) != -1) {
        this.canvas.addEventListener(evt, callback, false);
    }
    this._eventDispatcher.addEventListener(evt, callback, false);
    return this;
};

Stage.prototype.on = function (evt, callback) {
    this.addEventListener(evt, callback);
    return this;
};

Stage.prototype._dispatch = function (evt) {
    check(1, 1, ['object']);
    this._eventDispatcher.dispatchEvent(evt);
};

Stage.prototype._tick = function () {
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

Stage.prototype.getMouse = function () {
    return {
        x: this._mouse.x - this.translated.x,
        y: this._mouse.y - this.translated.y,
        down: this._down
    };
};

Stage.prototype.getDimensions = function () {
    return {
        width: this.canvas.width,
        height: this.canvas.height,
        half: {
            width: this.canvas.width / 2,
            height: this.canvas.height / 2
        }
    };
};

Stage.prototype.clear = function () {
    var dim = this.getDimensions();
    this.context.save();
    this.context.resetTransform();
    this.context.clearRect(0, 0, dim.width, dim.height);
    this.context.restore();
    return this;
};

Stage.prototype.translate = function (x, y) {
    check(2, 2, ['number', 'number']);
    this.context.translate(x, y);
    this.translated.x += x;
    this.translated.y += y;
    return this;
};

Stage.prototype.translateX = function (dist) {
    check(1, 1, ['number']);
    this.translate(dist, 0);
    return this;
};

Stage.prototype.translateY = function (dist) {
    check(1, 1, ['number']);
    this.translate(0, dist);
    return this;
};

Stage.prototype.beginPath = function () {
    this.context.beginPath();
    this.is.pathing = true;
    return this;
};

Stage.prototype.closePath = function () {
    this.context.closePath();
    this.is.pathing = false;
    return this;
};

Stage.prototype.moveTo = function (x, y) {
    check(2, 2, ['number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.moveTo(x, y);
    return this;
};

Stage.prototype.lineTo = function (x, y) {
    check(2, 2, ['number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.lineTo(x, y);
    return this;
};

Stage.prototype.arc = function (x, y, radius, start, end, counterclockwise = false) {
    check(5, 6, ['number', 'number', 'number', 'number', 'number', 'boolean']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.arc(x, y, radius, start, end, counterclockwise);
    return this;
};

Stage.prototype.circle = function (x, y, radius) {
    check(3, 3, ['number', 'number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.arc(x, y, radius, -Math.PI, Math.PI);
    return this;
};

Stage.prototype.arcTo = function (x1, y1, x2, y2, radius) {
    check(5, 5, ['number', 'number', 'number', 'number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.arcTo(x1, y1, x2, y2, radius);
    return this;
};

Stage.prototype.bezierCurveTo = function (c1x, c1y, c2x, x2y, x, y) {
    check(6, 6, ['number', 'number', 'number', 'number', 'number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.bezierCurveTo(c1x, c1y, c2x, c2y, x, y);
    return this;
};

Stage.prototype.quadraticCurveTo = function (cx, cy, x, y) {
    check(4, 4, ['number', 'number', 'number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.quadraticCurveTo(cx, cy, x, y);
    return this;
};

Stage.prototype.rect = function (x, y, width, height) {
    check(4, 4, ['number', 'number', 'number', 'number']);
    if (!this.is.pathing) {
        this.beginPath();
    }
    this.context.rect(x, y, width, height);
    return this;
};

Stage.prototype.stroke = function (options = {}, shadow = {}) {
    check(0, 1, ['object']);

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

Stage.prototype.fill = function (options = {}, shadow = {}) {
    check(0, 1, ['object']);

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
