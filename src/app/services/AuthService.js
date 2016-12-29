angular
  .module('app')
  .service('AuthService', function ($http, $rootScope, store, UserService, authManager, $state, jwtHelper){
    var vm = this;
    //var isAuthenticated = false;
    
    function submitLogin(loginData) {
      $http.post('http://localhost:1337/auth/login', {
        username: loginData.email,
        password: loginData.password
      }).then(function(result){
        if (result.status === 200) {
          if (store.get('user')) {
            store.remove('user');
          }
          if (store.get('token')) {
            store.remove('token');
          }
          UserService.setCurrentUser(result.data.user);
          UserService.setCurrentToken(result.data.token);
          authManager.authenticate();

          $state.go('dashboard');
          //console.log(jwtHelper.decodeToken(store.get('token')));
          //console.log(jwtHelper.getTokenExpirationDate(store.get('token')));
        }
        //TODO: else check if bad credential (result.status !== 200) return, show notification
        //else {}
      })
    };
    
    function logout() {
      store.remove('user');
      store.remove('token');

      //$location.path('/');
      authManager.unauthenticate();
      $state.go('login');
      //console.log(authManager.isAuthenticated());
    }

    
    //register the functions
    vm.submitLogin = submitLogin;
    vm.logout = logout;

  })