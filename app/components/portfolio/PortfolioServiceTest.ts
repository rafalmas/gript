/// <reference path="../../../bower_components/DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../../../bower_components/DefinitelyTyped/angularjs/angular-mocks.d.ts" />

describe('PortfolioService', () => {
    var service;

    beforeEach(angular.mock.module('portfolio'));

    beforeEach(() => {
        inject(function (_portfolioService_) {
            service = _portfolioService_;
        });
    });

    it('should initialize correctly', () => {
        expect(service).toBeDefined();
    });

    it('should return portfolio', function () {
        var portfolio = service.getPortfolio();
        expect(portfolio.length).toBe(8);
        expect(portfolio).toContain({name: 'Kids', balance: 200348.76, type: 'kids', remark: 'Closed saving Account for kids'});
        expect(portfolio).toContain({name: 'Savings', balance: 220454.54, type: 'sa', remark: 'Family Savings'});
    });
});

