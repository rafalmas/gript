describe('Portfolio Component', function () {

    'use strict';

    var portfolioService;

    beforeEach(function () {
        module('portfolio');
        inject(function (_FusionPortfolioService_) {
            portfolioService = _FusionPortfolioService_;
        });
    });

    describe('Portfolio Service', function () {
        it('should return portfolio', function () {
            var portfolio = portfolioService.getPortfolio();
            expect(portfolio.length).toBe(8);
            expect(portfolio).toContain({name: 'Kids', balance: 200348.76, type: 'ca', remark: 'Closed saving Account for kids'});
            expect(portfolio).toContain({name: 'Savings', balance: 220454.54, type: 'sa', remark: 'Family Savings'});
        });
    });
});
