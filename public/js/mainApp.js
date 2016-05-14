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
	$scope.currentWidth = $(window).width();
	$scope.prevColumns = 0;
	$scope.currentColumns = 0;


	$scope.buildRecipie = function(id, name, desc, imgURL)
	{
		var recipie = {
			"id":id,
			"name":name,
			"desc":desc,
			"imgURL":imgURL
		};
		recipie.index = $scope.recipies.push(recipie)-1;
		recipie.column = 0;//recipie.index%4;// will change to 5 when 5th column is implemented.
		recipie.img = new Image();
		recipie.img.r = recipie;
		recipie.img.onload = function() {
			this.r.heightPct = this.height / this.width * 100;
			$scope.$apply();
		}
		recipie.img.src = imgURL;

	}


	$scope.showCardDetails = function(cardId)
	{
		var imgClass = $('#'+cardId+'-img')[0].classList;
		imgClass.contains("blurImg") === true ? imgClass.remove("blurImg") : imgClass.add("blurImg");
		imgClass.contains("unblurImg") === true ? imgClass.remove("unblurImg") : imgClass.add("unblurImg");

		if( imgClass.contains("blurImg") == true )
		  $('#'+cardId+'-card').fadeIn(200);
		else
		  $('#'+cardId+'-card').fadeOut(200);

	}

	$scope.buildRecipie(1, "Roquefort Pear Salad", 
		"test...", 
		"img/roquefort-pear-salad.jpg");
	$scope.buildRecipie(1, "Sweet Dinner Rolls", 
		"test...", 
		"img/sweet-dinner-rolls.jpg");
	$scope.buildRecipie(1, "Srimp Florentine", 
		"test...", 
		"img/Shrimp-Florentine.jpg");
	$scope.buildRecipie(1, "Japanese Chicking Wings", 
		"test...", 
		"img/Japanese-Chicken-Wings.jpg");

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

	$scope.CalcColumns = function(numColumns)
	{
		var FiveCol  = 1200;
		var FourCol  = 992;
		var ThreeCol = 768;
		$scope.currentWidth = $(window).width();
		//$scope.prevColumns = 0;
		//$scope.currentColumns = 0;

		if( $scope.currentWidth > 1200 )
			$scope.currentColumns = 5;
		else if( $scope.currentWidth > 992 )
			$scope.currentColumns = 4;
		else if( $scope.currentWidth > 768 )
			$scope.currentColumns = 3;
		else
			$scope.currentColumns = 1;

		if( $scope.currentColumns != $scope.prevColumns )
		{
			$scope.prevColumns = $scope.currentColumns;
			$scope.SetColumns($scope.currentColumns);
		}

	}


	$scope.SetColumns = function(numColumns)
	{
	    for(var x = 0; x < $scope.recipies.length; x++)
	    {
	    	 var Recipie = $scope.recipies[x];
	    	 Recipie.column = Recipie.index%numColumns;
	    }
	    alert('test');
	    $scope.$apply();
	}

	// run test on initial page load
	$scope.CalcColumns();

	// run setColumns on resize of the window
	$(window).resize($scope.CalcColumns);
	


}]);

console.log("mainApp.js end");