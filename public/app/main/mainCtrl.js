app.controller('MainCtrl', function ($scope, PhotosResource,identity,socket) {
    if(identity.isAuthenticated()){
        socket.subscribe(identity.currentUser._id);
    }
    $scope.identity = identity;
    $scope.latestPhotos = PhotosResource.getLatestPhotos();
    $scope.popularPhotos = PhotosResource.getPopularPhotos();
});