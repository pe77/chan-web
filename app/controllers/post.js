angular.module('chan.controllers')

.controller('PostController', function($scope, $rootScope, $filter, $stateParams, GenericService) 
{

    $scope.post = [];
    $scope.board = {};

    $scope.setReply = Function;

    $rootScope.$watch('boards', function(){

        if(!$rootScope.boards.length)
            return;
        //

        $scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
    });
    
    // atualiza
    $scope.Update = function()
    {
        $rootScope.loading = true;

        var data = 
        {
            route:'post',
            id:$stateParams.post,
            scope:'PostPage'
        };

        console.log(data);

        // pega os posts
        GenericService.get(data, function(response){

            $rootScope.loading = false;

            if(response.status == 1)
                $scope.post = response.data;
            //

            $scope.setReply($scope.post);

            console.log($scope.posts);

        }, $rootScope.ResponseFail);
    }


    $scope.onLoadPostForm = function(setReply)
    {
        $scope.setReply = setReply;
    }


    // atualiza a pagina TODA
    $scope.Update();


    // se algum post for criado, recarrega a pagina
    $rootScope.$on("onPostCreate", function () {
        $scope.Update();
    });

})