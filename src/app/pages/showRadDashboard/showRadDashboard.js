

angular
  .module('app')
  .component('showRadDashboard', {
    templateUrl: 'app/pages/showRadDashboard/showRadDashboard.html',
    controller: showRadDashboardController,
    controllerAs: 'vm'
  });

  function showRadDashboardController(RadService, $mdDialog, $state, UserService, BuktiRadService) {
    var vm = this;

    function getUser() {
      var a = UserService.getCurrentUser();
      return a;
    }

    vm.user = getUser();

    //set initial years
    var currentTime = new Date();
    var curYear = currentTime.getFullYear();
    var lastYear = curYear -1;
    vm.curYear = curYear;
    vm.lastYear = lastYear;
    vm.tahun = lastYear;
    // set initial data
    vm.selected = [];
    vm.query = {
      order: 'skpd'
    };

    RadService.getTahun().then(function(d){
      vm.tahunList = d.data;
    });

    //initial data retrieved from REST API
    RadService.getRadDataTahunan(vm.lastYear).then(function(d){
      vm.dataTahunan = d.data;
    });

    //change vm.dataTahunan if user select other years
    function changeTahun(tahun) {
      RadService.getRadDataTahunan(tahun).then(function(d){
        vm.dataTahunan = d.data;
      });
    };
    vm.changeTahun = changeTahun;

    /*
    ** MODAL DIALOG WITH TEMPLATE
    */
    vm.customFullscreen = false;

    // EDIT DIALOG 
    vm.showAdvanced = function(ev, _renaksi) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: '$ctrl',
        templateUrl: 'app/templates/editRad.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        //carrying scope from parent
        resolve: {
          renaksi : function (){
            return _renaksi;
          }
        },
        clickOutsideToClose:true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        console.log(answer);
        $state.reload();
      }, function() {
        console.log('ditutup dari luar');
      });
    };

    // EDIT DIALOG CONTROLLER
    function DialogController($mdDialog, renaksi, RadService) {
      var $ctrl = this;

      RadService.getRadKategori().then(function(d){
        $ctrl.kategoriList = d.data;
      });

      RadService.getSkpdList().then(function(e){
        $ctrl.skpdList = e.data;
      })

      $ctrl.renaksi = renaksi;

      $ctrl.hide = function() {
        $mdDialog.hide();
      };

      $ctrl.cancel = function() {
        $mdDialog.cancel();
      };

      $ctrl.answer = function(answer) {
        $mdDialog.hide(answer);
      };

      function clickFormRad(id, data){
        RadService.editRad(id, data);
        $mdDialog.hide();
      }
      $ctrl.clickFormRad = clickFormRad;
    }

    // ADD BUKTI DIALOG 
    vm.showAddBuktiDialog = function(ev, _renaksi) {
      var _hello = 'helloworld';
      var _buktiList = BuktiRadService.getListBuktiRad(_renaksi.id);
      var _user = vm.user;
      $mdDialog.show({
        controller: AddBuktiController,
        controllerAs: '$ctrl',
        templateUrl: 'app/templates/addBukti.tpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        // carrying scope from parent
        resolve: {
          renaksi : function(){
            return _renaksi;
          },
          buktiList: function(){
            return _buktiList;
          },
          user: function() {
            return _user;
          }
        },
        clickOutsideToClose:true,
        fullscreen: vm.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        $state.reload();
      }, function() {
        console.log('tutup');
      });
    };

    // ADD BUKTI DIALOG CONTROLLER
    function AddBuktiController($mdDialog, renaksi, BuktiRadService, buktiList, user, $scope) {
      var $ctrl = this;

      $ctrl.user = user;
      $ctrl.buktiList = buktiList.data;
      $ctrl.getGambar = BuktiRadService.getListBuktiRad(renaksi.id);

      $ctrl.renaksi = renaksi;

      $ctrl.hide = function() {
        $mdDialog.hide();
      };

      $ctrl.cancel = function() {
        $mdDialog.cancel();
      };

      $ctrl.answer = function(answer) {
        $mdDialog.hide(answer);
      };
      $ctrl.files = '';

      function clickFormBuktiRad(id){
        BuktiRadService.submitBuktiRad($ctrl.files, id);
        $mdDialog.hide();
      }
      $ctrl.clickFormBuktiRad = clickFormBuktiRad;
    }

  }
