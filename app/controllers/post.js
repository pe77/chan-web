function PostController($scope, $rootScope, $filter, $stateParams, GenericService)
{
	$scope.post = {};
	
	// atualiza
	$scope.Update = function(reset)
	{
		
		GenericService.get({
			route:'post',
			action:'get',
			token:'--',
			id:151
		}, function(response){

			if(response.status == 1)
				$scope.post = response.data;
			//

			console.log($scope.post);

		}, $rootScope.ResponseFail);
	}

	// atualiza a pagina TODA
	$scope.Update();

	$scope.Save = function()
	{
		GenericService.save({
			route:'post',
			action:'save',
			token:'--'
		},
			JSON.stringify($scope.post), function(response){
				console.log(response);
				alert('foi');
		}, $rootScope.ResponseFail);
	}
}


function SignInController($scope) {
    // This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;
 
    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {

		console.log(authResult);
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;

            alert('foi');

            $scope.getUserInfo();

 
            //     ...
            // Do some work [1].
            //     ...
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;

            alert('não foi');
 
            // Report error.
        }
    };
 
    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };
 
    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '[KEY]', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }
 
    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };


    // Process user info.
	// userInfo is a JSON object.
	$scope.processUserInfo = function(userInfo) {
	    
	    alert('user info');
	    console.log(userInfo);
	 
	}
	 
	// When callback is received, process user info.
	$scope.userInfoCallback = function(userInfo) {
	    $scope.$apply(function() {
	        $scope.processUserInfo(userInfo);
	    });
	};
	 
	// Request user info.
	$scope.getUserInfo = function() {
	    gapi.client.request(
	        {
	            'path':'/plus/v1/people/me',
	            'method':'GET',
	            'callback': $scope.userInfoCallback
	        }
	    );
	};
 

 	setTimeout(function(){ $scope.start(); }, 3000);

    // Call start function on load.
    
}