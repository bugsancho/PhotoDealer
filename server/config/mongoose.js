var mongoose = require('mongoose'),
    user = require('../models/User'),
    photo = require('../models/Photo'),
    category = require('../models/Category');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened: ' + err);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function(err){
        console.dir(err);
        console.log('Database error: ' + err);
    });

    user.seedInitialUsers();
    photo.seedInitialPhotos();
    category.seedInitialCategories();
};