'use strict';

console.log("Login_Controller start");

angular.module('eatMeApp').controller("Login_Controller", ['$modalInstance', '$location', function($modalInstance, $location){

	$scope.LoginScreen = "Welcome";//=register
	$scope.displayModal = true;

	console.log('test');
}]);

console.log("Login_Controller end");