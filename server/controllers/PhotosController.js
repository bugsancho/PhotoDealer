var Photo = require('mongoose').model('Photo');
var DEFAULT_PAGE_SIZE = 6;
module.exports = {
    getAllPhotos: function (req, res, next) {
        var queries = req.query;

        Photo.find({})
            .skip(queries.page * DEFAULT_PAGE_SIZE)
            .limit(DEFAULT_PAGE_SIZE)
            .sort(queries.sort)
            .exec(function (err, collection) {
                if (err) {
                    console.log('Photos could not be loaded: ' + err);
                }

                res.send(collection);
            })
    },
    getPhotoById: function (req, res, next) {
        Photo.findOne({_id: req.params.id})
            .exec(function (err, course) {
                if (err) {
                    console.log('Photo could not be loaded: ' + err);
                }

                res.send(course);
            })
    }
};
