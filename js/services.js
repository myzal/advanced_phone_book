angular.module('telephoneBookApp.services', ['ngResource','ngFileUpload'])


    .factory('bookList', function bookListFactory($resource) {
        var resource = $resource('http://localhost:3000/bookList/:id', {id: '@id'}, {
            update: {method: 'PUT'}

        });


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
    });

