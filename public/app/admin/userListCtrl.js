app.controller('UserListCtrl', function($scope, UsersResource) {
    $scope.users = UsersResource.query();

    $scope.addAmount = function(user){
        // TODO: ADD MONEY!
        console.log("ADDING MONEY!");

    };
});