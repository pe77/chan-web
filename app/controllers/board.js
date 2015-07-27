angular.module('chan.controllers')

.controller('BoardController', function($scope, $rootScope, $filter, $stateParams, GenericService) 
{

	$scope.posts = [];
	$scope.board = {};


	$rootScope.$watch('boards', function(){

		if(!$rootScope.boards.length)
			return;
		//

		$scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
	});
	
	// atualiza
	$scope.Update = function(reset)
	{
		// pega os posts
		GenericService.get({
			route:'post',
			action:'getByBoard',
			id:$stateParams.board
		}, function(response){

			if(response.status == 1)
				$scope.posts = response.data;
			//

			console.log($scope.posts);

		}, $rootScope.ResponseFail);
	}


	$scope.Open = function(board)
	{
		alert('Open board:' + board);
	}

	// atualiza a pagina TODA
	$scope.Update();

})