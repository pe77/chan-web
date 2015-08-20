angular.module('chan.controllers')

.controller('PostController', function($scope, $rootScope, $filter, $interval, $timeout, $state, $anchorScroll, $stateParams, $location, GenericService) 
{

    $scope.post             = [];
    $scope.board            = {};

    $scope.setReply         = false;
    $scope.addReply         = Function;
    $anchorScroll.yOffset   = 75;

    var newPost             = false;
    var autoUpdateInterval  = 0;
    var intervalTime        = $rootScope.parameters.auto_update_time;

    $rootScope.$watch('boards', function(){

        if(!$rootScope.boards.length)
            return;
        //

        $scope.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
    });


    $scope.UpdateNext = function(silentMode)
    {
        
        silentMode    = (typeof silentMode !== 'undefined') ? silentMode : true;

        if(!silentMode)
            $rootScope.loading = true;
        //

        var op          = $scope.post.id;
        var lastReply   = $scope.post.replies[$scope.post.replies.length-1].id;


        // pega os posts
        GenericService.get({
            route:'post',
            action:'next',
            op:op,
            reply:lastReply
        }, function(response){

            if(!silentMode)
                $rootScope.loading = false;
            //

            if(response.status == 1)
            {

                // add os novos posts, mas antes verifica se já não foi add (no caso da chamada ainda ter retornado ou retornar ao ~mesmo tempo)
                var exist = false;
                for (var i = $scope.post.replies.length - 1; i >= 0; i--)
                {
                    for (var j = response.data.length - 1; j >= 0; j--)
                    {
                        if($scope.post.replies[i].id == response.data[j].id)
                        {
                            exist = true;
                            break;
                        }
                    }
                };


                for (var j = response.data.length - 1; j >= 0; j--)
                    response.data[j].isNew = true; // marca como novos
                //

                if(!exist)
                    $scope.post.replies = $scope.post.replies.concat(response.data);
                //

                // se for um novo post, joga pro final da pagina
                newPost ? $scope.ScrollReset(true) : false;
            }

            newPost = false;

        }, $rootScope.ResponseFail);
    }




    // atualiza tudo
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

            // reinicia a contagem do auto update
            clearInterval(autoUpdateInterval);   
            autoUpdateInterval = setInterval($scope.UpdateNext, intervalTime);
            

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
                $("html, body").animate({ scrollTop: $(document).height() }, "fast");
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
        // $scope.Update();
        $scope.UpdateNext(false);
        
    });


    // quando sair da pagina para o auto update
    $rootScope.$on('$stateChangeStart', function()
    {
        clearInterval(autoUpdateInterval);   
    });

    // testando o evento de procura por tags
    /*
    $rootScope.$on("onSearchTag", function (event, tag, search) {
        search = search || false;
        
        console.log('onSearchTag: '+ tag+ '|' + search);
    }); 
    */

})