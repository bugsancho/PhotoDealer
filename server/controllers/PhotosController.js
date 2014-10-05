var Photo = require('mongoose').model('Photo');
var DEFAULT_PAGE_SIZE = 6;
var DEFAULT_NEW_PHOTOS_PAGE_SIZE = 4;

module.exports = {
    getAllPhotos: function (req, res, next) {
        var queries = req.query;

        Photo.find({})
            .skip(queries.page * DEFAULT_PAGE_SIZE)
            .limit(queries.limit || DEFAULT_PAGE_SIZE)
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
    },
    getLatestPhotos: function (req, res, next) {
        var queries = req.query;

        Photo.find({})
            .limit(DEFAULT_NEW_PHOTOS_PAGE_SIZE)
            .sort('published')
            .exec(function (err, collection) {
                if (err) {
                    console.log('Photos could not be loaded: ' + err);
                }

                res.send(collection);
            })
    },
    getPopularPhotos: function (req, res, next) {
        var queries = req.query;

        Photo.find({})
            .limit(DEFAULT_NEW_PHOTOS_PAGE_SIZE)
            .sort('-downloadsCount')
            .exec(function (err, collection) {
                if (err) {
                    console.log('Photos could not be loaded: ' + err);
                }

                res.send(collection);
            })
    }
};
