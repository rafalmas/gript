/// <reference path="Routes.ts" />
/// <reference path="Locales.ts" />
/// <reference path='sections/portfolio/PortfolioModule.ts'/>

module App {
    let app = angular.module('gript', ['ngRoute', 'ui.bootstrap', 'picardy.fontawesome', 'pascalprecht.translate', 'portfolio']);
    app.config(Locales);
    app.config(Routes);
}
