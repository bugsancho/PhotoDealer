app.controller('PhotosCtrl', function($scope,PhotosResource) {
    $scope.photos = PhotosResource.query();
});