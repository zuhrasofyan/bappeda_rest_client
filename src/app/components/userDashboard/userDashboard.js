angular
  .module('app')
  .component('userDashboard', {
    templateUrl: 'app/components/userDashboard/userDashboard.html',
    controller: userDashboardController,
    controllerAs: 'vm'
  });

function userDashboardController(UserService, $http) {
  vm = this;

  //general
  

  //for tab user 
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }

  vm.user = getUser();

  //for tab allUser
  // var request = $http.get('http://localhost:1337/officer/get-all-user').then(function(response){
  //   vm.allUser = response.data;
  //   return response.data;
  // });

  function allUser(){
    return $http.get('http://localhost:1337/officer/get-all-user');
  }

  allUser().then(function(d){
    vm.allUser = d.data;
  });

  
}
