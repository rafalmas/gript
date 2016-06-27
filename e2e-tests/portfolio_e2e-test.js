describe('sample-application-e2e-test', function () {
    'use strict';

    describe('Portfolio', function () {

        it('should render portfolio when user navigates to /portfolio', function () {
            //BaseUrl is provided on startup of protractor, only relative path is needed here
            browser.get('/#/portfolio');
            expect(element.all(by.css('.header-dual')).first().getText())
                .toMatch(/Portfolio/);
        });
    });

});
