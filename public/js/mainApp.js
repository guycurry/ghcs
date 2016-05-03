console.log("mainApp.js start");


var eatMeApp = angular.module('eatMeApp', [])
.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);


eatMeApp.controller("eatMe_Controller", ['$scope', '$sce', '$q', function($scope, $sce, $q){

	console.log("eatMe App Start");
	$scope.recipies = new Array();

	$scope.buildRecipie = function(id, name, desc, imgURL)
	{
		var recipie = {
			"id":id,
			"name":name,
			"desc":desc,
			"imgURL":imgURL
		};
		console.log("recipie=");
		console.log(recipie);
		recipie.index = $scope.recipies.push(recipie)-1;
		recipie.column = recipie.index%4;// will change to 5 when 5th column is implemented.
		console.log(recipie);
		console.log($scope.recipies[0]);

	}


	$scope.showCardDetails = function(cardId)
	{
		console.log("cardId="+cardId);
		var imgClass = $('#'+cardId+'-img')[0].classList;
		imgClass.contains("blurImg") === true ? imgClass.remove("blurImg") : imgClass.add("blurImg");
		imgClass.contains("unblurImg") === true ? imgClass.remove("unblurImg") : imgClass.add("unblurImg");

		if( imgClass.contains("blurImg") == true )
		  $('#'+cardId+'-card').fadeIn(200);
		else
		  $('#'+cardId+'-card').fadeOut(200);

	}

	$scope.buildRecipie(1, "Sweet Dinner Rolls", 
		"test...", 
		"img/sweet-dinner-rolls.jpg");
	$scope.buildRecipie(1, "Srimp Florentine", 
		"test...", 
		"img/Shrimp-Florentine.jpg");
	$scope.buildRecipie(1, "Japanese Chicking Wings", 
		"test...", 
		"img/Japanese-Chicken-Wings.jpg");
	$scope.buildRecipie(1, "Roquefort Pear Salad", 
		"test...", 
		"img/roquefort-pear-salad.jpg");
	$scope.buildRecipie(1, "Worlds Best Lasagna", 
		"test...", 
		"img/worlds-best-lasagna.jpg");
	$scope.buildRecipie(1, "Poached Eggs Asparagus", 
		"test...", 
		"img/Poached-Eggs-Asparagus.jpg");
	$scope.buildRecipie(1, "Honey Garlic Chicken", 
		"test...", 
		"img/honey-garlic-chicken.jpg");
	$scope.buildRecipie(1, "Spinach Artichoke Dip", 
		"test...", 
		"img/Spinach-Artichoke-Dip.jpg");
	$scope.buildRecipie(1, "Vanilla Crapes", 
		"test...", 
		"img/vanilla-crapes.jpg");


}]);

console.log("mainApp.js end");