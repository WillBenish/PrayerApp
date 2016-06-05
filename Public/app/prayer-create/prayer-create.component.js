'use strict';
//register the prayerList components
angular.
	module('prayerCreate').
	component('prayerCreate',{
	templateUrl:'app/prayer-create/prayer-create.template.html',
	controller: function PhoneListController($http,$location) {
      this.prayer = {
          name: '',
          frequency: 7
        };

		
		this.addPrayer = function() {
        $http.post('/api/prayers',this.prayer)
            .success(function(data){
              //  $scope.formData = {frequency:7};
              //  $scope.prayers = data;
                console.log(data);

               
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
			
		
		$location.path('/prayers');
            // .success(function(data){
              // //  $scope.formData = {frequency:7};
              // //  $scope.prayers = data;
                // console.log(data);

               
            // })
            // .error(function(data){
                // console.log('Error: ' + data);
            // });

            
    } ;   

    }
	});
	
	
	
	
	
	
	
	
	
	
