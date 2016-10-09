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
                $scope.people=null;
                $scope.added=true;
            }
        }
    );
