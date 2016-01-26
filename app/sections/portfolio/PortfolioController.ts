/// <reference path='../../components/portfolio/PortfolioService.ts' />

module Portfolio {
    export class PortfolioController {
        'use strict';

        private portfolio:Array<any>;

        constructor() {
            this.portfolio = PortfolioService.getPortfolio();
        }
    }
}