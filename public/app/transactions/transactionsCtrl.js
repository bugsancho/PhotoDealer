app.controller('TransactionsCtrl', function ($scope, PhotosResource, $location, identity, notifier) {
    $scope.mainGridOptions = {
        dataSource: {
            transport: {
                read: "/api/transactions"
            },
            pageSize: 3
        },
        sortable: true,
        pageable: true,
        columns: [{
            field: "fromUserNames",
            title: "From User"
        },{
            field: "toUserNames",
            title: "To User"
        },{
            field: "photoName"
        },{
            field: "date"
        },{
            field: "amount"
        }]
    };

});