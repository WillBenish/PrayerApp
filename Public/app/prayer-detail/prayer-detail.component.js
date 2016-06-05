'use strict';
//register the prayerList components
angular.
	module('prayerDetail').
	component('prayerDetail',{
	templateUrl:'app/prayer-detail/prayer-detail.template.html',
		controller: ['$http','$routeParams',
		
		
		
		
		function PrayerDetailController($http, $routeParams) {
			var self = this;
			$http.get('/api/prayers/'+$routeParams.prayerId).success(function(data){
				self.prayer = data;
			})
			
		
				
			}
			
		deletePrayer = function() {
				$http.delete('/api/prayers/'+$routeParams.prayerId)
             .success(function(data){
               //$scope.prayers = data;
                 console.log(data);}
				 );
		}
		// ,
		// function deletePrayer($http,$routeParams){
		
        // $http.delete('/api/prayers/'+$routeparams.prayerid)
            // .success(function(data){
               // //$scope.prayers = data;
                // console.log(data);}
				// )
				// }
		
]
	});
	
	
	
	
	
	
	
	
	
	
