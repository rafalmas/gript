module App {
    export class Locales {
        static $inject = ['$translateProvider', '$translateStaticFilesLoaderProvider'];

        constructor($translateProvider: angular.translate.ITranslateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: 'resources/locale-',
                suffix: '.json'
            });
            $translateProvider.useSanitizeValueStrategy('escaped');
            $translateProvider.preferredLanguage('en_US');
        }
    }
}
