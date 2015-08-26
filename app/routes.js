app.config(function($stateProvider, $urlRouterProvider) {	

	
	// rota padrão
  $urlRouterProvider.otherwise("/");


	$stateProvider

	.state('home', {
      url: "/",
      templateUrl: base_url + '/app/views/home/home.html',
      controller: 'HomeController'
  })
	
	.state('board', {
      url: '/board/:board',
	    controller: 'BoardController',
      templateUrl: base_url + '/app/views/board/page.html'
  })

  .state('post', {
      url: '/post/:post/:scrollto',
	controller: 'PostController',
      templateUrl: base_url + '/app/views/board/post.html'
  })

  
  .state('search', {
      url: '/search/:tags',
      controller: 'SearchController',
      templateUrl: base_url + '/app/views/board/page.html'
  })
  // */

	;
});
