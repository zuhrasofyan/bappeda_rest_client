angular
  .module('app')
  .component('homeDashboard', {
    templateUrl: 'app/pages/homeDashboard/homeDashboard.html',
    controller: homeDashboardController,
    controllerAs: 'vm'
  });

function homeDashboardController(UserService, $http) {
  vm = this;

  //general
  

  //for tab user 
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }

  vm.user = getUser();

  
}
