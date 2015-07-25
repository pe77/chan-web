function GlobalController($scope, $rootScope, $templateCache)
{

	$rootScope.base_url 	      = base_url;
	$rootScope.loading			  = false;

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
}