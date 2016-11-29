/**
 * Created by Mateusz on 25.09.2016.
 */




angular.module('telephoneBookApp.controllers', ['ngRoute', 'ngSanitize', 'ngFileUpload'])

    /* Controller  bookController*/
    .controller('bookController', function ($scope, bookList, $location) {
        $scope.bookList = bookList.get();

        $scope.searchPeople = function (people) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(people.name) || keyword.test(people.surname);
        };
        $scope.standardOrder = function (people) {
            $scope.orderByData = people;
        };

        $scope.delete = function (index) {
            bookList.destroy($scope.bookList[index].id);
            $scope.bookList.splice(index, 1);
            alert.show();
        };

        $scope.activePage=function(path){
           console.log(path == $location.path());
            console.log($location.path());
            return (path == $location.path()) ? 'active' : '';
        }
})

    /* Controller  newPeople */
    .controller('newPeople', function ($scope, bookList, Upload) {
            $scope.people = bookList.create();
            $scope.submit = function () {
                var imageName = $scope.people.name + '_' + $scope.people.surname;
                if ($scope.file == undefined){
                    $scope.people.file_name= 'no_image.png';
                }
                else{
                    $scope.upload($scope.file, imageName);
                    var exten =$scope.file.name.split('.').pop();
                    $scope.people.file_name= imageName + '.' + exten;
                }
                $scope.people.$save();
                $scope.people = bookList.create();
                $scope.submitSuccess = true;
            },
            $scope.upload = function (file, imageName) {
                Upload.upload({
                    url: 'upload.php',
                    data: {file: file, 'image_name': imageName}
                }).then(function (resp) {
                        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    }
                    , function (resp) {
                        console.log('Error status: ' + resp.status);
                    }, function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    }
                );
            };
        }
    )

    /* Controller  showPeople */
    .controller('showPeople', function ($scope, $routeParams, bookList, $timeout) {
        $scope.people = bookList.find($routeParams.id);

        $scope.$on('saved', function () {
            $timeout(function () {
                $scope.people.$update();
            }, 0);

        })
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

                $scope.toggleEditor = function () {
                    $scope.editor.showing = !$scope.editor.showing;
                    $scope.editor.value = $scope.value;
                };

                $scope.save = function () {
                    $scope.value = $scope.editor.value;
                    $scope.$emit('saved');
                    $scope.toggleEditor();
                };

            }

        }
    })
    /* Filter paragraph */
    .filter('paragraph', function () {

        return function (input) {
            //console.log(input.replace(/\n/g, '<br />'));
            //return (input) ? input.replace(/\n/g, '<br />') : '';
            return (input);
        }
    })


