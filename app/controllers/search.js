angular.module('chan.controllers')

.controller('SearchController', function($scope, $rootScope, $state, $location, $timeout, $anchorScroll, $filter, $stateParams, GenericService) 
{
	$scope.posts = [];
	$scope.board = {};
	$scope.title = 'Search';

	$scope.page 		= 1;
	$scope.pageLimit 	= $rootScope.parameters.page_limit;
	$anchorScroll.yOffset   = 275;

	var newPost = false;

	
	// atualiza
	$scope.Update = function(reset)
	{
		$rootScope.loading = true;

		reset 	= (typeof reset !== 'undefined') ? reset : false;
		if(reset)
			$scope.page = 1;
		//

		// pega os posts
		GenericService.get({
			route:'post',
			action:'getByTags',
			id:$stateParams.tags,
			page:$scope.page,
			pageLimit:$scope.pageLimit
		}, function(response){

			$rootScope.loading = false;

			if(response.status == 1 && response.data.length)
				$scope.posts = reset ? response.data : $scope.posts.concat(response.data);
			//

			if(!response.data)
				$rootScope.Alert('Não existem mais posts para essa board / seleção.');
			//


			$timeout(function () {

				if(newPost)
				{
                	$rootScope.ScrollTo('post-' + newPost);
                	$('#' + 'post-' + newPost).addClass('blink');
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

	$scope.OpenPost = function(post)
	{
		$state.go('post', {post:post.id});
	}

	// atualiza a pagina TODA
	$scope.Update();

	// se algum post for criado, recarrega a pagina
	var postCreateListener = $rootScope.$on("onPostCreate", function (event, id) {

        if($state.current.name != 'search')
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


.controller('SearchFormController', function($scope, $rootScope, $state, $location, $stateParams) 
{
	$scope.search = '';


	$scope.Search = function()
	{
		if($scope.search == '')
			return;
		//

		$state.go('search', {tags:$scope.search});
	}

	// testando o evento de procura por tags
    var searchListener =  $rootScope.$on("onSearchTag", function (event, tag, search) {
        search = search || false;
        
        if(search)
        {
        	$scope.search = tag;
        	$state.go('search', {tags:tag});
        }else{
        	$scope.search = $scope.search == '' ? tag : $scope.search + ' ' + tag;
        }
    }); 
})