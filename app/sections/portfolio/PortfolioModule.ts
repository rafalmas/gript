/// <reference path="../../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path='PortfolioController.ts' />
/// <reference path='../../components/portfolio/PortfolioService.ts' />
/// <reference path='../../components/navigation/NavigationController.ts' />

module Portfolio {
    angular.module('portfolio', []);

    angular.module('portfolio').factory('portfolioService', [():PortfolioService => {
        return new PortfolioService();
    }]);

    angular.module('portfolio').controller('portfolioController', Portfolio.PortfolioController);
    angular.module('portfolio').controller('navigationController', Portfolio.NavigationController);
}

