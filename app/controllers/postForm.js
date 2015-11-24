angular.module('chan.controllers')

.controller('PostFormController', function($scope, $http, $rootScope, $filter, recorderService, $stateParams, GenericService) 
{
    $scope.postForm = {
        content:'',
        tags:''
    };
    
    $scope.files = [];
    $scope.filesPreview = [];
    $scope.audioModel = null;

    $rootScope.$watch('boards', function(){

        if(!$rootScope.boards.length)
            return;
        //

        if($stateParams.board)
        {
            $scope.postForm.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
        }

    });

    if($stateParams.tags)
        $scope.postForm.tags = $stateParams.tags;
    //

    $scope.setReply = function(post)
    {
        $scope.postForm.reply = post.id;
    }


    $scope.addReply = function(post)
    {
        $scope.postForm.content += ($scope.postForm.content == "" ? "#" : "\n#") + post.id + ' ';
        // console.log($scope.postForm);
        // $scope.$apply();
    }

    var url = parameters.api_url + '/api/post/new';

    $scope.$on("fileSelected", function (event, args) {
        $scope.AddFile(args.file);
    });

    // add uma media pra lista
    $scope.AddFile = function(file)
    {
        var exist = false;

        // verifica se já não foi add a imagem
        for (var i = $scope.files.length - 1; i >= 0; i--) 
            if(
                $scope.files[i].lastModified == file.lastModified
                &&
                $scope.files[i].name == file.name
                &&
                $scope.files[i].size == file.size

            )
                exist = true;
        //

        if(!exist)
        {
            // add
            $scope.files.push(file);

            // add preview
            var reader = new FileReader();
            reader.onload = function (e) 
            {
                var blobData = e.target.result;
                
                $scope.filesPreview.push(blobData);
                $scope.$apply();
            }

            reader.readAsDataURL(file);
        }
    }

    $scope.RemoveFile = function(index)
    {
        $scope.files.splice(index, 1);
        $scope.filesPreview.splice(index, 1);
    }

    $scope.GetType = function(dataFile)
    {
        if(dataFile.indexOf('image') > -1)
            return 0;
        //

        if(dataFile.indexOf('video') > -1)
            return 1;
        //

        if(dataFile.indexOf('audio') > -1)
            return 2;
        //

        return -1; // undefined

    }

    $scope.ImageSelect = function(selector)
    {
        // bypass
        $(selector).trigger('click');
    }


    function formatBytes(bytes,decimals) {
       if(bytes == 0) return '0 Byte';
       var k = 1000;
       var dm = decimals + 1 || 3;
       var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
       var i = Math.floor(Math.log(bytes) / Math.log(k));
       return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
    }


    // evento : terminou de gravar
    $scope.RecComplete = function()
    {
        // exporta wave
        recorderService.getHandler().exportWAV(function(data){


            // verifica o tamanho do arquivo
            var mSize = Math.floor(data.size * 0.000001);
            
            /*
            console.log('jesus;', $scope.audioModel);

            console.log('recorderService.controller()', recorderService.controller('audioInput'));
            console.log('recorderService.getMp3Config()', recorderService.getMp3Config());
            console.log('recorderService.shouldConvertToMp3()', recorderService.shouldConvertToMp3());

            console.log('size:', formatBytes(data.size, 3), ':' +  mSize);
            */
            
            if(mSize < 5)
                $scope.AddFile(data); // add os arquivos
            else
                $rootScope.Alert('O arquivo de audio ficou muito grande.', 'warning', true);
            //
            
        });
    }

    $scope.Send = function()
    {
        $rootScope.loading = true;

        $http({
            method: 'POST',
            url: url,
            headers: { 'Content-Type': undefined },
            transformRequest: function (data) {
                var formData = new FormData();

                formData.append("data", JSON.stringify(data.data));

                for (var i = 0; i < data.files.length; i++) 
                    formData.append("file" + i, data.files[i]);
                //

                return formData;
            },
            data: { data: $scope.postForm, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            
            $rootScope.loading = false;

            // exibe erro se houver
            if(!$rootScope.ResponseErrorHandler(data, [0], false))
            {
                // exibe os erros
                var  message = data.message;

                $rootScope.Alert(message, 'warning', true);
                // $rootScope.Alert(data.data.toString(), 'warning', false);
                return;
            }
            //

            // $rootScope.Alert(data.message);
            $rootScope.$emit('onPostCreate', data.data);

            // reseta as variavais
            $scope.files = [];
            $scope.filesPreview = [];
            $scope.postForm.content = '';
        }).
        error($rootScope.ResponseFail);
    }
})