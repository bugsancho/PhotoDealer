app.controller('UserListCtrl', function ($scope, $location, UsersResource, auth, notifier) {
    $scope.users = UsersResource.query();
    $scope.money = {};
    $scope.roles = ['admin', 'trusted', 'standard'];

    $scope.updateUser = function (user) {
        console.log(1 + $scope.currentRole);
        user.credits += $scope.money[user._id];

        auth.update(user).then(function () {
            notifier.success('Successfully updated ' + user.username);
            $scope.money[user._id] = 0;
        });
    };
});