/**
 * Created by Mateusz on 25.09.2016.
 */




angular.module('telephoneBookApp.controllers', [])

    /* Controller  bookController*/


    .controller('bookController', function ($scope, bookList, $http) {
        $scope.bookList = bookList.get();

        $scope.delete = function (index) {
            contacts.destroy(index);
        };
        $scope.searchPeople = function (people) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(people.name) || keyword.test(people.surname);
        };
        $scope.standardOrder = function (people) {
            $scope.orderByData = people;
        };
    })

    /* Controller  newPeople */

    .controller('newPeople', function ($scope, booklist) {
            $scope.submit = function () {
                booklist.set($scope.people);
                $scope.people = null;
                $scope.added = true;
            }
        }
    )

    /* Index Controller */

    .controller('index',function($scope)
    {
$scope.bookList=bookList.get();
$scope.delete = function(index){

    bookList.destroy(index);

}


    })


    .directive('editPeople', function () {
        return {
            restrict: 'AE',
            templateUrl: '/partials/editable.html',
            scope: {
                value: '=editPeople',
                field: '@fieldType',
                controller: function ($scope) {
                    $scope.editor = {
                        showing: false,
                        value: $scope.value
                    };
                        $scope.toggleEditor = function () {
                            $scope.editor.showing = !$scope.editor.showing;
                            $scope.field = ($scope.field) ? $scope.field : 'text';


                        };
                    $scope.save = function () {
                        $scope.value = $scope.editor.value;
                        $scope.toggleEditor();

                    };


                }
            }
        }
    });