angular
  .module('app')
  .component('componentQuote', {
    templateUrl: 'app/components/quote/quote.html',
    controller: quoteController,
    controllerAs: 'quote'
  });

function quoteController($http, store, UserService) {
  vm = this;
  vm.privateQuote = null;
  
  
  function test(){
    vm.apa = UserService.getCurrentToken();
    //vm.apa = APIInterceptor.request();
  }
  vm.test = test;

  // }
  // vm.hehe = hehe;
  // $http.get('http://localhost:1337/quote/protected').then(function success(response){
  //     console.log('success');
  //     vm.protectedQuote = response;
  // });

  function getOpenQuote () {

    $http.get('http://localhost:1337/quote/open').then(function success(response){
      //console.log('success');
      vm.openQuote = response.data.quote;
    });
    
    // $http({
    //   method: 'GET',
    //   url: 'http://localhost:1337/quote/open'
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     vm.privateQuote = response;
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     vm.privateQuote = 'ERROR'
    //   });
  }
  function getPrivateQuote () {

    $http.get('http://localhost:1337/quote/protected').then(function success(response){
      //console.log('success');
      vm.privateQuote = response.data.quote;
      //console.log(vm.privateQuote);
    });
    
    // $http({
    //   method: 'GET',
    //   url: 'http://localhost:1337/quote/open'
    // }).then(function successCallback(response) {
    //     // this callback will be called asynchronously
    //     // when the response is available
    //     vm.privateQuote = response;
    //   }, function errorCallback(response) {
    //     // called asynchronously if an error occurs
    //     // or server returns response with an error status.
    //     vm.privateQuote = 'ERROR'
    //   });
  }
  vm.getOpenQuote = getOpenQuote;
  vm.getPrivateQuote = getPrivateQuote;

  vm.token = store.get('token');

}
