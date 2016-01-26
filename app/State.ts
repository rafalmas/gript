/// <reference path='_All.d.ts' />
module App {
    export class State {
        'use strict';

        constructor($stateProvider:ng.ui.IStateProvider, $urlRouterProvider:ng.ui.IUrlRouterProvider) {
            $stateProvider
                .state('portfolio', {
                    url: '/portfolio',
                    templateUrl: 'sections/portfolio/portfolio.html',
                    controller: 'portfolioController',
                    controllerAs: 'vm'
                })
                .state('welcome', {
                    url: '/welcome',
                    templateUrl: 'module/dashboard/dashboard.html',
                    controller: 'portfolioController',
                    controllerAs: 'vm'
                });
            $urlRouterProvider.otherwise('/welcome');
        }
    }
}