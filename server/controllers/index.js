var usersController = require('../controllers/usersController');
var photosController = require('../controllers/PhotosController');
var filesController = require('../controllers/FilesController');
module.exports = {
    users: usersController,
    photos : photosController,
    files: filesController
};