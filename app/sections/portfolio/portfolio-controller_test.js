describe('portfolio module', function () {
    'use strict';
    beforeEach(module('portfolio'));

    describe('portfolio controller', function () {
        it('should load portfolio', function ($controller) {
            var portfolioController = $controller('portfolioController');
            expect(portfolioController.portfolio).toBeDefined();
        });

    });
});
