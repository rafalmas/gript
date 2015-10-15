angular.module('sample.portfolio.fusion', ['ngRoute', 'sample.components.portfolio'])
    .config(function ($routeProvider) {
        'use strict';
        $routeProvider.when('/portfolio', {
            templateUrl: 'sections/portfolio/portfolio.html',
            controller: 'FusionPortfolioController',
            controllerAs: 'vm'
        });
    });
