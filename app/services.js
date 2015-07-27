angular.module('chan.services', ['ngResource'])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key, value) {
      value = value || '{}';
      return JSON.parse($window.localStorage[key] || value);
    },
    del: function(key) {
      localStorage.removeItem(key);
    }
  }
}])

.factory('GenericService', function($resource) {
    var data = $resource(parameters.api_url + '/api/:route/:action/:token/:id/:filter/:page/:pageLimit/:date/:scope', { },{ 
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
})
;