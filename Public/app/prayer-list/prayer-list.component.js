'use strict';
//register the prayerList components
angular.
	module('prayerList').
	component('prayerList',{
		templateUrl:'app/prayer-list/prayer-list.template.html',
		controller: function PrayerListController($http) {
			var self = this;
			$http.get('/api/prayers').success(function(data){
				self.prayers = data;
            console.log(data);
			})

		}

	});
	
	
	
	
	
	
	
	
	
	
