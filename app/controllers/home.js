angular.module('chan.controllers')

.controller('HomeController', function($scope, $state, $rootScope, $filter, $stateParams, GenericService) 
{

    $state.go('board', {'board':'b'});

})