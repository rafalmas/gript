/// <reference path='../../../bower_components/DefinitelyTyped/angularjs/angular.d.ts' />

module Portfolio {

    interface INavigationController {
        isActive(path: String) : boolean;
    }

    export class NavigationController implements INavigationController {
        'use strict';

        static $inject = ['$location'];

        location: ng.ILocationService;

        constructor(private $location: ng.ILocationService) {
            this.location = $location;
        }

        isActive(path: String):boolean {
            return path === this.location.path();
        }
    }
}