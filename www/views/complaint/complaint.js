angular.module('AlDawliyahMobileApp')
.controller('ComplaintCtrl', function($scope, $location, $http, $rootScope,$ionicLoading, $ionicPopup){
	$scope.registerComplaintFromCustomers = function(complaint) {
		var name=complaint.FirstName+ ' '+ complaint.LastName;
        var email = complaint.Email;
        var mobile = complaint.Mobile;
        var userId = '88B1278C-05BF-41A8-99F7-8D1CE48EC667';
        var assignedSalesId = 'E4644FBA-0160-4C95-AF5D-C4777C7FB215';
        var assignedSalesEmail = 'jaffar.javeed@aldawliyah.com';
        var basicUrl = 'http://195.154.151.27/DIS';
		console.log(name+' , '+ email+' , '+ mobile+' , '+basicUrl);
		$ionicLoading.show({
				template: '<p>Loading...</p><ion-spinner icon="spiral"></ion-spinner>'
			});		
        $http({
            method: 'POST',
            url: basicUrl + '/WEBSERVICE/Complaint/GeneralComplaints/GeneralComplaintService.asmx/InsertGeneralComplaint',
            data: { 'name': name, 'email': email, 'mobile': mobile, 'comments': complaint.Comments, 'assignedTo': assignedSalesId, 'createdBy': userId }
        }).success(function(response) {
			console.log(response);
            var complaintNumber = response.d.split('/')[0];
            var complaintId = response.d.split('/')[1];
            var smsBody = 'Dear Customer, The Complaint bearing reference number. ' + complaintNumber + ' has been successfully registered. If you need any further details please contact us on 04-2500570 from 8am to 5pm';
            var mailBody = getBody(complaintNumber);
            var internalMailBody = getInternalMailBody(complaintNumber, complaintId);
			$ionicLoading.hide();
			
			var alertPopup = $ionicPopup.alert({
											title: 'Success!',
											template: 'The Complaint has been registered Successfully'
											});
						$location.path('/home');
			
            //Send SMS - Start
            $http({
                method: 'POST',
                url: basicUrl + '/WEBSERVICE/Common/SMS/SMSWebService.asmx/SendSMS',
                data: { 'createdBy': userId, 'to': mobile, 'body': smsBody, 'module': 'GNLCOMPLAINTREG', 'moduleDesc': 'General Complaint Register' }
            }).success(function(response) {
                //Send Email - Start
                $http({
                    method: 'POST',
                    url: basicUrl + '/WEBSERVICE/Common/SMS/SMSWebService.asmx/SendMailFromComplaint',
                    data: { 'createdBy': userId, 'to': email, 'cc': 'jaffar.javeed@aldawliyah.com', 'body': mailBody, 'module': 'GNLCOMPLAINTREG', 'moduleDesc': 'General Complaint Register', 'subject': ' Al Dawliyah Insurance Services Complaint No. ' + complaintNumber + ' Registered Successfully' }
                }).success(function(response) {
                    //Send Email To Complaint Manager - Start
                    $http({
                        method: 'POST',
                        url: basicUrl + '/WEBSERVICE/Common/SMS/SMSWebService.asmx/SendMailFromComplaint',
                        data: { 'createdBy': userId, 'to': assignedSalesEmail, 'cc': 'jaffar.javeed@aldawliyah.com', 'body': internalMailBody, 'module': 'MPCOMPLAINTREG', 'moduleDesc': 'Motor Complaint Register', 'subject': ' Al Dawliyah Insurance Services Complaint No. ' + complaintNumber + ' Registered Successfully' }
                    }).success(function(response) {
						console.log('The Complaint has been registered Successfully');						
						
                    }).error(function() {
                        console.log('The Complaint has been registered Successfully, SMS sent to customer, unable to send Email');						
						$location.path('/home');
                    });
                    //Send Email To Complaint Manager - End
                }).error(function() {
                    console.log('The Complaint has been registered Successfully, SMS sent to customer, unable to send Email');
					
					$location.path('/home');
                });
                //Send Email - End
            });
            //Send SMS - End
            $scope.clearComplaint();
        }).error(function() {
			$ionicLoading.hide();
                var alertPopup = $ionicPopup.alert({
											title: 'Error',
											template: 'Error Occurred!'
											});			
			$state.go('/home');
         }); 
    };
	$scope.clearComplaint= function(){
		$scope.complaint.FirstName = '';
		$scope.complaint.LastName = '';
        $scope.complaint.Email = '';
        $scope.complaint.Mobile = '';
        $scope.complaint.Comments = '';
	};
	$scope.filterValue = function($event) {
        if (isNaN(String.fromCharCode($event.keyCode))) {
            $event.preventDefault();
        }
    };
	function getBody(reference) {
        var body = '';
        body = body + "<table align='center' bgcolor='#ccc' border='0' cellpadding='1' cellspacing='0'   width='auto;'>"
        body = body + "<tr> <td colspan='2' height='auto' width='589'><table align='center' bgcolor='#fff' border='0' cellpadding='0' cellspacing='0'  width='590'><tr> <td><a href='http://www.aldawliyah.com/' rel='noreferrer' target='_blank'><img height='167' src='http://195.154.151.27/DIS/OnlineQuote/images/i688708.jpg' width='590' style='border:none;'/></a></td></tr></table>"
        body = body + "<table bgcolor='#fff' border='0' cellpadding='0' cellspacing='0' width='590'> <tr><td bgcolor='#FBFAF8' style='font-family: Arial, Helvetica, sans-serif; font-size: 13px; padding-left: 15px; padding-right: 15px; padding-bottom: 10px; padding-top: 10px'>"
        body = body + "<strong>Dear Sir/Madam,</strong>"
        body = body + "</td></tr>"
        body = body + "<tr><td bgcolor='#FFFFFF' height='2' style='font-size: 13px; font-family: Arial, Helvetica, sans-serif; padding-left: 15px; padding-right: 15px; line-height: 1.8em; padding-top: 10px; padding-bottom: 5px'>"
        body = body + "<p>The Complaint bearing reference number. " + reference + " has been successfully registered.</p>"
        body = body + "<p>For any further clarification you may call 04-2500570/06-5742323 or visit our website <a href='http://www.aldawliyah.com' target=_blank>www.aldawliyah.com</a></p>"
        body = body + "</td></tr>"
        body = body + "<tr> <td bgcolor='#FFFFFF' height='2' style='font-size: 13px; font-family: Arial, Helvetica, sans-serif; padding-left: 15px; padding-right: 15px; line-height: 1.8em; padding-top: 10px; padding-bottom: 5px; color: #666'><table align='center' border='0' cellpadding='0' cellspacing='3' width='200'><tr> <td><a href='https://www.facebook.com/people/Aldawliyah-Aldawliyah/100008301279743' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/fb-icon.jpg'  width='32' style='border:none;'/></a></td>"
        body = body + "<td><a href='https://plus.google.com/110633079319315014248/posts' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/google-plus-icon.png'  width='32' style='border:none;'/></a></td>"
        body = body + "<td><a href='http://www.linkedin.com/profile/view?id=342343734' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/linkedin-icon.jpg'  width='32' style='border:none;'/></a></td>"
        body = body + "<td><a href='https://twitter.com/Aldawliyahllc' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/Twitter-circle-icon.png'  width='32' style='border:none;'/></a></td></tr></table></td></tr>"
        body = body + "<tr><td bgcolor='#FFFFFF' height='19'><img alt='#' height='13' src='http://195.154.151.27/DIS/OnlineQuote/images/footer.jpg' width='590' /></td> </tr>"
        body = body + "<tr><td bgcolor='#FFFFFF' height='19'  style='text-align: center; color: #333; font-size: 12px; font-family: Arial, Helvetica, sans-serif; padding-bottom: 10px'> Copyright © 2010 - 2014 Al Dawliyah Insurance Services L.L.C. All rights reserved.</td></tr>"
        body = body + " </table> </td> </tr></table>"
        return body;
    }
    function getInternalMailBody(reference, referenceId) {
        var body = '';
        body = body + "<table align='center' bgcolor='#ccc' border='0' cellpadding='1' cellspacing='0'   width='auto;'>"
        body = body + "<tr> <td colspan='2' height='auto' width='589'><table align='center' bgcolor='#fff' border='0' cellpadding='0' cellspacing='0'  width='590'><tr> <td><a href='http://www.aldawliyah.com/' rel='noreferrer' target='_blank'><img height='167' src='http://195.154.151.27/DIS/OnlineQuote/images/i688708.jpg' width='590' style='border:none;'/></a></td></tr></table>"
        body = body + "<table bgcolor='#fff' border='0' cellpadding='0' cellspacing='0' width='590'> <tr><td bgcolor='#FBFAF8' style='font-family: Arial, Helvetica, sans-serif; font-size: 13px; padding-left: 15px; padding-right: 15px; padding-bottom: 10px; padding-top: 10px'>"
        body = body + "<strong>Dear Sir,</strong>"
        body = body + "</td></tr>"
        body = body + "<tr><td bgcolor='#FFFFFF' height='2' style='font-size: 13px; font-family: Arial, Helvetica, sans-serif; padding-left: 15px; padding-right: 15px; line-height: 1.8em; padding-top: 10px; padding-bottom: 5px'>"
        body = body + "<p>A New Complaint bearing reference number. " + reference + " has been registered.</p>"
        body = body + "<p><a href='http://195.154.151.27/DIS/complaint/viewcomplaint.aspx?ComplaintId=" + referenceId + "&ComplaintType=1'>Click Here to View the Complaint</a></p>"
        body = body + "</td></tr>"
        body = body + "<tr> <td bgcolor='#FFFFFF' height='2' style='font-size: 13px; font-family: Arial, Helvetica, sans-serif; padding-left: 15px; padding-right: 15px; line-height: 1.8em; padding-top: 10px; padding-bottom: 5px; color: #666'><table align='center' border='0' cellpadding='0' cellspacing='3' width='200'><tr> <td><a href='https://www.facebook.com/people/Aldawliyah-Aldawliyah/100008301279743' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/fb-icon.jpg'  width='32' style='border:none;'/></a></td>"
        body = body + "<td><a href='https://plus.google.com/110633079319315014248/posts' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/google-plus-icon.png'  width='32' style='border:none;'/></a></td>"
        body = body + "<td><a href='http://www.linkedin.com/profile/view?id=342343734' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/linkedin-icon.jpg'  width='32' style='border:none;'/></a></td>"
        body = body + "<td><a href='https://twitter.com/Aldawliyahllc' rel='noreferrer' target='_blank'><img height='32' src='http://195.154.151.27/DIS/OnlineQuote/images/Twitter-circle-icon.png'  width='32' style='border:none;'/></a></td></tr></table></td></tr>"
        body = body + "<tr><td bgcolor='#FFFFFF' height='19'><img alt='#' height='13' src='http://195.154.151.27/DIS/OnlineQuote/images/footer.jpg' width='590' /></td> </tr>"
        body = body + "<tr><td bgcolor='#FFFFFF' height='19'  style='text-align: center; color: #333; font-size: 12px; font-family: Arial, Helvetica, sans-serif; padding-bottom: 10px'> Copyright © 2010 - 2014 Al Dawliyah Insurance Services L.L.C. All rights reserved.</td></tr>"
        body = body + " </table> </td> </tr></table>"
        return body;
    }
});