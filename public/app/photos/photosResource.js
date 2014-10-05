app.factory('PhotosResource', function ($resource) {
    var photosUrl = '/api/photos';
    var PhotosResource = $resource(photosUrl + '/:id', {id: '@id'});

    return {
        PhotosResource: PhotosResource,
        getLatestPhotos: function () {
          return PhotosResource.query({sort:'-published',limit:4});
        },
        getPopularPhotos: function () {
            return PhotosResource.query({sort:'-downloadsCount',limit:4});
        }
    };
});