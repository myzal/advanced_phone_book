/**
 * Created by Mateusz on 25.09.2016.
 */
angular.module('telephoneBookApp', [ 'telephoneBookApp.services','telephoneBookApp.controllers','ngRoute', 'ngSanitize'
])
    .config(function ($routeProvider) {
        $routeProvider.
            when("/", {
                controller: 'bookController',
                templateUrl: 'partials/peoples.html'

            })

            .when("/newPeople", {
                controller: 'newPeople',
                templateUrl: 'partials/newPeople.html'

            })
            .when("/peoples/:id", {
                controller: 'showPeople',
                templateUrl: 'partials/showPeople.html'
            })


            .otherwise({redirectTo: '/'});
        //$locationProvider.html5Mode(true)
    })
