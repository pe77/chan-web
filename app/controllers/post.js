angular.module('chan.controllers')

.controller('PostController', function($scope, $rootScope, $filter, $stateParams, $popover, GenericService) 
{

    $scope.post = [];
    $scope.board = {};

    $scope.setReply = Function;
    $scope.addReply = Function;

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

        // pega os posts
        GenericService.get(data, function(response){

            $rootScope.loading = false;

            if(response.status == 1)
                $scope.post = response.data;
            //

            $scope.setReply($scope.post);


            console.log($scope.post);

        }, $rootScope.ResponseFail);
    }

    // marca o post 'to' com oo quotados
    $scope.AddQuoteReply = function(from, to)
    {
        for (var i = $scope.post.replies_from.length - 1; i >= 0; i--) {
            var post = $scope.post.replies_from[i].r_from;
            if(post.id == to)
            {
                post.quotes = post.quotes == undefined ? [] : post.quotes;

                // garante que não add duplicados
                if(post.quotes.indexOf(from) < 0)
                    post.quotes.push(from);
            }
        };
    }


    // preview do quote quando passa o dedinho e/ou clica, retorna o post, se houver
    $scope.SearchPost = function(id)
    {
        // verifica se é o post principal
        if($scope.post.id == id)
            return $scope.post;
        //

        // procura nas respostas
        for (var i = $scope.post.replies_from.length - 1; i >= 0; i--) 
        {
            // console.log('=');
            if($scope.post.replies_from[i].r_from.id == id)
                return $scope.post.replies_from[i].r_from;
            //
        };

        return false;

        // tenta achar o post
        
        // console.log($event);
        // var myPopover = $popover($event.target, {title: 'My Title', content: 'My Content', trigger: 'manual'});
        // myPopover.show();
    }

    // bypass
    $scope.onLoadPostForm = function(setReply, AddReply)
    {
        $scope.setReply = setReply;
        $scope.addReply = AddReply;
    }


    // atualiza a pagina TODA
    $scope.Update();


    // se algum post for criado, recarrega a pagina
    $rootScope.$on("onPostCreate", function () {
        $scope.Update();
    });

})