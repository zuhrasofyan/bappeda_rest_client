describe('isiRadDashboard component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('isiRadDashboard', function () {
      return {
        templateUrl: 'app/isiRadDashboard.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<isiRadDashboard></isiRadDashboard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
