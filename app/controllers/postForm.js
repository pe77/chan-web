angular.module('chan.controllers')

.controller('PostFormController', function($scope, $http, $rootScope, $filter, $stateParams, GenericService) 
{
    $scope.postForm = {
        content:'',
        tags:''
    };
    
    $scope.files = [];
    $scope.filesPreview = [];

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

        var exist = false;

        // verifica se já não foi add a imagem
        for (var i = $scope.files.length - 1; i >= 0; i--) 
            if(
                $scope.files[i].lastModified == args.file.lastModified
                &&
                $scope.files[i].name == args.file.name
                &&
                $scope.files[i].size == args.file.size

            )
                exist = true;
        //

        if(!exist)
        {
            // add
            $scope.files.push(args.file);

            // add preview
            var reader = new FileReader();
            reader.onload = function (e) 
            {
                var blobData = e.target.result;
                
                $scope.filesPreview.push(blobData);
                $scope.$apply();
            }

            reader.readAsDataURL(args.file);
        }
    });

    $scope.RemoveFile = function(index)
    {
        $scope.files.splice(index, 1);
        $scope.filesPreview.splice(index, 1);
    }


    $scope.isVideo = function(dataFile)
    {
        return dataFile.indexOf('video') > -1;
    }

    $scope.ImageSelect = function(selector)
    {
        // bypass
        $(selector).trigger('click');
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