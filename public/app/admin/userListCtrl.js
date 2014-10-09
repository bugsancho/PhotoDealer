app.controller('UserListCtrl', function ($scope, $location, UsersResource, auth, notifier) {
    $scope.users = UsersResource.query();
    $scope.money = {};
    $scope.roles = ['admin', 'trusted', 'standard'];

    $scope.updateUser = function (user) {
        if ($scope.money[user._id]) {
            user.credits += $scope.money[user._id];
            $scope.money[user._id] = undefined;
        }

        auth.update(user).then(function () {
            notifier.success('Successfully updated ' + user.username);
        });
    };

    $scope.mainGridOptions = {
        dataSource: {
            transport: {
                read: "/api/users"
            },
            pageSize: 3
        },
        sortable: true,
        pageable: true,
        columns: [{
            field: "firstName",
            title: "First Name"
        },{
            field: "lastName",
            title: "Last Name"
        },{
            field: "username"
        },{
            field: "City"
        },{
            field: "Title"
        }]
    };
});