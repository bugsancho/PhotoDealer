var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.get('/api/users/:id', controllers.users.getUserById);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    app.get('/api/photos', controllers.photos.getAllPhotos);
    app.get('/api/photos/:id', controllers.photos.getPhotoById);
    app.put('/api/photos/:id', auth.isInRole('admin'), controllers.photos.updatePhoto);
    app.delete('/api/photos/:id', auth.isInRole('admin'), controllers.photos.deletePhoto);
    app.get('/api/photos/:id/file', controllers.photos.getPhotoFile);
    app.post('/api/photos', auth.isAuthenticated, controllers.files.uploadPhoto);
    app.get('/api/photos/:id/download', controllers.files.downloadPhoto);

    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index');
    });
};