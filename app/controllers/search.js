angular.module('chan.controllers')

.controller('SearchFormController', function($scope, $rootScope, $state, $location, $stateParams) 
{
	$scope.search = '';


	$scope.Search = function()
	{
		if($scope.search == '')
			return;
		//

		$state.go('search', {tags:$scope.search});
	}

	// testando o evento de procura por tags
    var searchListener =  $rootScope.$on("onSearchTag", function (event, tag, search) {
        search = search || false;
        
        if(search)
        {
        	$scope.search = tag;
        	$state.go('search', {tags:tag});
        }else{
        	$scope.search = $scope.search == '' ? tag : $scope.search + ' ' + tag;
        }
    }); 
})