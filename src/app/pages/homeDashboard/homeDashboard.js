angular
  .module('app')
  .component('homeDashboard', {
    templateUrl: 'app/pages/homeDashboard/homeDashboard.html',
    controller: homeDashboardController,
    controllerAs: 'vm'
  })

function homeDashboardController(UserService, $http, RadService, $scope) {
  vm = this;

  vm.options = {
    responsive: true,
    scales:{
      xAxes:[{
        // ticks: {
        //   callback: function(value) {
        //     return value.substr(0,30);
        //   }
        // }
      }],
      yAxes:[{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    tooltips: {
      callbacks: {
        beforeTitle: function (tooltipItems, data){
          return 'Kategori:';
        },
        label: function(tooltipItems, data) {
          return tooltipItems.yLabel + ' %';
        }
      }
    }
  }

  //set initial years
  var currentTime = new Date();
  var curYear = currentTime.getFullYear();
  var lastYear = curYear -1;
  vm.curYear = curYear;
  vm.lastYear = lastYear;
  vm.tahun = lastYear;

  // Initial data retrieved from REST API
  RadService.getTahun().then(function(d){
    vm.tahunList = d.data;
  });

  RadService.getRadKategori().then(function(d){
    vm.kategoriList = d.data;
  });

  RadService.getSkpdList().then(function(d){
    vm.skpdList = d.data;
  })

  vm.jenisMasalah = [];
  vm.masalahPersentasi = [];
  vm.avgMasalahPersentasi = [];
  
  RadService.getRadDataTahunan(vm.lastYear).then(function(d){
    vm.dataTahunan = d.data;
    for (i=0; i< d.data.length; i++){
      // push each kategori into jenis masalah
      vm.jenisMasalah[i] = d.data[i].kategori;
      var arr = [];
      var x = 0;
      for (j=0; j< d.data[i].renaksi.length; j++) {
        arr.push(d.data[i].renaksi[j].persentasi_capaian);
        x= x+d.data[i].renaksi[j].persentasi_capaian;
      }
      // push to array:
      // each persentasi into multidimensional array
      vm.masalahPersentasi.push(arr);
      // sum an average of each kategory percentage
      vm.avgMasalahPersentasi.push(Math.floor(x/(d.data[i].renaksi.length)));
    }
  });

  //change vm.dataTahunan if user select other years
  function changeTahun(tahun) {
    RadService.getRadDataTahunan(tahun).then(function(d){
      vm.dataTahunan = d.data;
      vm.jenisMasalah = [];
      vm.masalahPersentasi = [];
      vm.avgMasalahPersentasi = [];
      for (i=0; i< d.data.length; i++){
      // push each kategori into jenis masalah
      vm.jenisMasalah[i] = d.data[i].kategori;
      var arr = [];
      var x = 0;
      for (j=0; j< d.data[i].renaksi.length; j++) {
        arr.push(d.data[i].renaksi[j].persentasi_capaian);
        x= x+d.data[i].renaksi[j].persentasi_capaian;
      }
      // push to array:
      // each persentasi into multidimensional array
      vm.masalahPersentasi.push(arr);
      // sum an average of each kategory percentage
      vm.avgMasalahPersentasi.push(Math.floor(x/(d.data[i].renaksi.length)));
    }

    });
  };
  vm.changeTahun = changeTahun;
  

  // for tab user 
  function getUser() {
    var a = UserService.getCurrentUser();
    return a;
  }
  vm.user = getUser();

  /* For tab pengaturan rad */
  vm.newTahun = '';
  vm.newCategory = '';
  vm.newSkpd = '';

  function clickFormAddYear(tahun) {
    RadService.addTahun(tahun);

    // Set time out used to update a vm scope that use scope.apply. otherwise it will throw error, or not updated at all...
    setTimeout(function(){
      $scope.$apply(RadService.getTahun().then(function(d){
        vm.tahunList = d.data;
        vm.newTahun = '';
      }))
    }, 1000)

  };
  vm.clickFormAddYear = clickFormAddYear;

  function clickFormAddCategory(kategori) {
    RadService.addRadKategori(kategori);
    setTimeout(function(){
      $scope.$apply(RadService.getRadKategori().then(function(d){
        vm.kategoriList = d.data;
        vm.newCategory = '';
      }))
    },1000)
  }
  vm.clickFormAddCategory = clickFormAddCategory;

  function clickFormAddSkpd(skpd) {
    RadService.addSkpd(skpd);
    setTimeout(function(){
      $scope.$apply(RadService.getSkpdList().then(function(d){
        vm.skpdList = d.data;
        vm.newSkpd = '';
      }))
    },1000)
  }
  vm.clickFormAddSkpd = clickFormAddSkpd;

  vm.user = getUser();

  
}
