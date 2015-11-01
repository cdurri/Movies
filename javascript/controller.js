angular.module('movieDBControllers',[])
.controller('MovieListController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.title = 'Popular Movies'
 var url = myMovieConfig.moviesEndpoint + '/popular?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error)
        });
})
.controller('MovieUpcomingController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.title = 'Upcoming Movies'
 var url = myMovieConfig.moviesEndpoint + '/upcoming?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error)
        });
})
.controller('MovieNowPlayingController',function($scope, $location, MovieListService,myMovieConfig) {
 
 $scope.loading = true;
 $scope.title = 'Now Playing Movies'
 var url = myMovieConfig.moviesEndpoint + '/now_playing?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status)
        });
})
.controller('MovieTopRatedController',function($scope, $location, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.title = 'Top Rated Movies'
 var url = myMovieConfig.moviesEndpoint + '/top_rated?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error);
          $location.path('/error/'+error.data.status_message+'/'+error.status)
        });
})
.controller('MovieHomeController',function($scope, MovieListService,myMovieConfig) {
 $scope.loading = true;
 $scope.title = 'Home'
 var url = myMovieConfig.moviesEndpoint + '/?api_key=' + myMovieConfig.apiKey;
 MovieListService.getList(url).then(
      function(result){
          $scope.movieList = result.data.results; /*res.filter(function(val){return val !== null});;*/
          $scope.loading = false;
      }
      ).catch(
        function(error) { 
          console.log('error', error)
        });
})
.controller('MovieErrorController',function($scope,$routeParams) { 
  $scope.message=$routeParams.message;
  $scope.status=$routeParams.status;
})
.controller('MovieDetailsController',function($scope,$location,$routeParams,$sce,MovieListService,myMovieConfig,$http,TrailerService) { 
    $scope.title='MovieDetails';
    var id = $routeParams.movieId;
    var url = myMovieConfig.moviesEndpoint + '/' + id + '?api_key=' + myMovieConfig.apiKey;
    MovieListService.getList(url).then(
      function(result){
        /*$scope.movie=result.data;*/
        var movie = result.data;
        $scope.movie = movie;
        url = myMovieConfig.rottenUri + '?i=' + movie.imdb_id + '&r=json&tomatoes=true';
        return MovieListService.getList(url); //result sent to next .then
      }
    ,
      function(error) {

        console.log('error', error);

    $location.path('/error/'+error.data.status_message+'/'+error.status)
      }  
    )
     .then(
        function(result) {
          // returning results from previous then
          $scope.rotten = result.data; // setting scope data for viewing
          console.dir(result.data);

          //return NewTrailerService.get($scope.rotten.imdbID.slice(2));

          //return NewTrailerService.get($scope.rotten.imdbID.slice(2));
          TrailerService.get($scope.rotten.imdbID.slice(2),function(trailer) {                               
                $scope.trailerSrc = $sce.trustAsResourceUrl("https://v.traileraddict.com/" + trailer);
                console.log($scope.trailerSrc)
               }); //service requires callback
        }
        ,
          function(error) {
            //won't route to error page as we have the movie data. Set flag to not show rotten data
            $scope.rottenError = true;
            $scope.rottenMessage = 'No Rotten Data Available';

          }
      )
    .catch(
      function(error) {
        console.log('error', error)

        $location.path('/error/'+error.data.status_message+'/'+error.status)
      });
      $scope.fadeIn='out'
      $scope.showTrailer = function() {
        $scope.fadeIn = 'in'
      }
      $scope.closeModal = function() {
        $scope.fadeIn = 'out'
      }
});
