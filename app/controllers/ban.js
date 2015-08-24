angular.module('chan.controllers')

.controller('BanController', function($scope, $rootScope, GenericService) 
{
    $scope.post = $scope.reportedPost ? $scope.reportedPost : {};

    $scope.form = 
    {
        content:'',
        time:''
    };


    $scope.Init = function(post)
    {
        $scope.post = post;
    }



    $scope.Delete = function()
    {
        $rootScope.loading = true;

        GenericService.delete({
            route:'post',
            id:$scope.post.id
        }, function(response){


            $rootScope.loading = false;
            
            if(!$rootScope.ResponseErrorHandler(response, [0]))
                return;
            //

            $rootScope.Alert(response.message, 'success');

        }, $rootScope.ResponseFail)
    }


    $scope.Ban = function()
    {
        $rootScope.loading = true;

        GenericService.save({
            route:'ban',
            action:'new',
            id:$scope.post.id
        }, JSON.stringify($scope.form), function(response){

            $rootScope.loading = false;
            
            if(!$rootScope.ResponseErrorHandler(response, [0]))
                return;
            //

            $rootScope.Alert(response.message, 'success');

        }, $rootScope.ResponseFail)
    }


    $scope.Purge = function()
    {
        if(!confirm("Deseja realmente permabanir e apagar todos os posts desse usuario?"))
            return;
        //


        $rootScope.loading = true;

        GenericService.save({
            route:'ban',
            action:'purge',
            id:$scope.post.id
        }, JSON.stringify($scope.form), function(response){

            $rootScope.loading = false;
            
            if(!$rootScope.ResponseErrorHandler(response, [0]))
                return;
            //

            $rootScope.Alert(response.message, 'success');

        }, $rootScope.ResponseFail)
    }



    $scope.SetTime = function(time)
    {
        $scope.form.time = time;
    }

    
})

.controller('BanModalController', function($scope, $rootScope, GenericService) 
{

    
})