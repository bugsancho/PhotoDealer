app.controller('PhotosCtrl', function ($scope, PhotosResource, $location) {
    $scope.photos = PhotosResource.query();
    $scope.redirectToDetails = redirectToDetails;
    $scope.page = 1;
    function redirectToDetails(id) {
        $location.path('photos/' + id);
    }

    function getPhotos(params) {
        PhotosResource.query(params).$promise.then(function (data) {
            $scope.photos = data;
            console.log(data);
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