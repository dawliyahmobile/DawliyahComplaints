angular.module('AlDawliyahMobileApp')
.controller('FeedBackCtrl', function($scope, $location, $http, $rootScope,$ionicLoading, $ionicPopup, $location){
	$scope.optionList=[{text: 'Satisfied', value: 'A', selected: false, img:'img/tub.png'},
						{text: 'Neutral', value: 'B', selected: false, img:'img/tab.jpg'},
						{text: 'Not Satisfied', value: 'C', selected: false, img:'img/tdb.png'}];
	console.log($scope.optionList);
	
	$scope.submitSurvey=function(form){
		 var date =new Date();
		 $ionicLoading.show({
				template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
			});	
		$http({
			method:'POST',
			url:'http://195.154.151.27/DIS/WEBSERVICE/Survey/SSurvey.asmx/InsertSurveyResponse',
			data:{surveyResponseDate:date,surveyResponseQ1:form.q1,surveyResponseQ2:form.q2,surveyResponseQ3:form.q3,surveyResponseQ4:form.q4,surveyResponseQ5:form.q5,surveyResponseQ6:form.q6,surveyResponseQ7:form.q7,surveyResponseQ8:form.q8,surveyResponseQ9:form.q9}
		}).success(function(response){
			console.log('Successful');
			$ionicLoading.hide();
			var alertPopup = $ionicPopup.alert({
											title: 'Success!',
											template: 'Thank you for the Feedback, We appreciate your action.'
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