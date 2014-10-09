app.controller('TransactionsCtrl', function ($scope, PhotosResource, $location, identity, notifier) {
    $scope.mainGridOptions = {
        dataSource: {
            transport: {
                read: "/api/transactions"
            },
            pageSize: 5
        },
        schema: {
            model: {
                fields: {
                    fromUserNames: { type: "string" },
                    toUserNames: { type: "string" },
                    photoName: { type: "string" },
                    date: { type: "date" },
                    amount: { type: "number" }
                }
            }
        },
        sortable: true,
        pageable: true,
        filterable:true,
        columns: [{
            field: "fromUserNames",
            title: "From User"
        },{
            field: "toUserNames",
            title: "To User"
        },{
            field: "photoName",
            title: "Photo"
        },{
            field: "date",
            title: "Time of Purchase",
            type: 'date',
            template: '#= kendo.toString(date, "G") #'
        },{
            field: "amount",
            title: "Sum of Transaction"
        }]
    };

});