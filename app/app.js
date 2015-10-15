angular.module('sample', [
    'components.navigation',
    'ngRoute',
    'picardy.fontawesome',
    'sample.portfolio.fusion',
    'ui.bootstrap'])

    .config(function config($routeProvider) {
        'use strict';
        $routeProvider
            .when('/welcome', {
                templateUrl: 'welcome.html',
                title: 'Welcome to Gulp Build Setup Sample',
                initial: true
            })
            .otherwise({redirectTo: '/welcome'});
    })

    .config(function providers($locationProvider, $compileProvider) {
        'use strict';
        $locationProvider.hashPrefix('!');
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|tel|mailto|x-wmapp0|chrome-extension):/);
    });


