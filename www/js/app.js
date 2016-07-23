// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('AlDawliyahMobileApp', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('home', {
    url: '/home',
    templateUrl: 'views/home/home.html'
  })
  .state('homeEn', {
    url: '/homeEn',
    templateUrl: 'views/home/homeEn.html'
  })
  .state('homeAr', {
    url: '/homeAr',
    templateUrl: 'views/home/homeAr.html'
  })
  .state('complaint', {
    url: '/complaint',
    templateUrl: 'views/complaint/complaint.html',
	controller:'ComplaintCtrl'
  })
  .state('complaintAr', {
    url: '/complaintAr',
    templateUrl: 'views/complaint/complaintAr.html',
	controller:'ComplaintCtrl'
  })
  .state('feedback', {
    url: '/feedback',
    templateUrl: 'views/feedback/feedback.html'
  })
  .state('feedbackAr', {
    url: '/feedbackAr',
    templateUrl: 'views/feedback/feedbackAr.html'
  })
  .state('suggestion', {
    url: '/suggestion',
    templateUrl: 'views/suggestion/suggestion.html'
  })
  .state('suggestionAr', {
    url: '/suggestionAr',
    templateUrl: 'views/suggestion/suggestionAr.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');

});
