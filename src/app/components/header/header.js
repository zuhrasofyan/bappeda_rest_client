angular
  .module('app')
  .component('fountainHeader', {
    templateUrl: 'app/components/header/header.html',
    controller: headerController,
    controllerAs: 'vm'
  });

function headerController($rootScope, store, $location, authManager, AuthService, UserService) {
  var vm = this;

  vm.isAuthenticated = $rootScope.isAuthenticated;
  // if(store.get('user')){
  //   vm.username = store.get('user').username;
  // } else vm.username = null;

  function userName() {
    var a = UserService.getCurrentUser();
    return a.username;
  }

  function logout(){
    AuthService.logout();
  }
  vm.logout = logout;
  vm.username = userName();
}