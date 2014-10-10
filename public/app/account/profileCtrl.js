app.controller('ProfileCtrl', function ($scope, $location, auth, identity, notifier, UsersResource) {
    $scope.user = identity.currentUser;

    $scope.changePassword = function (passwordModel) {
        if (passwordModel.newPassword !== passwordModel.confirmPassword) {
            notifier.error('Passwords do not match!');
            return;
        }

        var currentUserId = $scope.user._id;
        passwordModel.id = currentUserId;
        UsersResource.update({id: currentUserId}, passwordModel)
            .$promise.then(function (data) {
                if (data.message) {
                    notifier.success(data.message);
                    $location.path('/');
                }

                if(data.reason){
                    notifier.error(data.reason);
                }
            });
    }
});