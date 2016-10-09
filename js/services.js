angular.module('telephoneBookApp.services', [])


    .factory('bookList', function () {
        var bookList = [
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
        ];

        return {
            get: function () {
                return bookList;
            },
            find: function (index) {
                return bookList[index];
            },
            set: function(people){
                bookList.push(people);
            },
            destroy: function(index){
                bookList.splice(index,1);
            }
    }
})
;