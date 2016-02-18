/// <reference path='../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts' />
/// <reference path='../../../bower_components/DefinitelyTyped/angular-translate/angular-translate.d.ts' />

module Portfolio {

    interface INavigationController {
        isActive(path: string) : boolean;
        toggleLanguage(language: string): void;
        isLanguageActive(language: string) : boolean;
    }

    export class NavigationController implements INavigationController {
        'use strict';

        static $inject = ['$location', '$translate'];

        location: ng.ILocationService;
        translate: angular.translate.ITranslateService;

        constructor(private $location: ng.ILocationService, private $translate: angular.translate.ITranslateService) {
            this.location = $location;
            this.translate = $translate;
            this.toggleLanguage('en_US');
        }

        isActive(path: string):boolean {
            return path === this.location.path();
        }

        toggleLanguage(language: string):void {
            this.translate.use(language);
        }

        isLanguageActive(language: string):boolean {
            return this.translate.use() === language;
        }

    }
}