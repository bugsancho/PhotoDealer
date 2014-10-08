app.controller('UserListCtrl', function($scope, $location, UsersResource, auth, notifier) {
    $scope.users = UsersResource.query();
    $scope.money = {};

    $scope.updateUser = function(user){
        user.credits += $scope.money[user._id];

        auth.update(user).then(function(){
            notifier.success('Successfully added $' + $scope.money[user._id] + ' to ' + user.username);
            $scope.money[user._id] = 0;
        });
    };
});