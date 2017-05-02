angular
  .module('app')
  .component('userDashboard', {
    templateUrl: 'app/pages/userDashboard/userDashboard.html',
    controller: userDashboardController,
    controllerAs: 'vm'
  });

function userDashboardController(UserService, $http, $scope, AvatarService) {
  var vm = this;

  //for tab user
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }

  vm.user = getUser();

  // for tab allUser
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

  // upload avatar
  $scope.$watch('files.length',function(newVal,oldVal){
      console.log($scope.files);
  });

  function onAvatarSubmit (id){
    AvatarService.uploadAvatar($scope.files, id);
  }
  vm.onAvatarSubmit = onAvatarSubmit;

  //vm.avatarUrl = 'http://localhost:1337/user/avatar/'+vm.user.id;

  vm.getAvatar = AvatarService.getAvatarImage(vm.user.id);
}
