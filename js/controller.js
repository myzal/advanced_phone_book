/**
 * Created by Mateusz on 25.09.2016.
 */

angular.module('telephoneBookApp.controllers',[]).
controller('bookController', function($scope,$http){

    //$http.get('js/test.json').then(function(data) {
    //    $scope.bookList = data;
    //}),

        $scope.bookList=[



           {
               name: 'John',
               surname: 'Bravo',
               telephone: 123131,
               adres: 'Mickiewicza Warszawa'
           },
         {
               name: 'Jan',
               surname: 'Kowalski',
               telephone: 323232,
               adres: 'Wyszynskiego Szczecin'
           },
        {
               name: 'Janusz',
               surname: 'Nowak',
               telephone: 123131231,
               adres: 'Wyspianskiego Olsztyn'
           }
   ]

    $scope.searchPeople = function (people) {
        var keyword = new RegExp($scope.nameFilter , 'i');
        return !$scope.nameFilter  || keyword.test(people.name) || keyword.test(people.surname);
    };
$scope.standardOrder=function(people){
    $scope.orderByData=people;


};
});