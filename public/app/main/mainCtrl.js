app.controller('MainCtrl', function ($scope, PhotosResource) {
    $scope.latestPhotos = PhotosResource.getLatestPhotos();
    $scope.popularPhotos = PhotosResource.getPopularPhotos();
});