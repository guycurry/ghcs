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


	$scope.buildRecipe = function(id, name, desc, imgURL)
	{
		var recipe = {
			"id":id,
			"name":name,
			"desc":desc,
			"imgURL":imgURL
		};
		recipe.index = $scope.recipies.push(recipe)-1;
		recipe.column = 0;//recipie.index%4;// will change to 5 when 5th column is implemented.
		recipe.img = new Image();
		recipe.img.r = recipe;
		recipe.img.onload = function() {
			this.r.heightPct = this.height / this.width * 100;
			$scope.$apply();
		}
		recipe.img.src = imgURL;

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

	$scope.buildRecipe(1, "Roquefort Pear Salad", 
		"test...", 
		"img/roquefort-pear-salad.jpg");
	$scope.buildRecipe(1, "Sweet Dinner Rolls", 
		"test...", 
		"img/sweet-dinner-rolls.jpg");
	$scope.buildRecipe(1, "Srimp Florentine", 
		"test...", 
		"img/Shrimp-Florentine.jpg");
	$scope.buildRecipe(1, "Japanese Chicking Wings", 
		"test...", 
		"img/Japanese-Chicken-Wings.jpg");

	$scope.buildRecipe(1, "Worlds Best Lasagna", 
		"test...", 
		"img/worlds-best-lasagna.jpg");
	$scope.buildRecipe(1, "Poached Eggs Asparagus", 
		"test...", 
		"img/Poached-Eggs-Asparagus.jpg");
	$scope.buildRecipe(1, "Honey Garlic Chicken", 
		"test...", 
		"img/honey-garlic-chicken.jpg");
	$scope.buildRecipe(1, "Spinach Artichoke Dip", 
		"test...", 
		"img/Spinach-Artichoke-Dip.jpg");
	$scope.buildRecipe(1, "Vanilla Crapes", 
		"test...", 
		"img/vanilla-crapes.jpg");

	$scope.CalcColumns = function(numColumns)
	{
		var FiveCol  = 1200;
		var FourCol  = 992;
		var ThreeCol = 768;
		$scope.currentWidth = $(window).width();

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
	    	 var recipe = $scope.recipies[x];
	    	 recipe.column = recipe.index%numColumns;
	    }

	    $scope.$apply();
	}

	// run test on initial page load
	$scope.CalcColumns();

	// run setColumns on resize of the window
	$(window).resize($scope.CalcColumns);
	


}]);

console.log("mainApp.js end");