app.controller('PhotosDetailsCtrl', function($scope, $routeParams, PhotosResource) {
    $scope.photo = PhotosResource.get({id: $routeParams.id});
});