var underscore = require('underscore');

module.exports = {
    escapeHtml: function (req, res, next) {
        if (req.body) {
            iterate(req.body);
        }
        next();
    }
};


function iterate(obj) {
    underscore.each(obj, function (val, key) {
        if (underscore.isString(val)) {
            obj[key] = underscore.escape(val);
        }
        else if (underscore.isObject(val)) {
            iterate(val);
        }
    });
}