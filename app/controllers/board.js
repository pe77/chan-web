angular.module('chan.controllers')

.controller('BoardController', function($scope, $rootScope, $state, $location, $timeout, $anchorScroll, $filter, $stateParams, GenericService) 
{
	$scope.posts = [];
	$scope.board = {};
	$scope.title = '';
	$scope.description = '';

	$scope.page 		= 1;
	$scope.pageLimit 	= $rootScope.parameters.page_limit;
	$anchorScroll.yOffset   = 275;

	var newPost = false;

	$rootScope.$watch('boards', function(){

		if(!$rootScope.boards.length)
			return;
		//

		$scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
		$scope.title = $scope.board.title;
		$scope.description = $scope.board.description;

	});
	
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

		// pega os posts
		GenericService.get({
			route:'post',
			action:'getByBoard',
			id:$stateParams.board,
			page:$scope.page,
			pageLimit:$scope.pageLimit
		}, function(response){

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