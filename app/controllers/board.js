angular.module('chan.controllers')

.controller('BoardController', function($scope, $rootScope, $state, $filter, $stateParams, GenericService) 
{

	$scope.posts = [];
	$scope.board = {};

	$scope.page 		= 1;
	$scope.pageLimit 	= $rootScope.parameters.page_limit;

	$rootScope.$watch('boards', function(){

		if(!$rootScope.boards.length)
			return;
		//

		$scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
	});
	
	// atualiza
	$scope.Update = function(reset)
	{
		$rootScope.loading = true;

		reset = reset || false;

		if(reset)
			$scope.page = 1;
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
		$state.go('post', {board:$stateParams.board, post:post.id});

	}

	// atualiza a pagina TODA
	$scope.Update();


	// se algum post for criado, recarrega a pagina
	$rootScope.$on("onPostCreate", function () {
		$scope.Update(true);
	});

})