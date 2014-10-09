app.controller('PhotosDetailsCtrl', function ($scope, $routeParams, $http, PhotosResource, UsersResource, notifier, identity, $location) {
    identity.updateUser();
    PhotosResource.PhotosResource.get({id: $routeParams.id})
        .$promise.then(function (data) {
            $scope.photo = data;
        });

    $scope.currentUser = identity.currentUser;
    $scope.identity = identity;
    $scope.deletePhoto = deletePhoto;
    $scope.download = function () {
        if ($scope.photo && $scope.currentUser) {
            $('#buyPhoto').modal('hide');
            var message;
            if (isDownloadAllowed()) {
                message = 'Download successfully';
            }
            else {

                var credits = $scope.currentUser.credits;
                var picturePrice = $scope.photo.price;
                if (credits >= picturePrice) {
                    message = 'You bought new picture for: $' + (picturePrice || 0);
                }
            }

            if(message){
                PhotosResource.downloadFile($scope.photo._id)
                    .then(function (data) {
                        notifier.success(message);
                    },
                    function (response) {
                        notifier.error(response);
                    });
            }
            else{
                notifier.error('You do not have enough money!');
            }
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

    function deletePhoto(photoId) {
        PhotosResource.PhotosResource.remove({id: photoId})
            .$promise.then(function (data) {
                notifier.success(data.message);
                $location.path('/');
                $('.modal-backdrop.fade.in').remove();

            });

    }

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