/**
 * Created by Mateusz on 25.09.2016.
 */
angular.module('telephoneBookApp', [ 'telephoneBookApp.services','telephoneBookApp.controllers','ngRoute','ui.bootstrap', 'ngSanitize',
    'ngResource', 'ngFileUpload', 'ui.calendar'
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

            .when("/calendar", {
                controller: 'calendar',
                templateUrl: 'partials/calendar.html'
            })
            .otherwise({redirectTo: '/'});
    })
