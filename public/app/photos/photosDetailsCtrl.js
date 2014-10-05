app.controller('PhotosDetailsCtrl', function($scope, $routeParams, PhotosResource) {
    console.log(3);
    $scope.photo = PhotosResource.get({id: $routeParams.id});
});