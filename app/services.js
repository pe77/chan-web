angular.module('genericService', ['ngResource']).
    factory('GenericService', function($resource){

    var data = $resource(chan_url + '/api/:route/:action/:token/:id/:filter/:page/:pageLimit/:date/:scope', { },{ 
        all: {
            method:'GET',
            params:{action: 'all'},
            isArray:true
        },
        get: {
            method:'GET',
            params:{action: 'get'}
        },
        save: {
            method:'POST',
            params:{action: 'save'}
        },
        delete: {
            method:'DELETE',
            params:{action: 'delete'}
        }
    });

    return data;
});

