app.controller('PhotosDetailsCtrl', function ($scope, $routeParams, PhotosResource, UsersResource, notifier, identity) {
    PhotosResource.PhotosResource.get({id: $routeParams.id})
        .$promise.then(function (data) {
            $scope.photo = data;
            console.log($scope.photo.author);
            $scope.author = UsersResource.get({id: $scope.photo.author});
            $scope.isBought = isBought;
        });

    $scope.currentUser = identity.currentUser;

    $scope.buy = function () {
        // TODO: Add logic if you have enough money
        notifier.error('ADD LOGIC buy!!!!');
        haveMoney = true;

        if (haveMoney) {
            notifier.success('You bought new picture for: $' + ($scope.photo.price || 0));
        }
    };

    $scope.download = function () {
        // TODO: Implement
        notifier.success('ADD LOGIC: Downloading!');
    }

    function isBought () {
        // TODO: Check if current user has already bought the current picture.
        // If current user is author of picture or if picture ID exists in current user pictures array
//        console.log($scope.photo.author);
//        console.log($scope.currentUser);
        if ($scope.author.username === $scope.currentUser.username) {
            // this is the author of the picture
            return true;
        }
        else {
            var boughtPhotos = $scope.currentUser.boughtPhotosIds;
            for (var i = 0, len = boughtPhotos.length; i < len; i += 1) {
                var photoId = boughtPhotos[i];
                console.log(photoId);
                console.log($scope.photo._id);
                if ($scope.photo._id === photoId) {
                    return true;
                }
            }
        }

        return false;
    }
});