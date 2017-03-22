angular
  .module('app')
  .config(routesConfig);

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');


  $stateProvider
    .state('home', {
      url: '/',
      component: 'app'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    })
    .state('dashboard', {
      url: '',
      component: 'dashboard',
      abstract: true,
      resolve: {
        loginRequired : loginRequired
      }
    })
    .state('dashboard.home', {
      url: '/home',
      component: 'homeDashboard'
    })
    .state('dashboard.user', {
      url: '/profile',
      component: 'userDashboard'
    })
    .state('dashboard.rad', {
      url: '/rad',
      component: 'isiRadDashboard'
    })
    .state('dashboard.showRad', {
      url: '/show-rad',
      component: 'showRadDashboard'
    });

    // otherwise will take care of routing the user to the specified url
    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('APIInterceptor');
}

function loginRequired ($q, $location, authManager, $rootScope) {
  var deferred = $q.defer();
  var checkAuth = $rootScope.isAuthenticated;
  //using authManager.isAuthenticated, unfortunately we can still access restricted state if we manually enter URL
  //var a = authManager.isAuthenticated;
  if (checkAuth) {
    deferred.resolve();
  } else {
    $location.path('/');
  }
  return deferred.promise;
}
