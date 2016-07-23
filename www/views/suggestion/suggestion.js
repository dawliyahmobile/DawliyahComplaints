angular.module('AlDawliyahMobileApp')
.controller('SuggestionCtrl', function($scope, $location, $http, $rootScope,$ionicLoading, $ionicPopup){
	console.log('Doc Loaded');
	$scope.submitSuggestion=function(suggestion){
		console.log(suggestion);
		 var date =new Date();
		 $ionicLoading.show({
				template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
			});	
		$http({
			method:'POST',
			url:'http://195.154.151.27/DIS/WEBSERVICE/Survey/SSurvey.asmx/InsertSuggestion',
			data:{suggestionDate:date,suggestionComments:suggestion.Comments}
		}).success(function(response){
			console.log('Successful');
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
											title: 'Success!',
											template: 'Thank you for the Suggestion, We appreciate your action.'
											});
			$location.path('/home');
		}).error(function(error){
			console.log('Error');
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
											title: 'Error!',
											template: 'Error occurred, Please Try Again.'
											});
		}); 		
	}
});