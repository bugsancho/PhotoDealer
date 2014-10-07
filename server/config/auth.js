var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) return next(err);
            if (!user) {
                res.send({success: false})
            }

            req.logIn(user, function (err) {
                if (err) return next(err);
                user.salt = undefined;
                user.hashPass = undefined;
                res.send({success: true, user: user});
            })
        });

        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            console.log('redirect');
            res.status(401).redirect('/#/unauthorized');
        }
        else {
            next();
        }
    },
    isInRole: function (role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
               res.status(403).redirect('/');
            }
        }
    }
}