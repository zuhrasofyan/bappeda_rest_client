describe('loginForm component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('loginForm', function () {
      return {
        templateUrl: 'app/components/loginForm/loginForm.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<loginForm></loginForm>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
