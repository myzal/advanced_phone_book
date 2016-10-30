angular.module('telephoneBookApp.services', ['ngResource','ngFileUpload'])


    .factory('bookList', function bookListFactory($resource) {
        //var bookList = [
        //    {
        //        name: 'John',
        //        surname: 'Bravo',
        //        telephone: '123131',
        //        adres: 'Mickiewicza Warszawa'
        //    },
        //    {
        //        name: 'Jan',
        //        surname: 'Kowalski',
        //        telephone: '323232',
        //        adres: 'Wyszynskiego Szczecin'
        //    },
        //    {
        //        name: 'Janusz',
        //        surname: 'Nowak',
        //        telephone: '123131231',
        //        adres: 'Wyspianskiego Olsztyn'
        //    }
        //];
        var resource = $resource('http://localhost:3000/bookList/:id', {id: '@id'}, {
            update: {method: 'PUT'}

        });


        //console.log(Resource);
        return {
            get: function(success, error){
                return resource.query();
            },
            find: function(id, success, error){
                return resource.get({id: id}, success, error);
            },
            create: function(){
                return new resource();
            },
            destroy: function(id, success, error){
                resource.delete({id: id});
            }
        }
    })


;

//var upload = Upload.upload({
//    url: 'server/upload/url', // upload.php script, node.js route, or servlet url
//
//});
