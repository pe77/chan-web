app.config(function($stateProvider, $urlRouterProvider) {	

	
	// rota padrão
  $urlRouterProvider.otherwise("/board/all");

	$stateProvider

  // staticas
	.state('home', {
      url: "/",
      templateUrl: base_url + '/app/views/home/index.html'
  })

  .state('rules', {
      url: "/rules",
      templateUrl: base_url + '/app/views/rules/index.html'
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
      controller: 'BoardController',
      templateUrl: base_url + '/app/views/board/page.html'
  })


  .state('report', {
      url: '/reports',
      controller: 'ReportController',
      templateUrl: base_url + '/app/views/report/page.html'
  })
  // */

	;
});
