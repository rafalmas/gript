/// <reference path='../portfolio/PortfolioService.ts' />

module Portfolio {
    export class NavigationController {
        'use strict';

        private portfolio:Array<any>;

        constructor() {
            this.portfolio = PortfolioService.getPortfolio();
        }
    }
}