angular
  .module('app')
  .component('register', {
    // restrict: 'E',
    templateUrl: 'app/register.html',
    controller: registerController,
    controllerAs: 'vm'
  });

function registerController () {
  var vm = this;
}