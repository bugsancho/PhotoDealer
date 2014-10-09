var usersController = require(__dirname + '/usersController');
var photosController = require(__dirname + '/PhotosController');
var filesController = require(__dirname + '/FilesController');
module.exports = {
    users: usersController,
    photos : photosController,
    files: filesController
};