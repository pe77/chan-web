angular.module('chan.controllers')

.controller('PostFormController', function($scope, $http, $rootScope, $filter, $stateParams, GenericService) 
{
    $scope.post = {
        content:''
    };
    
    $scope.files = [];
    $scope.filesPreview = [];

    $rootScope.$watch('boards', function(){

        if(!$rootScope.boards.length)
            return;
        //

        $scope.post.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
    });

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
                
                $scope.filesPreview.push(e.target.result);
                $scope.$apply();
            }

            reader.readAsDataURL(args.file);
        }
    });



    $scope.ImageSelect = function()
    {
        // bypass
        $("#file-select-input").trigger('click');
    }

    $scope.Send = function()
    {
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
            data: { data: $scope.post, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            
            $rootScope.Alert(data.message);
            $rootScope.$emit('onPostCreate');

            // reseta as variavais
            $scope.files = [];
            $scope.filesPreview = [];
            $scope.post.content = '';
        }).
        error($rootScope.ResponseFail);
    }
})