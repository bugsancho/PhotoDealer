var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
        newUserData.credits = 0;
        newUserData.roles = ['standard'];
        User.create(newUserData, function (err, user) {
            debugger;
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400);
                return res.send({reason: err.toString()});

            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }

                res.send(user);
            })
        });
    },
    updateUser: function (req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }
            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    changePassword: function (req, res, next) {
        if (req.user._id == req.body.id) {
            // check if given password is valid
            var oldHashedPassword = encryption.generateHashedPassword(req.user.salt, req.body.password);

            if (oldHashedPassword == req.user.hashPass) {
                var updatedUserData = req.user;
                var passwordModel = req.body;
                if (passwordModel.newPassword == passwordModel.confirmPassword && passwordModel.newPassword.length > 5) {
                    var salt = encryption.generateSalt();
                    updatedUserData.salt = salt;
                    updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, passwordModel.newPassword);
                    User.update({_id: updatedUserData._id}, updatedUserData, function () {
                        res.send({message: 'Password changed successfully!'});
                    })
                }
                else {
                    res.send({reason: 'Invalid new password. Password and confirm must match and have be at least 6 symbols.'});
                }
            }
            else {
                res.send({reason: 'Old password is invalid!'});
            }
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
    getAllUsers: function (req, res) {
        User.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }

            res.send(collection);
        })
    },
    getUserById: function (req, res) {
        User.findOne({_id: req.params.id})
            .select('-salt -hashPass')
            .exec(function (err, user) {
                if (err) {
                    console.log('Failed to find the user: ' + err);
                }

                res.send(user);
            });
    }
}