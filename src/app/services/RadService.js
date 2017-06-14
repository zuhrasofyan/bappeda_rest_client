angular
  .module('app')
  .service('RadService', RadService);


function RadService($http, $state, moment) {
	var vm = this;

	function submitRad(data) {
		$http.post('http://localhost:1337/renaksi/tambah-data', {
			nomor:data.nomor,
			tanggal: moment(data.tanggal).format('YYYY-MM-DD'),
      tahun: data.tahun,
			masalah: data.masalah,
			rekomendasi: data.rekomendasi,
			rencanaAksi: data.rencanaAksi,
			selectedSkpd: data.selectedSkpd,
			ukuranBerhasil: data.ukuranBerhasil,
			targetLastYear: data.targetLastYear,
			targetThisYear: data.targetThisYear,
			statusLastYear: data.statusLastYear,
			persentasiCapaian: data.persentasiCapaian,
			keterangan: data.keterangan,
      pembuat: data.pembuat
		}).then(function(result){
			if (result.status !== 200) {
				if (result.status === 403) {
					alert("Anda tidak memiliki akses. Silahkan login sebagai admin atau officer!");
				} else {
					alert('Ada kesalahan pada input anda atau server error. Coba lagi!');
				}
				
			} else if (result.status === 200) {
				alert ('Data berhasil ditambah');
				$state.reload();
			}
		});
	}
	vm.submitRad = submitRad;

  function editRad(id, data) {
    $http.patch('http://localhost:1337/renaksi/edit-data/'+id, {
      kategori: data.kategori,
			tanggal: data.tanggal,
      tahun: data.tahun,
			masalah: data.masalah,
			rekomendasi: data.rekomendasi,
			rencanaAksi: data.rencana_aksi,
			selectedSkpd: data.skpd,
			ukuranBerhasil: data.ukuran_berhasil,
			targetLastYear: data.target_last_year,
			targetThisYear: data.target_this_year,
			statusLastYear: data.status_last_year,
			persentasiCapaian: data.persentasi_capaian,
			keterangan: data.keterangan
		}).then(function(result){
			if (result.status !== 200) {
				if (result.status === 403) {
					alert("Anda tidak memiliki akses. Silahkan login sebagai admin atau officer!");
				} else {
					alert ('Ada kesalahan pada input anda atau server error. Coba lagi!');
				}
			} else if (result.status === 200) {
				alert ('Data berhasil diubah');
				$state.reload();
			}
		});
	}
	vm.editRad = editRad;

  function getRadDataTahunan(tahun) {
    return $http.get('http://localhost:1337/renaksi/get-rad-data/'+tahun);
  }
  vm.getRadDataTahunan = getRadDataTahunan;

	function addTahun(tahun) {
		$http.post('http://localhost:1337/renaksi/tahun', {
			tahun: tahun
		}).then(function(result){
			if (result.status !== 200) {
				if (result.status === 403) {
					alert("Anda tidak memiliki akses. Silahkan login sebagai admin atau officer!");
				} else {
					alert ('Ada kesalahan pada input anda atau server error.');
				}
			} else if (result.status === 200) {
				alert ('Tahun berhasil ditambah');
			}
		})
	}
	vm.addTahun = addTahun;

	function getTahun() {
		return $http.get('http://localhost:1337/renaksi/tahun');
	}
	vm.getTahun = getTahun;

	function addRadKategori(kategori){
		$http.post('http://localhost:1337/renaksi/kategori', {
			kategori: kategori
		}).then(function(result){
			if (result.status !== 200) {
				if (result.status === 403) {
					alert("Anda tidak memiliki akses. Silahkan login sebagai admin atau officer!");
				} else {
					alert ('Ada kesalahan pada input anda atau server error.');
				}
			} else if (result.status === 200) {
				alert ('Kategori berhasil ditambah');
			}
		})
	}
	vm.addRadKategori = addRadKategori;

	function getRadKategori() {
    return $http.get('http://localhost:1337/renaksi/kategori');
  }
  vm.getRadKategori = getRadKategori;
}
