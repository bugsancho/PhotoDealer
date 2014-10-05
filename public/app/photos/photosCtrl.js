app.controller('PhotosCtrl', function($scope,PhotosResource,$location) {
    $scope.photos = PhotosResource.query();

    $scope.redirectToDetails = redirectToDetails;

    function redirectToDetails(id) {
        $location.path('#/pictures/' + id);
    }
});