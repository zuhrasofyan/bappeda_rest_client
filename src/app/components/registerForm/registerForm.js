angular
  .module('app')
  .component('registerForm', {
    templateUrl: 'app/components/registerForm/registerForm.html',
    controller: registerFormController,
    controllerAs: 'vm'
  });

function registerFormController($scope, AuthService) {
  var vm = this;

  vm.formRegister = {};

  function clickRegister(data){
    var pesan = '';
    if ($scope.registerForm.$invalid) {
      return;
      alert('Isi formnya ' + 'error: ' + $scope.registerForm.email.$error);
    } else if (vm.formRegister.password != vm.formRegister.password2) {
      alert('Password tidak cocok');
      return;
    } else {
      AuthService.submitRegister(data);
      // if (store.get('token')) {
      //   vm.myToken = store.get('token');
      // };
    }
  }

  vm.clickRegister = clickRegister;

}



