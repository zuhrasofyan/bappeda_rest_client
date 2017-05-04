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


  function getOpenQuote () {

    $http.get('http://localhost:1337/quote/open').then(function success(response){
      vm.openQuote = response.data.quote;
    });
    
    
  }
  function getPrivateQuote () {

    $http.get('http://localhost:1337/quote/protected').then(function success(response){
      vm.privateQuote = response.data.quote;
    });
    
  }
  vm.getOpenQuote = getOpenQuote;
  vm.getPrivateQuote = getPrivateQuote;

  vm.token = store.get('token');

}
