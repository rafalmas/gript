/// <reference path='../../components/portfolio/PortfolioService.ts' />

module Portfolio {
    export class PortfolioController {
        'use strict';

        private portfolio:Array<any>;

        static $inject = ['portfolioService'];

        constructor(public portfolioService: IPortfolioService) {
            this.portfolio = portfolioService.getPortfolio();
        }
    }
}