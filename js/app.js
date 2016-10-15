/**
 * Created by Mateusz on 25.09.2016.
 */
angular.module('telephoneBookApp', [
        'telephoneBookApp.services',
    'telephoneBookApp.controllers',
    'ngRoute'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider.
            when("/", {
                controller: 'bookController',
                templateUrl: 'partials/peoples.html'

            })

            .when("/newPeople", {
                controller: 'bookController',
                templateUrl: 'partials/newPeople.html'

            })
            .when("/peoples/:id", {
                controller: 'bookController',
                templateUrl: 'partials/showPeople.html'
            })


            .otherwise({redirectTo: '/'});
        //$locationProvider.html5Mode(true)
    });