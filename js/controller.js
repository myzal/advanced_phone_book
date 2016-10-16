/**
 * Created by Mateusz on 25.09.2016.
 */




angular.module('telephoneBookApp.controllers', ['ngRoute','ngSanitize'])

    /* Controller  bookController*/
.controller('bookController', function ($scope, bookList, $http) {
    $scope.bookList = bookList.get();

    $scope.searchPeople = function (people) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(people.name) || keyword.test(people.surname);
    };
    $scope.standardOrder = function (people) {
        $scope.orderByData = people;
    };
    $scope.delete = function(index){
        bookList.destroy(index);
    }

})

/* Controller  newPeople */
    .controller('newPeople', function ($scope, bookList) {
            $scope.submit = function () {
                bookList.set($scope.people);
                $scope.people = null;
                $scope.submitSuccess = true;
            }
        }
    )

    /* Controller  showPeople */
    .controller('showPeople', function($scope, $routeParams, bookList){
        $scope.people = bookList.find($routeParams.id);

    })
    .directive('editPeople', function () {
        return {
            restrict: 'AE',
            templateUrl: 'partials/editPeople.html',
            scope: {
                value: '=editPeople',
                field: '@fieldType'
            },
            controller: function ($scope) {
                $scope.field = ($scope.field) ? $scope.field : 'text';

                $scope.editor = {
                    showing: false,
                    value: $scope.value
                };

                $scope.toggleEditor = function(){
                    $scope.editor.showing = !$scope.editor.showing;
                    $scope.editor.value = $scope.value;
                };

                $scope.save = function(){
                    $scope.value = $scope.editor.value;
                    $scope.toggleEditor();
                };

            }

        }
    })
    /* Filter paragraph */
    .filter('paragraph', function(){

        return function(input){
            return input.replace(/\n/g, '<br />');
        };
    });


