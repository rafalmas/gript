/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path='PortfolioController.ts' />
/// <reference path='../../components/portfolio/PortfolioService.ts' />

module Portfolio {
    angular.module('portfolio', []);
    angular.module('portfolio').factory('portfolioService', Portfolio.PortfolioService);
    angular.module('portfolio').controller('portfolioController', Portfolio.PortfolioController);
}

