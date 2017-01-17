/**
 * Created by Mateusz on 25.09.2016.
 */




angular.module('telephoneBookApp.controllers', ['ngRoute', 'ngSanitize', 'ngFileUpload', 'ui.calendar', 'ui.bootstrap'])

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

        $scope.activePage = function (path) {
            return (path == $location.path()) ? 'active' : '';
        }
    })

    /* Controller  newPeople */
    .controller('newPeople', function ($scope, bookList, Upload) {
            $scope.dateOptions = {
                maxDate: new Date(),
                startingDay: 1
            };
            $scope.open2 = function () {
                $scope.popup2.opened = true;
            };

            $scope.popup2 = {
                opened: false
            };


            $scope.select =
                [
                    {id: 'fm', name: 'Family'},
                    {id: 'fs', name: 'Friends'},
                    {id: 'fc', name: 'Colleagues'},
                    {id: 'fo', name: 'Others'}
                ];
            $scope.people = bookList.create();
            $scope.people.date = new Date(2000, 1, 01);
            $scope.submit = function () {


                var imageName = $scope.people.name + '_' + $scope.people.surname;
                if ($scope.file == undefined) {
                    $scope.people.file_name = 'no_image.png';
                }
                else {
                    $scope.upload($scope.file, imageName);
                    var exten = $scope.file.name.split('.').pop();
                    $scope.people.file_name = imageName + '.' + exten;
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


    .controller('calendar', function ($scope, bookList, uiCalendarConfig) {
            var year, new_year, actual_year, color;
            $scope.events = [];
            $scope.eventSources = [$scope.events];
            angular.forEach($scope.bookList, function (value) {
                year = (value.date).slice(4);
                actual_year = new Date().getFullYear();
                new_year = actual_year + year;

                if (value.range == 'fs') {
                    color = '#006dcc';
                }
                else if (value.range == 'fm') {
                    color = '#5bb75b';
                }
                else if (value.range == 'fc') {
                    color = '#8A2BE2';
                }
                else {
                    color = '#FF6347';

                }

                $scope.events.push({
                    title: value.name,
                    surname: value.surname,
                    start: new Date(new_year),
                    end: new Date(new_year),
                    allDay: 1,
                    stick: true,
                    adres: value.adres,
                    email: value.email,
                    phone: value.telephone,
                    color: color

                })

            });

            $scope.uiConfig = {
                calendar: {
                    height: 450,
                    editable: true,
                    displayEventTime: false,
                    header: {
                        left: 'month basicWeek basicDay agendaWeek agendaDay',
                        center: 'title',
                        right: 'today prev,next'
                    },
                    eventClick: function (event) {
                        $scope.SelectedEvent = event;
                    }

                }
            };
        }
    )

    .controller('map', function ($scope, bookList) {

        geocoder = new google.maps.Geocoder();

        var mapOptions = {
            zoom: 11,
            //center: latlng,
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {
            if (geocoder) {
                geocoder.geocode({'address': info.adres}, function (results, status) {
                    $scope.map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        //position: new google.maps.LatLng(info.lat, info.long),
                        position: results[0].geometry.location,
                        title: info.name,
                        adres: info.adres
                    });
                    marker.content = '<div class="infoWindowContent">' + info.name + '</div>';

                    google.maps.event.addListener(marker, 'click', function () {
                        console.log(marker);
                        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.adres);
                        infoWindow.open($scope.map, marker);
                    });

                    $scope.markers.push(marker);
                });
            }
            else {
                console.log(status);
            }

        }
        angular.forEach($scope.bookList, function (value) {

            createMarker(value);
        })
        $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }


    })


    .
    directive('editPeople', function () {
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
            return (input);
        }
    })


