var pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

var recipes;



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
	$scope.recipes = new Array();
	$scope.currentWidth = $(window).width();
	$scope.prevColumns = 0;
	$scope.currentColumns = 0;
	$scope.searchString = "";

	$scope.buildRecipe = function(recipe, api)
	{
		var id = recipe.RecipeID;
		var name = recipe.Title;
		var imgURL = recipe.PhotoUrl;
		var recipeURL = recipe.WebURL;
		var desc = "";

		var recipe = {
			"id":id,
			"name":name,
			"desc":desc,
			"imgURL":imgURL,
			"recipeURL":recipeURL
		};
		//if the recipe doesn't have an image we don't want to render it.
		if( recipe.imgURL.indexOf("recipe-no-image.jpg") != -1 )
			return;
		
		recipe.column = 0;//recipe.index%4;// will change to 5 when 5th column is implemented.
		recipe.img = new Image();
		recipe.img.r = recipe;
		recipe.img.onload = function() {
			this.r.heightPct = this.height / this.width * 100;
			$scope.$apply();
			recipe.index = $scope.recipes.push(recipe)-1;
			$scope.CalcColumns(true);
		}
		recipe.img.src = imgURL;
		//$scope.CalcColumns(2);
	}


	$scope.showCardDetails = function(cardId, recipe)
	{
		console.log("recpie=");
		console.log(recipe);
		console.log(cardId);
		var imgClass = $('#'+cardId+'-img')[0].classList;
		imgClass.contains("blurImg") === true ? imgClass.remove("blurImg") : imgClass.add("blurImg");
		imgClass.contains("unblurImg") === true ? imgClass.remove("unblurImg") : imgClass.add("unblurImg");

		if( imgClass.contains("blurImg") == true )
		  $('#'+cardId+'-card').fadeIn(200);
		else
		  $('#'+cardId+'-card').fadeOut(200);

	}


	$scope.getRecipeJson = function(searchString, page) 
	{
	    var apiKey = "bpcoW9an7WP3BogL8uxt6SV9NftMJH53";
	    var TitleKeyword = searchString;
	    var pg = page;
	    if( pg == undefined )
	    	pg = 1;
	    
	    var url = "http://api2.bigoven.com/Recipes?"
	    	  + "pg="+pg
	    	  + "&rpp=40"
	    	  + "&title_kw="+TitleKeyword
	          + "&api_key="+apiKey;
	    $.ajax({
	            type: "GET",
	            dataType: 'json',
	            cache: false,
	            url: url,
	            success: function (data) {
		            
		            console.log(data);
		            recipes = data.Results;

		            for(var i = 0; i < recipes.length; i++)
		            	$scope.buildRecipe(recipes[i]);
		            
		            //$scope.CalcColumns();

	            }
	        });

	}


	$scope.CalcColumns = function(bypass)
	{	
		
		var bypassSetColumnsCheck = bypass;
		if( bypass == undefined ) bypassSetColumnsCheck = false;
		
		var FiveCol  = 1200;
		var FourCol  = 992;
		var ThreeCol = 768;
		$scope.currentWidth = $(window).width();

		if( $scope.currentWidth > 1200 )
			$scope.currentColumns = 5;
		else if( $scope.currentWidth > 700 )
			$scope.currentColumns = 4;
		else if( $scope.currentWidth > 500 )
			$scope.currentColumns = 3;
		else if( $scope.currentWidth > 320 )
			$scope.currentColumns = 2;
		else
			$scope.currentColumns = 1;

		if( bypassSetColumnsCheck || $scope.currentColumns != $scope.prevColumns )
		//if( $scope.currentColumns != $scope.prevColumns )
		{
			console.log('call setColumns');
			$scope.prevColumns = $scope.currentColumns;
			$scope.SetColumns($scope.currentColumns);
		}

	}


	$scope.SetColumns = function(numColumns)
	{
	    for(var x = 0; x < $scope.recipes.length; x++)
	    {
	    	 var recipe = $scope.recipes[x];
	    	 recipe.column = recipe.index%numColumns;
	    }

	    $scope.$apply();
	}

	$scope.searchRecipes = function(keyPressedEvent)
	{
		if(keyPressedEvent.keyCode === 13)
		{
			$scope.recipes = new Array();
            $scope.getRecipeJson($scope.searchString);
		}
    
        return false; //Otherwise the form will be submitted
	}

	// run test on initial page load
	//$scope.CalcColumns();

	// run setColumns on resize of the window
	$(window).resize($scope.CalcColumns);
	
	//$scope.getRecipeJson();



}]);


//Directives



console.log("mainApp.js end");