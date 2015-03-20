'use strict';
describe('Controller: userCtrl', function () {
// load the controller's module
  beforeEach(module('rfid'));
  var userCtrl,
      scope;
// Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    userCtrl = $controller('userCtrl', {
      $scope: scope
    });
  }));
  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
