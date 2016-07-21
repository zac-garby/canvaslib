clib.Scene = function(name, functions) {
    check(2, 2, String, Object);
    this.name = name;
    this.active = false;

    functions = validateObject(functions, {
        init: function(stage) {},
        change: function(stage) {},
        update: function(stage, dt) {},
        render: function(stage, dt) {}
    });

    this.init = functions.init.bind(this);
    this.change = functions.change.bind(this);
    this.update = functions.update.bind(this);
    this.render = functions.render.bind(this);
};
