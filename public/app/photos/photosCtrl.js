app.controller('PhotosCtrl', function ($scope, PhotosResource, $location, identity) {
    $scope.photos = PhotosResource.PhotosResource.query();
    $scope.redirectToDetails = redirectToDetails;
    $scope.page = 1;
    $scope.identity = identity;

    function redirectToDetails(id) {
        $location.path('photos/' + id);
    }

    function getPhotos(params) {
        PhotosResource.PhotosResource.query(params).$promise.then(function (data) {
            $scope.photos = data;
        })
    }

    $scope.increasePage = function () {
        $scope.page++;
        getPhotos({page: $scope.page - 1});
    };
    $scope.decreasePage = function () {
        $scope.page--;
        getPhotos({page: $scope.page - 1});

    };


});