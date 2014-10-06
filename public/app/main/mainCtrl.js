app.controller('MainCtrl', function ($scope, PhotosResource,identity) {
    $scope.identity = identity;
    $scope.latestPhotos = PhotosResource.getLatestPhotos();
    $scope.popularPhotos = PhotosResource.getPopularPhotos();
});