angular
  .module('app')
  .service('APIInterceptor', APIInterceptor);

function APIInterceptor($rootScope, UserService) {
  var vm = this;
  vm.request = function(config) {
    var currentUser = UserService.getCurrentUser();
    var currentToken = UserService.getCurrentToken();
    var access_token = currentToken ? currentToken : null;
    if (access_token) {
      config.headers.authorization = 'Bearer ' + access_token;
    }
    return config;
  };
  vm.responseError = function(response) {
    if (response.status === 401) {
        $rootScope.$broadcast('unauthorized');
    }
    return response;
  };
}
