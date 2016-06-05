'use strict';

angular.
  module('prayerApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/prayers', {
          template: '<prayer-list></prayer-list>'
        }).
        when('/prayers/:prayerId', {
          template: '<prayer-detail></prayer-detail>'
        }).        
		when('/newPrayer', {
          template: '<prayer-create></prayer-create>'
        }).
        otherwise('/prayers');
    }
  ]);