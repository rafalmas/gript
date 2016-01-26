/// <reference path="../app/bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="State.ts" />
/// <reference path='sections/portfolio/PortfolioModule.ts'/>

module App {
    'use strict';

    angular.module('app', ['ui.router', 'portfolio']);
    angular.module('app').config(State);
}
