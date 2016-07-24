clib.Scene = function(name, functions) {
    check(2, 2, String, Object);
    this.name = name;
    this.active = false;

    functions = validateObject(functions, {
        init: function(stage) {},
        enter: function(stage) {},
        exit: function(stage) {},
        update: function(stage, dt) {},
        render: function(stage, dt) {}
    });

    this.init = functions.init.bind(this);
    this.enter = functions.enter.bind(this);
    this.exit = functions.exit.bind(this);
    this.update = functions.update.bind(this);
    this.render = functions.render.bind(this);
};
