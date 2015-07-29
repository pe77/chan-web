angular.module('chan.controllers')

.controller('GlobalController', function($scope, $filter, $rootScope, $localstorage, GenericService) 
{

	$rootScope.base_url 	      = base_url;
	$rootScope.parameters 	      = parameters;
	$rootScope.loading			  = false;
	$rootScope.signedIn		  	  = false;
	$rootScope.errorMessageSend	  = false;
 	$rootScope.boards			  = [];
 	$rootScope.user				  = $localstorage.getObject('user');
 	

	$rootScope.Alert = function(message, type, autoHide, hideDelay)
	{
		alert(message);
		return;
	}

	$rootScope.ResponseFail = function(response)
	{
		console.log(response);

		if($rootScope.errorMessageSend)
			return;
		//

		// mensagem de erro de conexção generica
		alert('Erro ao tentar se conectar, tente novamente.');

		$rootScope.errorMessageSend = true;
	}

	$rootScope.ResponseErrorHandler = function(response, status, autoHide)	
	{

		// status de erro padrão 0' zero
		status 		= status || [0];
		autoHide	= autoHide == undefined ? true : autoHide;

		if(status.contains(response.status))
		{
			if(!response.message)
			{
				// erro generico de servidor
				$rootScope.Alert('Ocorreu um erro inesperado, por favor, tente novamente em alguns minutos.', 'error');
				return false;
			}

			// exibe a mensagem  de erro
			$rootScope.Alert(response.message, 'warning', autoHide);
			return false;
		}

		return true;
	}


	$rootScope.isUndefinedOrNull = function(variavel, str)
	{
		if(!variavel)
			return str;
		//

		return variavel;
	}

	$scope.$on('event:google-plus-signin-success', function (event,authResult) {

	    $rootScope.Login(authResult['access_token']);
	    $rootScope.$apply();
	});


	$rootScope.Login = function(token)
	{
		// loga e carrega usuario
	    GenericService.get({route:'user', action:'get', token:token}, function(response){
	    	
	    	switch(response.status)
	    	{
	    		case 1: // ok
	    			$localstorage.setObject('user', response.data);	// salva 
	    			$localstorage.set('access_token', token);

	    			$rootScope.user = response.data;
	    			$rootScope.signedIn = true;

	    			break;

    			case 0:
    				$rootScope.Alert(response.message);
    				$rootScope.Logout();
    				break;
	    	}
			
	    }, $rootScope.ResponseFail);
	}

	$rootScope.Logout = function()
	{
		// desloga api
	    GenericService.get({route:'auth', action:'logout', token:$localstorage.get('access_token', '-')}, function(response){
	    	// remove a chave
			$localstorage.del('access_token');
			$localstorage.del('user');

			// limpa vars
			$rootScope.signedIn = false;
			$rootScope.user 	= {};

	    }, $rootScope.ResponseFail);
	}


	// verifica o token
	if($localstorage.get('access_token', false))
		$rootScope.Login($localstorage.get('access_token'));
	//
});