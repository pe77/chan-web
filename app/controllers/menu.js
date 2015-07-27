angular.module('chan.controllers')

.controller('MenuController', function($scope, $rootScope, $filter, $stateParams, GenericService) 
{
	
	// atualiza
	$scope.Update = function(reset)
	{
		// pega os posts
		GenericService.get({
			route:'board',
			action:'all'
		}, function(response){

			if(response.status == 1)
				$rootScope.boards = response.data;
			//

			// console.log($rootScope.boards);

		}, $rootScope.ResponseFail);
	}


	$scope.Open = function(board)
	{
		alert('Open board:' + board);
	}

	// atualiza o menu
	$scope.Update();

})