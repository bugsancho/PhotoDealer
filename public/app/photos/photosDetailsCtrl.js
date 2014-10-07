app.controller('PhotosDetailsCtrl', function ($scope, $routeParams, PhotosResource, UsersResource, notifier, identity) {
    PhotosResource.PhotosResource.get({id: $routeParams.id})
        .$promise.then(function (data) {
            $scope.photo = data;
            $scope.author = UsersResource.get({id: $scope.photo.author});
            $scope.isBought = isBought;
        });

    $scope.currentUser = identity.currentUser;

    $scope.downloadUrl = function () {
        return '/api/photos/' + $scope.photo._id + '/download';
    };

    $scope.buy = function () {
        // TODO: Add logic if you have enough money
       // notifier.error('ADD LOGIC buy!!!!');
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
        // If current user is author of picture or if picture ID exists in current user pictures array
        if ($scope.author.username === $scope.currentUser.username) {
            // this is the author of the picture
            return true;
        }
        else {
            var boughtPhotos = $scope.currentUser.boughtPhotosIds;
            for (var i = 0, len = boughtPhotos.length; i < len; i += 1) {
                var photoId = boughtPhotos[i];
                if ($scope.photo._id === photoId) {
                    // current user has already bought the picture
                    return true;
                }
            }
        }

        return false;
    }
});