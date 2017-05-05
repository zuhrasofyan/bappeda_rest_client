angular
  .module('app')
  .service('AvatarService', AvatarService);

function AvatarService($http, $state) {
  var vm = this;
  
  function getAvatarImage(id) {
    var avatarUrl = 'http://localhost:1337/user/avatar/'+id;
    return avatarUrl;
    
  }

  function uploadAvatar(files, id) {
    var formData = new FormData();
    angular.forEach(files, function(obj){
      if (!obj.isRemote) {
        formData.append('avatar', obj.lfFile)
      }
    });
    $http.patch('http://localhost:1337/user/avatar/'+id, formData, {
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

  vm.getAvatarImage = getAvatarImage;
  vm.uploadAvatar = uploadAvatar;
  
}
