app.controller('PhotosDetailsCtrl', function ($scope, $routeParams, $http, PhotosResource, UsersResource, notifier, identity) {
   identity.updateUser();
    PhotosResource.PhotosResource.get({id: $routeParams.id})
        .$promise.then(function (data) {
            $scope.photo = data;
            //$scope.author = UsersResource.get({id: $scope.photo.author});
            $scope.isBought = isBought;
        });

    $scope.currentUser = identity.currentUser;

    $scope.buy = function () {
        // TODO: Add logic if you have enough money

        haveMoney = true;
        if (haveMoney) {
            PhotosResource.downloadFile($scope.photo._id)
                .then(function (data) {
                    notifier.success('You bought new picture for: $' + ($scope.photo.price || 0));
                },
                function (response) {
                    notifier.error(response);
                });
        }
    };

    $scope.download = function () {
        PhotosResource.downloadFile($scope.photo._id)
            .then(function (data) {
                notifier.success('Download successfully');
            },
            function (response) {
                notifier.error(response);
            });
    };

    function isBought() {
        if($scope.currentUser) {
        // If current user is author of picture or if picture ID exists in current user pictures array
            // If current user is author of picture or if picture ID exists in current user pictures array
        if($scope.author && $scope.currentUser){
            if ($scope.photo.authorId === $scope.currentUser._id) {
            if ($scope.author.username === $scope.currentUser.username) {
                // this is the author of the picture
                return true;
            }
            else {
                var boughtPhotos = identity.currentUser.boughtPhotosIds;
                for (var i = 0, len = boughtPhotos.length; i < len; i += 1) {
                    var photoId = boughtPhotos[i];
                    console.log(photoId)
                    console.log($scope.photo._id)
                    if ($scope.photo._id === photoId) {
                        // current user has already bought the picture
                        return true;
                    }
                // this is the author of the picture
                return true;
            }
            else {
                var boughtPhotos = identity.currentUser.boughtPhotosIds;
                for (var i = 0, len = boughtPhotos.length; i < len; i += 1) {
                    var photoId = boughtPhotos[i];
                    if ($scope.photo._id === photoId) {
                        // current user has already bought the picture
                        return true;
                    }
                }
            }
        }

        return false;
    }
});