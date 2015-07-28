angular.module('chan.controllers')

.controller('MenuControllerTop', function($scope, $rootScope, $filter, $stateParams, $interval, GenericService) 
{
	



	$scope.messages = [];


	$scope.UpdateMessages = function()
	{
		// caso não esteja logado
		if(isEmpty($rootScope.user))
			return;
		//

		// pega as mensagens não visualizadas
		GenericService.get({
			route:'message',
			action:'get'
		}, function(response){



			if(response.status == 1)
				$scope.messages = response.data;
			//


			console.log($scope.messages);

		}, $rootScope.ResponseFail);
	}

	// atualiza
	intervalId = $interval(function() {
		$scope.UpdateMessages();
	}, $rootScope.parameters.messages_update_interval);

	$scope.UpdateMessages();
})

.controller('MenuControllerSide', function($scope, $rootScope, $filter, $stateParams, GenericService) 
{
	// atualiza
	$scope.Update = function()
	{
		// pega as boards
		GenericService.get({
			route:'board',
			action:'all'
		}, function(response){

			if(response.status == 1)
				$rootScope.boards = response.data;
			//

		}, $rootScope.ResponseFail);
	}

	// atualiza o menu
	$scope.Update();

})