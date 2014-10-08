app.controller('LoginCtrl', function($scope, $location, notifier, identity, auth,socket) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                notifier.success('Successful login!');
                $location.path('/');
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };

    $scope.logout = function() {
        var id = identity.currentUser._id;
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            socket.unsubscribe(id);
            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            $location.path('/');
        })
    }
});