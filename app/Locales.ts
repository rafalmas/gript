/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/angular-translate/angular-translate.d.ts" />
module App {
    export class Locales {
        static $inject = ['$translateProvider', '$translateStaticFilesLoaderProvider'];

        static configureLocales($translateProvider:angular.translate.ITranslateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'resources/locale-',
                suffix: '.json'
            });
            $translateProvider.useSanitizeValueStrategy('escaped');
            $translateProvider.preferredLanguage('en_US');
        }
    }
}
