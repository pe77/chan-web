angular.module('chan.controllers')

.controller('ReportController', function($scope, $rootScope, GenericService) 
{
    $scope.form = 
    {
        content:''
    };



    $scope.Send = function()
    {
        $rootScope.loading = true;

        GenericService.save({
            route:'report',
            action:'new',
            id:$scope.reportedPost.id
        }, JSON.stringify($scope.form), function(response){


            $rootScope.loading = false;
            
            if(!$rootScope.ResponseErrorHandler(response, [0]))
                return;
            //

            $rootScope.Alert(response.message, 'success');

        }, $rootScope.ResponseFail)
    }
    
})