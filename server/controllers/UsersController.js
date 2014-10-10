var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = req.body;
        if(newUserData.password.length < 6){
            res.status(400);
            res.send({reason: 'Password must be at least 6 symbols long!'});
        }
        else {
            var userToSave = {};
            userToSave.salt = encryption.generateSalt();
            userToSave.hashPass = encryption.generateHashedPassword(userToSave.salt, newUserData.password);
            userToSave.credits = 0;
            userToSave.roles = ['standard'];
            userToSave.username = newUserData.username;
            userToSave.firstName = newUserData.firstName;
            userToSave.lastName = newUserData.lastName;
            User.create(userToSave, function (err, user) {
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
                    delete  user.salt;
                    delete user.hashPass;
                    res.send(user);
                })
            });
        }
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
            res.status(400);
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

                    User.update({_id: updatedUserData._id}, {salt: updatedUserData.salt, hashPass: updatedUserData.hashPass}, function (err) {
                        if (err) {
                            console.log(err);
                            res.status(400);
                            res.send({message: 'Password could not be changed!'});
                        }
                        else {
                            res.send({message: 'Password changed successfully!'});
                        }
                    })
                }
                else {
                    res.status(400);
                    res.send({reason: 'Invalid new password. Password and confirm must match and be at least 6 symbols long.'});
                }
            }
            else {
                res.status(400);
                res.send({reason: 'Old password is invalid!'});
            }
        }
        else {
            res.status(403);
            res.send({reason: 'You do not have permissions to do that!'})
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