
angular
  .module('app')
  .service('EditUserService', EditUserService);

function EditUserService($http, $state, store) {
  var vm = this;

  function editCurrentUser (id, data) {
    $http.patch('http://localhost:1337/user/profil/'+id, {
      username : data.username
    })
    .then(function(result){
      if (result.status !== 200) {
				if (result.status === 403) {
					alert("Anda tidak memiliki akses untuk mengubah data!");
				} else {
					alert ('Ada kesalahan pada input anda atau server error. Coba lagi!');
				}
			} else if (result.status === 200) {
        // Update local storage with new user data so it can correctly displayed by other components
        store.set('user', data);
        // then alert user
        alert ('Data berhasil diubah');
        //reload to display the change
				$state.reload();
			}
    })
  }

  vm.editCurrentUser = editCurrentUser;
}


