angular
  .module('app')
  .component('loginForm', {
    //restrict: 'E',
    templateUrl: 'app/components/loginForm/loginForm.html',
    controller : loginFormController,
    controllerAs: 'vm'
  });

function loginFormController ($scope, $http, $q, store, $location, jwtHelper, AuthService){
    var vm = this;
    var deferred = $q.defer();

    vm.hello = "hello world";
    vm.formLogin = {};

    vm.myToken = '';
    
    function clickLogin(data) {
      AuthService.submitLogin(data);
      if (store.get('token')) {
        vm.myToken = store.get('token');
      }
      
    }
    vm.clickLogin = clickLogin;
    
    //vm.submitLogin = AuthService.submitLogin(vm.formLogin);
  }
