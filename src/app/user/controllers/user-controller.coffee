'use strict'
###*
# @ngdoc function
# @name rfid.controller:userCtrl
# @description
# # userCtrl
# Controller of the rfid
###
angular.module('rfid')
.controller 'userCtrl', ($scope) ->
  $scope.awesomeThings = [
    'HTML5 Boilerplate'
    'AngularJS'
    'Karma'
  ]
  $scope
