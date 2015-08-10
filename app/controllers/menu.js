angular.module('chan.controllers')

.controller('MenuControllerTop', function($scope, $rootScope, $filter, $stateParams, $interval, GenericService) 
{
	$scope.messages = [];

	$scope.mark = true;

	$scope.UpdateMessages = function()
	{
		// caso não esteja logado
		if(!$rootScope.signedIn)
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

			$scope.mark = false;

		}); // se der erro foda-se
	}

	$scope.Mark = function()
	{
		if(!$scope.messages.length || $scope.mark)
			return;
		//

		// marca as mensagens como visualizadas
		GenericService.get({
			route:'message',
			action:'mark'
		}, function(response){

			$scope.mark = true;

		}); // se der erro foda-se
	}

	// atualiza
	intervalId = $interval(function() {
		$scope.UpdateMessages();
	}, $rootScope.parameters.messages_update_interval);

	$scope.UpdateMessages();


	$rootScope.$watch('signedIn', function(value){

		if(value)
			$scope.UpdateMessages();
		//
	});
})

.controller('MenuControllerSide', function($scope, $rootScope, $filter, $stateParams, GenericService) 
{
	$scope.lastMessages = [];

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


	$scope.UpdateLastMessages = function()
	{
		// caso não esteja logado
		if(!$rootScope.signedIn)
			return;
		//

		// pega as ultimas 15
		GenericService.get({
			route:'message',
			action:'all'
		}, function(response){

			if(response.status == 1)
				$scope.lastMessages = response.data;
			//

			console.log($scope.lastMessages);

		}); // se der erro foda-se

	}

	// atualiza o menu
	$scope.Update();

	// ultimas mensagens
	$scope.UpdateLastMessages();


	$rootScope.$watch('signedIn', function(value){

		if(value)
			$scope.UpdateLastMessages();
		//
	});

})