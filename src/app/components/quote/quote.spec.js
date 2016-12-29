describe('quote component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('quote', function () {
      return {
        templateUrl: 'app/quote.html'
      };
    });
  }));

  it('should...', angular.mock.inject(function ($rootScope, $compile) {
    var element = $compile('<quote></quote>')($rootScope);
    $rootScope.$digest();
    expect(element).not.toBeNull();
  }));
});
