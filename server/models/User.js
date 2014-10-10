var mongoose = require('mongoose'),
    photo = require('./Photo'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true, validate: [validator, 'Username must be at least 6 symbols long'] },
    firstName: { type: String, require: '{PATH} is required' },
    lastName: { type: String, require: '{PATH} is required' },
    boughtPhotosIds: [
        {type: mongoose.Schema.ObjectId, ref: 'Photo'}
    ],
    ownPhotosIds: [
        {type: mongoose.Schema.ObjectId, ref: 'Photo'}
    ],
    credits: {type: Number, min: 0, require: '{PATH} is required'},
    salt: { type: String, require: '{PATH} is required' },
    hashPass: { type: String, require: '{PATH} is required' },
    roles: [String]
});

function validator (v) {
    return v.length > 5;
};

userSchema.method({
    authenticate: function (password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        }
        else {
            return false;

        }
    },
    isTrustedUploader: function () {
        if (this.roles.indexOf('trusted') != -1 || this.roles.indexOf('admin') != -1) {
            return true;
        }
        return false;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {

    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Ivaylo');
            User.create({username: 'ivaylo.kenov', firstName: 'Ivaylo', lastName: 'Kenov', credits: 0, salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'admin');
            User.create({username: 'admin', firstName: 'admin', lastName: 'admin', credits: 0, salt: salt, hashPass: hashedPwd, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Nikolay');
            User.create({username: 'Nikolay.IT', firstName: 'Nikolay', lastName: 'Kostov', credits: 0, salt: salt, hashPass: hashedPwd, roles: ['standard']});
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'Doncho');
            User.create({username: 'Doncho', firstName: 'Doncho', lastName: 'Minkov', credits: 0, salt: salt, hashPass: hashedPwd, roles: ['trusted']});
            console.log('Users added to database...');
        }
    });
};