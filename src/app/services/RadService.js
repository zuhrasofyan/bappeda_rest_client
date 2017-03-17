angular
  .module('app')
  .service('RadService', RadService);


function RadService($http, $state, moment) {
	var vm = this;

	function submitRad(data) {
		$http.post('http://localhost:1337/renaksi/tambah-data', {
			judul:data.judul,
			tanggal: moment(data.tanggal).format('YYYY-MM-DD'),
			masalah: data.masalah,
			rekomendasi: data.rekomendasi,
			rencanaAksi: data.rencanaAksi,
			selectedSkpd: data.selectedSkpd,
			ukuranBerhasil: data.ukuranBerhasil,
			targetLastYear: data.targetLastYear,
			targetThisYear: data.targetThisYear,
			statusLastYear: data.statusLastYear,
			keterangan: data.keterangan
		}).then(function(result){
			if (result.status !== 200) {
				alert ('Ada kesalahan pada input anda atau server error. Coba lagi!');
			} else if (result.status === 200) {
				alert ('Data berhasil ditambah');
				$state.reload();
			}
		})
	}
	vm.submitRad = submitRad;

};


