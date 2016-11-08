module App {
    export class Routes {
        static $inject = ['$routeProvider'];

        constructor($routeProvider: ng.route.IRouteProvider) {
            $routeProvider.when('/portfolio', {
                controller: 'portfolioController',
                templateUrl: 'sections/portfolio/portfolio.html',
                controllerAs: 'vm'
            });
            $routeProvider.when('/welcome', {
                templateUrl: 'sections/welcome/welcome.html',
            });
            $routeProvider.when('/empty', {
                templateUrl: 'sections/empty/empty.html',
            });
            $routeProvider.otherwise({redirectTo: '/welcome'});
        }
    }
}
