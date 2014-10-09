var Photo = require('mongoose').model('Photo');
var socket = require('../utilities/socket');
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
        var query = Photo.find({})
            .where('isApproved', onlyApprovedPhotos);
        if (queries) {
            if (queries.hasOwnProperty('title')) {
                var titleRegEx = new RegExp(queries.title,'i');
                query = query.where('title', titleRegEx);
            }

            if (queries.hasOwnProperty('authorName')) {
                var authorRegEx = new RegExp(queries.authorName,'i');
                query = query.where('authorName', authorRegEx);
            }

            if (queries.hasOwnProperty('category')) {
                var categoryRegEx = new RegExp(queries.category,'i');
                query = query.where('category', categoryRegEx);
            }

            if (queries.hasOwnProperty('tags')) {
                var tagsRegEx = new RegExp(queries.tags,'i');
                query = query.where('tags',tagsRegEx);
            }

            if (queries.hasOwnProperty('price')) {
                query = query.where('price', queries.price);
            }
        }
        query = query.sort(queries.sort)
            .skip(queries.page * DEFAULT_PAGE_SIZE)
            .limit(queries.limit || DEFAULT_PAGE_SIZE)
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

        // console.log(req.params.id);
        Photo.findOne({_id: req.params.id})
            .exec(function (err, photo) {
                if (err) {
                    console.log('Photo could not be found: ' + err);
                }
                var authorId = photo.authorId;
                var title = photo.title;
                photo.remove(function (err, success) {
                    if (err) console.log('Photo could not be removed: ' + err);

                    socket.sendMessage(photo.authorId, 'Your photo "' + photo.title + '" has been deleted :( ');
                });


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
                        socket.sendMessage(photo.authorId, 'Your photo "' + photo.title + '" has been approved!');
                    }

                    if (err) {
                        console.log('Photo could not be updated: ' + err);

                    }
                    res.send({message: 'Photo updated successfully!'})
                })
        }
    }
};
