var Photo = require('mongoose').model('Photo');
var DEFAULT_PAGE_SIZE = 6;
var DEFAULT_NEW_PHOTOS_PAGE_SIZE = 4;

module.exports = {
    getAllPhotos: function (req, res, next) {
        var queries = req.query;
        var user = req.user;
        var onlyApprovedPhotos = true;
        if (user && user.roles.indexOf('admin') != -1) {
            if (queries.showUnapproved) {
                onlyApprovedPhotos = false;
            }
        }
        Photo.find({})
            .skip(queries.page * DEFAULT_PAGE_SIZE)
            .limit(queries.limit || DEFAULT_PAGE_SIZE)
            .sort(queries.sort)
            .where('isApproved', onlyApprovedPhotos)
            .select('published title downloadsCount pictureUrl authorName')
            .exec(function (err, collection) {
                if (err) {
                    console.log('Photos could not be loaded: ' + err);

                }
                res.send(collection);
            })
    },
    getPhotoById: function (req, res, next) {
        Photo.findOne({_id: req.params.id})
            .select('-imageData')
            .exec(function (err, photo) {

                if (err) {
                    console.log('Photo could not be loaded: ' + err);
                }
                res.send(photo);
            })
    },
    getPhotoFile: function (req, res, next) {
        Photo.findOne({_id: req.params.id})
            .exec(function (err, photo) {
                if (err) {
                    console.log('Photo could not be loaded: ' + err);
                }
                res.contentType(photo.imageData.contentType);
                res.send(photo.imageData.data);
            })
    },
    deletePhoto: function (req, res, next) {

        console.log(req.params.id);
        Photo.findOne({_id: req.params.id})
            .remove()
            .exec(function (err, photo) {
                if (err) {
                    console.log('Photo could not be deleted: ' + err);

                }
                res.send({message: 'Photo deleted successfully!'});
            })
    },
    updatePhoto: function (req, res, next) {

        if (req.params.id) {
            Photo.findOne({_id: req.params.id})
                .exec(function (err, photo) {

                    if (req.query && req.query.isApproved) {
                        photo.isApproved = true;
                        photo.save();
                    }

                    if (err) {
                        console.log('Photo could not be updated: ' + err);

                    }
                    res.send({message: 'Photo updated successfully!'})
                })
        }
    }
};
