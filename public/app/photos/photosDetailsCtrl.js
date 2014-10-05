app.controller('PhotosDetailsCtrl', function ($scope, $routeParams, PhotosResource, notifier) {
    $scope.photo = PhotosResource.get({id: $routeParams.id});

    $scope.isBought = function () {
        // TODO: Check if current user has already bought the current picture.
        notifier.error('ADD LOGIC IsBought!!!!');
        return true;
    }

    $scope.buy = function () {
        // TODO: Add logic if you have enough money
        notifier.error('ADD LOGIC buy!!!!');
        haveMoney = true;

        if (haveMoney) {
            notifier.success('You bought new picture for: $' + ($scope.photo.price || 0));
        }
    };

    $scope.download = function(){
        // TODO: Implement
        notifier.success('ADD LOGIC: Downloading!');
    }
});