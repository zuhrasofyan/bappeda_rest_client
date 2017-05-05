angular
  .module('app')
  .component('userDashboard', {
    templateUrl: 'app/pages/userDashboard/userDashboard.html',
    controller: userDashboardController,
    controllerAs: 'vm'
  });

function userDashboardController(store, UserService, $http, $scope, AvatarService, $state, $mdDialog) {
  var vm = this;

  // get current user data from store in UserService
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }

  vm.user = getUser();

  // get original current user data directly from backend. this is necessary to compare between stored and original user data
  function thisUser() {
    return $http.get('http://localhost:1337/user/profil/' + vm.user.id);
  }
  thisUser().then(function (d){
    vm.thisUser = d.data;
  });

  function allUser (){
    return $http.get('http://localhost:1337/officer/get-all-user');
  }

  allUser().then(function(d){
    vm.allUser = d.data;
  });

  // upload avatar
  function onAvatarSubmit (id){
    AvatarService.uploadAvatar($scope.files, id);
  }
  vm.onAvatarSubmit = onAvatarSubmit;

  vm.getAvatar = AvatarService.getAvatarImage(vm.user.id);

  /*
  ** MODAL DIALOG WITH TEMPLATE
  */
  vm.customFullscreen = false;
  vm.showAdvanced = function(ev, _user) {
    $mdDialog.show({
      controller: UserEditController,
      controllerAs: '$ctrl',
      templateUrl: 'app/templates/editUser.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      //carrying scope from parent
      resolve: {
        user : function (){
          return _user;
        }
      },
      clickOutsideToClose:true,
      fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function() {
      $state.reload();
    }, function() {
      console.log('ditutup dari luar');
    });
  };

  function UserEditController($element, $state, user, $mdDialog, EditUserService) {
    var $ctrl = this;
    // const aa = vm.user;
    $ctrl.userData = user;
    
    $ctrl.cancel = function() {
      $mdDialog.cancel();
      $state.reload();
    };

    function clickFormUser(id, data){
      EditUserService.editCurrentUser(id, data);
      $mdDialog.hide();
    }
    $ctrl.clickFormUser = clickFormUser;
  }
}
