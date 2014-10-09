app.factory('CategoriesResource', function ($resource) {
    var categoriesUrl = '/api/categories';
    var CategoriesResource = $resource(categoriesUrl,
        {update: {method: 'GET', params: {isApproved: true}, isArray: false}}
    );

    return {
        CategoriesResource: CategoriesResource
    };
});