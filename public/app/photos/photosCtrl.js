app.controller('PhotosCtrl', function ($scope, PhotosResource, CategoriesResource, $location, identity) {
    $scope.photos = PhotosResource.PhotosResource.query();
    $scope.categories = CategoriesResource.CategoriesResource.query();

    $scope.redirectToDetails = redirectToDetails;
    $scope.page = 1;
    $scope.identity = identity;

    function redirectToDetails(id) {
        $location.path('photos/' + id);
    }

    function getPhotos(params) {
        PhotosResource.PhotosResource.query(params).$promise
            .then(function (data) {
                $scope.photos = data;
            })
    }

    function filterBy() {
        var query = {};
        query['page'] = $scope.page - 1;

        var filter = $scope.filter;
        if (filter) {
            if (filter.hasOwnProperty('title') && filter.title) {
                query['title'] = filter.title;
            }

            if (filter.hasOwnProperty('authorName') && filter.authorName) {
                query['authorName'] = filter.authorName;
            }

            if (filter.hasOwnProperty('category') && filter.category) {
                query['category'] = filter.category;
            }

            if (filter.hasOwnProperty('tags') && filter.tags) {
                query['tags'] = filter.tags;
            }

            if (filter.hasOwnProperty('price') && filter.price) {
                query['price'] = filter.price;
            }
        }

        if ($scope.sort) {
            if ($scope.sort.orderBy) {
                var sort = $scope.sort.orderBy;

                if ($scope.sort.dir) {
                    sort = '-' + sort;
                }

                query['sort'] = sort;
            }
        }

        getPhotos(query);
    }

    $scope.decreasePage = function () {
        $scope.page--;
        filterBy()
    };

    $scope.increasePage = function () {
        $scope.page++;
        filterBy()
    };

    $scope.filterBy = function () {
        filterBy();
    }
});