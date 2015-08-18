angular.module('chan.controllers')

.controller('PostController', function($scope, $rootScope, $filter, $timeout, $state, $anchorScroll, $stateParams, $location, GenericService) 
{

    $scope.post = [];
    $scope.board = {};

    $scope.setReply = false;
    $scope.addReply = Function;

    var newPost = false;

    $rootScope.$watch('boards', function(){

        if(!$rootScope.boards.length)
            return;
        //

        $scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
    });


    $anchorScroll.yOffset = 75;


    // atualiza
    $scope.Update = function(reset)
    {
        $rootScope.loading = true;
        reset       = (typeof reset !== 'undefined') ? reset : false;

        if(reset)
        {
            $stateParams.scrollto = false;
            $scope.ScrollReset();
        }


        // limpa se for um novo post
        newPost ? $scope.ScrollReset(true) : $scope.ScrollReset();
        

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

            if($scope.setReply)
                $scope.setReply($scope.post);
            //

            
            $timeout(function () {

                // se houver ancora/fasttravel, move, caso não, mantem no topo
                if($stateParams.scrollto)
                    $scope.ScrollTo($stateParams.scrollto);
                //
            }, 100); // mais eficiente que o apply

            newPost = false;
            

        }, $rootScope.ResponseFail);



    }

    $scope.ScrollReset = function(toBot)
    {
        // console.log('ScrollReset: ' + toBot);

        $location.hash('');
        $anchorScroll();

        toBot       = (typeof toBot !== 'undefined') ? toBot : false;

        if(toBot)
        {
            $timeout(function () {
                $("html, body").animate({ scrollTop: $(document).height() }, "slow");
            }, 1000); // mais eficiente que o apply
        }
    }

    $scope.ScrollTo = function(id)
    {
        // console.log('ScrollTo: ' + id)
        var anchor = 'post-' + id;
        $location.hash(anchor);
        $anchorScroll();
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
                //
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
    $rootScope.$on("onPostCreate", function (event, id) {


        // bugfix: se não for a pagina do post, não recarrega e nem joga pro final
        if($state.current.name != 'post')
            return;
        //


        $stateParams.scrollto = false; // reseta o scroll
        newPost = true;
        $scope.Update();
        
    });

    // testando o evento de procura por tags
    /*
    $rootScope.$on("onSearchTag", function (event, tag, search) {
        search = search || false;
        
        console.log('onSearchTag: '+ tag+ '|' + search);
    }); 
    */

})