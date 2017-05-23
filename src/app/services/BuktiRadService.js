angular
  .module('app')
  .service('BuktiRadService', BuktiRadService);

function BuktiRadService($http, $state) {
  var vm = this;

  function submitBuktiRad(data, id){
		var formData = new FormData();
    angular.forEach(data, function(obj){
      if (!obj.isRemote) {
        formData.append('image', obj.lfFile)
      }
    });
    $http.post('http://localhost:1337/renaksi/bukti-rad/'+id, formData, {
      transformRequest: angular.identity,
      headers: {'Content-Type': undefined}
    })
    .then(function (result) {
      if (result.status === 200) {
        alert('Berhasil di unggah');
        $state.reload();
      } else {
        alert('terjadi kesalahan. coba lagi');
      }
    }, function(err){
      alert(err);
    })
	}
	vm.submitBuktiRad = submitBuktiRad;

  function getListBuktiRad(radId){
    var imageList = $http.get('http://localhost:1337/renaksi/list-bukti-rad/'+radId);
    return imageList;
  }
  vm.getListBuktiRad = getListBuktiRad;
}


