app.config(function($stateProvider, $urlRouterProvider) {	


  var lang_template = '';

  // verifica se a ligua do usuario é suportada e carrega o template referente | só aplica nas paginas estaticas
  if(userLang)
    for (var i = parameters.suported_langs.length - 1; i >= 0; i--) 
      if(parameters.suported_langs[i] == userLang)  
        lang_template = '.' + userLang;
  //


	// rota padrão
  $urlRouterProvider.otherwise("/board/all");

	$stateProvider

  // staticas
	.state('home', {
      url: "/",
      templateUrl: base_url + '/app/views/home/index'+lang_template+'.html'
  })

  .state('rules', {
      url: "/rules",
      templateUrl: base_url + '/app/views/rules/index'+lang_template+'.html'
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
