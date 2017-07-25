describe('registerForm component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('registerForm', function () {
      return {
        templateUrl: 'app/registerForm.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<registerForm></registerForm>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
