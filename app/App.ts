/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/angularjs/angular-route.d.ts" />
/// <reference path="../bower_components/DefinitelyTyped/angular-translate/angular-translate.d.ts" />
/// <reference path="Routes.ts" />
/// <reference path="Locales.ts" />
/// <reference path='sections/portfolio/PortfolioModule.ts'/>

module App {
    'use strict';

    var app = angular.module('gript', ['ngRoute', 'ui.bootstrap', 'picardy.fontawesome', 'pascalprecht.translate', 'portfolio']);

    app.config(Locales);
    app.config(Routes);
}
