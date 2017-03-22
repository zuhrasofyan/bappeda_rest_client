

angular
  .module('app')
  .component('showRadDashboard', {
    templateUrl: 'app/pages/showRadDashboard/showRadDashboard.html',
    controller: showRadDashboardController,
    controllerAs: 'vm'
  });

  function showRadDashboardController(RadService) {
    var vm = this;

    //set initial years
    var currentTime = new Date();
    var curYear = currentTime.getFullYear();
    var lastYear = curYear -1;
    vm.curYear = curYear;
    vm.lastYear = lastYear;
    vm.tahun = '';
    // set initial data
    vm.selected = [];
    vm.query = {
      order: 'skpd'
    };

    //initial data retrieved from REST API
    RadService.getRadDataTahunan(vm.lastYear).then(function(d){
      vm.dataTahunan = d.data;
    });

    // RadService.getRadKategori().then(function(d){
    //   vm.radKategoriList = d.data;
    // });

    //change vm.dataTahunan if user select other years
    vm.changeTahun = function() {
      RadService.getRadDataTahunan(vm.tahun).then(function(d){
        vm.dataTahunan = d.data;
      });
    };
  }
