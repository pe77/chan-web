angular.module('chan.controllers')

.controller('GlobalController', function($scope, $modal, $location, $anchorScroll, $filter, $rootScope, $alert, $localstorage, $window, GenericService, Facebook) 
{

	$rootScope.base_url 	      = base_url;
	$rootScope.parameters 	      = parameters;
	$rootScope.loading			  = false;
	$rootScope.signedIn		  	  = false;
	$rootScope.facebookReady	  = false;
	$rootScope.errorMessageSend	  = false;
	$rootScope.cacheRequest	  	  = true;
 	$rootScope.boards			  = [];
 	$rootScope.user				  = $localstorage.getObject('user');

 	

	
	// GENERIC RESPONSE

	$rootScope.ResponseFail = function(response)
	{
		$rootScope.loading			  = false;
		
		if($rootScope.errorMessageSend)
			return;
		//

		$rootScope.errorMessageSend = false;
		

		// mensagem de erro de conexção generica
		alert('Erro ao tentar se conectar, tente novamente.');

		$rootScope.errorMessageSend = true;
	}

	$rootScope.ResponseErrorHandler = function(response, status, showError)	
	{
		// status de erro padrão 0' zero
		status 			= status || [0];
		showError 		= (typeof showError !== 'undefined') ? showError : true;

		if(status.contains(response.status))
		{
			if(!response.message)
			{
				// erro generico de servidor
				$rootScope.Alert('Ocorreu um erro inesperado, por favor, tente novamente em alguns minutos.', 'error');
				return false;
			}

			// exibe a mensagem  de erro
			if(showError)
				$rootScope.Alert(response.message, 'warning');
			//

			return false;
		}

		return true;
	}


	



	// LOGIN / AUTH

	// google
	$scope.$on('event:google-plus-signin-success', function (event,authResult) {

	    $rootScope.Login(authResult['access_token']);
	    $rootScope.$apply();
	});

	// facebook
	Facebook.getLoginStatus(function(response) {
		console.log(response);
		
		if(response.status === 'connected') 
			$rootScope.Login(response.authResponse.accessToken);
		//
	});


	$rootScope.Login = function(token)
	{
		$rootScope.loading = true;

		// loga e carrega usuario
	    GenericService.get({route:'user', action:'get', token:token}, function(response){

	    	$rootScope.loading = false;
	    	
	    	switch(response.status)
	    	{
	    		case 1: // ok
	    			$localstorage.setObject('user', response.data);	// salva 
	    			$localstorage.set('access_token', token);

	    			$rootScope.user = response.data;
	    			$rootScope.signedIn = true;

	    			break;

    			case 0:
    				$rootScope.Alert(response.message, 'warning');
    				$rootScope.Logout();
    				break;

				case -1: // token vencido
    				$rootScope.Logout(); // desloga
    				break;
	    	}
			
	    }, $rootScope.ResponseFail);
	}

	$rootScope.Logout = function()
	{
		$rootScope.loading = true;

		// desloga api
	    GenericService.get({route:'auth', action:'logout', token:$localstorage.get('access_token', '-')}, function(response){
	    	// remove a chave
			$localstorage.del('access_token');
			$localstorage.del('user');

			// limpa vars
			$rootScope.signedIn = false;
			$rootScope.user 	= {};

			$rootScope.loading = false;

	    }, $rootScope.ResponseFail);

	    Facebook.logout(function(response){
	    	// puff!
	    });
	}


	// verifica o token
	if($localstorage.get('access_token', false))
		$rootScope.Login($localstorage.get('access_token'));
	//

	$rootScope.$watch(function() {
	  return Facebook.isReady();
	}, function(newVal) {
	  $rootScope.facebookReady = true;
	});


	$rootScope.FacebookLogin = function()
	{
		if($rootScope.signedIn)
			return;
		//

		Facebook.login(function(response) {
			if(response.status === 'connected') 
				$rootScope.Login(response.authResponse.accessToken);
			//
		}, {scope: 'email'});
	}

	
	






	// UTILS

	$rootScope.isUndefinedOrNull = function(variavel, str)
	{
		if(!variavel)
			return str;
		//

		return variavel;
	}


	$rootScope.getUserPic = function(url)
    {
    	if(url.indexOf('google') > -1)
    		return url + '?sz=50';
    	else
        	return url;
    }


	$rootScope.ScrollTo = function(anchor)
    {
        $location.hash(anchor);
        $anchorScroll();
    }

    $rootScope.Alert = function(message, type, autoHide, hideDelay)
	{
		type 		= type || 'info';
		autoHide 	= (typeof autoHide !== 'undefined') ? autoHide : true;
		hideDelay	= hideDelay || 5;

		hideDelay = autoHide ? hideDelay : false;

		var myAlert = $alert(
			{
				title: '', 
				container:'body', 
				content: message, 
				placement: 'top-right', 
				type: type, 
				duration:hideDelay, 
				show: true
			}
		);

		return;
	}


	$rootScope.OpenLink = function(url, newTab)
    {
        newTab 		= (typeof newTab !== 'undefined') ? newTab : false;

        if(newTab)
        	window.open(url,'_blank');
        else
        	window.open(url);
        //
    }










	// GLOBAL 

	// analitics
    $rootScope.$on('$stateChangeSuccess',
        function(event){
            if (!$window.ga)
                return;

            $window.ga('send', 'pageview', { page: $location.path() });
    });

    $rootScope.Report = function(post)
    {
    	$scope.reportedPost = post;

    	// Pre-fetch an external template populated with a custom scope
		var reportModal = $modal({backdrop:'static', title:'Denunciar post #' + post.id, scope: $scope, template: base_url + '/app/views/report/modal.html', show: false});
		// Show when some event occurs (use $promise property to ensure the template has been loaded)
		reportModal.$promise.then(reportModal.show);
    }

    // não adianta querer usar essa função se não estiver logado na API como adminsitrador, espertão
    $rootScope.Ban = function(post)
    {
    	$scope.reportedPost = post;

		var reportModal = $modal({backdrop:'static', title:'Administrar Post #' + post.id, scope: $scope, template: base_url + '/app/views/ban/modal.html', show: false});		
		reportModal.$promise.then(reportModal.show);
    }

});