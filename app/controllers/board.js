angular.module('chan.controllers')

.controller('BoardController', function($scope, $rootScope, $createPopover, $state, $location, $timeout, $anchorScroll, $filter, $stateParams, GenericService) 
{
	$scope.isSearch = $stateParams.tags ? true : false;


	$scope.posts = [];
	$scope.board = {};
	$scope.title = $scope.isSearch ? 'Search' : '';
	$scope.description = $scope.isSearch ? $stateParams.tags : '';



	$scope.page 		= 1;
	$scope.pageLimit 	= $rootScope.parameters.page_limit;
	$anchorScroll.yOffset   = 275;

	var newPost 			= false;
	var postsCache 			= [];

	if(!$scope.isSearch)
	{
		$rootScope.$watch('boards', function(){

			if(!$rootScope.boards.length)
				return;
			//

			$scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
			$scope.title = $scope.board.title;
			$scope.description = $scope.board.description;

		});
	}

	// preview do quote quando passa o dedinho e/ou clica, retorna o post, se houver
    $scope.SearchPost = function(id)
    {
    	for (var j = $scope.posts.length - 1; j >= 0; j--)
    	{
    		var post = $scope.posts[j];

    		// verifica se é o post principal
	        if(post.id == id)
	            return post;
	        //

    		// procura nas respostas
	        for (var i in post.replies)
	        {
	            if(post.replies[i].id == id)
	                return post.replies[i];
	            //
	        };

    	};

    	// garante que não faça mais de uma requisição por quotepost omitido
    	if(postsCache.indexOf(id) > -1)
    		return false;
    	//

    	postsCache.push(id);

    	// se não achou em nenhum dos já carregados, carrega via ajax
		quotePreviewRequest = GenericService.get({
			route:'post',
			id:id,
			scope:'TextFile'
		}, function(response){
			

			$('.quote-post-' + id).each(function(){

				var elem = angular.element(this);
				var post = response.data;

				$createPopover.create(post, elem, false, 'right');

    		});

		});


        return false;
        
    }


    // marca o post 'to' como os quotados
    $scope.AddQuoteReply = function(from, to)
    {
    	for (var k = $scope.posts.length - 1; k >= 0; k--)
    	{
    		var post = $scope.posts[k];

    		for (var i in post.replies)
    		{
	            var reply = post.replies[i];

	            if(reply.id == to)
	            {
	                reply.quotes = reply.quotes == undefined ? [] : reply.quotes;

	                // garante que não add duplicados
	                if(reply.quotes.indexOf(from) < 0)
	                    reply.quotes.push(from);
	                //
	            }
	        };
    	};
    }
	
	// atualiza
	$scope.Update = function(reset)
	{
		$rootScope.loading = true;

		reset 	= (typeof reset !== 'undefined') ? reset : false;
		if(reset)
		{
			$scope.page = 1;
		}
		//


		var requestData = {
			route:'post',
			action:'getByBoard',
			id:$stateParams.board,
			page:$scope.page,
			pageLimit:$scope.pageLimit
		};


		if($scope.isSearch)
		{
			requestData.action = 'getByTags';
			requestData.id = $stateParams.tags;
		}

		// pega os posts
		GenericService.get(requestData, function(response){

			$rootScope.loading = false;

			if(response.status == 1 && response.data.length)
				$scope.posts = reset ? response.data : $scope.posts.concat(response.data);
			//

			if(!response.data.length)
				$rootScope.Alert('Não existem mais posts para essa board / seleção.');
			//


			$timeout(function () {

				if(newPost)
				{
                	$rootScope.ScrollTo('post-' + newPost);
                	$('#' + 'post-' + newPost).addClass('blink');

                	newPost = false;
				}
                //
            }, 100); // mais eficiente que o apply

		}, $rootScope.ResponseFail);
	}

	// carrega mais
	$scope.LoadMore = function()
	{
		$scope.page++;
		$scope.Update();
	}

	$scope.OpenPost = function(post, newTab)
	{
		newTab 		= (typeof newTab !== 'undefined') ? newTab : false;

		if(!newTab)
		{
			$state.go('post', {post:post.id});
		}else{
			var url = $state.href('post', {post:post.id});
			window.open(url,'_blank');
		}
	}

	// atualiza a pagina TODA
	$scope.Update();

	// se algum post for criado, recarrega a pagina
	var postCreateListener = $rootScope.$on("onPostCreate", function (event, id) {

        if($state.current.name != 'board')
            return;
        //

        newPost = id;

		$scope.Update(true);
	});

	// quando sair da pagina 
    $rootScope.$on('$stateChangeStart', function()
    {

        // remove o escutador
        $scope.$on('$destroy', postCreateListener); 
    });

})