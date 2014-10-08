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
                UsersResource.get({id: this.currentUser._id}).$promise.then(function (data) {
                    sessionStorage['user'] = JSON.stringify(data);
                });

            }
            else {
                sessionStorage.removeItem('user');
                user = undefined;
            }
        }
    }
});