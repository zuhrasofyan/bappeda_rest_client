angular
  .module('app')
  .component('login', {
    // restrict: 'E',
    templateUrl: 'app/login.html',
    controller: loginController,
    controllerAs: 'vm'
  });

function loginController () {
  var vm = this;
}