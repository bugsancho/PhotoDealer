var usersController = require(__dirname + '/UsersController'),
	photosController = require(__dirname + '/PhotosController'),
	filesController = require(__dirname + '/FilesController'),
	categoriesController = require(__dirname + '/CategoriesController')

    module.exports = {
    users: usersController,
    photos : photosController,
    categories : categoriesController,
    files: filesController
};