function exists (arg) {
    return !(arg === undefined || arg === null);
}

function check (args, min = -1, max = Infinity, types = []) {
    if (args.length < min) {
        throw new Error(`You must have at least ${min} arguments! You only have ${args.length}`);
    } else if (args.length > max) {
        throw new Error(`You must have no more than ${max} arguments! You have ${args.length}`);
    }

    for (var arg in args) {
        if (!args.hasOwnProperty(arg)) {
            continue;
        }
        if (exists(types[arg])) {
            if (typeof args[arg] == types[arg]) {
                throw new Error(`Argument ${parseInt(arg) + 1} must be of type ${types[arg]}, not ${typeof args[arg]}!`);
            }
        }
    }
}

function validateObject (obj, defObj) {
    for (var prop in defObj) {
        if (defObj.hasOwnProperty(prop)) {
            if (!obj.hasOwnProperty(prop) || typeof(defObj[prop]) != typeof(obj[prop])) {
                obj[prop] = defObj[prop];
            }
        }
    }
    return obj;
}
