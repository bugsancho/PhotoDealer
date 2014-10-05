app.factory('PhotosResource', function ($resource) {
    var photosUrl = '/api/photos';
    var PhotosResource = $resource(photosUrl + '/:id', {id: '@id'});

    return {
        PhotosResource: PhotosResource,
        getLatestPhotos: $resource(photosUrl + '/latest').query,
        getPopularPhotos: $resource(photosUrl + '/popular').query
    };
});