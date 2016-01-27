/// <reference path='../portfolio/PortfolioService.ts' />

module Portfolio {
    export class NavigationController {
        'use strict';

        private portfolio:Array<any>;

        constructor(public portfolioService:IPortfolioService) {
            this.portfolio = portfolioService.getPortfolio();
        }
    }
}