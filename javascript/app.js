// defining the app module of the project
angular.module('moviesDBApp', ['ngSanitize','ngRoute','movieDBControllers','movieDBDirectives','movieDBServices','TrailerMovieServices'])
.constant("myMovieConfig", {
        "moviesEndpoint" : "https://api.themoviedb.org/3/movie",
        "apiKey" : "35e16679c616a21b9ddebb66272c5902",
        "rottenUri" : "https://www.omdbapi.com/"
    })
.config(function($routeProvider) {
		  // use the HTML5 History API
       // $locationProvider.html5Mode(true);

		$routeProvider
		  .when('/', {

		  	templateUrl: 'templates/home.html',
		  	controller: 'MovieHomeController'
		  })
		  .when('/popular', {
		  	templateUrl: 'templates/movies.html',
		  	controller: 'MovieListController'
		  })
		  .when('/upcoming', {
		  	templateUrl: 'templates/movies.html',
			controller: 'MovieUpcomingController'
		  })
		  .when('/topRated', {
		  	templateUrl: 'templates/movies.html',
			controller: 'MovieTopRatedController'
		  })
		  .when("/nowPlaying", {
			templateUrl: "templates/movies.html",
			controller: 'MovieNowPlayingController'
		  })
		  .when('/movie/:movieId', {
		  	templateUrl: 'templates/movieDetails.html',
		  	controller: "MovieDetailsController"
		  })
		  .when("/error/:message/:status", {

		  	templateUrl: "templates/error.html",
		  	controller: 'MovieErrorController'
		  })
		  .otherwise({redirectTo: '/popular'}); 
	});