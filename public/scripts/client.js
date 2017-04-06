var app = angular.module('myApp', ['ngRoute', "firebase", "ngMap"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: '/views/templates/login.html',
            controller: 'homeController',
            controllerAs: 'home',
        })
        .when('/musicianList', {
            templateUrl: '/views/templates/musicianList.html',
            controller: 'MusicianListController',
            controllerAs: 'mlc',
        })
        .when('/manageProfile', {
            templateUrl: '/views/templates/manageProfile.html',
            controller: 'ManageProfileController',
            controllerAs: 'mpc',
        })
        .otherwise({
            redirectTo: 'login',
        });

}, ]);
