angular.module('chan.controllers')

.controller('ReportController', function($scope, $rootScope, GenericService) 
{
    $scope.reports = [];

    $scope.page         = 1;
    $scope.pageLimit    = $rootScope.parameters.page_limit;

    $scope.Update = function(reset)
    {
        $rootScope.loading = true;

        reset   = (typeof reset !== 'undefined') ? reset : false;
        if(reset)
            $scope.page = 1;
        //

        GenericService.all({
            route:'report',
            page:$scope.page,
            pageLimit:$scope.pageLimit
        }, JSON.stringify($scope.form), function(response){

            $rootScope.loading = false;

            if(response.length)
                $scope.reports = reset ? response : $scope.reports.concat(response);
            //


            if(!response.length)
            {
                if(reset)
                    $scope.reports = [];
                //

                $rootScope.Alert('Não existem mais reports.');
            }
            //

        }, $rootScope.ResponseFail)
    }


    $scope.Clear = function(report)
    {
        $rootScope.loading = true;

        GenericService.save({
            route:'report',
            action:'clear',
            id:report.id
        }, JSON.stringify($scope.form), function(response){


            $rootScope.loading = false;
            
            if(!$rootScope.ResponseErrorHandler(response, [0]))
                return;
            //

            $rootScope.Alert(response.message, 'success');

            $scope.Update(true);

        }, $rootScope.ResponseFail)
    }

    // carrega mais
    $scope.LoadMore = function()
    {
        $scope.page++;
        $scope.Update();
    }



    $scope.Update();



    // se algum post for criado, recarrega a pagina
    var onBanAction = $rootScope.$on("onBanAction", function (event) {
        $scope.Update(true);
    });


    // quando sair da pagina para o auto update
    $rootScope.$on('$stateChangeStart', function()
    {
        // remove o escutador
        $scope.$on('$destroy', onBanAction); 
    });
    
})

.controller('ReportFormController', function($scope, $rootScope, GenericService) 
{
    $scope.form = 
    {
        content:''
    };



    $scope.Send = function()
    {
        $rootScope.loading = true;

        GenericService.save({
            route:'report',
            action:'new',
            id:$scope.reportedPost.id
        }, JSON.stringify($scope.form), function(response){


            $rootScope.loading = false;
            
            if(!$rootScope.ResponseErrorHandler(response, [0]))
                return;
            //

            $rootScope.Alert(response.message, 'success');

        }, $rootScope.ResponseFail)
    }
    
})