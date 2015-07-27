app.config(function($stateProvider, $urlRouterProvider) {	

	
	// rota padrão
  	$urlRouterProvider.otherwise("/");


	$stateProvider

	.state('home', {
      url: "/",
      templateUrl: base_url + '/app/views/home/home.html',
      controller: 'PostController'
    })
	


	// rota evento
	.state('board', {
        url: '/board/:board',
		controller: 'BoardController',
        templateUrl: base_url + '/app/views/board/base.html'
    })

	.state('board.details', { 
		url:'/:board',
		cache: false,
	  	templateUrl: base_url + '/app/views/board/detail.html',
	  	controller: function($scope, $stateParams){
          $scope.Open($stateParams.board);
        }
	})

	;
});
