describe('sample-application-e2e-test', function () {
    'use strict';

    describe('Portfolio', function () {

        it('should render portfolio when user navigates to /portfolio', function () {
            browser.get('http://localhost:8080/#!/portfolio');
            expect(element.all(by.css('.header-dual')).first().getText())
                .toMatch(/Portfolio/);
        });
    });

});
