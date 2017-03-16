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
  })

function isiRadDashboardController($element) {
  var vm = this;
  vm.showHints = true;
  var datenow = new Date();
  vm.judulList = [
    {name: "Pengelolaan APBD"},
    {name: "Pengadaan Barang dan Jasa"},
    {name: "Perizinan / Pelayanan Terpadu Satu Pintu"},
    {name: "Permasalahan Lainnya"}
  ];

  vm.skpdList = ['Bappeda' ,'DPKAD' ,'Sekretariat Dewan' ,'TAPD' ,'BPM', 'Inspektorat', 'PU', 'KPPTSP', 'BKPP'];
  vm.selectedSkpd = [];
  // vm.searchTerm;
  // vm.clearSearchTerm = function() {
  //   vm.searchTerm = '';
  // };
  // $element.find('input').on('keydown', function(ev) {
  //         ev.stopPropagation();
  //     });

  //set Year
  var currentTime = new Date();
  var curYear = currentTime.getFullYear();
  var lastYear = curYear -1;
  vm.curYear = curYear;


  vm.isirad = {
  	tahun: curYear-1,
  	tanggalInput: datenow,
    selectedSkpd: '',
  };

}