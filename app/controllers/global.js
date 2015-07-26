angular.module('chan.controllers')

.controller('GlobalController', function($scope, $filter, $rootScope, $localstorage) 
{

	$rootScope.base_url 	      = base_url;
	$rootScope.parameters 	      = parameters;
	$rootScope.loading			  = false;
	$rootScope.signedIn		  	  = false;

	if($localstorage.get('access_token', false))
		$rootScope.signedIn = true;
	//

	$rootScope.Alert = function(message, type, autoHide, hideDelay)
	{
		alert(message);
		return;
	}

	$rootScope.ResponseFail = function(response)
	{
		// mensagem de erro de conexção generica
		alert('Erro ao tentar se conectar, tente novamente.');
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

	    // salva a chave	    
	    $localstorage.set('access_token', authResult['access_token']);
	    $rootScope.signedIn = true;

	    $rootScope.$apply();
	  });

	$scope.$on('event:google-plus-signin-failure', function (event,authResult) {
		$rootScope.logout();
	});
	

	$rootScope.logout = function()
	{
		// remove a chave e desloga
		$localstorage.del('access_token');

		$rootScope.signedIn = false;
	    $rootScope.$apply();
	}
});

// bypass pro controller
function handleClientLoad() {
    angular.element(document.getElementById('bbodyy')).scope().handleClientLoad();
}