app.controller('PhotosDetailsCtrl', function ($scope, $routeParams, $http, PhotosResource, UsersResource, notifier, identity) {
    identity.updateUser();
    PhotosResource.PhotosResource.get({id: $routeParams.id})
        .$promise.then(function (data) {
            $scope.photo = data;
        });

    $scope.currentUser = identity.currentUser;
    $scope.identity = identity;

    $scope.download = function () {
        if ($scope.photo && $scope.currentUser) {

            var message;
            if (isDownloadAllowed()) {
                message = 'Download successfully';
            }
            else {
                // TODO: Add logic if you have enough money
                var haveMoney = true;
                if (haveMoney) {
                    message = 'You bought new picture for: $' + ($scope.photo.price || 0);
                }
            }

            PhotosResource.downloadFile($scope.photo._id)
                .then(function (data) {
                    notifier.success(message);
                },
                function (response) {
                    notifier.error(response);
                });
        }
    };

    $scope.buttonText = function () {
        if (isDownloadAllowed()) {
            return 'Download!';
        }
        else {
            return 'Buy now!';
        }
    };

    function isDownloadAllowed() {
        if ($scope.currentUser && $scope.photo) {
            var boughtPhotos = identity.currentUser.boughtPhotosIds;

            var isAuthor = $scope.photo.authorId === $scope.currentUser._id;

            var notBought = !isAuthor && !isPhotoBought(boughtPhotos, $scope.photo._id);

            if (isAuthor || !notBought) {
                return true;
            }

            if (notBought) {
                return false;
            }
        }
    }

    function isPhotoBought(pictures, photoId) {
        for (var i = 0, len = pictures.length; i < len; i += 1) {
            var currentPhotoId = pictures[i];
            if (photoId === currentPhotoId) {
                // current user has already bought the picture
                return true;
            }
        }

        return false;
    }
});