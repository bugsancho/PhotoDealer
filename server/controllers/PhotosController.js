var Photo = require('mongoose').model('Photo');

module.exports = {
    getAllPhotos: function (req, res, next) {
        Photo.find({})
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
