angular
  .module('app')
  .component('isiRadDashboard', {
    templateUrl: 'app/pages/isiRadDashboard/isiRadDashboard.html',
    controller: isiRadDashboardController,
    controllerAs: 'vm'
  })
  .config(function($mdThemingProvider){
  	$mdThemingProvider.theme('docs-dark', 'default')
  	.primaryPalette('yellow')
  	.dark();
  });

function isiRadDashboardController($element, RadService, UserService) {
  var vm = this;
  vm.showHints = true;

  // initialize default data
  var datenow = new Date();
  var user = function (){
    var a = UserService.getCurrentUser();
    return a.username;
  };

  RadService.getRadKategori().then(function(d){
    vm.kategoriList = d.data;
  });

  /* TODO: get list of tahun from backend */
  vm.tahunList = [
    2016, 2017
  ];

  vm.skpdList = ['Bappeda' ,'DPKAD' ,'Sekretariat Dewan' ,'TAPD' ,'BPM', 'Inspektorat', 'PU', 'KPPTSP', 'BKPP'];
  vm.selectedSkpd = [];

  //set Year
  var currentTime = new Date();
  var curYear = currentTime.getFullYear();
  var lastYear = curYear -1;
  vm.curYear = curYear;

  //initial value of form isirad
  vm.isirad = {
  	tahun: curYear-1,
  	tanggalInput: datenow,
    selectedSkpd: '',
    pembuat: user()
  };
  function clickFormRad(data) {
    RadService.submitRad(data);
  }
  vm.clickFormRad = clickFormRad;


}
