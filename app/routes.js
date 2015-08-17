app.config(function($stateProvider, $urlRouterProvider) {	

	
	// rota padrão
  $urlRouterProvider.otherwise("/");


	$stateProvider

	.state('home', {
      url: "/",
      templateUrl: base_url + '/app/views/home/home.html',
      controller: 'HomeController'
    })
	


	// rota evento
	.state('board', {
        url: '/board/:board',
		controller: 'BoardController',
        templateUrl: base_url + '/app/views/board/page.html'
    })

    .state('post', {
        url: '/board/:board/:post',
		controller: 'PostController',
        templateUrl: base_url + '/app/views/board/post.html'
    })


	;
});
