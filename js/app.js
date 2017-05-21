/**
 * Created by Mateusz on 25.09.2016.
 */
angular.module('telephoneBookApp', ['telephoneBookApp.services', 'telephoneBookApp.controllers', 'ngRoute', 'ui.bootstrap', 'ngSanitize',
        'ngResource', 'ngFileUpload', 'ui.calendar', 'pascalprecht.translate'
    ])
    .config(function ($routeProvider) {
        $routeProvider.
            when("/", {
                controller: 'bookController',
                templateUrl: 'partials/people.html'

            })

            .when("/newPeople", {
                controller: 'newPeople',
                templateUrl: 'partials/newPeople.html'

            })
            .when("/people/:id", {
                controller: 'showPeople',
                templateUrl: 'partials/showPeople.html'
            })

            .when("/calendar", {
                controller: 'calendar',
                templateUrl: 'partials/calendar.html'
            })

            .when("/map", {
                controller: 'map',
                templateUrl: 'partials/map.html'
            })

            .otherwise({redirectTo: '/'});
    })
    .config(function ($translateProvider) {
        $translateProvider.translations('en', translationsEN);
        $translateProvider.translations('pl', translationsPL);
        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    });

var translationsEN = {
    HEADTEXT: 'Your Telephone Book',
    CONTACT_LIST: 'Contact list',
    ADD_CONTACT: 'Add contact',
    BIRTHDAY_CALENDAR: 'Birthday Calendar',
    CONTACT_MAP:  'Contact map',
    NAME: 'Name',
    SURNAME: 'Surname',
    PHONE_NUMBER: 'Phone number',
    ADRES: 'Adres',
    SHOW: 'Show',
    REMOVE: 'Remove',
    YOUR_CONTACTS: 'Your contacts',
    SEARCH_CONTACT: 'Search contact',
    FRIENDS: 'Friends',
    FAMILY: 'Family',
    COLLEGUES: 'Collegues',
    OTHERS: 'Others',
    DATE: 'Date',
    EMAIL:  'Email',
    PLEASE_SELECT: 'Please select',
    SELECT_IMAGE: 'Select image',
    NEW_CONTACT:  'New contact was added.',
    RANGE: 'Range',
    YOUR_CONTACT: 'Your contact',
    LEGEND: 'Legend',
    SAVE: 'Save',
    CANCEL: 'CANCEL',
    EDIT: 'Edit',
    SELECTED_BIRTHDAY: 'Selected birthday',
    BUTTON_LANG_EN: 'EN',
    BUTTON_LANG_PL: 'PL'



}
var translationsPL = {
    HEADTEXT: 'Twoje kontakty',
    CONTACT_LIST: 'Lista kontaktów',
    ADD_CONTACT: 'Dodaj kontakt',
    BIRTHDAY_CALENDAR: 'Kalendarz urodzin',
    CONTACT_MAP:  'Mapa kontaktowa',
    NAME: 'Imię',
    SURNAME: 'Nazwisko',
    PHONE_NUMBER: 'Numer telefonu',
    ADRES: 'Adres',
    SHOW: 'Pokaż',
    REMOVE: 'Usuń',
    YOUR_CONTACTS: 'Twoje kontakty',
    SEARCH_CONTACT: 'Znajdz kontakt',
    FRIENDS: 'Przyjaciele',
    FAMILY: 'Rodzina',
    COLLEGUES: 'Koledzy z pracy',
    OTHERS: 'Inni',
    DATE: 'Data urodzenia',
    EMAIL:  'Email',
    PLEASE_SELECT: 'Proszę wybrać',
    SELECT_IMAGE: 'Wybierz zdjęcie',
    NEW_CONTACT:  'Nowy kontakt został dodany',
    RANGE: 'Ranga',
    YOUR_CONTACT: 'Twój kontakt',
    LEGEND: 'Legenda',
    SAVE: 'Zapisz',
    CANCEL: 'Anuluj',
    EDIT: 'Edytuj',
    SELECTED_BIRTHDAY: 'Wybrany kontakt',
    BUTTON_LANG_EN: 'EN',
    BUTTON_LANG_PL: 'PL'






}

//Your Telephone Book