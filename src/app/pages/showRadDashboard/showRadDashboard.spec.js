describe('showRadDashboard component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('showRadDashboard', function () {
      return {
        templateUrl: 'app/showRadDashboard.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<showRadDashboard></showRadDashboard>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
