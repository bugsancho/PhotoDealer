var usersController = require('./UsersController');
var photosController = require('./PhotosController');
var filesController = require('./FilesController');
module.exports = {
    users: usersController,
    photos : photosController,
    files: filesController
};