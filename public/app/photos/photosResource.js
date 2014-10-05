app.factory('PhotosResource', function ($resource) {
    var PhotosResource = $resource('/api/photos/:id', {id: '@id'},
        { update: {method: 'PUT', isArray: false}});

    return PhotosResource;
});