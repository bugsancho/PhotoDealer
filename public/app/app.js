var app = angular.module('app', ['ngResource', 'ngRoute', 'kendo.directives']).value('toastr', toastr);

app.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);

    var routeUserChecks = {
        adminRole: {
            authenticate: function (auth) {
                return auth.isAuthorizedForRole('admin');
            }
        },
        authenticated: {
            authenticate: function (auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainCtrl'
        })
        .when('/photos', {
            templateUrl: '/partials/photos/photos',
            controller: 'PhotosCtrl'
        })

        .when('/photos/:id', {
            templateUrl: '/partials/photos/photo-details',
            controller: 'PhotosDetailsCtrl'
        })

        .when('/photo/upload', {
            templateUrl: '/partials/photos/photo-upload',
            controller: 'PhotosCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/signup', {
            templateUrl: '/partials/account/signup',
            controller: 'SignUpCtrl'
        })
        .when('/profile', {
            templateUrl: '/partials/account/profile',
            controller: 'ProfileCtrl',
            resolve: routeUserChecks.authenticated
        })
        .when('/admin/approve', {
            templateUrl: '/partials/photos/approve-photos',
            controller: 'ApprovePhotosCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/users-list',
            controller: 'UserListCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/admin/transactions', {
            templateUrl: '/partials/transactions/transactions-list',
            controller: 'TransactionsCtrl',
            resolve: routeUserChecks.adminRole
        })
        .when('/unauthorized', {
            templateUrl: '/partials/account/unauthorized'
        })
});

app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    })
});