app.factory('identity', function ($window, UsersResource) {
    var user;
    if (sessionStorage.user) {
        user = new UsersResource();
        angular.extend(user, JSON.parse(sessionStorage.user));
    }

    return {
        currentUser: user,
        isAuthenticated: function () {
            return !!this.currentUser;
        },
        isAuthorizedForRole: function (role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        },
        updateUser: function () {
            if (this.currentUser) {
              var bla =   UsersResource.get({id: user._id});

                user = bla;
                bla.then(function (data) {
                    console.log(data)
                })
                sessionStorage['user'] = JSON.stringify(bla);
                console.log(sessionStorage['user']);
            }
            else {
                sessionStorage.removeItem('user');
            }
        }
    }
});