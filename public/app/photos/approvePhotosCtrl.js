app.controller('ApprovePhotosCtrl', function ($scope, PhotosResource, $location, identity, notifier) {
    getPhotos();
    $scope.page = 1;
    $scope.identity = identity;
    $scope.deletePhoto = deletePhoto;
    $scope.updatePhoto = updatePhoto;


    function getPhotos() {
        PhotosResource.PhotosResource.query({showUnapproved: true}).$promise.then(function (photos) {
            $scope.photos = photos;
        })
    }

    function deletePhoto(photoId) {
        PhotosResource.PhotosResource.remove({id: photoId}).$promise.then(function (data) {
            getPhotos();
            notifier.success(data.message);
        })
    }

    function updatePhoto(photo) {
        PhotosResource.PhotosResource.update({id: photo._id}).$promise.then(function (data) {
            getPhotos();
            notifier.success(data.message);
        })
    }
});