angular.module('chan.controllers')

.controller('PostFormController', function($scope, $http, $rootScope, $filter, $stateParams, GenericService) 
{
    $scope.post = {
        content:''
    };
    $scope.files = [];

    $rootScope.$watch('boards', function(){

        if(!$rootScope.boards.length)
            return;
        //

        $scope.post.board = $filter('filter')($rootScope.boards, {shortcut_name:$stateParams.board})[0];
    });

    var url = parameters.api_url + '/api/post/new';

    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {            
            $scope.files.push(args.file);
        });
    });


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

        }).
        error(function (data, status, headers, config) {

        });
    }
})