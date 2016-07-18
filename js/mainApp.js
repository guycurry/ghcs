
console.log("mainApp.js start");


var eatMeApp = angular.module('eatMeApp', ['ngRoute'])//,'ui.bootstrap'])
.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]).constant('api_url', 'https://api-ghsc.herokuapp.com/')
  .config(['$routeProvider', function ($routeProvider) {
    

    $routeProvider
      .when('/welcome', {
        templateUrl: '../html/login/WelcomeModal.html',
        controller: 'Login_Controller'
        
      })
      .when('/search', {
        templateUrl: '../html/search/MainRecipeSearch.html',
        controller: 'MainRecipeSearch_Controller'
        
      })
  }]);


console.log("mainApp.js end");