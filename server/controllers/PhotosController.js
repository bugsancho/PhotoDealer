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
            .exec(function (err, photo) {
                if (err) {
                    console.log('Photo could not be loaded: ' + err);
                }
                photo.imageData.data = undefined;
                res.send(photo);
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
    uploadPhoto: function(req, res, next) {
        var newPhoto = new Photo;

        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            if (!filename) {
                // If filename is not truthy it means there's no file
                return;
            }

            // Create the initial array containing the stream's chunks
            file.fileRead = [];

            file.on('data', function (chunk) {
                // Push chunks into the fileRead array
                this.fileRead.push(chunk);
            });

            file.on('error', function (err) {
                console.log('Error while buffering the stream: ', err);
            });

            file.on('end', function () {
                newPhoto.imageData.data = Buffer.concat(this.fileRead); // Concat the chunks into a Buffer
                newPhoto.imageData.contentType = mimetype;
                newPhoto.imageData.fileName = filename;
            });
        });

        req.busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated) {
            newPhoto[fieldname] = val;
        });

        req.busboy.on('finish', function () {

            newPhoto.published = new Date();
            newPhoto.isApproved = false;
            newPhoto.downloadsCount = 0;
            newPhoto.pictureUrl = '/api/photos/' + newPhoto._id + '/file';

            newPhoto.save(function (err, newPhoto) {
                if (err) {
                    console.log(err);
                }

               // console.log(newPhoto._id);
                res.redirect('/');
            });
        });
    }

};
