var Photo = require('mongoose').model('Photo');
var User = require('mongoose').model('User');

module.exports = {
    downloadPhoto: function (req, res, next) {
        if(!req.user){
            return res.status(401).send('Unauthorized');
        }

        var userId = req.user._id;
        var photoId = req.params.id;
        Photo.findOne({_id: photoId}, function (err, photo) {
            if (err) {
                console.log('Photo could not be loaded: ' + err);
                return res.status(400).send('Photo could not be loaded');
            }

            var authorId = photo.authorId;
            if (userId != authorId) {
                User.findById(userId, function (err, userData) {
                    if (err) {
                        console.log('User could not be found (photo download): ' + err);
                        return res.status(400).send('User could not be found');
                    }

                    if (isBought(userData.boughtPhotosIds, photoId)) {
                        return res = sendFile(res, photo);
                    }
                    else if (false && userData.credits < photo.price) {
                        // TODO: remove 'false &&'
                        return res.status(400).send('You do not have enough money');
                    }
                    else {
                        userData.credits -= photo.price;
                        userData.boughtPhotosIds.push(photoId);

                        userData = userData.toObject();
                        delete userData._id;
                        User.update({_id: userId}, userData, function (err) {
                            if (err) {
                                console.log('User update error: ' + err);
                                return res.status(500).send('User update error');
                            }

                            User.findById(authorId, function (err, authorData) {
                                if (err) {
                                    console.log('Author could not be found (photo download): ' + err);
                                    return res.status(500).send('Author could not be found');
                                }

                                authorData.credits += photo.price;

                                authorData = authorData.toObject();
                                delete authorData._id;
                                User.update({_id: authorId}, authorData, function (err) {
                                    if (err) {
                                        console.log('Author update error: ' + err);
                                        return res.status(500).send('Author update error');
                                    }

                                    photo.downloadsCount++;

                                    photo = photo.toObject();
                                    delete photo._id;
                                    Photo.update({_id: photoId}, photo, function (err) {
                                        if (err) {
                                            console.log('Photo update error: ' + err);
                                            return res.status(500).send('Photo update error');
                                        }

                                        return res = sendFile(res, photo);
                                    });
                                });
                            });
                        });
                    }
                })
            }
            else {
                return res = sendFile(res, photo);
            }
        })
    },
    uploadPhoto: function (req, res, next) {
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
            newPhoto.isApproved = req.user.isTrustedUploader();
            newPhoto.downloadsCount = 0;
            newPhoto.pictureUrl = '/api/photos/' + newPhoto._id + '/file';

            newPhoto.authorId = req.user._id;
            newPhoto.authorName = req.user.firstName + ' ' + req.user.lastName;
            newPhoto.price = Math.round(newPhoto.price * 100) / 100;
            newPhoto.tags = parseTags(newPhoto.tags);

            newPhoto.save(function (err, newPhoto) {
                if (err) {
                    console.log(err);
                }

                var authorId = newPhoto.authorId;
                User.findById(authorId, function (err, userData) {
                    if (err) {
                        console.log('User could not be loaded (photo upload): ' + err);
                        return;
                    }

                    var photoId = newPhoto._id;
                    userData.ownPhotosIds.push(photoId);

                    userData = userData.toObject();
                    delete userData._id;
                    User.update({_id: authorId}, userData, function (err) {
                        if (err) {
                            console.log('User update error: ' + err);
                            return;
                        }

                        //console.log('!' + newPhoto._id);
                        res.redirect('/#/photos/' + photoId);
                    });
                });
            });
        });
    }
};


function parseTags(tagsAsString) {
    var result = [];
    var elements = tagsAsString[0].split(',');

    for (var i = 0; i < elements.length; i += 1) {
        result.push(elements[i].trim());
    }

    return result;
}

function sendFile(res, photo) {
    var fileName = photo.title;

    res.contentType(photo.imageData.contentType);
    res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
    res.setHeader('x-filename', fileName);
    res.send(photo.imageData.data);

    return res;
}

function isBought(array, pictureId) {
    for (var i = 0, len = array.length; i < len; i += 1) {
        var currentPicture = array[i];
        if(currentPicture == pictureId){
            return true;
        }
    }

    return false;
}