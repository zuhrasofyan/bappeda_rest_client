angular
  .module('app')
  .service('AuthService', function ($http, $rootScope, store, UserService, authManager, $state){
    var vm = this;

    function submitLogin(loginData) {
      $http.post('http://localhost:1337/auth/login', {
        email: loginData.email,
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

          $state.go('dashboard.home');

        } else {
          if (result.status === 400) {
            alert("Email atau password anda salah. Silahkan coba lagi!");
          } 
          alert("Server tidak merespon.. Coba lagi beberapa saat atau hubungi admin");
        // TODO: else check if bad credential (result.status !== 200) return, show notification
        // else {}
        }
      })
    };
    
    function logout() {
      store.remove('user');
      store.remove('token');

      authManager.unauthenticate();
      $state.go('login');
    }

    // register the functions
    vm.submitLogin = submitLogin;
    vm.logout = logout;

  })