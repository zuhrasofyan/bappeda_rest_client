angular
  .module('app')
  .component('fountainTitle', {
    templateUrl: 'app/components/title/title.html',
    controller: titleController,
    controllerAs: 'vm'
  });

function titleController($rootScope) {
	var vm = this;
	vm.isAuthenticated = $rootScope.isAuthenticated;
}