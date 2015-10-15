angular.module('components.navigation', [])

    /**
     * Controller to handle the navbar.
     */
    .controller('NavigationController', function ($scope) {
        'use strict';

        var vm = this;

        vm.navbar = true;

        $scope.$on('$routeChangeSuccess', function () {
            vm.navbar = true;
        });
    });
