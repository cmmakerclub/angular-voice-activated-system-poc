'use strict';

angular.module('rfid', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'ui.bootstrap',  'btford.socket-io'])
  .factory('socket', function (socketFactory) {

    var url = document.location.hostname + ':4000'//'//192.168.0.101:4000'
    var myIoSocket = io.connect(url);

    var mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'app/about/partials/about.html',
        controller: 'AboutCtrl'
      })
      .when('/rfid', {
        templateUrl: 'app/rfid/partials/rfid.html',
        controller: 'RfidCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
;
