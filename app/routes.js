app.config(function($stateProvider, $urlRouterProvider) {	

	
	// rota padrão
  	$urlRouterProvider.otherwise("/");


	$stateProvider

	.state('home', {
      url: "/",
      templateUrl: base_url + '/app/views/home/home.html',
      controller: 'PostController'
    })
	

	;
});
