angular.module('chan.controllers')

.controller('PostController', function($scope, $rootScope, $cacheFactory, CacheFactory, $filter, $interval, $timeout, $state, $anchorScroll, $stateParams, $location, GenericService) 
{

    $scope.post             = [];
    $scope.title            = '';
    $scope.hasPost          = true;

    $scope.setReply         = false;
    $scope.addReply         = Function;
    $anchorScroll.yOffset   = 75;

    var newPost             = false;
    var autoUpdateInterval  = 0;
    var intervalTime        = $rootScope.parameters.auto_update_time;



    $scope.UpdateNext = function(silentMode)
    {
        if(!$scope.post.replies)
            return;
        //
        
        silentMode    = (typeof silentMode !== 'undefined') ? silentMode : true;

        if(!silentMode)
            $rootScope.loading = true;
        //

        // se ainda não houver respostas, (post novo), recarrega a pagina toda
        if(!$scope.post.replies.length)
        {
            $scope.Update(false, silentMode);
            return;
        }


        var op          = $scope.post.id;
        var lastReply   = $scope.post.replies[$scope.post.replies.length-1].id;


        var requestData = {
            route:'post',
            action:'next',
            op:op,
            reply:lastReply
        };

        // pega os posts
        GenericService.get(requestData, function(response){

            console.log('UpdateNext 2');

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
    $scope.Update = function(reset, silentMode)
    {
        reset       = (typeof reset !== 'undefined') ? reset : false;
        silentMode    = (typeof silentMode !== 'undefined') ? silentMode : false;


        if(!silentMode)
            $rootScope.loading = true;
        //

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

            if(!silentMode)
                $rootScope.loading = false;
            //

            // exibe erro se houver
            if(!$rootScope.ResponseErrorHandler(response, [0], true))
            {
                $scope.hasPost = false;
                return;
            }
            //

            if(response.status == 1)
            {
                if(response.data.replies.length)
                {
                    $scope.post = response.data;
                }
                else
                {
                    if($scope.post.id != response.data.id)
                    {
                        $scope.post = response.data;
                    }
                }
                //
                
            }
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
        var anchor = 'post-' + id;
        $location.hash(anchor);
        $anchorScroll();
    }

    // marca o post 'to' com oo quotados
    $scope.AddQuoteReply = function(from, to)
    {
        for (var i = $scope.post.replies.length - 1; i >= 0; i--) {
            var post = $scope.post.replies[i];
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
        for (var i = $scope.post.replies.length - 1; i >= 0; i--) 
        {
            if($scope.post.replies[i].id == id)
                return $scope.post.replies[i];
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
    var postCreateListener = $rootScope.$on("onPostCreate", function (event, id) {


        // bugfix: se não for a pagina do post, não recarrega e nem joga pro final
        if($state.current.name != 'post')
            return;
        //

        // limpa o cache da pagina de board
        if(CacheFactory.get('BoardCache'))
            CacheFactory.get('BoardCache').removeAll();
        //


        $stateParams.scrollto = false; // reseta o scroll
        newPost = true;
        // $scope.Update();
        $scope.UpdateNext(false);
        
    });


    // quando sair da pagina para o auto update
    $rootScope.$on('$stateChangeStart', function()
    {
        // para o auto update
        clearInterval(autoUpdateInterval);   

        // remove o escutador
        $scope.$on('$destroy', postCreateListener); 
    });
})