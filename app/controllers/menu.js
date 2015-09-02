angular.module('chan.controllers')

.controller('MenuControllerTop', function($scope, $rootScope, $filter, $stateParams, $interval, GenericService) 
{
	$scope.messages = [];
	$scope.limit = 5;

	$scope.mark = true;
	$scope.seen = false;

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

			// marca todas as novas como não vistas
			for (var i = response.data.length - 1; i >= 0; i--)
			{
				response.data[i].seen = false;
			}

			response.data = checkLinks(response.data);
			//

			if(response.status == 1)
			{
				// só add as novas
				for (var j = response.data.length - 1; j >= 0; j--) {
				
					var exist = false;
					for (var i = $scope.messages.length - 1; i >= 0; i--) 
						if($scope.messages[i].id == response.data[j].id)
							exist = true;
					//
					
					if(!exist)
						$scope.messages.unshift(response.data[j]);
					//
					
				};
			}

			$scope.mark = false;

			// se veio alguma mensagem 
			if(response.data.length)
				$scope.seen = false;
			//

		}); // se der erro foda-se
	}

	$scope.Mark = function()
	{
		if(!$scope.messages.length || $scope.mark)
			return;
		//

		$scope.seen = true;


		// pega todas as mensagens e marca como visto
		for (var i = $scope.messages.length - 1; i >= 0; i--) 
			$scope.messages[i].seen = true;
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
			action:'all',
			page:1,
			pageLimit:5
		}, function(response){
	
			// da uma tratada no s links
			response.data = checkLinks(response.data);

			if(response.status == 1)
				$scope.lastMessages = response.data;
			//

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


function checkLinks(messages)
{
	for (var i = messages.length - 1; i >= 0; i--)
	{
		switch(messages[i].type)
		{
			case 1: // link pra post
				messages[i].link = messages[i].link != undefined ? '#/board/post/' + messages[i].link : '#';
			break;

			case 2: // link pra post
				var link = messages[i].link == undefined ? false : messages[i].link;

				if(link)
				{
					link = link.split('|');
					messages[i].link = '#/post/' + link[0] + '/' + link[1];
				}else{
					messages[i].link = '#'
				}
				// messages[i].link = messages[i].link != undefined ? '#/board/post/' + messages[i].link : '#';
			break;

			default:
				messages[i].link = "#";
		}

	}

	return messages;
}