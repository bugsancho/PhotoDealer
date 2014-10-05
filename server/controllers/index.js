var usersController = require('../controllers/usersController');
var coursesController = require('../controllers/coursesController');
var photosController = require('../controllers/PhotosController');
module.exports = {
    users: usersController,
    courses: coursesController,
    photos : photosController
};